import { useState } from "react"
import { fireStore } from "../firebase"
import { addDoc, collection, getDocs, doc, getDoc } from "firebase/firestore"


const EndGamePopUp = ({totalTime, stageName}) => {

    const [formName, setFormName] = useState('')

    const handleChange = (e) => {
        setFormName(e.target.value)
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        let record = {
            name: formName,
            time: totalTime
        }
        addEntry(record)
        // showLeaderBoard()
    }


    const addEntry = async (obj) => {

        try {
            const docRef = await addDoc(collection(fireStore, "users"), obj)
        }
        catch(error) {
            console.error('error writing to firebase', error)
        }
    }

    const showLeaderBoard = async () => {

        const snapshot = await getDocs(collection(fireStore, "users"))
        console.log(snapshot)
        snapshot.forEach( (doc) => {
            console.log(doc.id, "=>" , doc.data())
        })
    }

   console.log(stageName)

    return (
        <div className="endPopUp">
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
                <button className="formBtn" onClick={ handleSubmit}>
                    Ok
                </button>
                </div>
            </form>
            <div className="leaderboardDiv">
                <div className="leaderboardTitle">{stageName}</div>
                
            </div>
        </div>
    )
}


export {EndGamePopUp}