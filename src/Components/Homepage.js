import { useState } from "react"
import n64stage from "./assets/maps/n64_stage1.jpg"
import dreamcastStage from "./assets/maps/dreamcast_stage.jpg"
import ps2Stage from "./assets/maps/ps2_stage.jpg"
import { TopNav } from "./TopNav"
import { HomeNav } from "./HomeNav"


const Homepage = () => {

    const [stages, setStages] = useState([{
        stageTitle: 'N64',
        stageImg: n64stage,
        uuid: 'e08399e9-6e89-40cc-bca1-6b58651895d6'
    }, {
        stageTitle: 'Dreamcast',
        stageImg: dreamcastStage,
        uuid: '5b633e6c-3059-424f-9ee8-3a8cf02299a3'
    }, {
        stageTitle: 'PS2',
        stageImg: ps2Stage,
        uuid: '3f1de7b1-1085-4527-98ac-a2d0030af5b3'
    }])

    const renderStages = () => {
        return stages.map(value =>
            <div className="stageGridCard" key={`stages${value.uuid}`}>
                <div className="stagesImg" key={`img${value.uuid}`} style = {{
                    backgroundImage: `${value.stageImg ? `url(${value.stageImg})` : '' }`
                }}></div>
                <span className="stagesName" key={`stagesName${value.uuid}`}>{value.stageTitle ? value.stageTitle : 'Loading...'}</span>

            </div>
            )
    }

    return (
        <div className="App">
        <HomeNav />
        <div className="selectionGrid">
            <div className="stagesDiv">
            {renderStages()}
            </div>
            
        </div>
        </div>
    )
}

export {Homepage}