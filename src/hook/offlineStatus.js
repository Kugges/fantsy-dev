import firebase from "firebase/compat/app"
import { useContext } from "react";
import { AuthContext } from "./auth";

// Fetch the current user's ID from Firebase Authentication.
const { user } = useContext(AuthContext)
var currentUserId = user.uid

// Create a reference to this user's specific status node.
// This is where we will store data about being online/offline.
var userStatusDatabaseRef = firebase.database().ref('/status/' + currentUserId);
var userStatusFirestoreRef = firebase.firestore().doc('/profiles/' + currentUserId);

// We'll create two constants which we will write to 
// the Realtime database when this device is offline
// or online.
var isOfflineForDatabase = {
    state: "offline",
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

var isOnlineForDatabase = {
    state: "online",
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

// Create a reference to the special '.info/connected' path in 
// Realtime Database. This path returns `true` when connected
// and `false` when disconnected.
firebase.database().ref(".info/connected").on("value", function (snapshot) {
    // If we're not currently connected, don't do anything.
    if (snapshot.val() == false) {
        return;
    };

    // If we are currently connected, then use the 'onDisconnect()' 
    // method to add a set which will only trigger once this 
    // client has disconnected by closing the app, 
    // losing internet, or any other means.
    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
        
        // The promise returned from .onDisconnect().set() will
        // resolve as soon as the server acknowledges the onDisconnect() 
        // request, NOT once we've actually disconnected:
        // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

        // We can now safely set ourselves as 'online' knowing that the
        // server will mark us as offline once we lose connection.
        userStatusDatabaseRef.set(isOnlineForDatabase);
    })
})


// import firebase from "firebase/compat/app"
// import "firebase/compat/auth"
// import { fireDb } from "../../firebaseClient"
// import { collection, getDocs, getDoc, doc, where, query, } from "firebase/firestore"
// import { useContext } from "react"
// import { AuthContext } from "./auth"

// const { user } = useContext(AuthContext)
// const uid = user?.uid
// const updateUserStatus = async (uid, isOnline) => {
//     try {
//         const userRef = await getDocs(collection(fireDb, "profiles", uid))
//         const status = isOnline ? 'online' : 'offline';

//         await userRef.set({ status }, { merge: true });

//         const disconnect = firebase.database().ref()

//     } catch (error) {

//     }
// }