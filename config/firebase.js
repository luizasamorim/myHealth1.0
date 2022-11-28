import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { initializeFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBj5yuLJjCieWqjrREHfIAlDbiqm8dMz8c",
    authDomain: "myhealth-2144077.firebaseapp.com",
    projectId: "myhealth-2144077",
    storageBucket: "myhealth-2144077.appspot.com",
    messagingSenderId: "366891085800",
    appId: "1:366891085800:web:7b12169e8f3fb94ae93e5d"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = initializeFirestore(app, {experimentalForceLongPolling: true})
const storage = getStorage(app)

export {app, auth, db, storage}