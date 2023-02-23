import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { fireDb } from '../firebaseClient';

const DatePost = ({ profile, date }) => {

    const oneDayAfter = new Date(date?.datingDate);
    const dateDate = oneDayAfter.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <>
            <div className={date?.archived === false ? "hidden" : "w-3/4 py-4"}>
                <div className="flex justify-center items-center text-shade-500 gap-4">
                    <p>Datum: {dateDate}</p>
                    <p>Dauer: {date?.datingLength}</p>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    {/* INITIATOR COMMENT */}
                    <div className="w-11/12 mb-4">
                        <div className="flex items-center py-2 gap-2">
                            <Image
                                src={date?.userAvatars[0]}
                                width={30}
                                height={30}
                                className="rounded-full aspect-square"
                                alt="Worker Image"
                            />
                            <p>{date?.daters[0]}</p>
                            <div class="flex items-center">
                                {date?.initiatorRating === 0 ?
                                    <>
                                        <AiFillStar
                                            size={20}
                                            className="text-shade-500" />
                                        <p class="ml-2 text-sm text-gray-500">Keine Bewertung</p>
                                    </>
                                    :
                                    <>
                                        <AiFillStar
                                            size={20}
                                            className="text-fantsy-orange-500" />
                                        <p class="ml-2 text-sm text-gray-500">{date?.initiatorRating}</p>
                                    </>
                                }
                            </div>
                        </div>
                        {date.initiatorComment !== "" ?
                        <div className="w-full bg-white rounded-lg p-2">
                            <p className="font-bold">{date?.initiatorTitle}</p>
                            <p>{date?.initiatorComment}</p>
                        </div>
                        :
                        <></>
                        }
                    </div>
                    {/* RECEIVER COMMENT */}
                    <div className="ml-10 w-11/12">
                        {date.receiverComment !== "" ?
                        <div className="w-full bg-white rounded-lg p-2">
                            <p className="font-bold">{date?.receiverTitle}</p>
                            <p>{date?.receiverComment}</p>
                        </div>
                        :
                        <></>
                        }
                        <div className="flex items-center justify-end py-2 gap-2">
                            <div class="flex items-center">
                                {date?.receiverRating === 0 ?
                                    <>
                                        <AiFillStar
                                            size={20}
                                            className="text-shade-500" />
                                        <p class="ml-2 text-sm text-gray-500">Keine Bewertung</p>
                                    </>
                                    :
                                    <>
                                        <AiFillStar
                                            size={20}
                                            className="text-fantsy-orange-500" />
                                        <p class="ml-2 text-sm text-gray-500">{date?.receiverRating}</p>
                                    </>
                                }
                            </div>
                            <Image
                                src={date?.userAvatars[1]}
                                width={30}
                                height={30}
                                className="rounded-full aspect-square"
                                alt="Worker Image"
                            />
                            <p>{date?.daters[1]}</p>
                        </div>
                    </div>
                </div>
                <hr className="text-shade-100"></hr>
            </div>
        </>
    )
}

export default DatePost