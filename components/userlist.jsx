import React, { useEffect, useState, useContext } from 'react'
import { FantsyContext } from '../src/hook/FantsyContext'
import UserCard from './userCard'
import UserCardSkell from './userCardSkell'
import { LazyLoadComponent } from 'react-lazy-load-image-component'

function UserList({ workerProfiles }) {

    // const { workerProfiles } = useContext(FantsyContext);
    // const { workerProfiles } = props;

    // SET LOADING OF EVERY 8 USERCARDS ON SCROLL
    const chunkSize = 8;
    const [loadedChunks, setLoadedChunks] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY + window.innerHeight;
            const docHeight = document.body.scrollHeight;
            if (scrollTop >= docHeight - 100) {
                setLoadedChunks(prevLoadedChunks => prevLoadedChunks + 1);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    })
    const profilesToRender = workerProfiles?.slice(0, chunkSize * (loadedChunks + 1));

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
                        {profilesToRender?.map(profile => {
                            return <LazyLoadComponent placeholder={<UserCardSkell />}><UserCard profile={profile} key={profile.id} /></LazyLoadComponent>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserList