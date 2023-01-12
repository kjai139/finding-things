import { useLocation } from "react-router-dom"
import { TopNav } from "./TopNav"


const NsixtyfourStage = () => {

    const location = useLocation()
    
    const stage = location.state
    console.log(location.state)



    return (
        <div className="App">
            <TopNav />
            <div className="stageBox">
            <img className="stageDiv" src={stage} alt="stageImg"></img>
            </div>
        </div>
    )
}



export {NsixtyfourStage}