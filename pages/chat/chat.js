import React, { useContext, useEffect, useState, useRef } from 'react'
import { AiOutlineClose, AiOutlineSend, AiFillMessage, AiOutlineCaretRight, AiOutlineCaretLeft } from 'react-icons/ai'
import { FaCaretRight, FaCaretLeft } from "react-icons/fa"
import { BsChatDots  } from "react-icons/bs"
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { fireDb } from '../../firebaseClient'
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { AuthContext } from '../../src/hook/auth'
import getOtherEmail from '../../utils/getOtherEmail'
import ChatCard from '../../components/chatCard'

import Image from 'next/image'
import prepic from "../../images/profile-starter.png"

const styles = {
    sidebarBtn: "text-black hover:text-white cursor-pointer",
    sidebarBtnRow: "flex fixed gap-2 top-5 right-5 z-40 invisible sm:visible"
}


export default function Chat() {

    const { user } = useContext(AuthContext);
    const [snapshot, loading, error] = useCollection(collection(fireDb, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)));

    const startChat = async () => {
        const input = prompt("Enter Email of chat recipient");
        if (!chatExists(input) && (input != user.email)) {
            await addDoc(collection(fireDb, "chats"), { users: [user.email, input] })
        }
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
            <li onClick={handleClick} className="hover:bg-shade-50 px-3 py-3 cursor-pointer flex items-center">
                <div className="rounded-full bg-fantsy-green-500 w-3 h-3 mr-3 border-white border"></div>
                <div className="rounded-full overflow-hidden w-10 h-10">
                    <Image
                        src={otherProfile.data?.userProfileUrl}
                        alt="profile image"
                        layout="responsive"
                        width={70}
                        height={70}
                        priority="eager"
                    />
                </div>
                <div className="ml-3 text-sm font-bold">
                    {otherProfile.data?.displayName}
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
                    <BsChatDots size={25} onClick={() => startChat()} className={styles.sidebarBtn} />
                    <FaCaretLeft size={25} onClick={sidebarNav} className={sidebar ? styles.sidebarBtn : "hidden"} />
                    <FaCaretRight size={25} onClick={sidebarNav} className={!sidebar ? styles.sidebarBtn : "hidden"} />
                </div>
                <div className={!sidebar ? "fixed top-0 right-[-100%] h-screen w-52 z-30 ease-in duration-300" : "fixed top-0 right-0 h-screen w-52 z-30 ease-in duration-300"}>
                    <div className="bg-white bg-opacity-20 h-16 py-1 px-5 flex items-center justify-between text-bold">
                        <p>Meine Chats</p>
                    </div>
                    <ul className="bg-white w-full h-full shadow-lg overflow-hidden overflow-y-scroll scrollbar-hide">
                        {chats?.filter(chat => chat.users.includes(user.email))
                            .map(chat => {
                                return <ChatName chat={chat} key={chat.id} />
                            })}
                    </ul>
                </div>
            </div>
        )
    }
}
