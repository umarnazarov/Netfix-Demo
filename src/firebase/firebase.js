import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const app = firebase.initializeApp({
    apiKey: "AIzaSyD4yCE-frOJxQdaES2yM8PU7ApkV_T0bBM",
    authDomain: "netflix-4ca92.firebaseapp.com",
    projectId: "netflix-4ca92",
    storageBucket: "netflix-4ca92.appspot.com",
    messagingSenderId: "774604926423",
    appId: "1:774604926423:web:7965ab444d777ba9326f92"
});

export const auth = app.auth()
export const storage = app.storage()
export const firestore = app.firestore()

export default firebase