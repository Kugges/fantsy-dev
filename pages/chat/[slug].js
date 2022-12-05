import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineClose, AiOutlineSend, AiFillPlusCircle } from 'react-icons/ai'
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { fireDb } from '../../firebaseClient'
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { AuthContext } from '../../src/hook/auth'
import getOtherEmail from '../../utils/getOtherEmail'

import Image from 'next/image'
import prepic from "../../images/profile-starter.png"

const styles = {
    chatWindow: "w-72 h-96 bg-white shadow-xl ml-4 rounded-t-lg overflow-hidden",
    chatHeader: "w-full h-10 bg-fantsy-orange-200 px-3 flex items-center justify-between active:bg-fantsy-orange-400",
    chatArea: "w-full h-3/4 bg-shade-50 overflow-auto",
    chatInput: "w-full p-2 border border-shade-200 rounded-lg focus:outline-fantsy-orange-300",
    userMsg: "mx-2 my-1 px-3 py-2 max-w-max rounded-lg bg-fantsy-orange-300",
    otherMsg: "mx-2 my-1 px-3 py-2 max-w-max rounded-lg bg-shade-100",
}


export default function ChatWindow() {

    const { user } = useContext(AuthContext);

    const [snapshot, loading, error] = useCollection(collection(fireDb, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)));

    const [isShown, setIsShown] = useState(false);

    // const handleClick = event => {
    //     setIsShown(current => !current);
    // }

    const gimmeChat = ({ chat }) => {

        console.log(chat, "THAT CHAT")

    }


    const startChat = async () => {
        const input = prompt("Enter Email of chat recipient");
        if (!chatExists(input) && (input != user.email)) {
            await addDoc(collection(fireDb, "chats"), { users: [user.email, input] })
        }
    }

    const ChatName = ({ chat }) => {

        return (
            <li onClick={gimmeChat} className="hover:bg-shade-50 px-3 py-3 cursor-pointer flex items-center">
                <div className="rounded-full overflow-hidden w-10 h-10">
                    <div className="rounded-full bg-fantsy-green-500 w-3 h-3 border-white border absolute"></div>
                    <Image
                        src={prepic}
                        alt="profile image"
                        layout="responsive"
                        width={70}
                        height={70}
                        priority="eager"
                    />
                </div>
                <div className="ml-3 text-sm font-bold">
                    {getOtherEmail(chat.users, user)}
                </div>
            </li>
        )
    }

    const ChatCard = ({ chat }) => {
        const q = query(collection(fireDb, `chats/${chat.id}/messages`), orderBy("timestamp"))
        const [messages] = useCollectionData(q);
        const getMessages = () =>
            messages?.map(msg => {
                const sender = msg.sender === user.email;
                return (
                    <div key={msg.id} className={sender ? styles.userMsg : styles.otherMsg}>
                        {msg.text}
                    </div>
                )

            })

        const [input, setInput] = useState("");

        const sendMessage = async (e) => {
            e.preventDefault();
            await addDoc(collection(fireDb, `chats/${chat.id}/messages`), {
                text: input,
                sender: user.email,
                timestamp: serverTimestamp()
            })
            setInput("");
        }

        


        return (
            <div className={styles.chatWindow}>
                {/* EMAIL OF OTHER PARTICIPANT IN CHAT */}
                <div className={styles.chatHeader}>
                    <span>{getOtherEmail(chat.users, user)}</span>
                    <AiOutlineClose className="cursor-pointer" />
                </div>
                {/* CHAT MESSAGE AREA */}
                <div className={styles.chatArea}>
                    {getMessages()}
                </div>
                {/* SEND MESSAGE */}
                <div className="m-2 flex flex-row gap-2">
                    <input className={styles.chatInput} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type in your message..." />
                    <button onClick={e => sendMessage(e)} className="text-fantsy-orange-500">
                        <AiOutlineSend size={20} /></button>
                </div>
            </div>
        )


    }
    // const ref = useRef(null);

    // useEffect(() => {

    //     const el2 = ref.current;
    //     console.log(el2, "EL2 OIDA")

    // }, [])

    if (user) {
        return (
            <div>
                <div className="fixed bottom-0 right-60 flex z-50 mr-5">
                    <button className="ml-5 mt-80">
                        <AiFillPlusCircle onClick={() => startChat()} size={50} className="text-fantsy-orange-500 opacity-50 hover:opacity-100" />
                    </button>
                    {chats?.filter(chat => chat.users.includes(user.email))
                        .map(chat => {
                            return <ChatCard chat={chat} key={chat.id} />
                        })}
                </div>
                <div className="bg-white fixed top-0 right-0 h-screen w-60 z-10">
                    <div className="pt-28 px-5">Meine Chats</div>
                    <ul className="w-full h-fullshadow-lg">
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
