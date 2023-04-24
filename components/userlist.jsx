import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { GoSettings } from 'react-icons/go'
import { FaCaretDown, FaCaretUp, FaSearch } from "react-icons/fa"
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { fireDb } from '../firebaseClient'
import UserCard from './userCard'
import UserCardSkell from './userCardSkell'
// import "flowbite"

const styles = {
    checkmark: "w-3 h-3 mr-3 cursor-pointer text-white accent-fantsy-orange-500 hover:border-fantsy-orange-500 focus:ring-fantsy-orange-500 ring-offset-1 focus:ring-2",
    dropBtn: "active:bg-shade-100 hover:bg-shade-50 p-1 rounded-full"
}

function UserList() {



    const [searchQuery, setSearchQuery] = useState("");
    const [searchQueryLocation, setSearchQueryLocation] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const tagsList = "blond, rothaarig, brünette, schwarzehaare, amateur, studentin, student, trans, domina, fetisch, bdsm, bizarr, tabulos, girlfriendsex, teen, schwul, lesbisch, bisexuell, anal, grosserarsch, petite, kurvig, schlank, sportlich, hourglas, bbw, dünn, grossebrust, kleinebrust, kleinerarsch, pornstar, camgirl, milf, reif, sklave, sklavin, hardcore, safersex, tattoos, piercings, arsch, rimming, blowjob, deepthroat, cim, cof, hartersex, vanilla, naturfranzösisch, französisch, griechisch, spanisch, küssen, rollenspiele, sextoys, spielzeug, vomit, spitting, kavier, natursekt, goldenshower, privat, onenightstand, sugarbabe, sugardaddy, swinger, pornstarexperience, girlfriendexperience, kuscheln, lingerie, strapse, highheels, strümpfe, kostüme, softcore, hobbyhure, fotos, videos, nymphomanisch, dominant, devot, dunkelhäutig, latina, südeuropäisch, mitteleuropäisch, orientalisch, asiatisch, lateinamerikanisch, mischtyp, westeuropäisch, osteuropäisch, ebony, rasiert, unrasiert, behaart, raucher, nichtraucher, natürlich, silikon, outcall, incall, vaginalsex, taschengeld, paar, dreier, erotschemassage, thaimassage, massage".split(",")

    // GET ALL WORKER PROFILE DOCUMENTS    
    const [workerProfiles, setWorkerProfiles] = useState([])

    // GET ALL WORKER PROFILES
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('workerProfile', '==', true)))
            const workerProfilesQuery = querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            });
            setWorkerProfiles(workerProfilesQuery);
        }
        fetchData()
    }, [])

    // GET ALL ONLINE USERS
    const [onlineProfiles, setOnlineProfiles] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('state', '==', 'online'), where('workerProfile', '==', true)))
            setOnlineProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        fetchData()
    }, [])

    // GET ALL VIP USERS
    const [vipProfiles, setVipProfiles] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('premiumUser', '==', true), where('workerProfile', '==', true)))
            setVipProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        fetchData()
    }, [])

    // GET ALL MALES
    const [maleProfiles, setMaleProfiles] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('userGender', '==', 'Männlich'), where('workerProfile', '==', true)))
            setMaleProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        fetchData()
    }, [])

    // GET ALL FEMALES
    const [femaleProfiles, setFemaleProfiles] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('userGender', '==', 'Weiblich'), where('workerProfile', '==', true)))
            setFemaleProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        fetchData()
    }, [])

    // GET ALL TRANS
    const [transProfiles, setTransProfiles] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('userGender', '==', 'Trans'), where('workerProfile', '==', true)))
            setTransProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        fetchData()
    }, [])

    // GET ALL DIVERSE
    const [diverseProfiles, setDiverseProfiles] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('userGender', '==', 'Divers'), where('workerProfile', '==', true)))
            setDiverseProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        fetchData()
    }, [])

    // GET ALL COUPLES
    const [coupleProfiles, setCoupleProfiles] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('userGender', '==', 'Paar'), where('workerProfile', '==', true)))
            setCoupleProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        fetchData()
    }, [])

    // GET ALL HETEROS
    const [heteroProfiles, setHeteroProfiles] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('userSex', '==', 'Heterosexuell'), where('workerProfile', '==', true)))
            setHeteroProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        fetchData()
    }, [])

    // GET ALL HOMOS
    const [homoProfiles, setHomoProfiles] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('userSex', '==', 'Homosexuell'), where('workerProfile', '==', true)))
            setHomoProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        fetchData()
    }, [])

    // GET ALL BI
    const [biProfiles, setBiProfiles] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('userSex', '==', 'Bisexuell'), where('workerProfile', '==', true)))
            setBiProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        fetchData()
    }, [])


    const [isLoading, setIsLoading] = useState(true);

    // FILTER DROPDOWN TRIGGERS
    const [filterDropDown, setFilterDropDown] = useState(true);
    const [checkedIdentity, setCheckedIdentity] = useState(true);
    const [checkedTags, setCheckedTags] = useState(false);
    const [checkedInterests, setCheckedInterests] = useState(true);
    const [checkedAge, setCheckedAge] = useState(true);

    const handleFilterDropDown = () => {
        setFilterDropDown(!filterDropDown);
    };

    const handleCheckedTags = () => {
        setCheckedTags(!checkedTags);
    };

    const handleCheckedIdentity = () => {
        setCheckedIdentity(!checkedIdentity);
    };

    const handleCheckedInterests = () => {
        setCheckedInterests(!checkedInterests);
    };


    // FILTER CHECKED
    const [checkedOnline, setCheckedOnline] = useState(false);
    const [checkedMale, setCheckedMale] = useState(false);
    const [checkedFemale, setCheckedFemale] = useState(false);
    const [checkedTrans, setCheckedTrans] = useState(false);
    const [checkedDiverse, setCheckedDiverse] = useState(false);
    const [checkedCouple, setCheckedCouple] = useState(false);

    const [checkedSexHetero, setCheckedSexHetero] = useState(false);
    const [checkedSexHomo, setCheckedSexHomo] = useState(false);
    const [checkedSexBi, setCheckedSexBi] = useState(false);

    // const heteroProfiles = workerProfiles.filter(profile => profile.data.userSex === "Heterosexuell");

    const [filters, setFilters] = useState({
        online: false,
        gender: false,
        sex: false,
    })

    useEffect(() => {
        setFilteredData(filterData(workerProfiles, searchQuery, searchQueryLocation, filters));
    }, [workerProfiles, searchQuery, searchQueryLocation, filters])

    const handleCheckedOnline = () => {
        setCheckedOnline(!checkedOnline);
        setFilters({
            online: checkedOnline ? '' : 'online'
        })
    };

    const handleCheckedMale = () => {
        setCheckedMale(!checkedMale);
        setFilters({
            ...filters,
            gender: checkedMale ? '' : 'Männlich'
        })
    };

    const handleCheckedFemale = () => {
        setCheckedFemale(!checkedFemale);
        setFilters({
            ...filters,
            gender: checkedFemale ? '' : 'Weiblich'
        })
    };

    const handleCheckedTrans = () => {
        setCheckedTrans(!checkedTrans);
        setFilters({
            ...filters,
            gender: checkedTrans ? '' : 'Trans'
        })
    };

    const handleCheckedDiverse = () => {
        setCheckedDiverse(!checkedDiverse);
        setFilters({
            ...filters,
            gender: checkedDiverse ? '' : 'Divers'
        })
    };

    const handleCheckedCouple = () => {
        setCheckedCouple(!checkedCouple);
        setFilters({
            ...filters,
            gender: checkedCouple ? '' : 'Divers'
        })
    };



    const handleCheckedSexHetero = () => {
        setCheckedSexHetero(!checkedSexHetero);
        setFilters({
            ...filters,
            sex: checkedSexHetero ? '' : 'Heterosexuell'
        })
    };

    const handleCheckedSexHomo = () => {
        setCheckedSexHomo(!checkedSexHomo);
        setFilters({
            ...filters,
            sex: checkedSexHomo ? '' : 'Homosexuell'
        })
    };

    const handleCheckedSexBi = () => {
        setCheckedSexBi(!checkedSexBi);
        setFilters({
            ...filters,
            sex: checkedSexBi ? '' : 'Bisexuell'
        })
    };


    const filterData = (workerProfiles, searchQuery, searchQueryLocation, filters) => {
        if (!searchQuery && !searchQueryLocation && !filters.gender && !filters.online && !filters.sex) {
            return workerProfiles;
        }

        let filteredProfiles = workerProfiles;

        if (searchQuery) {
            // Split the search query by commas to get multiple tags
            const tags = searchQuery.split(",").map(tag => tag.trim().toLowerCase());
            filteredProfiles = filteredProfiles.filter(profile => {
                const userTags = profile.data?.userInterests || []; // Ensure tags array exists
                // Check if all tags match the user's tags
                return tags.every(tag => userTags.some(userTag => userTag.toLowerCase().includes(tag)));
            });
        }

        if (searchQueryLocation) {
            const locationQuery = searchQueryLocation.trim().toLowerCase();
            filteredProfiles = filteredProfiles.filter(profile => {
                const userLocation = profile.data?.userCity?.toLowerCase(); // Ensure user location exists
                // Check if the user's location matches the search query
                return userLocation.includes(locationQuery);
            });
        }

        if (filters.gender) {
            filteredProfiles = filteredProfiles.filter(profile => profile.data.userGender === filters.gender);
        }

        if (filters.online) {
            filteredProfiles = filteredProfiles.filter(profile => profile.data.state === "online");
        }

        if (filters.sex) {
            filteredProfiles = filteredProfiles.filter(profile => profile.data.userSex === filters.sex);
        }

        return filteredProfiles;
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
    const profilesToRender = filteredData?.slice(0, chunkSize * (loadedChunks + 1));

    const [replacedPlaceholders, setReplacedPlaceholders] = useState([]);


    return (
        <div className="w-11/12 sm:w-2/3 mb-20 mx-auto">
            {/*Overlay*/}
            <div className="grid grid-cols-5">
                {/* <FilterBar /> */}
                <div className="col-span-5 sm:col-span-1 mb-10">

                    <div onClick={handleFilterDropDown} className={filterDropDown ? "flex items-center justify-between bg-white p-2 rounded-xl sm:hidden active:bg-fantsy-orange-100" : "flex items-center justify-between bg-white p-2 rounded-t-xl sm:hidden border-b border-shade-200 active:bg-fantsy-orange-100"}>
                        <div className="flex items-center gap-2">
                            <GoSettings size={20} />
                            <p>Filter</p>
                        </div>
                        <button className="active:bg-shade-100 hover:bg-shade-50 p-1">
                            {filterDropDown ?
                                <FaCaretDown size={20} /> : <FaCaretUp size={20} />}
                        </button>
                    </div>
                    <div id="IDENTITY" className={!filterDropDown ? "w-full block bg-white p-2 sm:p-4 rounded-b-xl sm:rounded-xl" : "w-full hidden sm:block overflow-hidden bg-white p-2 sm:p-4 rounded-xl"}>
                        <div>
                            <div className="flex text-shade-500 items-center justify-between">
                                <h2 className="font-bold text-lg">Nach Tags suchen</h2><FaSearch size={20} />
                            </div>
                            <p className="mb-1 text-shade-300">Trenne Tags mit Beistrich ( , )</p>
                            <div className="flex items-center mb-3">
                                <textarea
                                    placeholder="Suche nach..."
                                    value={searchQuery}
                                    type="text"
                                    className="focus:outline-fantsy-orange-500 hover:outline-fantsy-orange-200 px-2 py-1 w-full bg-shade-50 rounded-lg"
                                    style={{ height: "auto", minHeight: "50px" }}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex text-shade-500 items-center justify-between mb-1 active:text-fantsy-orange-500" onClick={handleCheckedTags}>
                                <h2 className="font-semibold text-md">Tag-Vorschläge</h2>
                                <button className={styles.dropBtn}>
                                    {!checkedTags ?
                                        <FaCaretDown size={20} /> : <FaCaretUp size={20} />}
                                </button>
                            </div>
                            <div id="checkTags" className={checkedTags ? "block" : "hidden"}>
                                <ul className="flex items-center flex-wrap">
                                    {tagsList.map((tag, index) => (
                                        <li className="mr-2 bg-fantsy-orange-100 mb-2 px-2 rounded-full text-fantsy-orange-500 cursor-pointer hover:bg-fantsy-orange-500 hover:text-white" key={index}>{tag}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex text-shade-500 items-center justify-between mb-1">
                                <h2 className="font-bold text-lg">Nach Ort suchen</h2><FaSearch size={20} />
                            </div>
                            <div className="flex items-center mb-3">
                                <input
                                    placeholder="Suche nach..."
                                    value={searchQueryLocation}
                                    type="text"
                                    className="focus:outline-fantsy-orange-500 hover:outline-fantsy-orange-200 px-2 py-1 w-full bg-shade-50 rounded-lg"
                                    onChange={(e) => setSearchQueryLocation(e.target.value)}
                                />
                                {/* <button className="ml-2 disabled:opacity-20" onClick={filterData} disabled={!searchQuery && !filters.gender && !filters.online && !filters.sex}><FaSearch size={20} /></button> */}
                            </div>
                            <div className="flex text-shade-500 items-center justify-between mb-1 active:text-fantsy-orange-500" onClick={handleCheckedIdentity}>
                                <h2 className="font-bold text-lg">Identität</h2>
                                <button className={styles.dropBtn}>
                                    {!checkedIdentity ?
                                        <FaCaretDown size={20} /> : <FaCaretUp size={20} />}
                                </button>
                            </div>
                            <div id="checkIdentity" className={checkedIdentity ? "block" : "hidden"}>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedOnline}
                                        onChange={handleCheckedOnline}
                                    />
                                    <label className="text-sm">Gerade Online <span className="text-shade-300">({onlineProfiles.length})</span></label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedMale}
                                        onChange={handleCheckedMale}
                                    />
                                    <label className="text-sm">Männlich <span className="text-shade-300">({maleProfiles.length})</span></label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedFemale}
                                        onChange={handleCheckedFemale}
                                    />
                                    <label className="text-sm">Weiblich <span className="text-shade-300">({femaleProfiles.length})</span></label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedTrans}
                                        onChange={handleCheckedTrans}
                                    />
                                    <label className="text-sm">Trans <span className="text-shade-300">({transProfiles.length})</span></label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedDiverse}
                                        onChange={handleCheckedDiverse}
                                    />
                                    <label className="text-sm">Divers <span className="text-shade-300">({diverseProfiles.length})</span></label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedCouple}
                                        onChange={handleCheckedCouple}
                                    />
                                    <label className="text-sm">Paar <span className="text-shade-300">({coupleProfiles.length})</span></label>
                                </div>
                            </div>
                        </div>
                        <div id="INTERESTS">
                            <div className="flex text-shade-500 items-center justify-between mb-1 active:text-fantsy-orange-500" onClick={handleCheckedInterests}>
                                <h2 className="font-bold text-lg">Sexualität</h2>
                                <button className={styles.dropBtn}>
                                    {!checkedInterests ?
                                        <FaCaretDown size={20} /> : <FaCaretUp size={20} />}
                                </button>
                            </div>
                            <div id="checkSex" className={checkedInterests ? "block" : "hidden"}>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedSexHetero}
                                        onChange={handleCheckedSexHetero}
                                    />
                                    <label className="text-sm">Heterosexuell <span className="text-shade-300">({heteroProfiles.length})</span></label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedSexHomo}
                                        onChange={handleCheckedSexHomo}
                                    />
                                    <label className="text-sm">Homosexuell <span className="text-shade-300">({homoProfiles.length})</span></label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className={styles.checkmark}
                                        checked={checkedSexBi}
                                        onChange={handleCheckedSexBi}
                                    />
                                    <label className="text-sm">Bisexuell <span className="text-shade-300">({biProfiles.length})</span></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-4 sm:ml-5">
                    <h1 className="font-bold text-2xl mb-4">Premium Fantsys</h1>
                    {/*VIP Profiles List*/}
                    <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 text-center mb-20">    
                        {vipProfiles?.map((profile) => (
                            <LazyLoadComponent key={profile.id} placeholder={<UserCardSkell />} >
                                <UserCard profile={profile} className="bg-fantsy-orange-500 text-white"/>
                            </LazyLoadComponent>
                        ))}

                    </div>
                    {/*Profiles List*/}
                    <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 text-center">
                        {profilesToRender?.map((profile) => (
                            <LazyLoadComponent key={profile.id} placeholder={<UserCardSkell />} >
                                <UserCard profile={profile} />
                            </LazyLoadComponent>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserList