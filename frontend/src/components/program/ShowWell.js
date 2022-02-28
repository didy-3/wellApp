import React, {useEffect, useState} from 'react';
import "./showTrack.css"
import uuid from "react-tabs/lib/helpers/uuid";
import ShowTrack from "./ShowTrack";
import {useSelector} from "react-redux";
import globals from "../../service/globalStorage";
import {ScrollSyncPane} from 'react-scroll-sync';
import ScrollContainer from "react-indiana-drag-scroll";

export default function ShowWell(props) {
    const [tracks, setTracks] = useState(<p>Loading</p>);
    let well = props.well;
    let trackList = props.project.trackList;
    let dpi = useSelector((state) => state.graphics.dpi);
    let scale = useSelector((state) => state.graphics.scale);
    let rulerWidth = 50;
    let deepestWell = Math.max(...globals.project.wellList.map(well => well.lastIndexValue));
    const trackListsLengthArr = globals.project.trackList.map(it => it.curveList.length);
    //const lowersFirstIndex = Math.min(...globals.project.wellList.map(well => well.firstIndexValue));

    const depthStart = useSelector((state) => state.graphics.depthStart);
    const showedWellStart = depthStart===0? 0: (depthStart * ((dpi * 0.39) / (scale.m / scale.cm)));
    let height = trackListsLengthArr.length === 0 ?
        1000 :
        (deepestWell * ((dpi * 0.39) / (scale.m / scale.cm)) + dpi) - showedWellStart;
    const depthHeight = trackListsLengthArr.length === 0 ? height : (Math.max(...trackListsLengthArr) * 37 + 20)//20 is track name height

    const check = () => {
        if (props.well !== '') {
            setTracks(<>
                <h2 className={"well-name"}>{well.name}</h2>
                <div className={"well-wrapper"}>
                    {trackList.map((track) => {
                        if (track.display) {
                            return <ShowTrack key={uuid()} well={well} track={track} project={props.project}/>
                        } else
                            return "";
                    })}
                </div>
            </>)
        }
    }

    const drawSmallRisks = () => {
        let y = 0
        let res = [];
        for (let i = 0; i < height / ((dpi * 0.39) / 5); i++) {
            res[i] = <line x1={50} y1={y} x2={50 - 10} y2={y} stroke="black" key={uuid()}/>
            y += (dpi * 0.39) / 5
        }
        return res.map(it => it)
    }
    const drawDepthRuler = () => {
        let niceConst = 5;
        let counter = depthStart;
        let y = 0
        let res = [];
        res[0] = <React.Fragment key={uuid()}>
            <line x1={50} y1={y} x2={50 - 15} y2={y} stroke="black"/>
            <text textAnchor="end" x={50 - 15} y={y + 3} fontSize="10px">{counter}</text>
        </React.Fragment>
        for (let i = 1; i < height / (dpi * 0.39); i++) {
            if (Math.round((scale.m / scale.cm)) % niceConst !== 0) {
                counter += niceConst * (Math.round((scale.m / scale.cm) / niceConst))
                y += (dpi * 0.39) * niceConst * (Math.round((scale.m / scale.cm) / niceConst)) / (Math.round((scale.m / scale.cm)))
            } else {
                y += (dpi * 0.39)
                counter += (Math.round((scale.m / scale.cm) * 10)) / 10;
            }
            res[i] = <React.Fragment key={uuid()}>
                <line x1={50} y1={y} x2={50 - 15} y2={y} stroke="black"/>
                <text textAnchor="end" x={50 - 15} y={y + 3} fontSize="10px">{counter}</text>
            </React.Fragment>
        }
        return res.map(it => it)
    }
    useEffect(() => {
        check()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return <div className={"show-well"}>
        <div className={"depth-ruler"}>
            <div className={"curve-depth"} style={{height: depthHeight}}>
                MD<br/>
                {well.lastIndexValue}
            </div>
            <ScrollSyncPane group="vertical">
                <ScrollContainer className={"depth-ruler-scroll scroll-container"}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{width: rulerWidth, height: height}}>
                        {drawDepthRuler()}
                        {drawSmallRisks()}
                    </svg>
                </ScrollContainer>
            </ScrollSyncPane>
        </div>
        {tracks}
    </div>
}
