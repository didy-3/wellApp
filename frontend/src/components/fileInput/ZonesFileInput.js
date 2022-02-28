import React, {useCallback, useState} from "react";
import "./fileInput.css";
import {useDropzone} from 'react-dropzone';
import XLSX from 'xlsx';
import globals from "../../service/globalStorage";
import {changeData, getDataById} from "../../service/databaseConnect";
import onSuccessGetData from "../program/onSuccessGetData";
import {useDispatch} from "react-redux";
import {loader} from "../../redux/pageSlice";

export default function ZonesFileInput(props) {
    const dispatch = useDispatch()
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
                const reader = new FileReader()
                reader.readAsBinaryString(file)
                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = (e) => {
                    // Do whatever you want with the file contents
                    let data = e.target.result;
                    let workbook = XLSX.read(data, {type: "binary"});
                    //console.log(workbook);
                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
                    if ((JSON.parse(localStorage.getItem("loggedIn"))) &&
                        (globals.project === "none") &&
                        (JSON.parse(localStorage.getItem("dataIds")).length>0)) {
                        getDataById(
                            JSON.parse(localStorage.getItem("dataIds"))[0],
                            JSON.parse(localStorage.getItem("username")),
                            JSON.parse(localStorage.getItem("password")),
                            (arg) => {
                                onSuccessGetData(arg)
                                addZonesToProject(rowObject)
                            })
                    }
                    if (globals.project !== "none") {
                        addZonesToProject(rowObject)
                    }

                }
            }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function addZonesToProject(rowObject) {
        globals.project.zones = rowObject;
        globals.project.zones.forEach(zone => {
            zone.display = true
            zone.color = randomRgba(0.2)
        })
        changeData(
            globals.dataId,
            globals.project,
            JSON.parse(localStorage.getItem("username")),
            JSON.parse(localStorage.getItem("password")))
        dispatch(loader(Date.now()))
        setPageRender(<div>Zones saved to {globals.project.name}</div>)
    }

    const {getRootProps, getInputProps} = useDropzone({onDrop})
    const [pageRender, setPageRender] = useState(<div {...getRootProps({className: 'drop-zone'})}>
        <input {...getInputProps()} accept=".xls,.xlsx"/>
        You can load well's zones here <br/>
        File format must be xls, xlsx
    </div>)

    const randomRgba = (transparency) => {
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        return {r: r, g: g, b: b, a: transparency};
    }

    return <React.Fragment>
        {pageRender}
    </React.Fragment>
}