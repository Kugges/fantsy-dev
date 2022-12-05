import React from 'react'
import Image from 'next/image'

import { AiFillBell, AiFillStar } from "react-icons/ai";

import BannerImage from '../images/fantsy-banner.png'
import RatingBar from './ratingBar';

const styles = {
    wrapper: "py-20 mx-auto grid gap-4",
    profileBgContainer: "cursor-relative block w-full sm:h-80 bg-fantsy-orange-500 overflow-hidden z-10",
    profileDetails: "w-5/6 sm:w-2/3 h-screen grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-4 z-20 mx-auto",
    profileCard: "col-span-1 bg-fantsy-orange-200 rounded-xl p-8",
    profileContent: "col-span-1 sm:col-span-2 rounded-xl grid grid-rows-4 gap-4",
    profilePic: "rounded-full bg-white w-11/12 aspect-square mx-auto -mt-24 overflow-hidden border-8 border-white",
    // profileRating: "flex gap-1 text-fantsy-orange-500 justify-center items-center",
}

const UserProfileMain = ({ profile }) => {

    // console.log(profile, "YEAH MAN")
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
            <div className={styles.profileDetails}>
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
                            <p>Simmering 1110, Wien AT
                            </p>
                            <RatingBar />
                        </div>
                        <div className="mt-4">
                            <ul className="p-4">
                                <li className="flex my-4">
                                    <AiFillBell size={20} className="mr-4" />
                                    <p className="-mt-1">24 Jahre, Frau, Bisexuell</p>
                                </li>
                                <li className="flex my-4">
                                    <AiFillBell size={20} className="mr-4" />
                                    <p className="-mt-1">Athletisch, 170cm, 64kg</p>
                                </li>
                                <li className="flex my-4">
                                    <AiFillBell size={20} className="mr-4" />
                                    <p className="-mt-1">Come on in</p>
                                </li>
                                <li className="flex my-4">
                                    <AiFillBell size={20} className="mr-4" />
                                    <p className="-mt-1">Come on in</p>
                                </li>
                                <li className="flex my-4">
                                    <AiFillBell size={20} className="mr-4" />
                                    <p className="-mt-1">Come on in</p>
                                </li>
                                <li className="flex my-4">
                                    <AiFillBell size={20} className="mr-4" />
                                    <p className="-mt-1">Come on in</p>
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
}

export default UserProfileMain