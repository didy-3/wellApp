import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import uuid from "react-tabs/lib/helpers/uuid";
import {useDispatch} from "react-redux";
import {changeData} from "../../../service/databaseConnect";
import globals from "../../../service/globalStorage";
import {loader} from "../../../redux/pageSlice";

export default function CurveMenu(props) {
    const dispatch = useDispatch();
    let project = props.project;
    let wellList = props.project.wellList;
    let curveList = wellList.length !== 0 ? wellList[0].curveList : [];
    let timeout = null;
    const save = (changes) => {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            changes()
            changeData(
                globals.dataId,
                globals.project,
                JSON.parse(localStorage.getItem("username")),
                JSON.parse(localStorage.getItem("password")));
            dispatch(loader(Date.now()));
        }, 1000);
    }
    const handleBoundariesChange = (e, index, curveName) => {
        save(()=>{
            wellList.forEach((it) => {
                it.curveList.forEach((curve) => {
                    if (curve.name === curveName) {
                        curve.boundaries[index] = parseInt(e.target.value)
                    }
                })
            })
        })
    }

    const handleLineChange = (curveName, e) => {
        save(()=>{
            wellList.forEach((it) => {
                it.curveList.forEach((curve) => {
                    if (curve.name === curveName) {
                        curve.lineThickness = e.target.value
                    }
                })
            })
        })
    }

    function handleNameChange(curveName, e) {
        save(()=>{
            project.trackList.forEach(track=>{
                let copy = track.curveList.slice()
                 copy.forEach((curve,i) =>{
                    if (curve.match(curveName)){
                        track.curveList[i] = e.target.value
                    }
                })
            })
            wellList.forEach((it) => {
                it.curveList.forEach((curve) => {
                    if (curve.name === curveName) {
                        curve.name = e.target.value
                    }
                })
            })
        })
    }

    function handleUnitChange(curveName, e) {
        save(()=>{
            wellList.forEach((it) => {
                it.curveList.forEach((curve) => {
                    if (curve.name === curveName) {
                        curve.unit = e.target.value
                    }
                })
            })
        })
    }

    function handleDescriptionChange(curveName, e) {
        setTimeout(function () {
            wellList.forEach((it) => {
                it.curveList.forEach((curve) => {
                    if (curve.name === curveName) {
                        curve.description = e.target.value
                    }
                })
            })
            changeData(
                globals.dataId,
                globals.project,
                JSON.parse(localStorage.getItem("username")),
                JSON.parse(localStorage.getItem("password")));
        }, 10000);
    }

    function handleColorChange(curveName, e) {
        save(()=>{
            wellList.forEach((it) => {
                it.curveList.forEach((curve) => {
                    if (curve.name === curveName) {
                        curve.color = e.target.value
                    }
                })
            })
        })
    }

    return <Tabs key={uuid()} className={"curve-menu"}>
        <TabList key={uuid()}>
            <Tab>Common</Tab>
            {curveList.map(curve => {
                return <Tab key={uuid()}>{curve.name}</Tab>
            })}
        </TabList>
        <TabPanel>
            <label htmlFor={"nullValue"}>nullValue </label>
            <input id={"nullValue"} type={"text"} defaultValue={-999.25}/>
        </TabPanel>
        {curveList.map(curve => {
            return <TabPanel key={uuid()}>

                <label htmlFor={"curve-name"}>Name</label>
                <input
                    id={"curve-name"}
                    type="text"
                    name="curve-name"
                    defaultValue={curve.name}
                    onChange={(e) =>
                        handleNameChange(curve.name, e)
                    }/>

                <label htmlFor={"curve-measurement"}>unit</label>
                <input
                    id={"curve-measurement"}
                    type="text"
                    name="curve-measurement"
                    defaultValue={curve.unit}
                    onChange={(e) =>
                        handleUnitChange(curve.name, e)
                    }/>

                <label htmlFor={"curve-description"}>Description</label>
                <input
                    id={"curve-description"}
                    type="text"
                    name="curve-description"
                    defaultValue={curve.description}
                    onChange={(e) =>
                        handleDescriptionChange(curve.name, e)
                    }/>

                <label htmlFor={"curve-color"}>Color</label>
                <input
                    id={"curve-color"}
                    type="color"
                    name="curve-color"
                    defaultValue={curve.color}
                    onChange={(e) =>
                        handleColorChange(curve.name, e)
                    }/>

                <label htmlFor={"lineThickness"}>Line thickness</label>
                <input
                    id={"lineThickness"}
                    type="number"
                    min={1}
                    defaultValue={curve.lineThickness}
                    onChange={(e) => {
                        handleLineChange(curve.name, e)
                    }}
                />

                <label htmlFor={"boundaries-min"}>Boundary min </label>
                <input
                    id={"boundaries-min"}
                    type="number"
                    defaultValue={curve.boundaries[0]}
                    onChange={(e) => {
                        handleBoundariesChange(e, 0, curve.name)
                    }}
                />

                <label htmlFor={"boundaries-max"}>Boundary max</label>
                <input
                    id={"boundaries-max"}
                    type="number"
                    defaultValue={curve.boundaries[1]}
                    onChange={(e) => {
                        handleBoundariesChange(e, 1, curve.name)
                    }}
                />

            </TabPanel>
        })}
    </Tabs>

}