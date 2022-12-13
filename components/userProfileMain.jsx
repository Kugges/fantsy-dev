import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import { AiFillBell, AiOutlineWoman, AiOutlineMan, AiOutlineTag } from "react-icons/ai";
import { BiBody, BiWorld } from "react-icons/bi"
import { BsChatDots } from "react-icons/bs"

import BannerImage from '../images/fantsy-banner.png'
import RatingBar from './ratingBar';
import { useCollection, useCollectionData, useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc, getDocs, query } from 'firebase/firestore';
import { fireDb } from '../firebaseClient';
import { AuthContext } from '../src/hook/auth';
import UserProfileDetails from './userProfileDetails';

const styles = {
    wrapper: "py-24 mx-auto grid gap-4",
    profileBgContainer: "cursor-relative block w-full sm:w-2/3 sm:mx-auto sm:rounded-lg sm:mt-5 sm:h-96 bg-fantsy-orange-500 overflow-hidden",
    profileDeets: "w-5/6 sm:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-4 mx-auto",
    workerProfileCard: "col-span-1 bg-fantsy-orange-200 rounded-xl p-8",
    profileCard: "col-span-1 bg-fantsy-blue-200 rounded-xl p-8",
    profileContent: "col-span-1 sm:col-span-2 rounded-xl grid grid-rows-4 gap-4",
    profilePic: "rounded-full bg-white w-11/12 aspect-square mx-auto -mt-24 overflow-hidden border-8 border-white",
    // profileRating: "flex gap-1 text-fantsy-orange-500 justify-center items-center",
}



const UserProfileMain = ({ profile }) => {

    const dateString = profile.data?.userBirthday;
    // console.log(dateString, "DATE")

    function calcAge() {
        var birthday = + new Date(dateString);
        return ~~((Date.now() - birthday) / (31557600000));
    }


    const { user } = useContext(AuthContext)

    const query = collection(fireDb, `profiles/${user.uid}/details`);
    const [docs, loading, error] = useCollectionData(query);

    const isWorker = profile.data?.workerProfile;

    if (isWorker === true) {
        return (
            <div className={styles.wrapper}>

                <div className={styles.profileBgContainer}>
                    <Image
                        src={BannerImage}
                        alt="profile background"
                        layout="responsive"
                        width={100}
                        height={100}
                        priority="eager"
                    />
                </div>
                <div className={styles.profileDeets}>
                    <div className={styles.workerProfileCard}>
                        <div className={styles.profilePic}>
                            <Image
                                src={profile.data?.userProfileUrl}
                                alt="profile image"
                                layout="responsive"
                                width={100}
                                height={100}
                                priority="eager"
                            />
                        </div>
                        <div className="mt-4">
                            <div className=" text-center">
                                <h1 className="text-4xl">{profile.data?.displayName}</h1>
                                <p>{profile.data?.userPostcode}, {profile.data?.userCity} {profile.data?.userCountry}
                                </p>
                                <RatingBar />
                            </div>
                            <div className="mt-4">
                                <ul className="p-4">
                                    <li className="flex my-4">
                                        {profile.data?.userGender === "Weiblich" ?
                                            <AiOutlineWoman size={20} className="mr-4" /> :
                                            <AiOutlineMan size={20} className="mr-4" />}
                                        <p className="-mt-1">{calcAge()} Jahre, {profile.data?.userGender}, {profile.data?.userSex}</p>
                                    </li>
                                    <li className="flex my-4">
                                        <BiBody size={20} className="mr-4" />
                                        <p className="-mt-1">Athletisch, 170cm, 64kg</p>
                                    </li>
                                    <li className="flex my-4">
                                        <BiWorld size={20} className="mr-4" />
                                        <p className="-mt-1">Polen (Osteuropäisch)</p>
                                    </li>
                                    <li className="flex my-4">
                                        <BsChatDots size={20} className="mr-4" />
                                        <p className="-mt-1">Englisch, Deutsch, Polnisch</p>
                                    </li>
                                    <li className="flex my-4">
                                        <AiOutlineTag size={20} className="mr-4" />
                                        <p className="-mt-1">Rasiert, keine Tattos, Piercing</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <h2 className="text-2xl">Preise</h2>
                                <div className=" mt-4 grid grid-rows-2 grid-cols-4 gap-4">
                                    <p>30 min:</p>
                                    <p>50 €</p>
                                    <p>1 std:</p>
                                    <p>100 €</p>
                                    <p>2 std:</p>
                                    <p>200 €</p>
                                    <p>3 std:</p>
                                    <p>300 €</p>
                                </div>

                            </div>
                        </div>



                    </div>
                    <div className={styles.profileContent}>

                        <div className="p-4">
                            <h1 className="text-4xl">Bildergalerie</h1>

                        </div>
                        <div className="p-4">
                            <h1 className="text-4xl">Über mich</h1>
                            <p className="mt-4 text-left">{profile.data?.bio}
                            </p>
                            <UserProfileDetails/>

                        </div>
                        <div className="p-4">
                            <h1 className="text-4xl">Was ich anbiete</h1>
                            <div className="grid grid-rows-4 grid-cols-6 gap-4 mt-4">
                                <p className="text-right col-span-1">Klassisch</p>
                                <p className="text-left col-span-5 text-fantsy-orange-500 hover:underline">Klassisch</p>
                                <p className="text-right col-span-1">Klassisch</p>
                                <p className="text-left col-span-5 text-fantsy-orange-500 hover:underline">Klassisch</p>
                                <p className="text-right col-span-1">Klassisch</p>
                                <p className="text-left col-span-5 text-fantsy-orange-500 hover:underline">Klassisch</p>
                                <p className="text-right col-span-1">Klassisch</p>
                                <p className="text-left col-span-5 text-fantsy-orange-500 hover:underline">Klassisch</p>

                            </div>
                        </div>
                        <div className="p-4">
                            <h1 className="text-4xl">Meine Dates</h1>
                        </div>

                    </div>

                </div>
            </div>
        )
    } else {

        return (
            <div className={styles.wrapper}>
                <div className={styles.profileBgContainer}>
                    <Image
                        src={BannerImage}
                        alt="profile background"
                        layout="responsive"
                        width={100}
                        height={100}
                        priority="eager"
                    />
                </div>
                <div className={styles.profileDeets}>
                    <div className={styles.profileCard}>
                        <div className={styles.profilePic}>
                            <Image
                                src={profile.data?.userProfileUrl}
                                alt="profile image"
                                layout="responsive"
                                width={100}
                                height={100}
                                priority="eager"
                            />
                        </div>
                        <div className="mt-4">
                            <div className=" text-center">
                                <h1 className="text-4xl">{profile.data?.displayName}</h1>
                                <p>{profile.data?.userPostcode}, {profile.data?.userCity} {profile.data?.userCountry}
                                </p>
                                <RatingBar />
                            </div>
                            <div className="mt-4">
                                <ul className="p-4">
                                    <li className="flex my-4">
                                        {profile.data?.userGender === "Weiblich" ?
                                            <AiOutlineWoman size={20} className="mr-4" /> :
                                            <AiOutlineMan size={20} className="mr-4" />}
                                        <p className="-mt-1">{calcAge()} Jahre, {profile.data?.userGender}, {profile.data?.userSex}</p>
                                    </li>
                                    <li className="flex my-4">
                                        <BiBody size={20} className="mr-4" />
                                        <p className="-mt-1">Athletisch, 170cm, 64kg</p>
                                    </li>
                                    <li className="flex my-4">
                                        <BiWorld size={20} className="mr-4" />
                                        <p className="-mt-1">Polen (Osteuropäisch)</p>
                                    </li>
                                    <li className="flex my-4">
                                        <BsChatDots size={20} className="mr-4" />
                                        <p className="-mt-1">Englisch, Deutsch, Polnisch</p>
                                    </li>
                                    <li className="flex my-4">
                                        <AiOutlineTag size={20} className="mr-4" />
                                        <p className="-mt-1">Rasiert, keine Tattos, Piercing</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className={styles.profileContent}>
                        <div className="p-4">
                            <h1 className="text-4xl">Über mich</h1>
                            <p className="mt-4 text-left">
                                {profile.data?.bio}
                            </p>
                            <UserProfileDetails />
                        </div>
                        <div className="p-4">
                            <h1 className="text-4xl">Meine Dates</h1>
                        </div>

                    </div>

                </div>
            </div>
        )
    }


}

export default UserProfileMain