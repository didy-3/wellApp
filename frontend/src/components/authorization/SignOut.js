import React from "react";
import globals from "../../service/globalStorage";

export function SignOut(props) {
    const handleClick = (globals) => {
        globals = {
            project: "",
            dataId: ""
        }
        localStorage.clear();
        let account = {
            username: "anonymous",
            password: "",
            email: "",
            userId: null,
            createdOn: null,
            dataIds: [],
            loggedIn: false
        }

        for (let [key, value] of Object.entries(account)) {
            localStorage.setItem(key, JSON.stringify(value))
        }
        props.updateParent(JSON.parse(localStorage.getItem("loggedIn")))
    }
    return <button className={"sign-out-btn"}
        onClick={() => handleClick(globals)}>
        Sign out
    </button>

}