import React from "react";
import ReactSwitch from "react-switch";
import {useState, useEffect} from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import axios from "axios";
import { ChangePassword } from "./ReusableModalsAndMethods";
function Settings(props) {
    const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const settingsOptions = [
        {
            name: "Change Password",
            button: "Change Password",
            description: "Securely update your current password to protect your account and privacy."
        },
        {
            name: "Delete Journals",
            button: "Delete Journals",
            description: "Permanently remove all your saved journal entries. This action cannot be undone."
        },
        {
            name: "Export Data",
            button: "Export Data",
            description: "Download a backup of all your journals in PDF format for offline access or safekeeping."
        },
        {
            name: "Delete Account",
            button: "Delete Account",
            description: "Permanently delete your account and all associated data. You can restore it later if needed."
        }
    ];


    
    const handleChanges = (operation) => {
         switch(operation) {
            case "Delete Journals":
            deleteJournals();
            break;
            case "Change Password":
            changePassword();
            break;
            case "Export Data":
            exportJournals();
            break;
            case "Delete Account":
            deleteAlert();
            break;
            default:
            console.log("No options");
         }   
    };

    const changePassword = () => {
        setIsChangePasswordClicked(true);
    }

    const exportJournals = async () => {
        try {
            // 🔸 1. Call the backend with the username
            const response = await axios.get(
                "http://localhost:9090/dailyScribe-journal/exportJournals",
                {
                    params: { userName: props.userName },   // query-param: ?userName=…
                    responseType: "blob",                   // return raw PDF bytes
                    headers: { Accept: "application/pdf" }
                }
            );

            // 🔸 2. Create a blob URL and trigger a download
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "journals.pdf";          // file name user sees
            document.body.appendChild(link);
            link.click();

            // 🔸 3. Cleanup
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Export failed", err);

        }
    };

    const deleteJournalAPI = async () => {

        try {
            const response = await axios.delete("http://localhost:9090/dailyScribe-journal/deleteJournals", { params: { userName: props.userName } })
            return response.data;
        }
        catch (error) {
            console.log("Error deleting the journal", error);
            return false;
        }
    }


    const deleteJournals = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#282c34',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            const confirmation = await Swal.fire({
                title: 'Type "DELETE" to confirm',
                input: 'text',
                inputPlaceholder: 'Type DELETE to confirm',
                inputValidator: (value) => {
                    if (value !== 'DELETE') {
                        return 'You must type DELETE to confirm';
                    }
                    return null;
                },
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#282c34',
                cancelButtonColor: '#d33'
            });

            if (confirmation.isConfirmed && confirmation.value === 'DELETE') {
                const response = await deleteJournalAPI();
                if (response === true) {
                    await props.fetchEntries();
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your journals have been deleted.',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'my-confirm-button'
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error deleting the journals.',
                        icon: 'error',
                        customClass: {
                            confirmButton: 'my-confirm-button'
                        }
                    });
                }
            }
        }
    };


    const checkDisabled = (option) => {
        if(option === "Change Password") {
            return false;
        }
        else {
            if(props.entries.length === 0) {
                return true;
            }
        }
        return false;
    }

    const deleteAccount = async () => {
        try {
            const response = await axios.delete("http://localhost:9090/dailyScribe-login/deleteAccount", { params: { userName: props.userName } })
            return response.data;
        }
        catch (error) {
            console.log("Error deleting the account", error);
            return "Error Deleting Account!";
        }
    }

    const onClose = () => {
        setIsChangePasswordClicked(false);
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const checkCredentials = async () => {
        if (password === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter the password.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            return;
        }
        if (confirmPassword === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter the confirm password.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            return;
        }
        if (password === confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Both passwords are matching.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            return;
        }
        try {
            const response = await axios.get("http://localhost:9090/dailyScribe-login/isPasswordCorrect", { params: { userName: props.userName, password: password }});
            return response.data;
        } catch(error) {
            console.log("Error fetching password details",error);
            return false;
        }
    }

    const changePasswordAPI = async () => {
        console.log(await checkCredentials());
        const isCorrect = await checkCredentials();
        if(!isCorrect) {
             Swal.fire({
                title: 'Error!',
                text: 'The password is not matching for the user.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            return;
        }
        const changePasswordRequestBody = {
            userName:props.userName,
            password:password,
            confirmPassword:confirmPassword
        }
        try {
            const response = await axios.post("http://localhost:9090/dailyScribe-login/changePassword", changePasswordRequestBody);
            if(response.data) {
                Swal.fire({
                title: 'Success!',
                text: 'Password changed!.',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            setIsChangePasswordClicked(false);
            resetPasswords();
            }
        } catch (error) {
            console.log("Error changing the password", error);
        }

    }

    const resetPasswords = () => {
        setPassword("");
        setConfirmPassword("");
    }

    const deleteAlert = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#282c34',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            const confirmation = await Swal.fire({
                title: 'Type "DELETE_ACCOUNT" to confirm',
                input: 'text',
                inputPlaceholder: 'Type DELETE to confirm',
                inputValidator: (value) => {
                    if (value !== 'DELETE_ACCOUNT') {
                        return 'You must type DELETE_ACCOUNT to confirm';
                    }
                    return null;
                },
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#282c34',
                cancelButtonColor: '#d33'
            });

            if (confirmation.isConfirmed && confirmation.value === 'DELETE_ACCOUNT') {
                const response = await deleteAccount();
                if (response === "Account Deleted") {
                    
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your account has been deleted.',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'my-confirm-button'
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error deleting the journals.',
                        icon: 'error',
                        customClass: {
                            confirmButton: 'my-confirm-button'
                        }
                    });
                }
                props.setIsLoggedIn(false);
            }
        }
    }

    return (
        <div className="settings-page">
           
            <div className="settings-grid-structure">
            {settingsOptions.map((setting)=>
            <>
            <div className="settings-box">
                <h4 className="setting-name">{setting.name}</h4>
                <p className="setting-name setting-description">{setting.description}</p>
                <Button className="setting-button" disabled={checkDisabled(setting.name)} onClick={() => handleChanges(setting.name)}>{setting.button}</Button>
                </div>
             </>   
            )}
            
            </div>
            <ChangePassword 
            show={isChangePasswordClicked}
            onClose={onClose}
            title="Change Password"
            password={password}
            confirmPassword={confirmPassword}
            handlePassword={handlePassword}
            handleConfirmPassword={handleConfirmPassword}
            changePasswordAPI={changePasswordAPI}
            resetPasswords={resetPasswords}
            />
        </div>
    )
}
export default Settings;