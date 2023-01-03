import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { firebaseAuth } from "../firebase"
import { useEffect, useState } from "react"



const FireLogin = () => {

    const signIn = async () => {
        let provider = new GoogleAuthProvider()
        await signInWithPopup(firebaseAuth, provider)
    }

    


    const [loginName, setloginName] = useState('')
    const [loginState, setloginState] = useState('Not Logged in')
    const [loggedIn, setloggedIn] = useState(false)

    firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            setloggedIn(true)
            setloginState('Logged in as:')
        } else {
            setloggedIn(false)
            setloginState('Not logged in')
        }
    })

    useEffect( () => {
        if (loggedIn != undefined && loggedIn != false) {
            console.log(firebaseAuth.currentUser)
            setloginName(firebaseAuth.currentUser.displayName)
        }
    })

    return (
        <div>
            <button className="loginBtn" onClick={signIn}>Login</button>
            <p>{loginState}{loginName}</p>
        </div>
    )
}



export {FireLogin}