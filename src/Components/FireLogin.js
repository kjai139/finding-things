
import { firebaseAuth } from "../firebase"
import { useEffect, useState } from "react"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"


const FireLogin = () => {

    const signIn = async () => {
        let provider = new GoogleAuthProvider()
        await signInWithPopup(firebaseAuth, provider)
    }

    const signOut = async () => {
        firebaseAuth.signOut()
    }


    const [loginName, setLoginName] = useState('')
    const [loginState, setLoginState] = useState('Not Logged in')
    const [loggedIn, setLoggedIn] = useState(false)

    firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            setLoggedIn(true)
            setLoginState('Logged in as:')
        } else {
            setLoggedIn(false)
            setLoginState('Not logged in')
        }
    })

    useEffect( () => {
        if (loggedIn !== undefined && loggedIn !== false) {
            console.log(firebaseAuth.currentUser)
            setLoginName(firebaseAuth.currentUser.displayName)
        } else {
            setLoginName('')
        }
    }, [loggedIn])

    return (
        <div>
            <button className="loginBtn" onClick={signIn}>Login</button>
            <button onClick={signOut}>Sign out</button>
            <p>{loginState}{loginName}</p>
        </div>
    )
}



export {FireLogin}