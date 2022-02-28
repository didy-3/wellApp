import globals from "../service/globalStorage";
import ProjectMenu from "./program/tabs/ProjectMenu";
import SignIn from "./authorization/SignIn";
import React, {useEffect, useState} from "react";
import FileInput from "./fileInput/FileInput";
import {getDataById} from "../service/databaseConnect";
import ShowProject from "./program/ShowProject";
import {useSelector, useDispatch} from 'react-redux'
import { loader} from "../redux/pageSlice";
import "./graphics.css"
import onSuccessGetData from "./program/onSuccessGetData";
import {NotificationContainer} from 'react-notifications';

export default function Graphics() {
    const loaded = useSelector((state) => state.graphics.value)
    const dispatch = useDispatch()
    const [page, setPage] = useState(<p>Loading</p>);
    const stateDefiner = () => {
        if (loaded !== null) {
            return <>
                <ProjectMenu
                    project={globals.project}
                />
                <ShowProject
                    project={globals.project}/>
            </>
        } else {
            return <p>Loading</p>
        }
    }

    const selectRender = () => {
        if (JSON.parse(localStorage.getItem("loggedIn")) &&
            (globals.project === "none") &&
            (JSON.parse(localStorage.getItem("dataIds")).length > 0)) {
            getDataById(
                JSON.parse(localStorage.getItem("dataIds"))[0],
                JSON.parse(localStorage.getItem("username")),
                JSON.parse(localStorage.getItem("password")),
                (arg) => {
                    onSuccessGetData(arg)
                    setPage(stateDefiner())
                })
            dispatch(loader(Date.now()))
        }
        else if ((JSON.parse(localStorage.getItem("loggedIn"))) &&
            JSON.parse(localStorage.getItem("dataIds")).length === 0) {
            setPage(<div style={{margin: "0 auto"}}>
                <p style={{textAlign: "center"}}>You don't have any projects.</p>
                <FileInput/>
            </div>)

        } else if (JSON.parse(localStorage.getItem("loggedIn"))) {
            setPage(stateDefiner())

        }else if (!JSON.parse(localStorage.getItem("loggedIn"))){
            setPage(<div className={"well-page"}>
                <h3>
                    Please sign in to see your graphics.
                </h3>
                <SignIn
                    updateParent={() => {dispatch(loader(Date.now()))}}
                   />
                <h4>
                    or <a href={"/"}>sign up</a>
                </h4>
            </div>)
        }
    }
    useEffect(() => {
        selectRender()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {

        selectRender()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globals.project])


    return <div className={"graphics"}>
        {page}
        <NotificationContainer/>
    </div>
}
