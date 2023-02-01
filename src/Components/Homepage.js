import { useState } from "react"
import n64stage from "./assets/maps/n64_stage1.jpg"
import dreamcastStage from "./assets/maps/dreamcast_stage.jpg"
import ps2Stage from "./assets/maps/ps2_stage.jpg"
import donkeyKong from "./assets/characters/DK.webp"
import harvestMoonDog from "./assets/characters/harvestmoon_dog.webp"
import starfox from "./assets/characters/starfox.png"
import sonic from "./assets/characters/sonic.webp"
import seaman from "./assets/characters/seaman.png"
import RAmar from "./assets/characters/Bernie.png"
import jimmy from "./assets/characters/Jimmy_Hopkins.png"
import kratos from "./assets/characters/Kratos.png"
import laharl from "./assets/characters/Laharl.webp"

import { HomeNav } from "./HomeNav"
import { Link } from "react-router-dom"


const Homepage = () => {

    const [stages, setStages] = useState([{
        stageTitle: 'N64',
        stageImg: n64stage,
        uuid: 'e08399e9-6e89-40cc-bca1-6b58651895d6',
        characters: [
            {
                imgUrl:donkeyKong,
                name:'Donkey Kong',
                cords:{x:76, y:49},
                xRange:2,
                yRange:2,
                found:false
            },
            {
                imgUrl:harvestMoonDog,
                name:'Dog',
                cords:{x:61, y:62},
                xRange:1,
                yRange:1,
                found:false
            },
            {
                imgUrl:starfox,
                name:'Starfox',
                cords:{x:12, y:41},
                xRange:1,
                yRange:1,
                found:false
            }
        ]
    }, {
        stageTitle: 'Dreamcast',
        stageImg: dreamcastStage,
        uuid: '5b633e6c-3059-424f-9ee8-3a8cf02299a3',
        characters: [
            {
                imgUrl:sonic,
                name:'Sonic',
                cords:{x:26, y:40},
                xRange:2,
                yRange:2,
                found:false
            },
            {
                imgUrl:RAmar,
                name:'Bernie',
                cords:{x:81, y:47},
                xRange:2,
                yRange:2,
                found:false
            },
            {
                imgUrl:seaman,
                name:'Seaman',
                cords:{x:28, y:71},
                xRange:3,
                yRange:2,
                found:false
            }
            
        ]
    }, {
        stageTitle: 'PS2',
        stageImg: ps2Stage,
        uuid: '3f1de7b1-1085-4527-98ac-a2d0030af5b3',
        characters: [
            {
                imgUrl:kratos,
                name:'Kratos',
                cords:{x:21, y:52},
                xRange:1,
                yRange:1,
                found:false
            },
            {
                imgUrl:laharl,
                name:'Laharl',
                cords:{x:69, y:59},
                xRange:1,
                yRange:1,
                found:false
            },
            {
                imgUrl:jimmy,
                name:'Jimmy Hopkins',
                cords:{x:63, y:45},
                xRange:1,
                yRange:1,
                found:false
            }
        ]
    }])

    const renderStages = () => {
        return stages.map(value =>
            <Link className="stageLink" key={value.uuid} to={`/${value.stageTitle}`} state={value}>
            <div className="stageGridCard" key={`stages${value.uuid}`}>
                <div className="stagesImg" key={`img${value.uuid}`} style = {{
                    backgroundImage: `${value.stageImg ? `url(${value.stageImg})` : '' }`
                }}></div>
                <span className="stagesName" key={`stagesName${value.uuid}`}>{value.stageTitle ? value.stageTitle : 'Loading...'}</span>

            </div>
            </Link>
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