import store from "../redux/store";
import React from "react";
import uuid from "react-tabs/lib/helpers/uuid";

export default function drawCurve(well, width, curve) {
    let scale = store.getState().graphics.scale
    let canvasMinX = 0;
    let canvasMaxX = width;
    let dpi = store.getState().graphics.dpi;
    let shownDepthStart = store.getState().graphics.depthStart;
    let depth = (well.firstIndexValue - shownDepthStart)* ((dpi * 0.39) / (scale.m / scale.cm))
    let depthStep = well.step * ((dpi * 0.39) / (scale.m / scale.cm))
    //geo values
    let geoMinX = curve.boundaries[0]
    let geoMaxX = curve.boundaries[1]


    let points = []
    let strPoints;
    let res = []
    let pixelValue = curve.value.map((it) => {
            if (it !== well.nullValue)
                return (it - geoMinX) / (geoMaxX - geoMinX) * (canvasMaxX - canvasMinX)
            else return it
        }
    )
    let x = pixelValue[0]

    pixelValue.forEach((value, i) => {
            if (value === well.nullValue) {
                depth += depthStep
                return x = pixelValue[i + 1]
            }
            else if (i === pixelValue.length - 1) {
                points.push([x + canvasMinX, depth])
                strPoints = points.flat().join(" ")
                res.push(
                    <polyline points={strPoints}
                              stroke={curve.color}
                              strokeWidth={curve.lineThickness}
                              fill="none"
                              key={uuid()}
                    />
                )
            }
            else if (pixelValue[i + 1] === well.nullValue) {
                points.push([x + canvasMinX, depth])
                strPoints = points.flat().join(" ")
                res.push(
                    <polyline points={strPoints}
                              stroke={curve.color}
                              strokeWidth={curve.lineThickness}
                              fill="none"
                              key={uuid()}
                    />
                )
                points = []
            } else {
                points.push([(x + canvasMinX), depth])
                depth += depthStep;
                x = value
            }
        }
    )
    return res.map(it => it)
}
