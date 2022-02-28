import Curve from "../project/Curve";
import Well from "../project/Well";

/**
 * @return Well
 * @param file
 */
export default function parseLas(file) {
    let fileSections = file.split(/(\n~|^~)/)

    function fillWellWithLasHeader(well, fileSections) {
        let wellSection = fileSections.find((section) => {
            return section.toLowerCase().startsWith("well")
        })
        wellSection = wellSection.split("\n").map(a => a.trim("\r"))
        wellSection.shift()
        let nameColumn = wellSection.map(it => it.match(/^\w*/)[0])
        //let unitColumn = wellSection.map(it => it.match(/\.\w*/)[0])
        let valueColumn = wellSection.map(it => {
            let matchRes = it.match(/\.\w*\s*/);
            let match = matchRes === null ? [] : matchRes[0]
            let matchLength = match.length;
            let matchStart = it.indexOf(match)
            return it.substring(matchStart + matchLength).match(/.*(?=:)/)[0]
        });
        well.name = valueColumn[nameColumn.findIndex(it => it === "WELL")]
        well.step = parseFloat(valueColumn[nameColumn.findIndex(it => it === "STEP")])
        well.nullValue = parseFloat(valueColumn[nameColumn.findIndex(it => it === "NULL")])
        well.firstIndexValue = parseFloat(valueColumn[nameColumn.findIndex(it => it === "STRT")])
        well.lastIndexValue = parseFloat(valueColumn[nameColumn.findIndex(it => it === "STOP")])
    }

    function fillWellWithLasData(well, fileSections) {
        let curveSection = fileSections.find((section) => {
            return section.toLowerCase().startsWith("curve")
        })
        curveSection = curveSection.split("\n").map(a => a.trim("\r"))
        curveSection.splice(0, 2)


        let nameColumn = curveSection.map(it => it.match(/^\w*/)[0])
        nameColumn = nameColumn.filter(it => it !== "")
        let unitColumn = curveSection.map(it => {
            let matchRes = it.match(/\.[\w/]*/)
            return matchRes === null ? "" : matchRes[0].substring(1)
        })
        let descriptionColumn = curveSection.map(it => {
            let matchRes = it.match(/(?<=:).*/)
            return matchRes === null ? "" : matchRes[0];
        })

        well.curveList = nameColumn.map((it, i) => {
            let curve = new Curve();
            curve.name = it;
            curve.unit = unitColumn[i]
            curve.description = descriptionColumn[i]
            return curve
        })
        curveSection = fileSections[fileSections.length - 1]
        curveSection = curveSection.split("\n").map(a => a.trim("\r"))
        curveSection = curveSection.map(it => {
            let temp = it.split(/\s/)
            return temp.filter(it => it !== "")
        })
        curveSection[0].shift();
        curveSection.forEach(it => it.shift())
        curveSection.slice(1).filter((it) => it.length === well.curveList.length).forEach((it)=> {
            it.forEach((a, i) => {
                well.curveList[i].value.push(parseFloat(a))
            })
        })
    }

    let well = new Well();
    fillWellWithLasHeader(well, fileSections)
    fillWellWithLasData(well, fileSections)
    Well.initiateWell(well)
    well.curveList.forEach(curve => Curve.initiateCurve(curve))
    return well
}