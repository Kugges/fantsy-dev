import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import "firebase/analytics";
import "firebase/compat/storage";
import "firebase/compat/database";

const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// INITIALIZE FIREBASE
if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
    // TODO ADD FOR GOOGLE ANALYTICS    
    // if (typeof window !== "undefined") {
    //     if ("measurementId" in FIREBASE_CONFIG) {
    //         firebase.analytics();

    //     }
    // }
}

const app = firebase.initializeApp(FIREBASE_CONFIG);
const fireDb = getFirestore(app);
const realDb = firebase.database();
const storage = firebase.storage();
const auth = getAuth();

export { app, fireDb, storage, auth, realDb }
