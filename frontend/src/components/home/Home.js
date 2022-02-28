import SignIn from "../authorization/SignIn";
import SignUp from "../authorization/SignUp";
import React from "react";
import "./home.css";
import {SignOut} from "../authorization/SignOut";

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: JSON.parse(localStorage.getItem("loggedIn")),
        };
    }

    selectRender = () => {
        if (this.state.valid) {
            return <div className={"home-page"}>
                <p>Hello, {JSON.parse(localStorage.getItem("username"))}</p>
                <p>You have signed in.</p>
                <SignOut
                    updateParent={(newState) => {
                        this.setState({valid: newState})
                    }}
                />
            </div>
        }
        return <div className={"home-page"}>
            <h2> Please login</h2>
            <SignIn
                updateParent={(newState) => {
                    this.setState({valid: newState})
                }}
            />
            <h3>or sign up</h3>
            <SignUp/>
        </div>
    }

    render() {
        return <div className={"home-wrapper"}>
            {this.selectRender()}
        </div>
    }

}