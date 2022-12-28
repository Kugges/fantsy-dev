import { collection } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { fireDb } from '../firebaseClient'
import { AuthContext } from '../src/hook/auth'

export default function UserProfileDetails() {
    const { user } = useContext(AuthContext)

    const query = collection(fireDb, `profiles/${user.uid}/details`);
    const [docs, loading, error] = useCollectionData(query);
    return (
        <>
        {loading && "Loading ..."}
            {docs?.map((doc) =>
                <div key={user.uid}>
                    {doc.bio}
                    {doc.likesCount}
                </div>
            )[0]}
        </>
    )

}