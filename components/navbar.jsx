import React, { useState, useContext, useEffect } from 'react'
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from 'react-icons/ai'
import { AuthContext } from "../src/hook/auth"
import Link from 'next/link'

import firebase from "firebase/compat/app"

import Image from 'next/image'
import logo from '../images/peach-logo.png'
import { collection, doc, getDoc } from 'firebase/firestore'
import { fireDb } from '../firebaseClient'
import { useCollection, useDocument, useDocumentData } from 'react-firebase-hooks/firestore'
import Modal from "../components/modal"
import Login from '../pages/login'
import { FantsyContext } from '../src/hook/FantsyContext'
import { createCheckoutSession } from '../stripe/createCheckoutSession'
import usePremiumStatus from '../stripe/usePremiumStatus'

const styles = {

    loginbutton: "bg-shade-800 py-2 px-5 cursor-pointer text-white font-bold rounded-lg hover:bg-fantsy-blue-600",
    logoutbutton: "py-2 px-5 cursor-pointer hover:text-white",
    dropdownButton: "dropdown-toggle flex items-center px-5 cursor-pointer hover:text-white",
    dropdownMenu: "dropdown-menu sm:absolute py-2 min-w-max bg-fantsy-orange-500 text-base z-50 list-none text-center rounded-none shadow-none ease-in duration-100 sm:rounded-lg sm:shadow-lg",
    menuLi: "px-10 py-2 hover:text-white text-sm"
}

const Navbar = () => {

    const [nav, setNav] = useState(false);

    // HANDLE MOBILE NAVBAR
    const handleNav = () => {
        setNav(!nav);
    };

    const [showModal, setShowModal] = useState(false)

    const { user } = useContext(AuthContext)
    const { profiles } = useContext(FantsyContext)

    // CHECK IF USER IS STRIPE PREMIUM
    const userIsPremium = usePremiumStatus(user)

    // const [snapshot, loading, error] = useCollection(collection(fireDb, "profiles"));
    // const profiles = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const [userProfile, setUserProfile] = useState([])

    // useEffect(() => {
    //     const getUserProfile = async () => {
    //         const userProfileRef = await getDoc(doc(fireDb, "profiles", user.uid))
    //         const profileData = userProfileRef?.data()
    //         console.log("YEAH", profileData)
    //         setUserProfile(profileData)
    //     }
    //     getUserProfile();
    // }, [])

    const UserDropDownMobile = ({ profile }) => {
        const [innerNav, setinnerNav] = useState(false);

        //HANDLE ACCOUNT DROPDOWN BAR
        const handleInnerNav = () => {
            setinnerNav(!innerNav);
        };


        return (
            <>
                <button
                    onClick={handleInnerNav}
                    className={styles.dropdownButton}>
                    <AiOutlineUser size={20} className="mr-2" /><span>
                        Mein Account</span>
                </button>
                <ul className={styles.dropdownMenu}>
                    <li className="px-10 py-2">Eingeloggt als <br></br>
                        <span className="text-xs">{profile.data.displayName}</span>
                    </li>
                    <hr className="text-fantsy-orange-700"></hr>
                    <li className={styles.menuLi}>
                        <Link href={`/profile/${profile.id}`}>Mein Profil</Link>
                    </li>
                    <li className={styles.menuLi}>
                        <Link href="/dashboard/account">Account</Link>
                    </li>
                    <li className={styles.menuLi}>
                        <button
                            onClick={async () => {
                                await firebase.auth().signOut();
                                window.location.href = "/"
                            }}>
                            <span className={styles.logoutbutton}>Logout</span>
                        </button>
                    </li>
                </ul>
            </>
        )
    }

    const UserDropDown = ({ profile }) => {
        const [innerNav, setinnerNav] = useState(false);

        //HANDLE ACCOUNT DROPDOWN BAR
        const handleInnerNav = () => {
            setinnerNav(!innerNav);
        };

        return (

            <>
                <button
                    onClick={handleInnerNav}
                    className={styles.dropdownButton}>
                    <AiOutlineUser size={20} className="mr-2" /><span>
                        Mein Account</span>
                </button>
                <ul className={innerNav ? styles.dropdownMenu : "hidden absolute text-center ease-in duration-100"}>
                    <li className="px-10 py-2">Eingeloggt als <br></br>
                        <span className="text-xs">{profile.data.displayName}</span>
                    </li>
                    <hr className="text-fantsy-orange-700"></hr>
                    <li className={styles.menuLi} onClick={handleInnerNav}>
                        <Link href={`/profile/${profile.id}`}>Mein Profil</Link>
                    </li>
                    <li className={styles.menuLi} onClick={handleInnerNav}>
                        <Link href="/dashboard/account">Account</Link>
                    </li>
                    {!userIsPremium ? (

                        <li className={styles.menuLi} onClick={() => createCheckoutSession(user.uid)}>
                            <p>Upgrade to premium!</p>
                        </li>
                    ) : (
                        <h2>COOKIE</h2>
                    )}
                    <li className={styles.menuLi}>
                        <button
                            onClick={async () => {
                                await firebase.auth().signOut();
                                window.location.href = "/"
                            }}>
                            <span className={styles.logoutbutton}>Logout</span>
                        </button>
                    </li>
                </ul>
            </>
        )
    }

    return (
        <>
            <div className="fixed left-0 h-16 py-1 w-full z-10 ease-in duration-300 bg-fantsy-orange-500">
                <p className="absolute z-50">v0.6.0</p>
                <div className="w-11/12 sm:max-w-[1240px] m-auto flex justify-between items-center text-black">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="fantsy logo"
                            width={55}
                            height={55}
                            placeholder="empty"
                            priority="eager"
                        />
                    </Link>
                    {/* ----------------DESKTOP MENU---------------- */}
                    <ul className="hidden sm:flex sm:items-center">
                        <li className="p-4 hover:text-white">
                            <Link href="/">Fantsys</Link>
                        </li>
                        <li className="p-4">
                            {user ? <>
                                {profiles?.filter(profile => profile.id.includes(user.uid))
                                    .map(profile => {
                                        return <UserDropDown profile={profile} key={profile.id} />
                                    })}</>

                                : <button onClick={() => setShowModal(true)}><span className={styles.loginbutton}>Login</span></button>
                            }
                        </li>
                        <li className="p-4">
                            {user ? <></> : <Link href="/join/register"><span className="cursor-pointer hover:text-white">Register</span></Link>}
                        </li>
                    </ul>

                    {/* ----------------MOBILE DROPDOWN BUTTON---------------- */}
                    <div onClick={handleNav} className="block sm:hidden z-10 cursor-pointer">
                        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                    </div>

                    {/* ----------------MOBILE MENU---------------- */}
                    <div
                        className={
                            nav
                                ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen ease-in duration-300 text-center bg-fantsy-orange-500"
                                : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen ease-in duration-300 text-center bg-fantsy-orange-500"
                        }
                    >
                        <ul>
                            <li onClick={handleNav} className="p-4 text-xl hover:text-white">
                                <Link href="/">Fantsys</Link>
                            </li>
                            <li onClick={handleNav} className="p-4 text-xl hover:text-white">
                                <Link href="/about">Über Fantsy</Link>
                            </li>
                            <li className="p-4">
                                {user ? <>
                                {profiles?.filter(profile => profile.id.includes(user.uid))
                                        .map(profile => {
                                            return <UserDropDownMobile profile={profile} key={profile.id} />
                                        })}</>

                                    : <button onClick={() => setShowModal(true)}><span className={styles.loginbutton}>Login</span></button>
                                }
                            </li>
                            <li className="p-4">
                                <p>
                                    {user ? <></> : <a href="/join/register"><span className="cursor-pointer hover:text-white">Register</span></a>}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Modal isVisible={showModal} onClose={() => { setShowModal(false) }}>
                <Login />
            </Modal>
        </>

    )
}

export default Navbar