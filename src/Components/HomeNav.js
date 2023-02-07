import { useRef, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { fireStore } from "../firebase"



const HomeNav = ({stages}) => {

    const [isPopUpOpen, setisPopUpOpen] = useState(false)

    const [isLBOpen, setIsLbOpen] = useState(false)

    const [indexNum , setindexNum] = useState(0)
    const [indexEnd, setindexEnd] = useState(10)

    const [userData, setUserData] = useState([])

    



    const [activeBtn, setActiveBtn] = useState()
    

    const renderLeaderboardBtns = () => {

        

        return stages.map ( value =>
            <button key={`lbBtn-${value.uuid}`} className={`lbBtns ${activeBtn === value ? "selected" : null}`}  onClick={(e) => {

                

                const title = value.stageTitle
                
                
                setActiveBtn(value)
                setLeaderboard(title)
                
                
            }} >{value.stageTitle}</button> 
        )
    }

   

    const setLeaderboard = async (title) => {
        setUserData([])
        
        const snapshot = await getDocs(collection(fireStore, title))
        console.log(snapshot)
        snapshot.forEach( (doc) => {
            console.log(doc)
            console.log(doc.id, "=>" , doc.data())

            let obj = {
                id:doc.id,
                data:doc.data()
            }

            console.log(obj)

            setUserData( (prevState) => {
                return [
                    ...prevState,
                    obj
                ]
            })
            
        })
    }

    const renderLeaderboard = () => {

        let sortedRanking = userData.sort(
            (d1, d2) => ( d1.data.rawTime < d2.data.rawTime) ? -1 : (d1.data.rawTime > d2.data.rawTime ) ? 1 : 0)
        
        console.log(sortedRanking)
    
           
        
        return sortedRanking.slice(indexNum, indexEnd).map( (value, index) => 
    
    
            <div key={`NavLB-${value.id}`}>
                <div className="lbEntryDiv" key={`NavEntryDiv-${value.id}`}>
                    <div key={`Nav-index${value.id}`}>{index + 1 + indexNum}</div>
                    <div key={`Nav-dataName-${value.id}`}>{value.data.name}</div>
                    <div className="lbTime" key={`Nav-dataTime-${value.id}`}>{value.data.time}</div>
                </div>
            </div>
            )
            
       }






    return (
        <nav className="topNav">
            <div className={`overlay ${isLBOpen ? undefined : 'hidden'}` } onClick={() => isLBOpen ? setIsLbOpen(false) : setIsLbOpen(true)}></div>
            <ul className="topNavList">
                <li>
                    <button className="navBtn" onClick={() => isLBOpen ? setIsLbOpen(false) : setIsLbOpen(true) }>Leaderboard</button>
                </li>
                <li>
                    Finding-Not-Waldo
                </li>
                <li>
                    Info
                </li>
            </ul>
            <div className={`homePopUp ${isLBOpen ? undefined : 'hidden' }`}>
                
                <div className="lbContainer">
                <div className="lbTitle">Top 10 Rankings</div>
                {renderLeaderboardBtns()}
                </div>
                {renderLeaderboard()}
            </div>
        </nav>
    )
}


export {HomeNav}