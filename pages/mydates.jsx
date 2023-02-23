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
            console.log("gimme PROFILES NOW", querySnapshot)
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
        <div>
            <h1 className="text-4xl text-center font-bold">Meine Dates</h1>
            <div>
            {dates?.filter(date => date?.email?.includes(profile?.data?.email)).map((date) => (
                                <DateToRate profile={profile} date={date} key={date.id} />
                            ))}
            </div>
        </div>

    </Container>
  )
}

export default MyDates