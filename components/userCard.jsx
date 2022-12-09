import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { AiFillStar } from "react-icons/ai";

const styles = {
  userCard: "rounded-xl border-white border-8 shadow-lg bg-white overflow-hidden",
}

const UserCard = ({ profile }) => {

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
      <div>
        <p className="pt-2 font-bold text-left text-md sm:text-lg text-shade-600">{profile.data.displayName}</p>
        <div className="flex items-center justify-between">
          <div className="flex">   
          {profile.data.likesCount === 0 ? 
          <AiFillStar className="text-shade-200 mr-1" size={25} /> :          
          <AiFillStar className="text-fantsy-orange-500 mr-1" size={25} /> }         
          <p>{profile.data.likesCount}</p>
          </div>
          <div>  
            <p>{profile.data.userPostcode}, {profile.data.userCity} </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UserCard;