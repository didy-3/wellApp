import React, {useEffect} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {useDispatch, useSelector} from "react-redux";
import uuid from "react-tabs/lib/helpers/uuid";
import {changeData} from "../../../service/databaseConnect";
import globals from "../../../service/globalStorage";
import {loader} from "../../../redux/pageSlice";

export default function WellsMenu(props) {
    let wellList = props.wellList;
    const dispatch = useDispatch()
    const loaded = useSelector((state) => state.graphics.value)

    function handleChange(well) {
        well.display = !well.display;
        changeData(
            globals.dataId,
            globals.project,
            JSON.parse(localStorage.getItem("username")),
            JSON.parse(localStorage.getItem("password")));
        dispatch(loader(Date.now()));
    }

    function deleteWell(wellIndex) {
        wellList.splice(wellIndex,1)
        changeData(
            globals.dataId,
            globals.project,
            JSON.parse(localStorage.getItem("username")),
            JSON.parse(localStorage.getItem("password")));
        dispatch(loader(Date.now()));
    }

    const wellToDisplay = ()=>{
        if (wellList.length === 0){
            return <p> No wells to display</p>
        }
        else{
            return wellList.map(well => {
                return <Tab key={uuid()}>{well.name}</Tab>

            })
        }
    }
    useEffect(()=>{

    },[loaded])
    return <Tabs key={uuid()} className={"well-menu"}>
        <TabList>
            <Tab>display</Tab>
            {wellToDisplay()}
        </TabList>
        <TabPanel> {wellList.map(well => {
            return <React.Fragment  key={uuid()}>
                <input
                    id={"well-display"}
                    type={"checkbox"}
                    defaultChecked={well.display}
                    onClick={() => handleChange(well)}
                />
            <label htmlFor={"well-display"}>
                {well.name}
            </label>
            </React.Fragment>
        })}
        </TabPanel>
        {wellList.map((well,i) => {
            return <TabPanel key={uuid()} className={"well-menu-tab"}>
                <p> First index: {well.firstIndexValue} m </p>
                <p> Last index: {well.lastIndexValue} m </p>
                <button id={"delete-well-btn"}
                    onClick={()=>deleteWell(i)}
                >
                    Delete Well
                </button>
            </TabPanel>
        })}
    </Tabs>
}