import React, { useState, useEffect, createContext } from "react"
import nookies from "nookies"

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { realDb, fireDb } from "../../firebaseClient"
import { doc } from "firebase/firestore"


const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    // firebaseClient();
    const [user, setUser] = useState(null);

    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null);
                nookies.set(undefined, "token", "", {});
                return;
            }
            const token = await user.getIdToken();
            setUser(user);
            nookies.set(undefined, "token", token, {});
            console.log(user.uid, "USER ID HERE")

            // OFFLINE STATUS CHECK WITH REALTIME DB

            // Set the /status/:userId value to off- or online
            const userStatusDatabaseRef = realDb.ref(`/status/${user.uid}`)

            var isOfflineForDatabase = {
                state: "offline",
                state_last_changed: firebase.database.ServerValue.TIMESTAMP
            };
            var isOnlineForDatabase = {
                state: "online",
                state_last_changed: firebase.database.ServerValue.TIMESTAMP,
            };

            // firebase.database().ref(".info/connected").on("value", function (snapshot) {
            //     if (snapshot.val() == false) {
            //         return;
            //     }
            // });

            // SYNC WITH FIRESTORE DB
            // var userStatusFirestoreRef = doc(fireDb, "/profiles/" + user.uid)
            var userStatusFirestoreRef = firebase.firestore().doc("/profiles/" + user.uid)
            console.log("SCHNABBES", userStatusFirestoreRef)

            var isOfflineForFirestore = {
                state: "offline",
                state_last_changed: firebase.firestore.FieldValue.serverTimestamp(),
            };
            var isOnlineForFirestore = {
                state: "online",
                state_last_changed: firebase.firestore.FieldValue.serverTimestamp(),
            };

            if (user) {
                firebase.database().ref(".info/connected").on("value", function (snapshot) {
                    if (snapshot.val() == false) {

                        userStatusFirestoreRef.update(isOfflineForFirestore);
                        return;
                    }

                })

                // Remove the node whenever the cllient disconnects
                userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
                    userStatusDatabaseRef.set(isOnlineForDatabase);
                    userStatusFirestoreRef.update(isOnlineForFirestore);
                    console.log("On Disconnect function configured")
                });
            } 

        });
    }, []);

    return (<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>);
}




// export const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthProvider }

    // useEffect(() => {
    //     // Assuming user is logged in
    //     // const userId = auth().currentUser.uid
    //     // const userId = user?.uid

    //     const reference = realDb.ref(`/online/${user.uid}`)
    //     // console.log(`/online/${userId}`)

    //     // Set the /users/:userId value to true
    //     reference.set(true).then(() => console.log("Online presence set"))
    // }, [])