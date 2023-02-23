import React, { useContext, useEffect, useState, useRef } from 'react'
import { AiOutlineClose, AiOutlineSend, AiFillMessage, AiOutlineCaretRight, AiOutlineCaretLeft } from 'react-icons/ai'
import { BiChevronRight, BiChevronLeft } from "react-icons/bi"
import { BsChatDots, BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs"
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { fireDb } from '../../firebaseClient'
import { addDoc, collection, deleteDoc, getDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { AuthContext } from '../../src/hook/auth'
import getOtherEmail from '../../utils/getOtherEmail'
import ChatCard from '../../components/chatCard'

import Image from 'next/image'
import prepic from "../../images/profile-starter.png"

const styles = {
    sidebarBtn: "text-black cursor-pointer active:bg-fantsy-orange-600 hover:bg-fantsy-orange-600 p-1 rounded-full",
    sidebarBtnRow: "flex fixed gap-2 right-5 top-4 z-40 invisible sm:visible"
}


export default function Chat() {

    const { user } = useContext(AuthContext);
    const [snapshot, loading, error] = useCollection(collection(fireDb, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)));

    // const startChat = async () => {
    //     const input = prompt("Enter Email of chat recipient");
    //     if (!chatExists(input) && (input != user.email)) {
    //         await addDoc(collection(fireDb, "chats"), { users: [user.email, input] })
    //     }
    // }

    const ChatRequest = ({ chat }) => {

        // GET THE OTHER USERS EMAIL AND THEN THEIR PROFILE DOC
        const otherUser = getOtherEmail(chat.users, user);
        const [otherProfile, setOtherProfile] = useState([])
        useEffect(() => {
            const getOtherProfile = async () => {
                const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where("email", "==", otherUser)))
                // console.log(querySnapshot, "WUPPINGER")
                setOtherProfile(querySnapshot.docs?.map(doc => {
                    return {
                        id: doc.id,
                        data: {
                            ...doc.data()
                        }
                    }
                })[0])
            }
            getOtherProfile()
        }, [])

        const acceptChatRequest = async () => {
            const asd = chat.id;
            await updateDoc(doc(fireDb, "chats", asd), {
                pending: false,
            })
        }

        const declineChatRequest = async () => {
            const asd = chat.id;
            await deleteDoc(doc(fireDb, "chats", asd))
        }

        return (
            <li className="hover:bg-shade-50 px-3 py-3 border-b border-shade-100 cursor-pointer flex items-center">
                <div className="rounded-full overflow-hidden w-10 h-10">
                    <Image
                        src={otherProfile?.data?.userProfileUrl}
                        alt="profile image"
                        width={70}
                        height={70}
                        priority="eager"
                    />
                </div>
                <div className="ml-3 text-xs font-bold">
                    {otherProfile?.data?.displayName}<p className="font-normal">möchte chatten!</p>
                </div>
                <button className="p-1 bg-green" onClick={acceptChatRequest}>
                    accept
                </button>
                <button className="p-1 bg-red" onClick={declineChatRequest}>
                    decline
                </button>

            </li>
        )
    }

    const ChatName = ({ chat }) => {

        //SHOW/HIDE CHATCARD FROM CHATNAME IN CHATLIST
        const handleClick = () => {
            const element = document.getElementById(chat.id);
            if (element.style.display === "block") {
                element.style.display = "none";
            } else {
                element.style.display = "block";
            }
        }

        // GET THE OTHER USERS EMAIL AND THEN THEIR PROFILE DOC
        const otherUser = getOtherEmail(chat.users, user);
        const [otherProfile, setOtherProfile] = useState([])
        useEffect(() => {
            const getOtherProfile = async () => {
                const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where("email", "==", otherUser)))
                // console.log(querySnapshot, "WUPPINGER")
                setOtherProfile(querySnapshot.docs?.map(doc => {
                    return {
                        id: doc.id,
                        data: {
                            ...doc.data()
                        }
                    }
                })[0])
            }
            getOtherProfile()
        }, [])

        return (
            <li onClick={handleClick} className="hover:bg-shade-50 px-3 py-3 border-b border-shade-100 cursor-pointer flex items-center">
                <div className="rounded-full overflow-hidden w-10 h-10">
                    <Image
                        src={otherProfile?.data?.userProfileUrl}
                        alt="profile image"
                        width={70}
                        height={70}
                        priority="eager"
                    />
                </div>
                <div className={otherProfile?.data?.state === "online" ? "rounded-full bg-fantsy-green-500 w-3 h-3 -ml-3 -mb-7 border-white border-2" : "hidden"}></div>
                <div className="ml-3 text-sm font-bold">
                    {otherProfile?.data?.displayName}
                </div>
            </li>
        )
    }


    // SHOW/HIDE CHAT SIDEBAR
    const [sidebar, setSidebar] = useState(false);
    const sidebarNav = () => {
        setSidebar(!sidebar);

    }
    if (user) {
        return (
            <div>
                <div className="fixed bottom-0 right-60 flex flex-row z-40 mr-5">
                    {chats?.filter(chat => chat.users.includes(user.email))
                        .map(chat => {
                            return <ChatCard chat={chat} key={chat.id} />
                        })}
                </div>
                <div className={styles.sidebarBtnRow}>
                    {/* <BsChatDots size={35} onClick={() => startChat()} className={styles.sidebarBtn} /> */}
                    <BsChatDots size={35} onClick={sidebarNav} className={styles.sidebarBtn} />
                </div>
                <div className={!sidebar ? "fixed top-0 right-[-100%] h-screen w-52 z-30 ease-in duration-300" : "fixed top-0 right-0 h-screen w-52 z-30 ease-in duration-300"}>
                    <div className="bg-white bg-opacity-20 h-16 py-1 px-5 flex items-center justify-between text-bold">
                        <p>Meine Chats</p>
                    </div>
                    <ul className="bg-white w-full h-full shadow-lg overflow-hidden overflow-y-scroll scrollbar-hide">
                        {chats?.filter(chat => chat.users.includes(user.email))
                            .map(chat => {
                                if (chat.pending !== true) {
                                    return <ChatName chat={chat} key={chat.id} />
                                } else {
                                    if (chat.initiator !== user.email) {
                                        return <ChatRequest chat={chat} key={chat.id} />
                                    } else {
                                        return <div className="bg-red p-2">Still pending</div>
                                    }
                                }
                            })}
                    </ul>
                </div>
            </div>
        )
    }
}
