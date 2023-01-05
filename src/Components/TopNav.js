import { useState } from "react"





const TopNav = () => {

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

    const formatTime = (time) => {
        const getSeconds = `0${Math.round(time % 60)}`.slice(-2)
        const minutes = `${Math.floor(time / 60)}`
        const getMinutes = `0${minutes % 60 }`.slice(-2)
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2)

        return `${getHours}:${getMinutes}:${getSeconds}`
    }


    return (
        <nav className="topNav">
            <ul className="topNavList">
                <li>
                    Logo
                </li>
                <li>
                    {/* <button onClick={startTimer}>Start timer</button>
                    <button onClick={stopTimer}>Stop timer</button> */}
                    {formatTime(timer)}
                </li>
                <li>
                    PLACE HOLDER
                </li>
            </ul>
        </nav>
    )
}


export {TopNav}