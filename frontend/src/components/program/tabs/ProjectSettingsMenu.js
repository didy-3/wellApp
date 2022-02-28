import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    changeDpi,
    changeGridSize,
    changeScale,
    changeSpaceBetweenWells,
    changeTrackWidth,
    changeDepthStart,
} from "../../../redux/pageSlice";

export default function ProjectSettingsMenu() {
    let gridSize = useSelector((state) => state.graphics.gridSize)
    let dpi = useSelector((state) => state.graphics.dpi)
    let scale = useSelector((state) => state.graphics.scale)
    let spaceBetweenWells = useSelector((state) => state.graphics.spaceBetweenWells);
    let trackWidth = useSelector((state) => state.graphics.trackWidth);
    let depthStart = useSelector((state) => state.graphics.depthStart);
    let timeout = null;
    const dispatch = useDispatch()

    const handleGridSizeChange = (isVertical, value) => {
        let res = {...gridSize}
        if (isVertical) {
            res.y = parseInt(value)
        } else {
            res.x = parseInt(value)
        }
        clearTimeout(timeout);
        setTimeout(() => {
            dispatch(changeGridSize(res))
        }, 500)
    }
    const handleScaleChange = (isMeters, value) => {
        let res = {...scale}
        if (isMeters) {
            res.m = parseInt(value)
        } else {
            res.cm = parseInt(value)
        }
        clearTimeout(timeout);
        setTimeout(() => {
            dispatch(changeScale(res))
        }, 500)
    }

    const handleDpiChange = (value) => {
        clearTimeout(timeout);
        setTimeout(() => {
            dispatch(changeDpi(parseInt(value)))
        }, 500)
    }

    function handleTrackWidthChange(value) {
        if (value < 100) {
            clearTimeout(timeout);
            setTimeout(() => {
                dispatch(changeTrackWidth(100))
            }, 2000)
        } else {
            clearTimeout(timeout);
            setTimeout(() => {
                dispatch(changeTrackWidth(parseInt(value)))
            }, 2000)
        }
    }

    function handleSpaceBetweenWellsChange(value) {
        clearTimeout(timeout);
        setTimeout(() => {
            dispatch(changeSpaceBetweenWells(parseInt(value)))
        }, 1000)
    }

    function handleDepthStartChange(value) {
        clearTimeout(timeout);
        setTimeout(() => {
            dispatch(changeDepthStart(parseInt(value)))
        }, 2000)
    }

    return <div className={"project-settings"}>
        <div className={"scale-settings"}>
            <label htmlFor={"scale-cm"}>Scale
            </label>
            <input
                id={"scale-cm"}
                type="number"
                min={1}
                defaultValue={scale.cm}
                onChange={(e) => {
                    handleScaleChange(false, e.target.value)
                }}
            />

            cm/

            <input
                id={"scale-m"}
                type="number"
                min={1}
                defaultValue={scale.m}
                onChange={(e) => {
                    handleScaleChange(true, e.target.value)
                }}
            />

            m

        </div>
        <div className={"dpi-info"}>
            <label htmlFor={"dpi-info"}>Enter your dpi if you know it </label>
            <input
                id={"dpi-info"}
                type="number"
                min={1}
                defaultValue={dpi}
                onChange={(e) => {
                    handleDpiChange(e.target.value)
                }}
            />
            px
        </div>
        <p> Grid size: </p>
        <label htmlFor={"grid-y"}>Vertical lines</label>
        <input
            id={"grid-y"}
            type="number"
            min={1}
            defaultValue={gridSize.y}
            onChange={(e) => {
                handleGridSizeChange(true, e.target.value)
            }}
        />
        %

        <label htmlFor={"grid-x"}>Horizontal lines</label>
        <input
            id={"grid-x"}
            type="number"
            min={1}
            defaultValue={gridSize.x}
            onChange={(e) => {
                handleGridSizeChange(false, e.target.value)
            }}
        />
        m

        <label htmlFor={"trackWidth"}>Track width</label>
        <input
            id={"trackWidth"}
            type="number"
            min={100}
            defaultValue={trackWidth}
            onChange={(e) => {
                handleTrackWidthChange(e.target.value)
            }}
        />
        px
        <label htmlFor={"spaceBetweenWells"}>Space between wells</label>
        <input
            id={"spaceBetweenWells"}
            type="number"
            min={100}
            defaultValue={spaceBetweenWells}
            onChange={(e) => {
                handleSpaceBetweenWellsChange(e.target.value)
            }}
        />
        px
        <label htmlFor={"spaceBetweenWells"}>Depth start</label>
        <input
            id={"spaceBetweenWells"}
            type="number"
            min={0}
            defaultValue={depthStart}
            onChange={(e) => {
                handleDepthStartChange(e.target.value)
            }}
        />
        m
    </div>

}