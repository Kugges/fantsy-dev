import { addDoc, collection, query, getDocs, where } from 'firebase/firestore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { fireDb } from '../firebaseClient';
import fantsyheart from "../images/peach-logo.png"
import { useForm } from 'react-hook-form'
import { toast } from "react-toastify"
import { useRouter } from 'next/router';

const DateRequest = ({ profile, user }) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [dateLength, setDateLength] = useState("");
    const [requestText, setRequestText] = useState("");
    const [userProfile, setUserProfile] = useState([]);

    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, submitting } = useForm();

    const userEmail = user?.email;

    useEffect(() => {
        const getUserProfile = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('email', '==', userEmail)))
            console.log("gimme PROFILES NOW", querySnapshot)
            setUserProfile(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            })[0])
        }
        getUserProfile();
        console.log("userPROFILE?", userProfile)

    }, [])

    const dateRequest = async () => {
        await addDoc(collection(fireDb, "dates"), {
            daters: [userProfile?.data?.displayName, profile?.data?.displayName],
            userAvatars: [userProfile?.data?.userProfileUrl, profile?.data?.userProfileUrl],
            email: [userProfile?.data?.email, profile?.data?.email],
            initiatorDate: userProfile?.data?.email,
            initiatorRating: 0,
            initiatorComment: "",
            receiverDate: profile?.data?.email,
            receiverRating: 0,
            receiverComment: "",
            dateRequestText: requestText,
            archived: false,
            datingDate: date,
            datingTime: time,
            datingLength: dateLength,
            pending: true
        }).then(() => {
            toast.success("Date-Anfrage versendet!");
            router.push(`/`);
        })
    }
    const workerPrices = profile.data.workerPrices;
    // console.log("lodemandel", workerPrices)


    return (
        <div>
            <h1 className="text-4xl text-center font-bold">Date vereinbaren</h1>
            <div className="grid grid-cols-3 w-2/4 mx-auto gap-4">
                <div className="flex flex-col col-span-1 items-center my-6">
                    <Image
                        src={userProfile?.data?.userProfileUrl}
                        width={50}
                        height={50}
                        className="rounded-full aspect-square"
                        alt="Worker Image"
                    />
                    <p className="text-md font-bold">{userProfile?.data?.displayName}</p>

                </div>
                <div className="flex col-span-1 items-center mx-auto">
                    <Image
                        src={fantsyheart}
                        width={100}
                        height={100}
                        className="rounded-full aspect-square"
                        alt="Fantsy Peach"
                    />
                </div>
                <div className="flex flex-col col-span-1 items-center my-6">
                    <Image
                        src={profile?.data?.userProfileUrl}
                        width={50}
                        height={50}
                        className="rounded-full aspect-square"
                        alt="Worker Image"
                    />
                    <p className="text-md font-bold">{profile?.data?.displayName}</p>

                </div>
            </div>

            <form className="p-6" onSubmit={handleSubmit(dateRequest)}>
                <h2 className="text-lg font-semibold">Wann?</h2>
                <div className="grid grid-rows-2 gap-4">
                    <div className="flex items-center">
                        <label htmlFor="date" className="mr-2" >Datum</label>
                        <input
                            {...register('date', {
                                required: true,
                            })}
                            id="date"
                            type="date"
                            placeholder="Datum"
                            className="p-2 rounded-lg w-full bg-shade-50"
                            onChange={(e) => setDate(e.target.value)}
                            value={date} />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="date" className="mr-2" >Uhrzeit</label>
                        <select
                            {...register('time', {
                                required: true,
                            })}
                            id="date"
                            type="date"
                            placeholder="Datum"
                            className="p-2 rounded-lg w-full bg-shade-50"
                            required
                            onChange={(e) => setTime(e.target.value)}
                            value={time}>
                            <option>Uhrzeit wählen</option>
                            <option>12:00</option>
                            <option>12:30</option>
                            <option>13:00</option>
                            <option>13:30</option>
                            <option>14:00</option>
                            <option>14:30</option>
                            <option>15:00</option>
                            <option>15:30</option>
                            <option>16:00</option>
                            <option>16:30</option>
                            <option>17:00</option>
                            <option>17:30</option>
                            <option>18:00</option>
                            <option>18:30</option>
                            <option>19:00</option>
                            <option>19:30</option>
                            <option>20:00</option>
                            <option>20:30</option>
                            <option>21:00</option>
                            <option>21:30</option>
                            <option>22:00</option>
                            <option>22:30</option>
                            <option>23:00</option>
                            <option>23:30</option>
                            <option>0:00</option>
                            <option>0:30</option>
                            <option>1:00</option>
                            <option>1:30</option>
                            <option>2:00</option>
                            <option>2:30</option>
                            <option>3:00</option>
                            <option>3:30</option>
                            <option>4:00</option>
                            <option>4:30</option>
                            <option>5:00</option>
                            <option>5:30</option>
                            <option>6:00</option>
                            <option>6:30</option>
                            <option>7:00</option>
                            <option>7:30</option>
                            <option>8:00</option>
                            <option>8:30</option>
                            <option>9:00</option>
                            <option>9:30</option>
                            <option>10:00</option>
                            <option>10:30</option>
                            <option>11:00</option>
                            <option>11:30</option>
                        </select>
                    </div>
                </div>
                <div className="my-6">
                    <h2 className="text-lg font-semibold">Wie lange?</h2>
                    <div className="flex flex-col">
                        <div className="">
                            <select
                                {...register('dateLength', {
                                    required: true,
                                })}
                                className="p-2 rounded-lg w-full bg-shade-50"
                                onChange={(e) => setDateLength(e.target.value)}
                                name="dateLength">
                                <option>Bitte wählen</option>
                                {Object.entries(workerPrices).map(([priceName, priceValue], index) => (
                                    <option key={index} value={priceName}>
                                        {priceName} - {priceValue} €
                                    </option>
                                ))}

                            </select>
                        </div>
                    </div>
                </div>
                <div className="my-6">
                    <h2 className="text-lg font-semibold">Schreibe etwas nettes!</h2>
                    <div className="flex flex-col items-center justify-between">
                        <textarea
                            {...register('requestText', {
                                required: true,
                            })}
                            className="px-4 py-2 rounded-lg w-full bg-shade-50"
                            onChange={(e) => setRequestText(e.target.value)}
                            name="requestText"
                            value={requestText}/>
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center justify-end">
                    <input type="submit" className="p-2 rounded-lg cursor-pointer bg-fantsy-green-400 text-white hover:bg-fantsy-green-500" value="Anfrage versenden" />
                </div>
            </form>

        </div>
    )
}

export default DateRequest