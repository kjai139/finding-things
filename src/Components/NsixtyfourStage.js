import { useLocation } from "react-router-dom"
import { TopNav } from "./TopNav"
import { useEffect, useRef, useState } from "react"
import { createRef } from "react"


const NsixtyfourStage = () => {

    const location = useLocation()
    
    const [stage, setStage] = useState(location.state)
    console.log(location.state)

    const [screenSize, setScreenSize] = useState({})

    useEffect( () => {
        setScreenSize(getWindowsDimensions())


        const handleResize = () => {
            setScreenSize(getWindowsDimensions())
            
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const [mouseCords, setMouseCords] = useState({x:0, y:0})
    const [popupStyle, setPopupStyle] = useState({
        
        width: '100px',
        height: '100px',
        position: 'absolute',
        display: 'none',
        flexDirection: 'column'
    })

    const [mapCords, setMapCords] = useState({x:0, y:0})

    const [selectedMapCords, setSelectedMapCords] = useState({
        x:0,
        y:0
    })

    const getCords = (e) => {
        let {width, height} = e.target.getBoundingClientRect()
        let {offsetX, offsetY} = e.nativeEvent
        

        let mapX = Math.floor(offsetX / width * 100)
        let mapY = Math.floor(offsetY / height * 100)

        console.log(e.target.getBoundingClientRect())
        console.log(offsetX / width * 100)
        console.log(offsetY / height * 100)
        console.log('screen cords', offsetX, offsetY)
        
        spawnPopUp(offsetX, offsetY)
        

        setMapCords({
            x: mapX,
            y: mapY
        })

        
    }

    const mouseMove = (e) => {
        setMouseCords({
            x:e.nativeEvent.offsetX,
            y:e.nativeEvent.offsetY
        })
    }


    const getWindowsDimensions = () => {
        const {innerWidth: width, innerHeight: height} = window
        console.log('width:',width, 'height:',height)
        return {
            x: width,
            y: height
        }
    }


    const spawnPopUp = (offsetX, offsetY) => {
        


        if (Number(screenSize.x) > 850){
            let adjustedX = (screenSize.x - 1080) / 2 + offsetX
            console.log(adjustedX)
            setPopupStyle( prevState => {
                return {
                    ...prevState,
                    display:'flex',
                    top: offsetY + 'px',
                    left: adjustedX + 'px'
                }
                
            })
        } else {
            setPopupStyle( prevState => {
                return {
                    ...prevState,
                    display:'flex',
                    top: offsetY + 'px',
                    left: offsetX + 'px'
                }
                
            })
        }
    }

    

    const loadCharacterMenu = () => {
        
    


        return stage.characters.map((value, index)  => 
            <button key={`${value.name}-${stage.uuid}`} className="menuBtn" onClick={() => checkCords(index)} value={index}>
                <span>{value.name}</span>
                <div className="menuImg" style={{
                    backgroundImage: `url(${value.imgUrl})`
                }}></div>
            </button>
            )
    }

    const checkCords = (index) => {
        // let index = e.target.parentNode.value
        console.log('index', index)
        let targetX = stage.characters[index].cords.x
        let targetY = stage.characters[index].cords.y
        console.log('selected:', mapCords.x, mapCords.y)
        console.log(targetX, targetY)

        let targetRangeX = stage.characters[index].xRange
        let targetRangeY = stage.characters[index].yRange

        let xDiff = Math.abs(mapCords.x - targetX)
        let xDiffTwo = Math.abs(targetX - mapCords.x)
        let yDiff = Math.abs(mapCords.y - targetY)
        let yDiffTwo = Math.abs(targetY - mapCords.y)

    

        if ((xDiff <= Math.abs(targetRangeX) || xDiffTwo <= Math.abs(targetRangeX)) && (yDiff <= Math.abs(targetRangeY) ||  yDiffTwo <= Math.abs(targetRangeX))  ){
            
            console.log('in range')
            // console.log(Math.abs(targetRangeX))

            // console.log(Math.abs(mapCords.y - targetY), Math.abs(targetRangeY))
        } else {
            console.log('out of range')
            // console.log(Math.abs(mapCords.y - targetY), Math.abs(targetRangeY))
            // console.log(Math.abs(mapCords.x - targetX), Math.abs(targetRangeX))
        }


        let obj = {
            ...stage.characters[index],
            found: true
        }

        console.log('obj', obj)
        console.log(stage.characters)

        let arr = stage.characters
        let newArr = arr.splice(index, 1, obj)

        console.log('arr', arr)
        
       
    }

    

    


    return (
        <div className="App">
            <TopNav characters={stage.characters} uuid={stage.uuid} />
            <div className="stageBox">
            <img className="stageDiv" src={stage.stageImg} alt="stageImg" onClick={getCords}></img>
            <div className="popupMenu" style={popupStyle}>
                {loadCharacterMenu()}
                <div>X:{mouseCords.x}</div>
                <div>Y:{mouseCords.y}</div>
                <div>Map cords: {mapCords.x},{mapCords.y}</div>
                <div>W: {screenSize.x} H: {screenSize.y}</div>
            </div>
            </div>

           
        </div>
    )
}



export {NsixtyfourStage}