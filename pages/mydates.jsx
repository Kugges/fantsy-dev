import React, { useContext, useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fireDb } from '../firebaseClient';
import Container from "../components/container"
import { AuthContext } from '../src/hook/auth'
import DateToRate from '../components/dateToRate';

const MyDates = () => {
    const { user } = useContext(AuthContext)
    const userEmail = user?.email
    const [profile, setProfile] = useState("")

    const [dateSnapshot] = useCollection(collection(fireDb, "dates"));
    const dates = dateSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    useEffect(() => {
        const getProfile = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('email', '==', userEmail)))
            // console.log("gimme PROFILES NOW", querySnapshot)
            setProfile(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            })[0])
        }
        getProfile();
        // console.log("userPROFILE?", profile)

    }, [])


    return (
        <Container>
            <div className="text-center">
                <h1 className="text-4xl font-bold">Meine Dates</h1>
                <div>
                    {dates?.filter(date => date?.email?.includes(profile?.data?.email)).length > 0 ?
                        dates?.filter(date => date?.email?.includes(profile?.data?.email)).map((date) => (
                            <DateToRate profile={profile} date={date} key={date.id} />
                        )) :
                        <div className="mt-16 mb-4">
                            <h2 className="text-xl font-semibold">Du hast noch keine Dates!</h2>
                            <p>Das kannst du aber schnell ändern, such dir schnell und einfach Fantsys aus!</p>
                            <a href="/">
                                <button className="bg-fantsy-blue-400 hover:bg-fantsy-blue-500 py-2 px-4 rounded-lg text-white font-semibold mt-8">Fantsy suchen</button>
                            </a>
                        </div>
                    }
                </div>
            </div>

        </Container>
    )
}

export default MyDates