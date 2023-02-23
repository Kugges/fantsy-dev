import Link from 'next/link';
import React, { useContext, useEffect, useState, Suspense } from 'react'
import Image from 'next/image';
import { BsStarFill, BsCheck } from "react-icons/bs";
import { AuthContext } from '../src/hook/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fireDb } from '../firebaseClient';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

const styles = {
  userCard: "rounded-xl border-white cursor-pointer border-8 shadow-lg bg-white overflow-hidden hover:shadow-2xl",
}


const UserCard = ({ profile }) => {

  const { user } = useContext(AuthContext)
  const profileEmail = profile?.data?.email;
  const [isLoading, setIsLoading] = useState(true);
  const [totalDates, setTotalDates] = useState("");

  const userStatus = profile.data?.state
  // console.log("OFFLINE?", profile?.data?.displayName, userStatus)

  const LoadingFallback = () => {
    <div className="bg-shade-200 aspect-square animate-pulse"></div>
  }


  useEffect(() => {
    if (profileEmail) {
      const getTotalDates = async () => {
        const totalUsersDates = await getDocs(query(collection(fireDb, "dates"), where("email", "array-contains", profileEmail)))
          .then(snapshot => snapshot.size);
        // console.log("how many dates?", totalUsersDates)
        const likesCount = profile?.data?.likesCount;
        const newLikesCount = (likesCount / totalUsersDates).toFixed(1);
        setTotalDates(newLikesCount)
      }
      getTotalDates();
    }
  },[])

  // console.log("TOTAL DATES", totalDates)

  return (
    <div className={styles.userCard} key={profile.id}>

      {user ?
        <Link href={`/profile/${profile.id}`}>
          <Image
            src={profile?.data?.userProfileUrl}
            height={100}
            width={100}
            alt="profileImg"
            placeholder={LoadingFallback}
            quality={100}
            className="h-auto w-full aspect-square mx-auto"
          />
        </Link>
        :
        <Link href="/not-authenticated">
          <Image
            src={profile.data.userProfileUrl}
            height={100}
            width={100}
            alt="profileImg"
            placeholder={LoadingFallback}
            className="h-auto w-full aspect-square mx-auto"
          />
        </Link>}
      <div>
        <div className="flex items-center pt-2">
          <p className="font-bold text-left text-md sm:text-lg mr-2 text-shade-600">{profile?.data?.displayName}</p>
          <div className={userStatus === "online" ? "bg-fantsy-green-500 w-3 h-3 rounded-full block" : "hidden"}>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {profile?.data?.likesCount === 0 ?
              <BsStarFill className="text-shade-200 mr-1" size={20} /> :
              <BsStarFill className="text-fantsy-orange-500 mr-1" size={20} />}
            {profile?.data?.likesCount === 0 ? <></> : <p>{totalDates}</p>}
          </div>
          <div>
            <p>{profile?.data?.userCity}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UserCard;