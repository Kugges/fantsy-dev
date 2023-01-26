import Image from 'next/image'
import React from 'react'

const DatePost = ({ profile, date }) => {
    return (
        <>
            <div className={date?.pending === false ? "hidden" : "w-full py-4"}>
                <div className="flex mx-auto w-1/3 items-center text-shade-500 gap-4">
                    <p>Dauer: {date?.datingLength}</p>
                    <p>Datum: {date?.datingDate}</p>
                    {/* <p>Uhrzeit: {date?.datingTime}</p> */}
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div className="flex items-center gap-2">
                        <Image
                            src={date?.userAvatars[1]}
                            width={30}
                            height={30}
                            className="rounded-full aspect-square"
                            alt="Worker Image"
                        />
                        <p>{date?.daters[1]}</p>
                    </div>
                    <div className="w-full bg-white rounded-lg p-2">
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam atque deleniti impedit sed harum blanditiis, 
                            voluptate doloribus reprehenderit id adipisci ratione placeat cum voluptatem dolore nihil laudantium dicta amet officia.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Image
                            src={date?.userAvatars[0]}
                            width={30}
                            height={30}
                            className="rounded-full aspect-square"
                            alt="Worker Image"
                        />
                        <p>{date?.daters[0]}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DatePost