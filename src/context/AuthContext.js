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
        const token = result.credential.accessToken;
        console.log(token.user.uid)
        const user = result.user
        return user
    }

    const signInWithEmailAndPassword = async (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const signUpWithEmailAndPassword = async (email, password, name) => {
        const cred = await auth.createUserWithEmailAndPassword(email, password)
        console.log(cred.user.uid)
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
