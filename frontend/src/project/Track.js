import {checkFields} from "../service/globalStorage";

export default class Track {
    constructor(name, curveList, well) {
        this.name = name;
        this.curveList = curveList;
        this.display = true;
    }
    name;
    curveList;
    display;

    static initiateTrack(track, well) {
        let trackSettings = new Map(
            [
                ['name', 'track 1'],
                ['curveList', []],
                ['display', true]
            ]);
        checkFields(track, trackSettings)
    }
}