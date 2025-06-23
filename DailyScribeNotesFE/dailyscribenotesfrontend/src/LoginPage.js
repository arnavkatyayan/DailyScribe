import React from "react";
import { useState } from "react";
import { Button, Form , Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { SignupPage, ForgetPasswordPage, RestoreAccountWindow } from "./ReusableModalsAndMethods";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isNewUser, setIsNewUser] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);  
    const [userNameSU, setUserNameSU] = useState("");
    const [passwordSU, setPasswordSU] = useState("");
    const [emailSU, setEmailSU] = useState("");
    const [confirmPasswordSU, setConfirmPasswordSU] = useState("");
    const [isForgetPass, setIsForgetPass] = useState(false);
    const [showForgetPassModal, setShowForgetPassModal] = useState(false);
    const [userNameRestore,setUserNameRestore] = useState("");
    const [passwordRestore, setPasswordRestore] = useState("");

    const handleNewUser = () => {
        setIsNewUser(!isNewUser);
    }

    const handleUserNameRestore = (event) => {
        setUserNameRestore(event.target.value);
    }

    const handlePasswordRestore = (event) => {
        setPasswordRestore(event.target.value);
    }

    const handleResetRestore = () => {
        setUserNameRestore("");
        setPasswordRestore("");
    }

    const restoreAccountAPI = async () => {
        if (userNameRestore === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter the username.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            return;
        }
        if (passwordRestore === "") {
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
        const restoreAccountRequestBody = {
            userName:userNameRestore,
            password:passwordRestore
        }
        try {
            const response = await axios.post("http://localhost:9090/dailyScribe-login/restoreAccount", restoreAccountRequestBody);
            if(response.data === "Account is Restored") {
                 Swal.fire({
                title: 'Success!',
                text: response.data,
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }

            });
            handleResetRestore();
            props.setIsRestoreAcc(false);
            }
            else {
                Swal.fire({
                title: 'Info!',
                text: response.data,
                icon: 'info',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            }
        } catch(error) {
            console.log("Getting error while restoring the account", error);        
        }
    }

    const handleUserName = (evt) => {
        setUserName(evt.target.value);
    }

    const handleUserNameSU = (evt) => {
        setUserNameSU(evt.target.value);
      };
      
      const handlePasswordSU = (evt) => {
        setPasswordSU(evt.target.value);
      };
      
      const handleEmailSU = (evt) => {
        setEmailSU(evt.target.value);
      };
      
      const handleConfirmPasswordSU = (evt) => {
        setConfirmPasswordSU(evt.target.value);
      };

    const handlePassword = (evt) => {
        setPassword(evt.target.value);
    }

    const isUserNameOrEmailTaken = async (username,email) => {

        try {
          const response = await axios.get("http://localhost:9090/dailyScribe-login/isUserOrMailPresent", {
                params: { username, email }
            });
            return response.data;
        }catch(error) {
            console.log("Error",error);
        }
    }

    const handleSignupSU = async () => {
        if (!userNameSU.trim() || !emailSU.trim() || !passwordSU.trim() || !confirmPasswordSU.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill in all fields before submitting.',
                confirmButton: 'my-confirm-button',
                customClass: {
                confirmButton: 'my-confirm-button'
                }
            });
            return;
          }
        
          if (passwordSU !== confirmPasswordSU) {
              Swal.fire({
                  icon: 'error',
                  title: 'Password Mismatch',
                  text: 'Password and Confirm Password do not match.',
                  confirmButton: 'my-confirm-button',
                  customClass: {
                      confirmButton: 'my-confirm-button'
                  }
              });
            return;
          }
          const data = await isUserNameOrEmailTaken(userNameSU,emailSU);
          
          if(data.isEmailPresent) {
            Swal.fire({
                icon: 'error',
                title: 'Email Taken',
                text: 'Please change the email.',
                confirmButton: 'my-confirm-button',
                customClass: {
                confirmButton: 'my-confirm-button'
                }
              });
              return;
          }
          if(data.isUserNamePresent) {
            Swal.fire({
                icon: 'error',
                title: 'Username Taken',
                text: 'Please change the username.',
                confirmButton: 'my-confirm-button',
                customClass: {
                confirmButton: 'my-confirm-button'
                }
              });
              return;
          }
          const signupBody = {
              userName: userNameSU.trim(),
              email: emailSU.trim(),
              password: passwordSU.trim()
          }

          try {
            const response = await axios.post("http://localhost:9090/dailyScribe-login/signup",signupBody);
            if (response.data === true) {
                Swal.fire({
                  title: 'Success!',
                  text: 'Signup Successful.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  customClass: {
                    confirmButton: 'my-confirm-button'
                }
                }).then(() => {
                  setShowSignupModal(false);
                });
              }
            else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Signup Failed',
                    confirmButtonText: 'OK',
                    customClass: {
                    confirmButton: 'my-confirm-button'
                }
                });
                return;
            }
          }
          catch (error) {
            console.log("Error saving the login details");
          }
    }

    const handleResetSU = () => {
        setUserNameSU("");
        setPasswordSU("");
        setEmailSU("");
        setConfirmPasswordSU("");
    }

    const handleLogin = async () => {
        if (!userName.trim() || !password.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please enter both username and password.',
            });
            return;
        }
        const loginBody = {
            userName: userName.trim(),
            password: password.trim()
        };

        try {
            const response = await axios.post("http://localhost:9090/dailyScribe-login/login", loginBody);
            if (response.data === true) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Login Successful.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'my-confirm-button'
                    }
                }).then(() => {
                    props.setUsername(userName);
                    props.setIsLoggedIn(true);
                    sessionStorage.setItem("isLoggedIn", "true");
                    sessionStorage.setItem("userName", userName);
                    navigate("/");
                });
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Credentials are wrong.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                    confirmButton: 'my-confirm-button'
                }
                  });
                console.log("Login Failed");
            }
        }
        catch (error) {
            console.log("Getting error", error);
        }
    }

    const handleReset = () => {
        setPassword("");
        setIsNewUser(false);
        setUserName("");
    }

    const handleSignup = () => {
        setShowSignupModal(true);
    }

    const handleForgetPassMain = () => {
        setShowForgetPassModal(true);
    }

    const handleForgetPassAPI = async () => {
        if (!userName.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing username',
                text: 'Please enter username.',
            });
            return;
        }
    }

    const handleClose = () => {
        props.setIsNewUser(false);
    }

    const handleClosePass = () => {
        props.setIsForgetPass(false);
    }

    const handleCloseRestorAcc = () => {
        props.setIsRestoreAcc(false);
    }

    const handleForgetPassword = () => {
        setIsForgetPass(!isForgetPass);
    }

    return (
        <div className="login-page">
            <h1>Login / Signup</h1>
            <div className="login-modal">
                <Form>
                    <Form.Label className="label-css">Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={userName}
                        placeholder="Enter the username"
                        onChange={handleUserName}
                        style={{ width: '15vw' }}
                    />
                    <Form.Label className="label-css">Password</Form.Label>
                    <Form.Control
                        type="password"
                        style={{ width: '15vw' }}
                        value={password}
                        placeholder="Enter the password"
                        onChange={handlePassword}
                    />
                    <div className="btn-grps">
                        <Button onClick={handleLogin}>Login</Button>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                   
                </Form>

                <SignupPage
                    show={props.isNewUser}
                    onClose={handleClose}
                    title="Sign-Up Page"
                    userNameSU={userNameSU}
                    passwordSU={passwordSU}
                    emailSU={emailSU}
                    confirmPasswordSU={confirmPasswordSU}
                    handleUserNameSU={handleUserNameSU}
                    handlePasswordSU={handlePasswordSU}
                    handleEmailSU={handleEmailSU}
                    handleConfirmPasswordSU={handleConfirmPasswordSU}
                    handleSignup={handleSignupSU}
                    handleReset={handleResetSU}
                />
                <ForgetPasswordPage
                    show={props.isForgetPass}
                    onClose={handleClosePass}
                    title="Forget Password"
                    userName={userName}
                    handleUsername={handleUserName}
                    handleForgetPassword={handleForgetPassAPI}
                />
                <RestoreAccountWindow
                show={props.isRestoreAcc}
                onClose={handleCloseRestorAcc}
                title="Restore your existing account"
                userName={userNameRestore}
                password={passwordRestore}
                handleUserName={handleUserNameRestore}
                handlePassword={handlePasswordRestore}
                handleResetRestore={handleResetRestore}
                restoreAccountAPI={restoreAccountAPI}
                />


            </div>
        </div>
    )

}

export default LoginPage;