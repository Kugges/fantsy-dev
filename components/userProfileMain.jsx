import React, { useContext, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

import { AiFillEdit, AiOutlineWoman, AiOutlineMan, AiOutlineTag, AiFillStar, AiOutlineUpload } from "react-icons/ai";
import { BsStarFill, BsCheck, BsChatDots } from "react-icons/bs";
import { BiBody, BiWorld } from "react-icons/bi"

import { useCollection, useCollectionData, useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc, getDocs, query, addDoc, where } from 'firebase/firestore';
import { fireDb } from '../firebaseClient';
import { AuthContext } from '../src/hook/auth';
// import UserProfileDetails from './userProfileDetails';
import Modal from "../components/modal"
import { toast } from "react-toastify"
import DatePost from './datePost';
import DateRequest from './dateRequest';
import { useRouter } from 'next/router'

const styles = {
    wrapper: "py-16 mx-auto grid gap-4",
    profileBgContainer: "cursor-relative block w-full sm:h-96 bg-fantsy-orange-500 overflow-hidden",
    profileDeets: "pt-40 w-5/6 md:w-4/5 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 mx-auto",
    workerProfileCard: "col-span-1 bg-fantsy-orange-200 rounded-xl p-8",
    profileCard: "col-span-1 bg-fantsy-blue-200 rounded-xl p-8",
    profileContent: "col-span-1 sm:col-span-2 rounded-xl gap-4",
    profilePic: "rounded-lg bg-white w-11/12 p-2 aspect-square mx-auto -mt-24",
    profileGallery: "rounded-lg bg-white p-2",
    imageUploadBtn: "cursor-pointer block w-full text-sm text-slate-500 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fantsy-green-200 file:text-fantsy-green-500 hover:file:bg-fantsy-green-500 hover:file:text-white",
    imgUpload: "mt-4 max-w-max mx-auto py-2 px-4 flex items-center bg-fantsy-green-400 hover:bg-fantsy-green-500 text-white font-bold disabled:font-normal disabled:text-shade-300 disabled:bg-shade-50 rounded-full",
    galleryImg: "col-span-1 rounded-lg overflow-hidden bg-white p-2 pb-10 shadow-lg",
    // profileRating: "flex gap-1 text-fantsy-orange-500 justify-center items-center",
}

const UserProfileMain = ({ profile }) => {    

    const router = useRouter()

    const dateString = profile.data?.userBirthday;
    // console.log(dateString, "DATE")
    const userStatus = profile.data?.state;

    const [showModal, setShowModal] = useState(false)

    function calcAge() {
        var birthday = + new Date(dateString);
        return ~~((Date.now() - birthday) / (31557600000));
    }

    const goToAccount = () => {
        router.push("/dashboard/account")
    }

    const { user } = useContext(AuthContext)
    const [snapshot] = useCollection(collection(fireDb, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)));

    const [dateSnapshot] = useCollection(collection(fireDb, "dates"));
    const dates = dateSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // const query = collection(fireDb, `profiles/${user.uid}/details`);
    // const [docs, loading, error] = useCollectionData(query);

    const isWorker = profile.data?.workerProfile;
    const profileEmail = profile?.data?.email;
    const showInterestCheckboxes = profile.data?.userInterests;
    const showInterestSoftcoreCheckboxes = profile.data?.userInterestsSoftcore;
    const profilePrice = profile?.data?.workerPrices;
    // console.log("CHECKERS", showInterestCheckboxes)
    // console.log("DATES", dates)
    // console.log("PRICES", profilePrice)

    const [totalDates, setTotalDates] = useState("");
    useEffect(() => {
        if (profileEmail) {
            const getTotalDates = async () => {
              const totalUsersDates = await getDocs(query(collection(fireDb, "dates"), where("email", "array-contains", profileEmail)))
                .then(snapshot => snapshot.size);
              // console.log("how many dates?", totalUsersDates)
              const likesCount = profile?.data?.likesCount;
              const newLikesCount = (likesCount / totalUsersDates).toFixed(1);
              setTotalDates(newLikesCount)
            }
            getTotalDates();
          }
    }, [profile?.data?.likesCount])

    const startChat = async () => {
        // const input = prompt("Enter Email of chat recipient");
        if (!chatExists(profileEmail) && (profileEmail != user.email)) {
            await addDoc(collection(fireDb, "chats"), {
                users: [user.email, profileEmail],
                pending: true,
                initiator: user.email
            }).then(() => {
                toast.success("Chatanfrage gestellt!");
            })
        } else {
            toast.error("Chatanfrage existiert bereits!");
        }
    }


    if (isWorker === true) {
        return (
            <div className={styles.wrapper}>

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
                                className="aspect-square"
                            />
                            <div className="text-center mt-1">
                                <div className="flex items-center justify-center">
                                    <h1 className="text-4xl">{profile.data?.displayName}</h1>
                                    <div className={userStatus === "online" ? "bg-fantsy-green-500 ml-2 pr-4 text-white flex items-center min-w-max rounded-full" : "hidden"}><BsCheck size={30} />Online</div>
                                </div>
                                <p>{profile.data?.userPostcode}, {profile.data?.userCity} {profile.data?.userCountry}
                                </p>
                                <div className="inline-block">
                                    <div className="flex items-center">
                                        {profile?.data?.likesCount === 0 ?
                                            <BsStarFill className="text-shade-200 mr-1" size={20} /> :
                                            <BsStarFill className="text-fantsy-orange-500 mr-1" size={20} />}
                                        {profile?.data?.likesCount === 0 ? <p>Keine Bewertung</p> : <p>{totalDates}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            {profile.id !== user.uid ?
                                <div className="flex mt-4 mx-auto gap-2 justify-center">
                                    <div
                                        onClick={() => startChat()}
                                        className="border-fantsy-blue-500 border-2 px-4 py-2 text-fantsy-blue-500 rounded-full cursor-pointer hover:bg-fantsy-blue-500 hover:text-white flex items-center"
                                    >Chatanfrage senden
                                    </div>
                                    <div
                                        onClick={() => setShowModal(true)}
                                        className="border-fantsy-orange-500 border-2 px-4 py-2 text-fantsy-orange-500 rounded-full cursor-pointer hover:bg-fantsy-orange-500 hover:text-white flex items-center">
                                        Date vereinbaren
                                    </div>
                                </div> :
                                <></>}
                            <div>
                                <ul className="p-4">
                                    <li className="flex my-4">
                                        {profile.data?.userGender === "Weiblich" ?
                                            <AiOutlineWoman size={20} className="mr-4" /> :
                                            <AiOutlineMan size={20} className="mr-4" />}
                                        <p className="-mt-1">{calcAge()} Jahre, {profile.data?.userGender}, {profile.data?.userSex}</p>
                                    </li>
                                    <li className="flex my-4">
                                        <BiBody size={20} className="mr-4" />
                                        <p className="-mt-1">{profile.data?.userStature}, {profile.data?.userSize} cm, {profile.data?.userWeight} kg</p>
                                    </li>
                                    <li className="flex my-4">
                                        <BiWorld size={20} className="mr-4" />
                                        <p className="-mt-1">{profile.data?.userOrigin} ({profile.data?.userBodyType})</p>
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
                                <div className="mt-4 grid grid-rows-2 grid-cols-4 gap-4">
                                    {profilePrice ?
                                        Object.keys(profilePrice)
                                            .filter(key => profilePrice[key] !== '')
                                            .map(key => <p className="col-span-2">{key}: <span className="font-bold">{profilePrice[key]} €</span></p>)
                                        :
                                        <p className="col-span-4 text-center">Keine Preisinformationen vorhanden!</p>
                                    }
                                </div>

                            </div>
                        </div>



                    </div>
                    <div className={styles.profileContent}>

                        <div className="p-4">
                            {/* IMAGE GALLERY */}
                            {profile.id === user.uid ?                             
                            <button className="p-2 rounded-lg flex items-center hover:bg-white my-2" onClick={goToAccount}>
                                <AiFillEdit className="mr-2 text-shade-500" size={20}/>
                                <p>Profil bearbeiten</p>
                            </button>
                            :
                            <>
                            </>}
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                                <div className={styles.galleryImg}>
                                    <Image
                                        src={profile.data?.userImage1}
                                        height={300}
                                        width={300}

                                    />
                                </div>
                                <div className={styles.galleryImg}>
                                    <Image
                                        src={profile.data?.userImage2}
                                        height={300}
                                        width={300}

                                    />
                                </div>
                                <div className={styles.galleryImg}>
                                    <Image
                                        src={profile.data?.userImage3}
                                        height={300}
                                        width={300}

                                    />
                                </div>
                                <div className={styles.galleryImg}>
                                    <Image
                                        src={profile.data?.userImage4}
                                        height={300}
                                        width={300}
                                    />
                                </div>


                            </div>

                        </div>
                        <div className="p-4">
                            <h1 className="text-4xl">Über mich</h1>
                            <p className="mt-4 text-left">{profile.data?.bio}
                            </p>
                            {/* <UserProfileDetails/> */}

                        </div>
                        <div className="p-4">
                            <h1 className="text-4xl">Was ich anbiete</h1>
                            <div className="grid grid-cols-6 gap-4 mt-4">
                                <h2 className="text-right col-span-6 sm:col-span-1 font-bold text-shade-600">Ich suche</h2>
                                <div className="gap-1 col-span-6 sm:col-span-5 items-center">

                                    {/* LIST USER INTERESTS */}
                                    {showInterestCheckboxes?.map((check) => (
                                        <div className="text-fantsy-orange-500 inline-block bg-fantsy-orange-200 py-1 px-2 mr-2 mb-2 rounded-full text-sm" key={check.id}>{check}</div>
                                    ))}
                                </div>
                                <h2 className="text-right col-span-6 sm:col-span-1 font-bold text-shade-600">Softcore</h2>
                                <div className="gap-1 col-span-6 sm:col-span-5 items-center">

                                    {/* LIST USER INTERESTS */}
                                    {showInterestSoftcoreCheckboxes?.map((check) => (
                                        <div className="text-fantsy-orange-500 inline-block bg-fantsy-orange-200 py-1 px-2 mr-2 mb-2 rounded-full text-sm" key={check.id}>{check}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h1 className="text-4xl">Meine Dates</h1>
                            {/* LIST USERS DATES */}
                            {/* {dates?.map((date) => (
                                <DatePost profile={profile} date={date} key={date.id} />
                            ))} */}
                            {dates?.filter(date => date?.email?.includes(profile?.data?.email)).map((date) => (
                                <DatePost profile={profile} date={date} key={date.id} />
                            ))}
                        </div>

                    </div>

                </div>
                <Modal isVisible={showModal} onClose={() => { setShowModal(false) }}>
                    <DateRequest profile={profile} user={user} />
                </Modal>
            </div>
        )
    } else {

        return (
            <div className={styles.wrapper}>

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
                                <h1 className="text-xl sm:text-4xl">{profile.data?.displayName}</h1>
                                <p>{profile.data?.userPostcode}, {profile.data?.userCity} {profile.data?.userCountry}
                                </p>
                                <div className="inline-block">
                                    <div className="flex items-center">
                                        <AiFillStar
                                            size={20}
                                            className="text-fantsy-orange-500"
                                        />
                                        <p>{totalDates}</p>
                                    </div>
                                </div>
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
                                        <p className="-mt-1">{profile.data?.userStature}, {profile.data?.userSize} cm, {profile.data?.userWeight} kg</p>
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
                            {/* <UserProfileDetails /> */}
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