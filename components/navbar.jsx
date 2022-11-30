import React, { useState, useContext } from 'react'
import { AiOutlineMenu, AiOutlineClose, AiFillCaretDown } from 'react-icons/ai'
// import { useAuth } from "../auth"
import { AuthContext } from "../src/hook/auth"
import { FantsyContext } from "../src/hook/FantsyContext"
import Link from 'next/link'

import firebase from "firebase/compat/app"

import Image from 'next/image'
import logo from '../images/fantsy-logo-150x50.png'

const styles = {

    loginbutton: "bg-shade-800 py-2 px-5 cursor-pointer text-white font-bold rounded-lg hover:bg-fantsy-blue-600",
    logoutbutton: "bg-shade-800 py-2 px-5 cursor-pointer text-white font-bold rounded-lg hover:bg-shade-600",
    dropdownButton: "dropdown-toggle py-2 px-5 -mt-2 cursor-pointer",
    dropdownMenu: "drowndown-menu py-2 min-w-max hidden bg-white text-base z-50 float-left list-none text-left rounded-lg shadow-lg border-none"
}

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const { user } = useContext(AuthContext)
    const { currentLoggedUser } = useContext(FantsyContext)
    // console.log(user, "USER LOGGED IN")
    console.log(currentLoggedUser.email, "BUMM")




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
                        {/* <Link href={`/userProfile/${profile.email}`}>Profil</Link> */}
                    </li>
                    <li className="p-4 hover:text-white">
                        <Link href="/about">Über Fantsy</Link>
                    </li>
                    <li className="p-4">
                        <p>
                            {user ? user.email : <a href="/register"><span className="cursor-pointer hover:text-white">Register</span></a>}
                        </p>
                    </li>
                    <li className="p-4">
                        {user ?
                            <>
                                <button
                                    onClick={async () => {
                                        await firebase.auth().signOut();
                                        window.location.href = "/"
                                    }}>
                                    <span className={styles.logoutbutton}>Logout</span>
                                </button>
                                <button
                                 onClick={async () => {
                                    window.location.href = "/account"
                                }} 
                                className={styles.dropdownButton}>Mein Account</button>
                                <ul className={styles.dropdownMenu}>
                                </ul>
                            </>

                            : <button onClick={async () => {
                                window.location.href = "/login"
                            }}><span className={styles.loginbutton}>Login</span></button>
                        }
                    </li>
                    <li className="p-4">
                        <p>v0.1.8</p>
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
                                <div className="flex justify-center">
                                    <div>
                                        <button className={styles.dropdownButton}>Dropdown

                                        </button>
                                    </div>
                                </div>
                                : <button href="/login"><span className={styles.loginbutton}>Login</span></button>
                            }
                        </li>
                        <li className="p-4">
                            <p>
                                {user ? user.email : <a href="/register"><span className="cursor-pointer hover:text-white">Register</span></a>}
                            </p>
                        </li>
                        <li className="p-4">
                            <p>v0.1.8</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar