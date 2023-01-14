import { useLocation } from "react-router-dom"
import { TopNav } from "./TopNav"
import { useState } from "react"


const NsixtyfourStage = () => {

    const location = useLocation()
    
    const stage = location.state
    console.log(location.state)

    const [mouseCords, setMouseCords] = useState({x:0, y:0})
    const [popupStyle, setPopupStyle] = useState({
        
        width: '100px',
        height: '100px',
        position: 'absolute',
        display: 'none',
        flexDirection: 'column'
    })

    const getCords = (e) => {
        let {width, height} = e.target.getBoundingClientRect()
        let {offsetX, offsetY} = e.nativeEvent
        
        console.log(e.target.getBoundingClientRect())
        console.log(offsetX / width * 100)
        console.log(offsetY / height * 100)
        console.log('screen cords', offsetX, offsetY)

        setPopupStyle( prevState => {
            return {
                ...prevState,
                display:'flex',
                top: offsetY + 'px',
                left: offsetX + 'px'
            }
            
        })
    }


    return (
        <div className="App">
            <TopNav />
            <div className="stageBox">
            <img className="stageDiv" src={stage} alt="stageImg" onClick={getCords}></img>
            </div>

            <div className="popupMenu" style={popupStyle}>
                <div>1st entry</div>
                <div>2nd entry</div>
            </div>
        </div>
    )
}



export {NsixtyfourStage}