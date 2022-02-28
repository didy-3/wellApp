import React from "react";
import "./authorization.css"
import {createAccount, getAccount} from "../../service/databaseConnect";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "anonymous",
            password: "",
            email:"",
            valid: false,
            account: {},
            message: ""
        };
    }


    handleSubmit(e) {
        e.preventDefault()
        createAccount(
            this.state.username,
            this.state.password,
            this.state.email,
            (arg) => {
                this.onSuccessSignUp(arg)
            })
    }

    onSuccessSignUp(res) {
        if (res.error === null){
            this.setState({message: "You have successfully signed up!"})
            return getAccount(
                this.state.username,
                this.state.password,
                (arg) => {
                    this.onSuccessGetAccount(arg)
                })
        }
       this.setState({message: res.error})
    }
    onSuccessGetAccount(res) {
        this.setState({account: res})
        this.setState({valid: true})
        localStorage.clear()
        for (let [key, value] of Object.entries(this.state.account)) {
            localStorage.setItem(key, JSON.stringify(value))
        }
        localStorage.setItem("loggedIn", this.state.valid)
    }
    chooseRender = () => {
        if (this.state.valid) {
            return
        }
        return <form className={"sign-up"}>
            <label htmlFor="username">
                Username:
                <input
                    type="text"
                    name="username"
                    placeholder={"username"}
                    onChange={(e) => this.setState({username: e.target.value})}/>
            </label>
            <label htmlFor="email">
                Email:
                <input
                    type="email"
                    name="email"
                    placeholder={"email"}
                    onChange={(e) => this.setState({email: e.target.value})}/>
            </label>
            <label htmlFor="password">
                Password:
                <input
                    type="password"
                    name="password"
                    placeholder="Enter a password"
                    onChange={(e) => this.setState({password: e.target.value})}/>
            </label>
            <input
                onClick={(e) => this.handleSubmit(e)}
                type="submit"
                value="Sign up"/>
        </form>;
    }

    render() {
        return <div className={"sign-up"}>
            {this.chooseRender()}
            <p>{this.state.message}</p>
        </div>
    }

}
