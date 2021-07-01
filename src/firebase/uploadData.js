const firestoreService = require("firestore-export-import")
const serviceAccount = require("./serviceAccountKey.json")
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://netflix-fcdc4-default-rtdb.firebaseio.com"
});
const databaseURL = "https://netflix-fcdc4-default-rtdb.firebaseio.com"

firestoreService.initializeApp(serviceAccount, databaseURL);

firestoreService.restore("icons.json")