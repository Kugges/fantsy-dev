import React, { useEffect, useState } from "react"
import UserList from '../components/userlist'
import Image from 'next/image'
import logo from '../images/fantsy-logo-300x150.png'
import PushNotificationLayout from "../components/pushNotificationLayout"
import { getDocs, query, collection, where } from 'firebase/firestore'
import { fireDb } from "../firebaseClient";
import firebase from "firebase/compat/app"

export default function Home() {
  // export default function Home({ workerProfiles }) {

  // const [profiles, setProfiles] = useState([]);

  // useEffect(() => {
  //   setProfiles(JSON.parse(workerProfiles))
  // }, [workerProfiles])

  // firebase.firestore().collection('profiles')
  //       .where('state', '==', 'online')
  //       .onSnapshot(function(snapshot) {
  //           snapshot.docChanges().forEach(function(change) {
  //               if (change.type === 'added') {
  //                   var msg = 'User ' + change.doc.id + ' is online.';
  //                   console.log(msg);
  //               }
  //               if (change.type === 'removed') {
  //                   var msg = 'User ' + change.doc.id + ' is offline.';
  //                   console.log(msg);
  //               }
  //           });
  //       });



  return (
    <PushNotificationLayout>
      <>
        <div className="min-h-screen pt-20 sm:pt-40">
          <div className="flex flex-col sm:flex-row items-center justify-center">
            {/* <div>
              <h2 className="text-2xl text-center sm:text-left">Willkommen bei</h2>
            </div> */}
            <div>
              <Image
                src={logo}
                alt="fantsy logo"
                width={300}
                height={100}
                placeholder="empty"
                priority
              />
            </div>
          </div>
              <p className="text-center py-10 w-11/12 sm:w-1/3 mx-auto h-50 sm:h-auto text-sm sm:text-md">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
              At vero eos et accusam et justo duo dolores et ea rebum.</p>
          <UserList />
        </div>
      </>
    </PushNotificationLayout>
  );
}

// export async function getServerSideProps() {
//   try {

//     const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('workerProfile', '==', true)))
//     const queryData = querySnapshot.docs.map((profile) => ({
//       id: profile.id,
//       data: {
//         ...profile.data()
//       }
//     }))
//     const serializedData = JSON.stringify(queryData)
//     return {
//       props: { workerProfiles: serializedData }
//     }
//   } catch (error) {
//     console.error("FIRESTORE ERROR", error)
//     return {
//       props: { workerProfiles: null }
//     }
//   }
// }