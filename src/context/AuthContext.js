import React, { useEffect, createContext, useState } from 'react'
import { auth } from '../firebase/firebase'
import { firestore } from '../firebase/firebase'
import firebase from '../firebase/firebase'

export const AuthContext = createContext()

function AuthProvider(props) {
    const [currentUser, setCurrentUser] = useState(null)
    const [emailVal, setEmailVal] = useState(null)

    const signInWithPopup = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider)
        const data = firestore.collection("users").doc(result.user.uid)
        if (data.id === result.user.uid) {
            return result
        } else {
            firestore.collection("users").doc(result.user.uid).set({
                img: "https://firebasestorage.googleapis.com/v0/b/netflix-fcdc4.appspot.com/o/unnamed.jpg?alt=media&token=0cf544e4-8f02-42d6-9ee5-96b73f18a953",
                id: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                savedMovies: []
            })
        }
    }

    const signInWithEmailAndPassword = async (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const signUpWithEmailAndPassword = async (email, password, name) => {
        const cred = await auth.createUserWithEmailAndPassword(email, password)
        return firestore.collection("users").doc(cred.user.uid).set({
            id: cred.user.uid,
            name: name,
            email: email,
            password: password,
            savedMovies: []
        })
    }

    const logOut = () => {
        return auth.signOut()
    }

    useEffect(() => {
        const logUser = auth.onAuthStateChanged(user => setCurrentUser(user))
        return logUser
    }, [])

    const value = {
        logOut,
        currentUser,
        signInWithPopup,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword,
        setEmailVal,
        emailVal
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
