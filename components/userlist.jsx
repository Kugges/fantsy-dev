import React, { useEffect, useState, useContext } from 'react'
import { FantsyContext } from '../src/hook/FantsyContext'
import UserCard from './userCard'
import FilterBar from './filterBar'
import firebase from 'firebase/compat/app'
import { AuthContext } from '../src/hook/auth'



function UserList() {

    const { workerProfiles } = useContext(FantsyContext);
    // console.log(profiles, "PROFILES IDS HERE")

    

    return (
        <div className="sm:w-2/3 mx-auto">
            {/*Overlay*/}
            <div className=" py-24 grid grid-cols-6">
                {/* <div className="col-span-1 mr-5 hidden sm:block">
                    <FilterBar />
                </div> */}
                <div className="col-span-6 sm:col-span-6">
                    {/*Profiles List*/}
                    <div className="p-2 grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 text-center">
                        {/* {data.map((profile) => {
                                return <UserCard profile={profile} key={profile.id} />
                            })} */}
                        {workerProfiles.map(profile => {
                            return <UserCard profile={profile} key={profile.id} />
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}





export default UserList