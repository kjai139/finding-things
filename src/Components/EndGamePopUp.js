import { useState } from "react"
import { fireStore } from "../firebase"
import { addDoc, collection, getDocs, doc, getDoc } from "firebase/firestore"


const EndGamePopUp = ({totalTime, stageName, rawTime}) => {

    const [formName, setFormName] = useState('')

    const handleChange = (e) => {
        setFormName(e.target.value)
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        let record = {
            name: formName,
            time: totalTime,
            rawTime:rawTime
        }
        addEntry(record)
        showLeaderBoard()
        setIsFormDone(true)
        setFormName('')
        
    }


    const addEntry = async (obj) => {

        

        try {
            const docRef = await addDoc(collection(fireStore, `${stageName}`), obj)
        }
        catch(error) {
            console.error('error writing to firebase', error)
        }
    }

    const [userData, setUserData] = useState([])

    

    const showLeaderBoard = async () => {
        setUserData([])

        const snapshot = await getDocs(collection(fireStore, `${stageName}`))
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

        
        console.log(userData)

        
        
        
    }

    const [index, setIndex] = useState([])

   const renderLeaderboard = () => {

    let sortedRanking = userData.sort(
        (d1, d2) => ( d1.data.rawTime < d2.data.rawTime) ? -1 : (d1.data.rawTime > d2.data.rawTime ) ? 1 : 0)
    
    console.log(sortedRanking)

    if (sortedRanking.length > 10) {
        let numOfPages = Math.ceil(sortedRanking.length /10)
        console.log(numOfPages)

        const arr = []
        for (let i = 1; i <= numOfPages; i++) {
        arr.push(<button>{i}</button>)
        
    }

    }

    
    
       
    
    
    return sortedRanking.map( (value, index) => 


        <div key={`outer-${value.id}`}>
            <div className="lbEntryDiv" key={`entryDiv-${value.id}`}>
                <div key={`index${value.id}`}>{index + 1}</div>
                <div key={`dataName-${value.id}`}>{value.data.name}</div>
                <div className="lbTime" key={`dataTime-${value.id}`}>{value.data.time}</div>
            </div>
        </div>
        )
        
   }
   const [indexNum , setindexNum] = useState(0)
   const renderIndex = () => {
    let sortedRanking = userData.sort(
        (d1, d2) => ( d1.data.rawTime < d2.data.rawTime) ? -1 : (d1.data.rawTime > d2.data.rawTime ) ? 1 : 0)
    
    

    if (sortedRanking.length > 10) {
        let numOfPages = Math.ceil(sortedRanking.length /10)
        
        console.log(numOfPages)

        const arr = []
        for (let i = 0; i < numOfPages; i++) {
        arr.push(<button className="indexBtns" onClick={()=> setindexNum(numOfPages)}>{i+1}</button>)
        
        
    }
    return arr
   }
   }


   const [isFormDone, setIsFormDone] = useState(false)
   const renderForm = () => {
        return (
            <form className="playerForm">
                <div>
                    Congrats, you've found them all in {totalTime}!
                </div>
                <div className="entryDiv">
                <label>Enter your name:</label>
                <input type="text" value={formName} onChange={handleChange}>
                </input>
                </div>
                <div className="btnDiv">
                <button className="formBtn" onClick={handleSubmit}>
                    Ok
                </button>
                </div>
            </form>
        )
   }
   
    return (
        <div className="endPopUp">
            {isFormDone ? undefined: renderForm()}
            <div className="leaderboardDiv">
                <div className={`leaderboardTitle ${isFormDone ? undefined : 'hidden' }`}>{stageName} Leaderboard</div>
                {renderLeaderboard()}
                <div className="indexDiv">

                
                {renderIndex()}
                </div>
            </div>
            
        </div>
    )
}


export {EndGamePopUp}