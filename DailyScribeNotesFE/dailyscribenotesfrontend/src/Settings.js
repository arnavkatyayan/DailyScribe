import React from "react";
import ReactSwitch from "react-switch";
import {useState, useEffect} from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

function Settings(props) {
    const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);    
    const settingsOptions = [
        { name: "Change Password", button: "Change" },
        { name: "Delete Journals", button: "Delete" },
        { name: "Export Data", button: "Export" }
    ];

    return (
        <div className="settings-page">
            <h3>Settings</h3>
            <div className="settings-box">
            {settingsOptions.map((setting)=>
            <>
            <div className="settings-options">
                <h5 className="setting-name">{setting.name}</h5>
                <Button className="setting-button">{setting.button}</Button>

                </div>
            <hr style={{ border: '1px solid #ccc' }} />
                </>
            )}
            <Button className="del-acc">Delete account</Button>
            </div>
        </div>
    )
}
export default Settings;