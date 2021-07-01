import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const app = firebase.initializeApp({
    apiKey: "AIzaSyB6z2z3PzcnprRSUgTC-p0U8A-j5ywgw-Q",
    authDomain: "netflix-fcdc4.firebaseapp.com",
    databaseURL: "https://netflix-fcdc4-default-rtdb.firebaseio.com",
    projectId: "netflix-fcdc4",
    storageBucket: "netflix-fcdc4.appspot.com",
    messagingSenderId: "1068445096450",
    appId: "1:1068445096450:web:d44095dd5999fb7fea251b"
});

export const auth = app.auth()
export const storage = app.storage()
export const firestore = app.firestore()

export default firebase