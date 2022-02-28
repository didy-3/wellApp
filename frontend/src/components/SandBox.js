import React from 'react';
import "./sandBox.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default function SandBox() {
    function foo() {
        return NotificationManager.success('Saved',"",1000);
    }

    return <>
        <button style={{width: "500px", margin: "0 auto", marginTop: "30%"}}
                onClick={foo}>
            nothing here
        </button>
        <NotificationContainer/>
    </>
}
