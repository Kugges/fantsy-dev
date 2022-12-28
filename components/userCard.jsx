import Link from 'next/link';
import React, { useContext, useEffect, useState, Suspense } from 'react'
import Image from 'next/image';
import { BsStarFill, BsCheck } from "react-icons/bs";
import { AuthContext } from '../src/hook/auth';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const styles = {
  userCard: "rounded-xl border-white cursor-pointer border-8 shadow-lg bg-white overflow-hidden hover:shadow-2xl",
}


const UserCard = ({ profile }) => {

  const { user } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true);

  const userStatus = profile.data?.state
  console.log("OFFLINE?", userStatus)

  const LoadingFallback = () => {
    <div className="bg-shade-200 aspect-square animate-pulse"></div>
  }

  return (
    <div className={styles.userCard} key={profile.id}>
    <BsCheck className={userStatus === "online" ? "bg-fantsy-green-500 w-8 h-8 text-white rounded-full absolute" : "hidden"} />

      {user ?
        <Link href={`/profile/${profile.id}`}>
          <Image
            src={profile?.data?.userProfileUrl}
            height={100}
            width={100}
            alt="profileImg"
            placeholder={LoadingFallback}
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
        <p className="pt-2 font-bold text-left text-md sm:text-lg text-shade-600">{profile?.data?.displayName}</p>
        <div className="flex items-center justify-between">
          <div className="flex">
            {profile?.data?.likesCount === 0 ?
              <BsStarFill className="text-shade-200 mr-1" size={25} /> :
              <BsStarFill className="text-fantsy-orange-500 mr-1" size={25} />}
            <p>{profile?.data?.likesCount}</p>
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