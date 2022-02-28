import React from 'react';

import {ScrollSyncPane} from 'react-scroll-sync';
import ScrollContainer from "react-indiana-drag-scroll";
import {useSelector} from "react-redux";
import globals from "../../service/globalStorage";
import uuid from "react-tabs/lib/helpers/uuid";

export default function ZonesConnector(props) {
    let width = useSelector((state) => state.graphics.spaceBetweenWells);
    let firstWell = props.firstWell;
    let secondWell = props.secondWell;
    let projectZones = props.project.zones;
    let dpi = useSelector((state) => state.graphics.dpi);
    let scale = useSelector((state) => state.graphics.scale);
    let deepestWell = Math.max(...globals.project.wellList.map(well => well.lastIndexValue));
    const trackListsLengthArr = globals.project.trackList.map(it => it.curveList.length);
    let height = trackListsLengthArr.length===0 ? 1000 : deepestWell * ((dpi * 0.39) / (scale.m / scale.cm)) + dpi;
    const marginTop = trackListsLengthArr.length===0 ? 50 : Math.max(...trackListsLengthArr) * 37 + 20 + 50;//50 well-name height, 20 track-name height
    let firstWellZones = [];
    let secondWellZones = [];

    const getWellZones = (well) =>{
        return projectZones.flatMap(zone => {
            if (well ===undefined){
                return []
            }
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
    if (projectZones.length > 0) {
        firstWellZones = getWellZones(firstWell);
        secondWellZones = getWellZones(secondWell);
    }

    const drawLine = (y1top,y2top,y1bot,y2bot, zone) => {
        y1top = ((dpi * 0.39) * y1top) / (scale.m / scale.cm)
        y2top = ((dpi * 0.39) * y2top) / (scale.m / scale.cm)
        y1bot = ((dpi * 0.39) * y1bot) / (scale.m / scale.cm)
        y2bot = ((dpi * 0.39) * y2bot) / (scale.m / scale.cm)
        return <>
            <text textAnchor="start" x={0} y={y1top-2} fontSize="12px">{zone.zoneName} top</text>
            <text textAnchor="end" x={100} y={y2top-2} fontSize="12px">{zone.zoneName} top</text>
            <line x1={0} y1={y1top} x2={width*0.3} y2={y1top} stroke="black"/>
            <line x1={width-(width*0.3)} y1={y2top} x2={width} y2={y2top} stroke="black"/>
            <line x1={width*0.3} y1={y1top} x2={width-(width*0.3)} y2={y2top} stroke="black"/>
            <line x1={width*0.3} y1={y1bot} x2={width-(width*0.3)} y2={y2bot} stroke="black"/>
        </>
    }

    const drawConnections = ()=>{
        if (firstWellZones.length !== 0 && secondWellZones.length !==0) {
            return firstWellZones.map((zone, i) => {
                return <React.Fragment key={uuid()}>
                    {drawLine(zone.top, secondWellZones[i].top, zone.bot, secondWellZones[i].bot, zone)}
                </React.Fragment>
            })
        }
        else return
    }

    return <div style={{marginTop: marginTop}} >
        <ScrollSyncPane group="vertical">
            <ScrollContainer className="zones-connector scroll-container">
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} style={{overflow: "auto"}}>
                    {drawConnections()}
                </svg>
            </ScrollContainer>
        </ScrollSyncPane>
    </div>
}