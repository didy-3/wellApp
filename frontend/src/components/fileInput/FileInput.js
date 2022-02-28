import React, {useCallback, useState} from "react";
import "./fileInput.css";
import {useDropzone} from 'react-dropzone';
import Well from "../../project/Well";
import Curve from "../../project/Curve";
import parseLas from "../parseLas";
import globals from "../../service/globalStorage";
import {changeData, getDataById, saveData} from "../../service/databaseConnect";
import Project from "../../project/Project";
import Track from "../../project/Track";
import SignUp from "../authorization/SignUp";
import ZonesFileInput from "./ZonesFileInput";
import {useDispatch} from "react-redux";
import {loader} from "../../redux/pageSlice";
import {NotificationManager} from "react-notifications";

export default function FileInput(props) {
    const dispatch = useDispatch()
    let timeout = null;
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                checkCurrentProject(reader.result)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const {getRootProps, getInputProps} = useDropzone({onDrop})
    const [wellInput, setWellInput] = useState(<div {...getRootProps({className: 'drop-zone'})}>
            <input {...getInputProps()} accept=".las"/>
            Drag file here or choose one on click<br/>
            File format must be LAS
        </div>
    );

    function askProjectName() {
        setWellInput(<>
            <div {...getRootProps({className: 'drop-zone'})}>
                <input {...getInputProps()} accept=".las"/>
                Drag file here or choose one on click<br/>
                File format must be LAS
            </div>
            <div className={"modal"}>
                <div className={"modal-content"}>
                    <label>
                        Enter project name
                        <input onChange={(e) => saveNewProject(e.target.value)} type={"text"}/>
                    </label>
                </div>
            </div>
        </>)
    }

    function saveNewProject(name) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            globals.project.name = name;
            saveData(
                JSON.parse(localStorage.getItem("username")),
                JSON.parse(localStorage.getItem("password")),
                globals.project.name,
                globals.project,
                (res) => {
                    console.log(globals.project)
                    global.dataId = res;
                    localStorage.setItem("dataIds", JSON.stringify([res]))
                    dispatch(loader(Date.now()))
                    return NotificationManager.success('Project saved', "", 2000)
                });

            setWellInput(<>
                <div {...getRootProps({className: 'drop-zone'})}>
                    <input {...getInputProps()} accept=".las"/>
                    Drag file here or choose one on click<br/>
                    File format must be LAS
                </div>
                <p>Data saved</p>
            </>)
        }, 3000);
    }

    const checkCurrentProject = (file) => {
        console.log(globals.project)
        if ((JSON.parse(localStorage.getItem("loggedIn"))) &&
            (globals.project === "none") &&
            (JSON.parse(localStorage.getItem("dataIds")).length === 0)) {
            globals.project = new Project()
            addFileToGlobalProject(file)
            askProjectName()
        } else if ((JSON.parse(localStorage.getItem("loggedIn"))) &&
            (globals.project === "none")) {
            getDataById(
                JSON.parse(localStorage.getItem("dataIds"))[0],
                JSON.parse(localStorage.getItem("username")),
                JSON.parse(localStorage.getItem("password")),
                (arg) => {
                    globals.project = arg;
                    addAndSaveFileToCurrentProject(file)
                })
        } else if (JSON.parse(localStorage.getItem("loggedIn"))) {
            addAndSaveFileToCurrentProject(file)
        } else if (!(JSON.parse(localStorage.getItem("loggedIn")))) {
            setWellInput(<SignUp/>)
        }
    }

    const addAndSaveFileToCurrentProject = (file) =>{
        addFileToGlobalProject(file)
        changeData(
            globals.dataId,
            globals.project,
            JSON.parse(localStorage.getItem("username")),
            JSON.parse(localStorage.getItem("password")));
        dispatch(loader(Date.now()))
        setWellInput(<>
            <div {...getRootProps({className: 'drop-zone'})}>
                <input {...getInputProps()} accept=".las"/>
                Drag file here or choose one on click<br/>
                File format must be LAS
            </div>
            <p>Data saved</p>
        </>)
    }
    function addFileToGlobalProject(file) {
        Project.initiateProject(globals.project)
        let well = parseLas(file)
        globals.project.wellList.push(well)
        globals.dataId = JSON.parse(localStorage.getItem("dataIds"))[0];
        globals.project.trackList.forEach(track => {
            Track.initiateTrack(track, globals.project.wellList[0])
        })
        globals.project.wellList.forEach(well => {
            Well.initiateWell(well)
            well.curveList.forEach(curve => {
                Curve.initiateCurve(curve)
            })
        })
    }

    return <div className="fileInput">
        <p> Load your well/project file here </p>
        {wellInput}
        <ZonesFileInput/>
    </div>;


}