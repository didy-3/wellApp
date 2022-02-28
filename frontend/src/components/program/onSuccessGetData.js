import globals from "../../service/globalStorage";
import Project from "../../project/Project";
import Track from "../../project/Track";
import Well from "../../project/Well";
import Curve from "../../project/Curve";

export default function onSuccessGetData(res) {
    globals.project = res;
    globals.dataId = JSON.parse(localStorage.getItem("dataIds"))[0];
    Project.initiateProject(globals.project)
    globals.project.trackList.forEach(track=>{
        Track.initiateTrack(track, globals.project.wellList[0])
    })
    globals.project.wellList.forEach(well => {
        Well.initiateWell(well)
        well.curveList.forEach(curve=>{
            Curve.initiateCurve(curve)
        })
    })
    console.log(globals.project)
}