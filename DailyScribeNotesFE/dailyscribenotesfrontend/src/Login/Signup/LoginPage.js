import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isNewUser, setIsNewUser] = useState(false);

    const handleNewUser = () => {
        setIsNewUser(!isNewUser);
    }

    const handleUserName = (evt) => {
        setUserName(evt.target.value);
    }

    const handlePassword = (evt) => {
        setPassword(evt.target.value);
    }

    const handleLogin = async () => {
        const loginBody = {
            userName: userName.trim(),
            password: password.trim()
        };

        try {
            const response = await axios.post("http://localhost:9090/dailyScribe-login/login", loginBody);
            if (response.data === true) {
                console.log("Login Succesful");
            }
            else {
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

    return (
        <div className="login-page">
            <h1>Login / Signup</h1>
            <div className="login-modal">
                <Form>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={userName}
                        onChange={handleUserName}
                        style={{ width: '15vw' }}
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        style={{ width: '15vw' }}
                        value={password}
                        onChange={handlePassword}
                    />
                    <div className="btn-grps">
                        <Button onClick={handleLogin}>Login</Button>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                    <div className="signup-validation">
                        <p><b>Don't have an account ? </b></p>
                        <Form.Check
                            checked={isNewUser}
                            onChange={handleNewUser}
                            className="new-user-check"
                        />
                    </div>
                </Form>


            </div>
        </div>
    )

}

export default LoginPage;