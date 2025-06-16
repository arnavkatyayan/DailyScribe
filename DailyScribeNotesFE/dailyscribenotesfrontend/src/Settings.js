import React from "react";
import ReactSwitch from "react-switch";
import {useState, useEffect} from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import axios from "axios";

function Settings(props) {
    const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);
    
    const settingsOptions = [
        { name: "Change Password", button: "Change" },
        { name: "Delete Journals", button: "Delete" },
        { name: "Export Data", button: "Export" }
    ];

    const handleChanges = (operation) => {
         switch(operation) {
            case "Delete":
            deleteJournals();
            break;
            // case "Change":
            // changePassword();
            // break;
            // case "Export":
            // exportJournals();
            // break;
            default:
            console.log("No options");
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
    };


    const checkDisabled = (option) => {
        if(option === "Change") {
            return false;
        }
        else {
            if(props.entries.length === 0) {
                return true;
            }
        }
        return false;
    }

    const getByTitle = (option) => {
        if(option === "Change") {
            return "Change Password";
        }
        else if(option === "Export" && props.entries.length>0) {
            return "Export Journals";
        }
        else if(option === "Delete" && props.entries.length>0) {
            return "Delete Journals";
        }
            return "No Journals available";
        
    }

    return (
        <div className="settings-page">
            <h3>Settings</h3>
            <div className="settings-box">
            {settingsOptions.map((setting)=>
            <>
            <div className="settings-options">
                <h5 className="setting-name">{setting.name}</h5>
                <Button title={getByTitle(setting.button)} disabled={checkDisabled(setting.button)} className="setting-button" onClick={()=>handleChanges(setting.button)}>{setting.button}</Button>

                </div>
            <hr style={{ border: '1px solid #ccc' }} />
                </>
            )}
            <Button className="del-acc" title="Delete account">Delete account</Button>
            </div>
        </div>
    )
}
export default Settings;