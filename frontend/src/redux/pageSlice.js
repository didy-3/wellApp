import {createSlice} from '@reduxjs/toolkit'

export const pageSlice = createSlice({
    name: 'graphics',
    initialState: {
        value: null,
        chosenStep: 10,
        gridSize: {
            x: 25,
            y: 25
        },
        dpi: 100.74,
        scale: {
            cm: 1,
            m: 10
        },
        trackWidth: 250,
        zones: null,
        spaceBetweenWells: 100,
        depthStart: 0,
        timer: null,
    },
    reducers: {
        loader: (state, action) => {
            state.value = action.payload
        },
        zonesChange: (state, action) => {
            state.zones = action.payload
        },
        changeStep: (state, action) => {
            state.step = action.payload
        },
        changeGridSize: (state, action) => {
            state.gridSize = action.payload
        },
        changeScale: (state, action) => {
            state.scale = action.payload
        },
        changeDpi: (state, action) => {
            state.dpi = action.payload
        },
        changeTrackWidth: (state, action) => {
            state.trackWidth = action.payload
        },
        changeSpaceBetweenWells: (state, action) => {
            state.spaceBetweenWells = action.payload
        },
        changeDepthStart: (state, action) => {
            state.depthStart = action.payload
        },
        setTimer: (state, action) => {
            state.timer = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const {loader, changeDpi, changeGridSize, changeScale, changeTrackWidth, zonesChange, changeSpaceBetweenWells, changeDepthStart, setTimer} = pageSlice.actions
export default pageSlice.reducer