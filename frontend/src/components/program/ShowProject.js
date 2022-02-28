import React, {useEffect, useState} from 'react';
import uuid from "react-tabs/lib/helpers/uuid";
import ShowWell from "./ShowWell";
import {useSelector} from "react-redux";
import {ScrollSync} from 'react-scroll-sync';
import ZonesConnector from "./ZonesConnector";

export default function ShowProject(props) {
    const [page, setPage] = useState(<p>Loading</p>);

    const loaded = useSelector((state) => state.graphics.value)
    let project = props.project
    let wellList = project.wellList

    const check = () => {
        if (project !== "") {
            setPage(
                wellList.map((well,i )=> {
                    if (well.display) {
                        return <React.Fragment key={uuid()}>
                            <ShowWell
                            well={well}
                            project={project}
                        />
                            <ZonesConnector
                            firstWell={well}
                            secondWell={wellList[i+1]}
                            project={project}
                            />
                        </React.Fragment>

                    }
                    return "";
                })
            )

        }
    }


    useEffect(() => {
        check()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded])

    return <ScrollSync>
        <div className={"project-graphic-container"}>
            {page}
        </div>
    </ScrollSync>


}

ShowWell.defaultProps = {
    well: '',
    curveList: '',
    boundaries: '',
    step: '',
};