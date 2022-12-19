import React from 'react'


const styles = {
    chatWindow: "w-72 h-96 bg-white shadow-xl ml-4 rounded-t-lg overflow-hidden hidden",
    chatHeader: "w-full h-10 bg-fantsy-orange-200 px-3 flex items-center justify-between active:bg-fantsy-orange-400",
    chatInput: "w-full p-2 border border-shade-200 rounded-lg focus:outline-fantsy-orange-300",
    chatArea: "w-full h-3/4 bg-shade-50 overflow-y-auto scrollbar-hide flex flex-col-reverse justify-items text-sm",
    userMsg: "ml-2 mr-10 my-1 px-3 py-2 max-w-max rounded-lg bg-fantsy-orange-500 text-white",
    otherMsg: "mr-2 ml-10 my-1 px-3 py-2 max-w-max rounded-lg bg-shade-100 self-end",
}

const ChatCardSkel = ({ chat }) => {


    return (

        <div id={chat.id} className={styles.chatWindow}>
            {/* EMAIL OF OTHER PARTICIPANT IN CHAT */}
            <div className={styles.chatHeader}>
                <span>{otherProfile.data?.displayName}</span>
            </div>
            {/* CHAT MESSAGE AREA */}
            <div className={styles.chatArea}>
                {getMessages()}
                <p className="text-center text-xs text-shade-300 py-3">Chat mit {otherProfile.data?.displayName} gestartet!</p>
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