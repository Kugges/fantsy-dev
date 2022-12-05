import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
// import { getDoc, doc } from 'firebase/firestore';
// import { fireDb } from '../firebaseClient';
import { AiFillStar } from "react-icons/ai";

// import RatingBar from './ratingBar';

const styles = {
  userCard: "rounded-xl shadow-lg bg-white mx-4 mb-10 overflow-hidden",
}

const UserCard = ({ profile }) => {

  // const [profileData, setProfileData] = useState(null)

  // useEffect(() => {
  //   const getProfileData = async () => {
  //     console.log(
  //       (await getDoc(doc(fireDb, "profiles", profile.data.username))).data(), ":DATA YO")

  //     setProfileData(
  //       (await getDoc(doc(fireDb, "profiles", profile.data.username))).data()
  //     )
  //   }

  //   getProfileData()
  // }, [profile])

  return (
    <div className={styles.userCard}>
      <Link href={`/profile/${profile.id}`}>
        <Image
          src={profile.data.userProfileUrl}
          height={100}
          width={100}
          alt="profileImg"
          className="h-auto w-full aspect-square mx-auto hover:opacity-90"
        />
      </Link>
      <div className="pb-4">
        <p className="pt-4 text-md sm:text-xl lg:text-2xl">{profile.data.displayName}</p>
        {/* SHOW TIMESTAMP */}
        {/* <p>{new Date(profile.data.postedOn).toLocaleString("de-DE", {
                  day: "numeric",
                  month: "short",
                })}</p> */}
        <div className="flex items-center justify-center">
          <span className="text-fantsy-orange-500"><AiFillStar size={25} /></span>
          <p>{profile.data.likesCount}</p>
        </div>
      </div>
    </div>

  )
}

export default UserCard;