import React, { useContext, useState, useEffect, useRef } from 'react'
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { fireDb } from '../firebaseClient'
import getOtherEmail from '../utils/getOtherEmail'
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai'
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { AuthContext } from '../src/hook/auth'


const styles = {
    chatWindow: "w-72 h-96 bg-white shadow-xl ml-4 rounded-t-lg overflow-hidden hidden",
    chatHeader: "w-full h-10 bg-fantsy-orange-200 px-3 flex items-center justify-between active:bg-fantsy-orange-400",
    chatInput: "w-full p-2 border border-shade-200 rounded-lg focus:outline-fantsy-orange-300",
    chatArea: "w-full h-3/4 bg-shade-50 overflow-y-auto scrollbar-hide flex flex-col-reverse justify-items text-sm",
    userMsg: "ml-2 mr-10 my-1 px-3 py-2 max-w-max rounded-lg bg-fantsy-orange-500 text-white",
    otherMsg: "mr-2 ml-10 my-1 px-3 py-2 max-w-max rounded-lg bg-shade-100 self-end",
}

const ChatCard = ({ chat }) => {

    const { user } = useContext(AuthContext);
    // GET ALL MESSAGES FROM THAT CHAT
    const q = query(collection(fireDb, `chats/${chat.id}/messages`), orderBy("timestamp", "desc"))
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

    // SHOW/HIDE CHATCARD FROM CHATCARD CLOSE ICON
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

    // SAVE MESSAGE TO FIRESTORE CHAT DOCUMENT
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

        <div id={chat.id} className={styles.chatWindow}>
            {/* EMAIL OF OTHER PARTICIPANT IN CHAT */}
            <div className={styles.chatHeader}>
                <span>{otherProfile?.data?.displayName}</span>
                <AiOutlineClose className="cursor-pointer" onClick={handleClick} />
            </div>
            {/* CHAT MESSAGE AREA */}
            <div className={styles.chatArea}>
                {getMessages()}
                <p className="text-center text-xs text-shade-300 py-3">Chat mit {otherProfile?.data?.displayName} gestartet!</p>
                {/* <div ref={bottomOfChat}></div> */}
            </div>
            {/* SEND MESSAGE */}
            <form className="m-2 flex flex-row gap-2">
                <input onSubmit={sendMessage} className={styles.chatInput} onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Schreibe eine Nachricht..." />
                <button disabled={!input} onClick={sendMessage} className="text-fantsy-orange-500 opacity-50 hover:opacity-100">
                    <AiOutlineSend size={20} /></button>
            </form>
        </div>
    )
}

export default ChatCard