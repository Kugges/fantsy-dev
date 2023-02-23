import Container from '../../../components/container'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../src/hook/auth'
import { FantsyContext } from '../../../src/hook/FantsyContext';
import { getDoc, doc, query, collection, where } from 'firebase/firestore';
import { fireDb } from '../../../firebaseClient';
import firebase from 'firebase/compat/app';
import Account from '../components/account';
import * as geofire from 'geofire-common';

const index = () => {

    const { user } = useContext(AuthContext);
    const userId = user?.uid
    // console.log(user)

    // const { currentProfile } = useContext(FantsyContext)
    const [currentProfile, setCurrentProfile] = useState([])

    // GET USERS GEO LOCATION
    const [location, setLocation] = useState(null);
    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const geohash = geofire.geohashForLocation([latitude, longitude]);
                    const profileRef = firebase.firestore().collection("profiles").doc(userId);
                    const batch = firebase.firestore().batch();

                    batch.update(profileRef, {
                        location: new firebase.firestore.GeoPoint(latitude, longitude),
                        geohash: geohash
                    });

                    try {
                        // Commit the batch
                        await batch.commit();
                        setLocation({ latitude, longitude });
                        console.log("Document's Geopoint & Geohash updated!");
                    } catch (error) {
                        console.error("Error updating document: ", error);
                    }
                });
            }
        };

        getLocation();
    }, [userId]);

    useEffect(() => {
        const currentUser = user?.uid

        async function getCurrentProfile() {
            try {
                const snapshot = await firebase.firestore().collection("profiles").doc(currentUser).get()
                console.log(snapshot, "WUPP")
                setCurrentProfile(snapshot.data())
            } catch (error) {
                console.error(error)
            }
        };
        getCurrentProfile()
    }, [user])

    console.log("PROFILE HERE", currentProfile)

    return (
        <Container>
            <Account currentProfile={currentProfile} />
        </Container>
    )
}

export default index

