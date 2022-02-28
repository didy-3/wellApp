import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import drawCurve from "../../service/drawCurve";
import TrackInfo from "./TrackInfo";
import "./showTrack.css"
import globals from "../../service/globalStorage";
import {ScrollSyncPane} from 'react-scroll-sync';
import ScrollContainer from "react-indiana-drag-scroll";
import uuid from "react-tabs/lib/helpers/uuid";

export default function ShowTrack(props) {
    let projectZones = props.project.zones;
    let track = props.track;
    let well = props.well;
    let curveList = [];
    well.curveList.forEach((curve) => {
        if (track.curveList.some(it => it === curve.name)) {
            curveList.push(curve)
        }
    })
    let dpi = useSelector((state) => state.graphics.dpi);
    let scale = useSelector((state) => state.graphics.scale);
    const width = useSelector((state) => state.graphics.trackWidth);
    let deepestWell = Math.max(...globals.project.wellList.map(well => well.lastIndexValue));
    //const lowersFirstIndex = Math.min(...globals.project.wellList.map(well => well.firstIndexValue));
    const depthStart = useSelector((state) => state.graphics.depthStart);
    const showedWellStart = depthStart===0? 0: (depthStart * ((dpi * 0.39) / (scale.m / scale.cm)));
    let height = (deepestWell * ((dpi * 0.39) / (scale.m / scale.cm)) + dpi) - showedWellStart;
    let gridSize = useSelector((state) => state.graphics.gridSize)
    let zonesChange = useSelector((state) => state.graphics.zones)
    let wellZones = [];
    if (projectZones.length > 0) {
        wellZones = projectZones.flatMap(zone => {
            if (zone[`well<${well.name}>top`] === undefined) {
                return []
            }
            return [{
                zoneName: zone.zoneName,
                top: zone[`well<${well.name}>top`],
                bot: zone[`well<${well.name}>bot`],
                display: zone.display,
                color: zone.color
            }]
        })
    }

    const drawNet = (x, y) => {
        x = ((width) / 100) * x
        y = ((dpi * 0.39) * y) / (scale.m / scale.cm);
        let netWidth = x;
        let netHeight = y;
        let res = [];
        //horizontal lines
        for (let i = 0; i < height / y; i++) {
            res[i] = <line x1={0} y1={netHeight} x2={width} y2={netHeight} stroke="gray" strokeWidth={1} key={uuid()}/>
            netHeight += y
        }
        //vertical lines
        for (let i = 0; i < width / x; i++) {
            res.push(<line x1={netWidth} y1={height} x2={netWidth} y2={0} stroke="gray" strokeWidth={1} key={uuid()}/>)
            netWidth += x
        }
        return res.map(it => it)
    }
    const drawZones = (wellZones) => {
        return wellZones.map(zone => {
            if (!zone.display) return "";
            let x = ((dpi * 0.39) * zone.bot) / (scale.m / scale.cm)
            let y = ((dpi * 0.39) * zone.top) / (scale.m / scale.cm)
            return <rect x={0} y={y} width={width} height={x - y}
                         fill={`rgba(${zone.color.r}, ${zone.color.g}, ${zone.color.b}, ${zone.color.a})`}
                         key={uuid()}/>
        })
    }

    useEffect(() => {

    }, [dpi, scale, gridSize, zonesChange]);

    return <div className={"show-track"}>
        <div className={"track-name"}>
            {track.name}
        </div>
        <TrackInfo
            well={well}
            track={track}
            curveList={curveList}
        />
        <ScrollSyncPane group="vertical">
            <ScrollContainer className="scroll-container">
                <svg xmlns="http://www.w3.org/2000/svg" style={{width: width, height: height}}>
                    {drawNet(gridSize.y, gridSize.x)}
                    {drawZones(wellZones)}
                    {curveList.map(curve => {
                        return drawCurve(well, width, curve)
                    })}
                </svg>
            </ScrollContainer>
        </ScrollSyncPane>
    </div>

}
