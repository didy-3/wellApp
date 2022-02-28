import React from 'react';
import {checkLogin, getAccount, getDataById} from "../../service/databaseConnect";
import globals from "../../service/globalStorage";

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "def",
            password: "def",
            valid: false,
            account: {},
            defProject: {},
            status: ""
        };
    }

    message = {
        loading: 'img/spinner.svg',
        success: 'Welcome!',
        failure: 'Wrong username or password.'
    };

    onSuccessLogin(res) {
        this.setState({valid: res})
        if (this.state.valid) {
            this.setState({status: this.message.success})
            return getAccount(
                this.state.username,
                this.state.password,
                (arg) => {
                    this.onSuccessGetAccount(arg)
                })
        }
        else return this.setState({status: this.message.failure})
    }

    onSuccessGetAccount(res) {
        this.setState({account: res})
        localStorage.clear()
        for (let [key, value] of Object.entries(this.state.account)) {
            localStorage.setItem(key, JSON.stringify(value))
        }
        localStorage.setItem("loggedIn", JSON.stringify(this.state.valid))
        globals.dataId = JSON.parse(localStorage.getItem("dataIds"))[0];
        getDataById(
            globals.dataId,
            JSON.parse(localStorage.getItem("username")),
            JSON.parse(localStorage.getItem("password")),
            (arg) => {
                this.onSuccessGetData(arg)
            })
    }

    onSuccessGetData(res) {
        this.setState({defProject: res})
        globals.project = this.state.defProject;
        this.props.updateParent(JSON.parse(localStorage.getItem("loggedIn")))
        console.log("success")
    }

    handleSubmit(e) {
        e.preventDefault()
        checkLogin(
            this.state.username,
            this.state.password,
            (arg) => {
                this.onSuccessLogin(arg)
            })
    }

    chooseRender = () => {
        if (this.state.valid) {
            return
        }
        return <form>
            <label htmlFor="username">
                Username:
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder={"username"}
                    onChange={(e) => this.setState({username: e.target.value})}/>
            </label>
            <label htmlFor="password">
                Password:
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder={"password"}
                    onChange={(e) => this.setState({password: e.target.value})}/>
            </label>
            <input
                onClick={(e) => this.handleSubmit(e)}
                type="submit"
                value="Sign in"/>
        </form>
    }

    render() {
        return <div className={"sign-in"}>
            {this.chooseRender()}
            <p>{this.state.status}</p>
        </div>

    }
}
