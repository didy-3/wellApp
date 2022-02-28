import {checkFields} from "../service/globalStorage";
import {minBy} from "lodash";

export default class Curve {

    name;
    value = [];
    minValue;
    maxValue;
    color = "#800080";
    description = "";
    unit;
    display = true;
    boundaries;
    lineThickness;


    static initiateCurve(curve) {
        let minValue = minBy(curve.value, it => it === -999.25 ? Number.MAX_SAFE_INTEGER : it)
        let maxValue = Math.max(...curve.value)
        let curveSettings = new Map(
            [
                ['name', 'curve'],
                ['minValue', minValue],
                ['maxValue', maxValue],
                ['color', '"#800080"'],
                ['description', ''],
                ['display', true],
                ['boundaries', [minValue, maxValue]],
                ['lineThickness', 2],
                ['unit', "m"],
            ]);
        checkFields(curve, curveSettings)
    }
}
