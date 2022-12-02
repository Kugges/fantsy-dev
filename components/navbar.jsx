import React, { useState, useContext } from 'react'
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from 'react-icons/ai'
// import { useAuth } from "../auth"
import { AuthContext } from "../src/hook/auth"
import { FantsyContext } from "../src/hook/FantsyContext"
import Link from 'next/link'

import firebase from "firebase/compat/app"

import Image from 'next/image'
import logo from '../images/fantsy-logo-150x50.png'

const styles = {

    loginbutton: "bg-shade-800 py-2 px-5 cursor-pointer text-white font-bold rounded-lg hover:bg-fantsy-blue-600",
    logoutbutton: "py-2 px-5 cursor-pointer hover:text-white",
    dropdownButton: "dropdown-toggle flex items-center py-2 px-5 -mt-2 cursor-pointer hover:text-white",
    dropdownMenu: "dropdown-menu sm:absolute py-2 min-w-max bg-fantsy-orange-500 text-base z-20 list-none text-center rounded-none shadow-none ease-in duration-100 sm:rounded-lg sm:shadow-lg",
    menuLi: "px-10 py-2 hover:text-white"
}

const Navbar = () => {

    const [nav, setNav] = useState(false);
    const [innerNav, setinnerNav] = useState(false);

    // HANDLE MOBILE NAVBAR
    const handleNav = () => {
        setNav(!nav);
    };

    //HANDLE ACCOUNT DROPDOWN BAR
    const handleInnerNav = () => {
        setinnerNav(!innerNav);
    };

    const { user } = useContext(AuthContext)
    const { currentProfile } = useContext(FantsyContext)
    // console.log(user, "USER LOGGED IN")
    // console.log(currentProfile.data.userGender, "GIVE ME THE FIELD")

    return (
        <div className="fixed left-0 h-30 w-full z-50 ease-in duration-300 bg-fantsy-orange-500">
            <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-black">
                <a href="/">
                    <Image
                        src={logo}
                        alt="fantsy logo"
                        width="150px"
                        height="50px"
                        placeholder="empty"
                        priority="eager"
                    />
                </a>
                <ul className="hidden sm:flex">
                    <li className="p-4 hover:text-white">
                        <Link href="/">Fantsys</Link>
                    </li>
                    <li className="p-4 hover:text-white">
                        <Link href="/about">Über Fantsy</Link>
                    </li>
                    <li className="p-4">
                        {user ?
                            <>
                                <button
                                    onClick={handleInnerNav}
                                    className={styles.dropdownButton}>
                                    <AiOutlineUser size={20} className="mr-2" /><span>
                                        Mein Account</span>
                                </button>
                                <ul className={innerNav ? styles.dropdownMenu : "hidden absolute text-center ease-in duration-100"}>
                                    <li className="px-10 py-2">Eingeloggt als <br></br>
                                        <span className="text-xs">{user.email}</span>
                                    </li>
                                    <hr className="text-fantsy-orange-700"></hr>
                                    <li className={styles.menuLi} onClick={handleInnerNav}>
                                        <Link href={`/userProfile/${currentProfile.id}`}>Mein Profil</Link>
                                    </li>
                                    <li className={styles.menuLi} onClick={handleInnerNav}>
                                        <Link href={`/userProfile/${currentProfile.id}`}>Subscription</Link>
                                    </li>
                                    <li className={styles.menuLi} onClick={handleInnerNav}>
                                        <Link href="/account">Account</Link>
                                    </li>
                                    <li className={styles.menuLi} onClick={handleInnerNav}>
                                        <Link href={`/userProfile/${currentProfile.id}`}>Einstellungen</Link>
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

                            : <button onClick={async () => {
                                window.location.href = "/login"
                            }}><span className={styles.loginbutton}>Login</span></button>
                        }
                    </li>
                    <li className="p-4">
                        {user ? <></> : <Link href="/register"><span className="cursor-pointer hover:text-white">Register</span></Link>}
                    </li>
                    <li className="p-4">
                        <p>v0.1.9.1</p>
                    </li>
                </ul>

                {/* Mobile Button */}
                <div onClick={handleNav} className="block sm:hidden z-10 cursor-pointer">
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>

                {/* Mobile Menu */}
                <div
                    className={
                        nav
                            ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen ease-in duration-300 text-center bg-fantsy-orange-500"
                            : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen ease-in duration-300 text-center bg-fantsy-orange-500"
                    }
                >
                    <ul>
                        <li onClick={handleNav} className="p-4 text-4xl hover:text-white">
                            <Link href="/">Fantsys</Link>
                        </li>
                        <li onClick={handleNav} className="p-4 text-4xl hover:text-white">
                            <Link href="/profile">Profil</Link>
                        </li>
                        <li onClick={handleNav} className="p-4 text-4xl hover:text-white">
                            <Link href="/about">Über Fantsy</Link>
                        </li>
                        <li className="p-4">
                            {user ?
                                <>
                                    <button
                                        onClick={handleInnerNav}
                                        className={styles.dropdownButton}>
                                        <AiOutlineUser size={20} className="mr-2" /><span>
                                            Mein Account</span>
                                    </button>
                                    <ul className={innerNav ? styles.dropdownMenu : "opacity-0 sm:absolute hidden text-center ease-in duration-100"}>
                                        <li className="px-10 py-2">Eingeloggt als <br></br>
                                            <span className="text-xs">{user.email}</span>
                                        </li>
                                        <hr className="text-fantsy-orange-700"></hr>
                                        <li className={styles.menuLi}>
                                            <Link href={`/userProfile/${currentProfile.id}`}>Mein Profil</Link>
                                        </li>
                                        <li className={styles.menuLi}>
                                            <Link href={`/userProfile/${currentProfile.id}`}>Subscription</Link>
                                        </li>
                                        <li className={styles.menuLi}>
                                            <Link href={`/userProfile/${currentProfile.id}`}>Account</Link>
                                        </li>
                                        <li className={styles.menuLi}>
                                            <Link href={`/userProfile/${currentProfile.id}`}>Einstellungen</Link>
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

                                : <button onClick={async () => {
                                    window.location.href = "/login"
                                }}><span className={styles.loginbutton}>Login</span></button>
                            }
                        </li>
                        <li className="p-4">
                            <p>
                                {user ? <></> : <a href="/register"><span className="cursor-pointer hover:text-white">Register</span></a>}
                            </p>
                        </li>
                        <li className="p-4">
                            <p>v0.1.9.1</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar