import Link from 'next/link';
import React, { useContext, useEffect, useState, Suspense } from 'react'
import Image from 'next/image';
import { BsStarFill, BsCheck } from "react-icons/bs";
import { AuthContext } from '../src/hook/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fireDb } from '../firebaseClient';
import logo from '../images/peach-logo.png'
import { builder } from '@invertase/image-processing-api';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

const styles = {
  userCard: "rounded-xl border-white cursor-pointer border-8 shadow-lg bg-white overflow-hidden hover:shadow-2xl",
  currentUserCard: "rounded-xl border-fantsy-orange-200 cursor-pointer border-8 shadow-lg bg-fantsy-orange-200 overflow-hidden hover:shadow-2xl",
  userCardImage: "h-auto w-full aspect-square mx-auto rounded-md overflow-hidden"
}


const UserCard = ({ profile, vipProfiles }) => {

  const { user } = useContext(AuthContext)
  const profileEmail = profile?.data?.email;
  const [isLoading, setIsLoading] = useState(true);
  const [totalDates, setTotalDates] = useState("");

  const userImage = profile?.data?.userProfileUrl
  const userStatus = profile.data?.state
  const userIsPremium = profile.data?.premiumUser

  const userId = user?.uid
  // console.log("OFFLINE?", profile?.data?.displayName, userStatus)

  const LoadingFallback = () => {
    <div className="bg-shade-200 aspect-square animate-pulse"></div>
  }

  // console.log("userImage", userImage)


  const getUrl = (source) => {
    const URL = `https://europe-west3-fantsy-net.cloudfunctions.net/ext-image-processing-api-handler/process?operations=`;
  
    const options = builder()
      .input({
        type: "gcs",
        source: encodeURIComponent(source),
      })
      .output({ webp: {} })
      .toEncodedString();
  
    return `${URL}${options}`;
  };

  useEffect(() => {
    if (profileEmail) {
      const getTotalDates = async () => {
        const totalUsersDates = await getDocs(query(collection(fireDb, "dates"), where("email", "array-contains", profileEmail), where("archived", "==", true)))
          .then(snapshot => snapshot.size);
        // console.log("how many dates?", totalUsersDates)
        const likesCount = profile?.data?.likesCount;
        const newLikesCount = (likesCount / totalUsersDates).toFixed(1);
        setTotalDates(newLikesCount)
      }
      getTotalDates();
    }
  }, [])

  // console.log("TOTAL DATES", totalDates)

  return (
    <div className={profile.id === userId ? styles.currentUserCard : styles.userCard} key={profile.id}>
      {/* <div className={styles.userCard} key={profile.id}> */}
          {userIsPremium === true ?
            <Image
              src={logo}
              width={50}
              height={50}
              alt="premiumlogo"
              className="absolute"
            />
            :
            <>
            </>}
      {user ?
        <Link href={`/profile/${profile.id}`}>
          <Image
            src={getUrl(userImage)}
            height={100}
            width={100}
            alt="profileImg"
            placeholder={LoadingFallback}
            quality={100}
            className={userIsPremium === false ? styles.userCardImage : "h-auto w-full aspect-square mx-auto rounded-md overflow-hidden"}
          />
        </Link>
        :
        <Link href="/not-authenticated">
          <Image
            src={getUrl(userImage)}
            height={100}
            width={100}
            alt="profileImg"
            placeholder={LoadingFallback}
            quality={100}
            className={userIsPremium === false ? styles.userCardImage : "h-auto w-full aspect-square mx-auto rounded-md overflow-hidden"}
          />
        </Link>}
      <div>
        <div className="flex items-center pt-2">
          <p className={userIsPremium === false ? "font-bold text-left text-md sm:text-lg text-shade-600" : "font-bold text-left text-md sm:text-lg text-fantsy-orange-500"}>{profile?.data?.displayName}</p>
          {/* <div className={userIsPremium === true ? "bg-fantsy-orange-500 w-3 h-3 rounded-full block" : "hidden"}>
          </div> */}
          <div className={userStatus === "online" ? "bg-fantsy-green-500 ml-1 w-3 h-3 rounded-full block" : "hidden"}>
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