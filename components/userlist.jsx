import React, { useEffect, useState, useContext } from 'react'
import { FantsyContext } from '../src/hook/FantsyContext'
// import { collection, getDocs } from 'firebase/firestore'
// import { fireDb } from '../firebaseClient'
import UserCard from './userCard'
import FilterBar from './filterBar'

import Image from 'next/image'
import logo from '../images/fantsy-logo-300x150.png'


const styles = {
    landingContainer: "flex items-center justify-center",
}

function UserList() {

    const { profiles } = useContext(FantsyContext);
    // console.log(profiles, "PROFILES IDS HERE")

    return (
        <div className="h-full w-11/12 pt-40 mx-auto">
            {/*Overlay*/}
            <div className={styles.landingContainer}>
                <div>
                    <Image
                        src={logo}
                        alt="fantsy logo"
                        width="600px"
                        height="200px"
                        placeholder="empty"
                        priority="eager"
                    />
                </div>
                <div>
                    <h2 className="text-2xl">Welcome!</h2>
                    <p>Hello there boys and girls!</p>
                </div>
            </div>
            <div className=" py-24 grid grid-cols-6">
                <div className="col-span-1 mr-5">
                    <FilterBar />
                </div>
                <div className="col-span-5">
                    {/*Profiles List*/}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 text-center">
                        {/* {data.map((profile) => {
                                return <UserCard profile={profile} key={profile.id} />
                            })} */}
                        {profiles.map(profile => {
                            return <UserCard profile={profile} key={profile.id} />
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}





export default UserList