import { useEffect, useState } from "react"
import { Link } from "react-router-dom"




const TopNav = ({characters, uuid, isGameOver, setTotalTime}) => {

    const [timer, setTimer] = useState(0)

    const [intervalId, setIntervalId] = useState('')

    

    
    const startTimer = () => {
        const interval = setInterval(() => {
            setTimer( (prevState) => {
                return [
                    Number(prevState) + 1
                ]
            })
        }, 1000)

        setIntervalId(interval)
    }

    const stopTimer = () => {
        clearInterval(intervalId)
    }

    useEffect ( () => {

        
        if (isGameOver == false) {
            const interval = setInterval(() => {
                setTimer( (prevState) => {
                    return [
                        Number(prevState) + 1
                    ]
                })
            }, 1000)

            return () => clearInterval(interval)
        } else {
            setTotalTime(formatTime(timer))
        }
        
        

    }, [isGameOver])

    const formatTime = (time) => {
        const getSeconds = `0${Math.round(time % 60)}`.slice(-2)
        const minutes = `${Math.floor(time / 60)}`
        const getMinutes = `0${minutes % 60 }`.slice(-2)
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2)

        return `${getHours}:${getMinutes}:${getSeconds}`
    }

    const renderCharacters = () => {
        return characters.map(value => 
            
                <div className={`found${value.found} characterImg`} key={`${value.name}${uuid}`}style={{
                    backgroundImage: `url(${value.imgUrl})`
                }}>

                </div>
            
            )
    }


    return (
        <nav className="topNav">
            <ul className="topNavList">
                <li>
                    Logo
                </li>
                <li className="characterList">
                {renderCharacters()}
                </li>
                <li>
                    {/* <button onClick={startTimer}>Start timer</button>
                    <button onClick={stopTimer}>Stop timer</button> */}
                    {formatTime(timer)}
                </li>
                <Link className="navLinks" to={`/`}>
                <li>
                    Return to menu
                </li>
                </Link>
            </ul>
        </nav>
    )
}


export {TopNav}