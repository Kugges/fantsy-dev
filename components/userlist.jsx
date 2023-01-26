import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { fireDb } from '../firebaseClient'
import UserCard from './userCard'
import UserCardSkell from './userCardSkell'
// import "flowbite"

const styles = {
    checkmark: "w-4 h-4 mr-3 cursor-pointer text-white accent-fantsy-orange-500 hover:border-fantsy-orange-500 focus:ring-fantsy-orange-500 ring-offset-1 focus:ring-2",
    dropBtn: "active:bg-shade-100 hover:bg-shade-50 p-1 rounded-full"
}

function UserList() {


    // GET ALL WORKER PROFILE DOCUMENTS    
    const [workerProfiles, setWorkerProfiles] = useState([])

    useEffect(() => {
        const getWorkerProfiles = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('workerProfile', '==', true)))
            // const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('workerProfile', '==', true), orderBy("location", "near")))
            console.log(querySnapshot, "CHECK OUT")
            setWorkerProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        getWorkerProfiles()
    }, [])


    const [isLoading, setIsLoading] = useState(true);

    // FILTER DROPDOWN TRIGGERS
    const [checkedIdentity, setCheckedIdentity] = useState(true);
    const [checkedAge, setCheckedAge] = useState(true);

    const handleCheckedIdentity = () => {
        setCheckedIdentity(!checkedIdentity);
    };


    // FILTER CHECKED
    const [checkedOnline, setCheckedOnline] = useState(false);
    const [checkedMale, setCheckedMale] = useState(false);
    const [checkedFemale, setCheckedFemale] = useState(false);
    const [checkedTrans, setCheckedTrans] = useState(false);



    const [filters, setFilter] = useState({
        online: true,
        male: true,
        female: true,
        trans: true
    })

    // const handleCheckedOnline = () => {
    //     setCheckedOnline(!checkedOnline);
    //     setFilter({
    //         online: !checkedOnline,
    //         male: checkedMale,
    //         female: checkedFemale,
    //         trans: checkedTrans
    //     })
    // };
    const handleCheckedMale = () => {
        setCheckedMale(!checkedMale);
        setFilter({
            online: checkedOnline,
            male: !checkedMale,
            female: checkedFemale,
            trans: checkedTrans
        })
    };
    const handleCheckedFemale = () => {
        setCheckedFemale(!checkedFemale);
        setFilter({
            online: checkedOnline,
            male: checkedMale,
            female: !checkedFemale,
            trans: checkedTrans
        })
    };
    const handleCheckedTrans = () => {
        setCheckedTrans(!checkedTrans);
        setFilter({
            online: checkedOnline,
            male: checkedMale,
            female: checkedFemale,
            trans: !checkedTrans
        })
    };

    let filteredProfiles = workerProfiles;
    if (!filters.online) {
        filteredProfiles = filteredProfiles.filter(profile => profile.data.state !== "online")
        // console.log("ONLINE USERS", filteredProfiles)
    }
    if (!filters.male) {
        filteredProfiles = filteredProfiles.filter(profile => profile.data.userGender !== "Männlich")
        // console.log("MÄNNER", filteredProfiles)
    }
    if (!filters.female) {
        filteredProfiles = filteredProfiles.filter(profile => profile.data.userGender !== "Weiblich")
        // console.log("FRAUEN", filteredProfiles)
    }
    if (!filters.trans) {
        filteredProfiles = filteredProfiles.filter(profile => profile.data.userGender !== "Divers")
        // console.log("TRANSEN", filteredProfiles)
    }

    if (!filters.online && !filters.trans && !filters.female && !filters.male) {
        filteredProfiles = workerProfiles
    }


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
    const profilesToRender = filteredProfiles?.slice(0, chunkSize * (loadedChunks + 1));

    const [replacedPlaceholders, setReplacedPlaceholders] = useState([]);


    return (
        <div className="w-full lg:w-4/5 mx-auto">
            {/*Overlay*/}
            <div className="grid grid-cols-6">
                <div className="col-span-1 mr-5 hidden sm:block">
                    {/* <FilterBar /> */}
                    <div className="w-full h-screen bg-white p-4 rounded-xl">
                        <div id="IDENTITY">
                            <div className="flex text-shade-500 items-center justify-between mb-1">
                                <h2 className="font-bold text-lg">Identität</h2>
                                <button className={styles.dropBtn} onClick={handleCheckedIdentity}>
                                    {checkedIdentity ?
                                        <FaCaretDown size={20} /> : <FaCaretUp size={20} />}
                                </button>
                            </div>
                            <div id="checkIdentity" className={checkedIdentity ? "block" : "hidden"}>
                            {/* <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedOnline}
                                        onChange={handleCheckedOnline}
                                    />
                                    <label>Gerade Online</label>
                                </div> */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedMale}
                                        onChange={handleCheckedMale}
                                    />
                                    <label>Männlich</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedFemale}
                                        onChange={handleCheckedFemale}
                                    />
                                    <label>Weiblich</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedTrans}
                                        onChange={handleCheckedTrans}
                                    />
                                    <label>Trans</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-5">
                    {/*Profiles List*/}
                    <div className="p-2 grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 text-center">
                        {/* {profilesToRender?.map(profile => {
                            return <LazyLoadComponent key={profile.id} placeholder={<UserCardSkell />}><UserCard profile={profile} /></LazyLoadComponent>
                        })} */}
                        {/* {[...Array(chunkSize)].map((_, i) => (

                            <LazyLoadComponent 
                            key={i}
                            onVisible={() => {
                                setReplacedPlaceholders(prevReplacedPlaceholders => [...prevReplacedPlaceholders, i]);
                            }}
                            >
                                {!replacedPlaceholders.includes(i) && <UserCardSkell />}
                            </LazyLoadComponent>

                        ))} */}
                        {profilesToRender?.map((profile) => (
                            <LazyLoadComponent key={profile.id} placeholder={<UserCardSkell />} >
                                <UserCard profile={profile} />
                            </LazyLoadComponent>
                        ))}
                        {/*USER CARD SKELLS*/}
                        {/* {isLoading ? <></> : [...Array(chunkSize)].map((_, i) => (

                            <LazyLoadComponent key={i}>
                                <UserCardSkell />
                            </LazyLoadComponent>

                        ))} */}

                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserList