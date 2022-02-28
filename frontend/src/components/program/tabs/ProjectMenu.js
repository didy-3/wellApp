import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ProjectSettingsMenu from "./ProjectSettingsMenu";
import CurveMenu from "./CurveMenu";
import WellsMenu from "./WellsMenu";
import "./tabs.css"
import TrackMenu, {save} from "./TrackMenu";
import {useDispatch} from "react-redux";
import ZonesMenu from "./ZonesMenu";
export default function ProjectMenu(props) {

    const dispatch = useDispatch()
    let timeout = null;
    const handleSaveBtn = () => {
        save(timeout, dispatch)
    }
    let project = props.project;

    return <div className={"project-menu-tabs"}>
        <h2>{project.name}</h2>
        <Tabs>
            <TabList>
                <Tab>Wells</Tab>
                <Tab>Curves</Tab>
                <Tab>Tracks</Tab>
                <Tab>Common</Tab>
                <Tab>Zones</Tab>
            </TabList>

            <TabPanel>
                <WellsMenu
                    wellList={project.wellList}/>
                <button type="submit"
                        onClick={handleSaveBtn}>
                    Save Project
                </button>
            </TabPanel>

            <TabPanel>
                <CurveMenu project={project}
                />
                <button
                    onClick={handleSaveBtn}>
                    Save Project
                </button>
            </TabPanel>
            <TabPanel>
                    <TrackMenu project={project}/>
                    <button type="submit"
                            onClick={handleSaveBtn}>
                        Save Project
                    </button>
            </TabPanel>
            <TabPanel>
                <ProjectSettingsMenu/>
                <button
                    onClick={handleSaveBtn}>
                    Save Project
                </button>
            </TabPanel>
            <TabPanel>
                    <ZonesMenu project={project}/>
                    <button
                        onClick={handleSaveBtn}>
                        Save Project
                    </button>
            </TabPanel>
        </Tabs>
    </div>
}