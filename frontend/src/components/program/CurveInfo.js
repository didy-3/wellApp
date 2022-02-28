import React from 'react';
import "./trackInfo.css"
import uuid from "react-tabs/lib/helpers/uuid";

export default function CurveInfo(props) {
    let width = 400;
    let well = props.well
    let curveList = well.curveList;
    let step = well.step
    let curve = props.curve;

    const curveInfo = (curve) => {
        return <ul>
            <li>{curve.name}</li>
            <li style={{background: curve.color}}>{curve.color}</li>
            <li>min {curve.minValue} {curve.unitment} {curve.maxValue} max</li>
        </ul>
    }

    return <div className={"curveInfoTable"}
                style={{width: width}}>
        <ul key={uuid()}>
            <li>
                MD
            </li>
            <li>
                {step * curveList[0].value.length}
            </li>
        </ul>
        <ul  key={uuid()}>
            <li>
                Step
            </li>
            <li>
                {props.step}
            </li>
        </ul>
        <div className={"curveInfo"}>
            {curveInfo(curve)}
        </div>
    </div>
}