import React from 'react';
import "./trackInfo.css"
import uuid from "react-tabs/lib/helpers/uuid";
import globals from "../../service/globalStorage";
import {useSelector} from "react-redux";

export default function TrackInfo(props) {
    let curveList = props.curveList

    const biggestTrack = globals.project.trackList.map(it => it.curveList.length);
    const height = Math.max(...biggestTrack) * 37 //if length 1
    const width =  useSelector((state) => state.graphics.trackWidth);
    const curveInfo = () => {
        if (curveList.length === 0) {
            return  <ul key={uuid()} className={"no-curve-info"}> <li>No curves on track</li></ul>
        } else {
            return curveList.map((curve) => {
                return <ul key={uuid()} className={"curve-info"}>
                    <li>{curve.name}</li>
                    <li className={"curve-color"}
                        style={{background: curve.color, height: parseInt(curve.lineThickness)}}>
                    </li>
                    <li className={"curve-measure"}>
                        <span>min {Math.round(curve.minValue*10)/10}</span>
                        <span>{curve.unit}</span>
                        <span>{Math.round(curve.maxValue*10)/10} max</span>
                    </li>
                </ul>
            })
        }
    }

    return <div className={"track-info-table"}
                style={{height: height, width: width}}>
        <div className={"curve-info-wrapper"}
             style={{gridTemplateRows: `repeat(${Math.max(...biggestTrack)},1fr)`}}>
            {curveInfo()}
        </div>
    </div>
}