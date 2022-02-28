import {checkFields} from "../service/globalStorage";

export default class Project {
    name;
    wellList;
    trackList;
    zones;

    static initiateProject(project) {
        let projectSettings = new Map(
            [
                ['name', 'Project'],
                ['wellList', []],
                ['trackList', []],
                ['zones', []],
            ]);
        checkFields(project, projectSettings)
    }
}