import React, {useState} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import globals from "../../../service/globalStorage";
import uuid from "react-tabs/lib/helpers/uuid";
import {changeData} from "../../../service/databaseConnect";
import Track from "../../../project/Track";
import {useDispatch} from "react-redux";
import {loader} from "../../../redux/pageSlice";

export const save = (timeout, dispatch) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        changeData(
            globals.dataId,
            globals.project,
            JSON.parse(localStorage.getItem("username")),
            JSON.parse(localStorage.getItem("password")));
        dispatch(loader(Date.now()));
    }, 1000);
}
export default function TrackMenu(props) {
    let project = props.project;
    let trackList = project.trackList;
    const dispatch = useDispatch()
    const [newTrack, setNewTrack] = useState("")
    const [trackName, setTrackName] = useState(`track ${trackList.length + 1}`)
    let trackCurveList = [];
    let timeout = null;

    const addTrack = () => {
        let track = new Track(trackName, trackCurveList)
        trackList.push(track)
        save(timeout, dispatch)
        setNewTrack(" ")
    }

    const addCurveToList = (curve) => {
        trackCurveList.push(curve)
    }
    const deleteTrack = (i) => {
        trackList.splice(i, 1)
        save(timeout, dispatch)
        setNewTrack("   ")
    }

    const changeTrackName = (newName, trackIndex) => {
        trackList[trackIndex].name = newName
        save(timeout, dispatch)
        setNewTrack("   ")
    }
    const changeTrackDisplay = (isDisplayed, trackIndex) => {
        trackList[trackIndex].display = isDisplayed
        save(timeout, dispatch)
        setNewTrack("   ")
    }

    const handleTrackChange = (trackIndex, value, curve) => {
        if (value) {
            trackList[trackIndex].curveList.push(curve)
            save(timeout, dispatch)
            setNewTrack(" ")
        } else {
            let curveIndex = trackList[trackIndex].curveList.findIndex(i => i === curve)
            trackList[trackIndex].curveList.splice(curveIndex, 1)
            save(timeout, dispatch)
            setNewTrack(" ")
        }
    }

    const curveToInclude = () => {
        if (project.wellList.length === 0) {
            return <p> You have to add well data first</p>
        } else {
            return project.wellList[0].curveList.map(curve => {
                return <React.Fragment key={uuid()}>
                    <input id={`curveName-${curve.name}`}
                           type={"checkbox"}
                           name={"curveName"}
                           defaultChecked={false}
                           onChange={() => addCurveToList(curve.name)}
                    />
                    <label htmlFor={`curveName-${curve.name}`}>
                        {curve.name}
                    </label>
                </React.Fragment>
            })
        }
    }
    const curves = (track, trackIndex) => {
        if (project.wellList.length === 0) {
            return track.curveList.map(curve => {
                return <React.Fragment key={uuid()}>
                    <input type={"checkbox"}
                           name={"curveName"}
                           id={`curveName-${curve}`}
                           defaultChecked={true}
                           onChange={(e) => handleTrackChange(trackIndex, e.target.checked, curve)}
                    />
                    <label htmlFor={`curveName-${curve}`}>{curve}
                    </label>
                </React.Fragment>
            })
        } else {
            return project.wellList[0].curveList.map((curve) => {
                return <React.Fragment key={uuid()}>
                    <input id={`curveName-${curve.name}`}
                           type={"checkbox"}
                           name={"curveName"}
                           defaultChecked={track.curveList.some(it => it === curve.name)}
                           onChange={(e) => handleTrackChange(trackIndex, e.target.checked, curve.name)}
                    />
                    <label htmlFor={`curveName-${curve.name}`}>
                        {curve.name}
                    </label>
                </React.Fragment>
            })
        }
    }

    return <Tabs className={"track-menu"}>
        <TabList>
            {trackList.map((track,trackIndex) => {
                return <Tab key={uuid()} >
                    {track.name}<span>      </span>
                    <span className={"delete-track-cross"}
                    onClick={()=>deleteTrack(trackIndex)}>&#10005;</span>
                </Tab>
            })}
            <Tab>Add track +</Tab>
        </TabList>
        {trackList.map((track, trackIndex) => {
            return <TabPanel key={uuid()}>
                <label htmlFor={"track-name"}>Track name:</label>
                <input id={"track-name"}
                       type={"text"}
                       defaultValue={track.name}
                       onChange={(e) => {
                           changeTrackName(e.target.value, trackIndex)
                       }}
                />
                <div className={"track-display"}>
                    <input id={"track-display"}
                           type={"checkbox"}
                           defaultChecked={track.display}
                           onChange={(e) => {
                               changeTrackDisplay(e.target.checked, trackIndex)
                           }}
                    />
                    <label htmlFor={"track-display"}>
                        Display track
                    </label>
                </div>
                <p>Track includes next curves:</p>
                <div className={`curve-list`}>
                    {curves(track, trackIndex)}
                </div>
                <button
                    className={"delete-track-btn"}
                    type={"button"}
                    onClick={() => deleteTrack(trackIndex)}
                >
                    Delete track
                </button>
            </TabPanel>
        })}
        <TabPanel>
            <form onSubmit={addTrack}>
                <label htmlFor={"trackName"}>
                    Track name:</label>
                <input id={"trackName"}
                       type={"text"}
                       name={"trackName"}
                       defaultValue={`track ${trackList.length + 1}`}
                       onChange={(e) => setTrackName(e.target.value)}
                />

                <p>Which curves to include?</p>
                <div  className={`curve-list`}>
                    {curveToInclude()}
                </div>
                <input className={"add-track-btn"} type={"submit"} value="add track"/>
            </form>
        </TabPanel>
        <p>{newTrack}</p>
    </Tabs>
}