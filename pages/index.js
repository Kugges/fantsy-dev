import React, { useEffect, useState } from "react"
import UserList from '../components/userlist'
import Image from 'next/image'
import logo from '../images/fantsy-logo-300x150.png'
import PushNotificationLayout from "../components/pushNotificationLayout"
import { getDocs, query, collection, where } from 'firebase/firestore'
import { fireDb } from "../firebaseClient";

export default function Home({ workerProfiles }) {

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    setProfiles(JSON.parse(workerProfiles))
  }, [workerProfiles])
  
  return (
    <PushNotificationLayout>
      <>
        <div className="min-h-screen pt-40">
          <div className="flex items-center justify-center">
            <div>
              <Image
                src={logo}
                alt="fantsy logo"
                width="600px"
                height="200px"
                placeholder="empty"
                priority="eager"
              />
            </div>
            <div>
              <h2 className="text-2xl">Welcome!</h2>
              <p>Hello there boys and girls!</p>
            </div>
          </div>
          <UserList workerProfiles={profiles} />
        </div>
      </>
    </PushNotificationLayout>
  );
}

export async function getServerSideProps() {
  const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('workerProfile', '==', true)))
  console.log("Query", querySnapshot)
  const queryData = querySnapshot.docs.map((profile) => ({
    id: profile.id,
    data: {
        ...profile.data()
    }
  }))
  const serializedData = JSON.stringify(queryData)
  return {
    props: { workerProfiles: serializedData }
  }
}