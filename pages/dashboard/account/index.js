import Container from '../../../components/container'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../src/hook/auth'
import { FantsyContext } from '../../../src/hook/FantsyContext';
import { getDoc, doc, query, collection, where } from 'firebase/firestore';
import { fireDb } from '../../../firebaseClient';
import firebase from 'firebase/compat/app';
import Account from '../components/account';

const index = () => {

    const { user } = useContext(AuthContext);
    // console.log(user)

    // const { currentProfile } = useContext(FantsyContext)
    const [currentProfile, setCurrentProfile] = useState([])

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

