import React, { useContext, useEffect, useState } from 'react'

import UserProfileMain from '../../components/userProfileMain'
import { FantsyContext } from '../../src/hook/FantsyContext'
import { useRouter } from 'next/router'

const UserProfile = () => {
    const { profiles } = useContext(FantsyContext)
    const router = useRouter()
    const [profile, setProfile] = useState([])

    useEffect(() => {
        if (profiles.length === 0) {
            return
        }
        // console.log(router.query.slug, "++SLUG") //REMOVE FOR PROD

        setProfile(profiles.find(profile => profile.id === router.query.slug))
    }, [])

    return (
            <UserProfileMain profile={profile} />
    )
}

// export async function getServerSideProps(context) {
//     try {
//         const cookies = nookies.get(context);
//         const token = await verifyIdToken(cookies.token);
//         const { uid, email } = token;
//         console.log("User is authenticated for this page!");
//         return {
//             props: { session: `Your email is ${email} and your UID is ${uid}.` },

//         };
//     } catch (err) {
//         context.res.writeHead(302, { location: "/login" });
//         context.res.end();
//         return { props: [] };
//     }
// }

export default UserProfile