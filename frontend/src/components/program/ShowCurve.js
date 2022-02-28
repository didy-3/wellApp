import React, {useRef, useEffect} from 'react';
import "./drawCurve.css"
import drawCurve from "../../service/drawCurve";
import drawLine from "../../service/drawLine";
import CurveInfo from "./CurveInfo";
import {useSelector} from "react-redux";

export default function ShowCurve(props) {
    let well = props.well;
    let curve = props.curve;
    let width = 450;
    let chosenStep = useSelector((state) => state.graphics.chosenStep)
    let height = well.lastIndexValue * (10 / chosenStep) + 130;
    //let height = curveLength * (curveLength / step) + 100;
    //let depthStep = well.step * (well.step / chosenStep);
    const canvas = useRef();
    let ctx = useRef(null);
    let boundaries = curve.boundaries

    const drawDepthRuler = (step) => {
        let counter = 0;
        let y = 25
        ctx.font = "10px serif";
        drawLine(ctx, {x: 50, y: 0, x1: 50, y1: height}, {color: "black"}, 2)
        for (let i = 0; i < height; i++) {
            drawLine(ctx, {x: 50, y: y, x1: 50 - 10, y1: y}, {color: "black"}, 1)
            ctx.textAlign = 'right';
            ctx.fillText(counter, 50 - 10, y + 3);
            y += 10
            counter += step
        }
    }
    const drawUnitRuler = () => {
        let geoMinX = curve.boundaries[0]
        let geoMaxX = curve.boundaries[1]
        let pixelsPerUnit = (width-50) / (geoMaxX - geoMinX)
        let pointsLength = (width - 50) / 25
        let unitStep = (1/pixelsPerUnit)*25
        let points = []
        points[0] = geoMinX
        for (let i = 1; i < pointsLength; i++) {
            points[i] = points[i - 1] + unitStep
        }
        points[pointsLength] = geoMaxX
        let x = 50
        ctx.font = "10px serif";
        for (let i = 0; i < pointsLength+1; i++) {
            drawLine(ctx, {x: x, y: 20, x1: x, y1: 25}, {color: "black"}, 1)
            ctx.textAlign = 'right';
            ctx.fillText(Math.round(points[i]), x + 3, 15);
            x += 25
        }
    }

    const drawNet = (x, y) => {
        let netWidth = x;
        let netHeight = y + 25
        //horizontal lines
        for (let i = 0; i < height / y; i++) {
            drawLine(ctx, {x: 50, y: netHeight, x1: width, y1: netHeight}, {color: "gray"}, 1)
            netHeight += y
        }
        //vertical lines
        for (let i = 0; i < width / x; i++) {
            drawLine(ctx, {x: netWidth + 50, y: height + 25, x1: netWidth + 50, y1: 25}, {color: "gray"}, 1)
            netWidth += x
        }
    }
    const drawBorders = () => {
        drawLine(ctx, {x: 50, y: 25, x1: width - 1, y1: 25}, {color: "black"}, 2)
        drawLine(ctx, {x: width - 1, y: 0, x1: width - 1, y1: height}, {color: "black"}, 2)
        drawLine(ctx, {x: 50, y: height - 1, x1: width, y1: height - 1}, {color: "black"}, 2)
    }

    useEffect(() => {
        const show = () => {
            const canvasEle = canvas.current;
            canvasEle.width = width;
            canvasEle.height = height;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            ctx = canvasEle.getContext("2d");
            drawBorders();
            drawDepthRuler(chosenStep);
            drawUnitRuler()
            drawNet(100, 100);
            drawCurve(well, ctx, width, curve)
        }
        show()
    }, [chosenStep, boundaries]);

    return <div className={"curve"}>
        <CurveInfo
            well={well}
            curve={curve}
            step={chosenStep}
        />
        <canvas ref={canvas}/>
    </div>
}