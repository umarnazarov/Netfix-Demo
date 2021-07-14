import React, { useEffect, createContext, useState } from 'react'
import { auth } from '../firebase/firebase'
import { firestore } from '../firebase/firebase'
import firebase from '../firebase/firebase'

export const AuthContext = createContext()

function AuthProvider(props) {
    const [currentUser, setCurrentUser] = useState(null)
    const [emailVal, setEmailVal] = useState(null)

    const signInPopup = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider)
        const user = await firestore.collection("users").doc(result.user.uid).get()
        const userD = user.data()
        console.log(userD, result)
        if (!userD || userD.id !== result.user.uid) {
            const setD =  await firestore.collection("users").doc(result.user.uid).set({
                img: "https://firebasestorage.googleapis.com/v0/b/netflix-fcdc4.appspot.com/o/unnamed.jpg?alt=media&token=0cf544e4-8f02-42d6-9ee5-96b73f18a953",
                id: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                savedMovies: []
            })
            return setD
        }
        return userD
    }

    const signInWithEmailAndPassword = async (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const signUpWithEmailAndPassword = async (email, password, name) => {
        const cred = await auth.createUserWithEmailAndPassword(email, password)
        return firestore.collection("users").doc(cred.user.uid).set({
            id: cred.user.uid,
            img: "https://firebasestorage.googleapis.com/v0/b/netflix-fcdc4.appspot.com/o/unnamed.jpg?alt=media&token=0cf544e4-8f02-42d6-9ee5-96b73f18a953",
            name: name,
            email: email,
            password: password,
            savedMovies: []
        })
    }

    const logOut = () => {
        return auth.signOut()
    }

    const passwordReset = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const logUser = auth.onAuthStateChanged(user => setCurrentUser(user))
        return logUser
    }, [])

    const value = {
        logOut,
        emailVal,
        setEmailVal,
        currentUser,
        signInPopup,
        passwordReset,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
