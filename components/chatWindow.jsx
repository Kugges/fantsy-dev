import React from 'react'
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai'

const MsgBubble = () => {
    return (
        <div>
            <div className={styles.userMsg}>
                hello test
            </div>
            <div className={styles.otherMsg}>
                yesyes yoaaaa
            </div>
        </div>


    )


}

const styles = {

    chatWindow: "w-72 h-96 bg-white shadow-xl ml-4 rounded-t-lg overflow-hidden",
    chatHeader: "w-full h-10 bg-fantsy-orange-200 px-3 flex items-center justify-between active:bg-fantsy-orange-400",
    chatArea: "w-full h-3/4 bg-shade-50 overflow-auto",
    chatInput: "w-full p-2 border border-shade-200 rounded-lg focus:outline-fantsy-orange-300",
    userMsg: "mx-2 my-1 px-3 py-2 max-w-max rounded-lg bg-fantsy-orange-300",
    otherMsg: "mx-2 my-1 px-3 py-2 max-w-max rounded-lg bg-shade-100",
}

const ChatWindow = () => {
    return (
        <div className="fixed bottom-0 right-0 flex z-50 mr-5">

            <div className={styles.chatWindow}>
                <div className={styles.chatHeader}>
                    <span>Chat Title</span>
                    <AiOutlineClose className="cursor-pointer" />
                </div>
                <div className={styles.chatArea}>
                    <MsgBubble />
                    <MsgBubble />
                    <MsgBubble />
                    <MsgBubble />
                    <MsgBubble />
                </div>
                <div className="m-2 flex flex-row gap-2">
                    <input className={styles.chatInput} type="text" placeholder="Type in your message..." />
                    <button className="text-fantsy-orange-500">
                        <AiOutlineSend size={20} /></button>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow