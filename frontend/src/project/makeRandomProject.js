import Project from "./Project";
import Curve from "./Curve";
import Well from "./Well";

export default function makeRandomProject(name) {
    return new Project(name,
        [makeRandomWell(1000, "Well_1", "Curve_1", "Curve_2"),
         makeRandomWell(800, "Well_2", "Curve_1", "Curve_2")
        ])
}

function makeRandomWell(depth, name, curveName1, curveName2) {
    let step = 10;
    return new Well(name,
        step,
        [makeRandomCurve(depth / step, curveName1,20,200),
            makeRandomCurve(depth / step, curveName2, 0,15)]);
}

function makeRandomCurve(length, name, min, max) {
    let value = [];
    for (let i = 0; i < length; i++) {
        value[i] = randomNumber(min, max)
    }
    let description = "description"
    return new Curve(name, value, description);
}

function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
