import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

import "firebase/compat/auth";
import "firebase/firestore";
import "firebase/compat/storage";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyA0YDPgk6wY7a3z-UD6dlB5OrquoZfNGlg",
    authDomain: "fantsy-net.firebaseapp.com",
    projectId: "fantsy-net",
    databaseURL: "https://fantsy-net.firebaseio.com",
    storageBucket: "fantsy-net.appspot.com",
    messagingSenderId: "362409393660",
    appId: "1:362409393660:web:4d8465911d0fb0c3080679"
}

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

const app = firebase.initializeApp(FIREBASE_CONFIG);
const fireDb = getFirestore(app);
const storage = firebase.storage();

export { app, fireDb, storage }
