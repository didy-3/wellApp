import React, {useEffect, useState} from 'react';
import uuid from "react-tabs/lib/helpers/uuid";
import {changeData} from "../../../service/databaseConnect";
import globals from "../../../service/globalStorage";
import "./tabs.css"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {save} from "./TrackMenu";
import {useDispatch} from "react-redux";
import {SketchPicker} from 'react-color';
import {zonesChange} from "../../../redux/pageSlice";
import ZonesFileInput from "../../fileInput/ZonesFileInput";

export default function ZonesMenu(props) {
    let project = props.project
    const dispatch = useDispatch();
    let timeout = null;
    const [colorPicker, setColorPicker] = useState(null)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [zonesTab, setZonesTab] = useState(null)

    function deleteAllZones() {
        project.zones = {};
        changeData(
            globals.dataId,
            globals.project,
            JSON.parse(localStorage.getItem("username")),
            JSON.parse(localStorage.getItem("password")))
        dispatch(zonesChange(Date.now()));
        checkZones()
    }


    function makeTabList() {
        if (project.zones === undefined) return [];
        if (project.zones.length > 0) {
            return project.zones.map((zone) => {
                return <Tab key={uuid()}>
                    {zone.zoneName}
                </Tab>
            })
        } else return []
    }

    function handleColorChange(zone, color) {
        zone.color = color.rgb;
        onTogglePicker(zone);
        save(timeout, dispatch);
    }

    function toggleZoneDisplay(zone) {
        zone.display = !zone.display;
        changeData(
            globals.dataId,
            globals.project,
            JSON.parse(localStorage.getItem("username")),
            JSON.parse(localStorage.getItem("password")))
        dispatch(zonesChange(Date.now()));
    }

    function hideColorPicker() {
        setColorPicker(false)
        onTogglePicker()
    }

    function checkZones() {
        if (project.zones === undefined) return setZonesTab(<>
            <p> Please load zones</p>
            <div style={{width: "100%"}}><ZonesFileInput/></div>
        </>);
        if (project.zones.length > 0) {
            return setZonesTab(<>
                <p>Select zones to display</p>
                {project.zones.map((zone, i) => {
                        return <React.Fragment key={uuid()}>
                            <input
                                id={`${zone.zoneName}-display`}
                                type="checkbox"
                                defaultChecked={zone.display}
                                onChange={() => toggleZoneDisplay(zone)}
                            />
                            <label htmlFor={`${zone.zoneName}-display`}>
                                {zone.zoneName}
                            </label>
                        </React.Fragment>
                    }
                )}
            </>)

        } else return setZonesTab(<p> Please load zones</p>)
    }

    const onTogglePicker = (zone) => {
        setPickerVisible(!pickerVisible)
        if (!pickerVisible) {
            setColorPicker(                <SketchPicker
                    color={`rgba(${zone.color.r}, ${zone.color.g}, ${zone.color.b}, ${zone.color.a})`}
                    onClick={hideColorPicker}
                    onChange={(e) =>
                        handleColorChange(zone, e)}/>
          )
        } else setColorPicker(null)
    }

    function makeZonesTabPanel() {
        if (project.zones === undefined) return [];
        if (project.zones.length > 0) {
            return project.zones.map((zone) => {
                return <TabPanel key={uuid()}  className={"zone-color"}>
                    <p>Color:</p>
                    <div className={"zone-color-input"} onClick={() => onTogglePicker(zone)}
                         style={{
                             width: '60px',
                             height: '25px',
                             backgroundColor: `rgba(${zone.color.r}, ${zone.color.g}, ${zone.color.b}, ${zone.color.a})`,
                             border: '1px solid grey'
                         }}/>
                    {colorPicker}
                </TabPanel>
            })
        } else return []
    }

    useEffect(() => {
        checkZones()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <Tabs className={"zones-menu"}>
        <TabList>
            <Tab>Common</Tab>
            {makeTabList()}
        </TabList>

        <TabPanel key={uuid()}>
            {zonesTab}
            <button className={"delete-zones-btn"} onClick={deleteAllZones}>
                Delete all zones
            </button>
        </TabPanel>
        {makeZonesTabPanel()}
    </Tabs>
}