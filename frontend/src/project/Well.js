import {checkFields} from "../service/globalStorage";

export default class Well {
    name;
    step;
    curveList = [];
    display = true;
    firstIndexValue;
    lastIndexValue;
    nullValue;


    static initiateWell(well) {
        let wellSettings = new Map(
            [
                ['name', 'well'],
                ['step', 10],
                ['firstIndexValue', 0],
                ['display', true],
                ['nullValue', -999.2500]
            ]);
        checkFields(well, wellSettings)
    }
}

