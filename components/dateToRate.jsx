import { doc, getDoc, collection, updateDoc, getDocs, where, query, deleteDoc } from 'firebase/firestore';
import Image from 'next/image'
import React, { useState, useEffect, useContext } from 'react'
import { fireDb } from '../firebaseClient';
import { AuthContext } from '../src/hook/auth';
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify"
import { useForm } from 'react-hook-form'
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Link from 'next/link';

const styles = {

    fantsyInput: "focus:outline-fantsy-orange-500 hover:outline-fantsy-orange-200 px-2 py-1 w-full bg-shade-50 rounded-lg",
}

const DateToRate = ({ profile, date }) => {

    // const [rating, setRating] = useState(0);
    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [otherProfile, setOtherProfile] = useState([]);
    const [comment, setComment] = useState("");
    const [title, setTitle] = useState("");
    // console.log("PROFILE", profile.id)
    const dateId = date?.id

    const { register, handleSubmit, formState: { errors }, submitting } = useForm();

    // GET OTHER USERS EMAIL
    const otherEmail = date.email.find(email => email !== user.email);
    // console.log("OTHER EMAIL", otherEmail)
    const oneDayAfter = new Date(date?.datingDate);
    const dateDate = oneDayAfter.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });


    const profilePrice = profile?.data?.workerPrices;
    const keysOrder = [
        "01_15 min",
        "02_30 min",
        "03_1 Std",
        "04_2 Std",
        "05_3 Std",
        "06_4 Std",
        "07_8 Std",
        "08_12 Std"
    ];



    const [hasRated, setHasRated] = useState(false);
    useEffect(() => {
        const getHasRated = () => {
            if (date?.initiatorDate === user?.email && date?.initiatorRating !== 0 || date?.receiverDate === user?.email && date?.receiverRating !== 0) {
                setHasRated(true)
                console.log("has rated!")

            } else {
                setHasRated(false)
                console.log("could not rate!")
            }
        }
        getHasRated();
    }, [])

    useEffect(() => {
        if (user) {
            setUserId(user.uid);
            setUserEmail(user.email);
            setIsLoading(false);
        }
    }, [user]);


    useEffect(() => {
        const getOtherProfile = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('email', '==', otherEmail)));
            setOtherProfile(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            })[0])

        }
        getOtherProfile();

    }, [])
    // console.log("IS IT CORRECT?", otherProfile)


    const addComment = async () => {
        if (date?.initiatorDate === user?.email) {
            await updateDoc(doc(fireDb, "dates", dateId), { initiatorComment: comment, initiatorTitle: title });
        } else {
            await updateDoc(doc(fireDb, "dates", dateId), { receiverComment: comment, receiverTitle: title });
        }
    }

    const [selectedStar, setSelectedStar] = useState(0);
    const handleRating = async (value, star) => {
        // setRating(value);
        if (date?.initiatorDate === user?.email) {
            await updateDoc(doc(fireDb, "dates", dateId), { initiatorRating: value });
        } else {
            await updateDoc(doc(fireDb, "dates", dateId), { receiverRating: value });
        }
        const likesCount = otherProfile.data.likesCount;
        const newLikesCount = (likesCount + value);
        await updateDoc(doc(fireDb, "profiles", otherProfile.id), { likesCount: newLikesCount });
        console.log("LIKES?", newLikesCount)
    };

    const hoveringStar = (star) => {
        setSelectedStar(star);
    }


    const acceptDate = async () => {
        await updateDoc(doc(fireDb, "dates", dateId), { pending: false })
        toast.success("Date-Anfrage angenommen!")
    }



    // const currentLikesCount = profile.data.likesCount;
    // const dateRating = date.rating
    // const newLikesCount = (currentLikesCount - dateRating)
    // console.log("currentLikesCount", currentLikesCount, "dateRating", dateRating, "newLikes", newLikesCount)
    const declineDate = async () => {
        // ADD SOMETHING TO NOTIFY OTHER USER
        await deleteDoc(doc(fireDb, "dates", dateId))
            .then(() => {
                toast.error("Date-Anfrage abgelehnt!")
            })
    }


    if (date.pending === true) {
        if (date.initiatorDate === user.email) {
            // DATE REQUEST OF USER
            return (
                <div className="py-10 border-shade-100">
                    <h2 className="font-bold mb-2 text-fantsy-orange-500">Ausstehende Date-Anfrage</h2>
                    <div className="w-full rounded-lg border-2 border-fantsy-orange-300">

                        <div className="flex flex-col gap-2 p-2">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={date?.userAvatars[1]}
                                    width={30}
                                    height={30}
                                    className="rounded-full aspect-square"
                                    alt="Worker Image"
                                />
                                <p className="font-bold">{date?.daters[1]}</p>

                            </div>
                            <div className="p-2 flex items-center gap-4">

                                <p><span className="text-shade-500">Dauer:</span> {date?.datingLength}</p>
                                {/* {keysOrder.map(key => {
                                    if (profilePrice[key] !== '') {
                                        // Remove the prefix before displaying the key
                                        const displayedKey = key.substring(3); // Assumes the prefix is always 3 characters
                                        return (
                                            <p className="col-span-2" key={key}>
                                                {displayedKey}: <span className="font-bold">{profilePrice[key]} €</span>
                                            </p>
                                        );
                                    } else {
                                        return null;
                                    }
                                })} */}
                                <p><span className="text-shade-500">Datum:</span> {dateDate}</p>
                                <p><span className="text-shade-500">Uhrzeit:</span> {date?.datingTime}</p>
                            </div>
                            <div className="w-full bg-shade-50 rounded-lg p-2">
                                <p>
                                    {date?.dateRequestText}
                                </p>
                            </div>
                            <div className="mx-auto mt-4">
                                <p>Anfrage noch nicht beantwortet!</p>

                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            // DATE REQUEST OF OTHER USER
            return (
                <div className="py-10 border-shade-100">
                    <h2 className="font-bold mb-2 text-fantsy-blue-500">Neue Date-Anfrage</h2>
                    <div className="w-full rounded-lg border-2 border-fantsy-blue-500">
                        <div className="flex flex-col gap-2 p-2">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={date?.userAvatars[0]}
                                    width={30}
                                    height={30}
                                    className="rounded-full aspect-square"
                                    alt="Worker Image"
                                />
                                <p><span className="font-bold">{date?.daters[0]}</span> möchte ein Date mit dir!</p>
                            </div>
                            <div className="p-2 flex items-center gap-4">
                                <p><span className="text-shade-500">Dauer:</span> {date?.datingLength}</p>
                                <p><span className="text-shade-500">Datum:</span> {dateDate}</p>
                                <p><span className="text-shade-500">Uhrzeit:</span> {date?.datingTime}</p>
                            </div>
                            <div className="w-full bg-shade-50 rounded-lg p-2">
                                <p>
                                    {date?.dateRequestText}
                                </p>
                            </div>
                            <div className="flex items-center justify-end gap-4">
                                <button onClick={declineDate} className="px-4 py-2 rounded-lg border-2 border-shade-100 hover:bg-shade-100">Ablehnen</button>
                                <button onClick={acceptDate} className="px-4 py-2 rounded-lg bg-fantsy-green-400 hover:bg-fantsy-green-500 text-white">Annehmen</button>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        // SHOW ACTIVE DATE
        return (
            <>
                <div className="py-10 border-shade-100">
                    <div className="p-2 flex items-center gap-4">
                        <p><span className="text-shade-500">Dauer:</span> {date?.datingLength}</p>
                        <p><span className="text-shade-500">Datum:</span> {dateDate}</p>
                        <p><span className="text-shade-500">Uhrzeit:</span> {date?.datingTime}</p>
                        {date?.archived === false ?
                            <BsFillCheckCircleFill size={20} className="text-shade-500" />
                            :
                            <BsFillCheckCircleFill size={20} className="text-fantsy-green-500" />
                        }
                    </div>
                    <div className="flex flex-col gap-2 p-2 bg-shade-50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Image
                                src={date?.userAvatars[0]}
                                width={40}
                                height={40}
                                className="rounded-full aspect-square border-white border-2"
                                alt="Worker Image"
                            />
                            <p className="font-semibold text-xl">Date-Anfrage von {date?.daters[0]} an {date?.daters[1]}</p>
                            <Image
                                src={date?.userAvatars[1]}
                                width={40}
                                height={40}
                                className="rounded-full aspect-square border-white border-2"
                                alt="Worker Image"
                            />
                        </div>
                        <div className="w-full">
                            <Link href={`/profile/${otherProfile.id}`}><p className="hover:underline">{date?.daters[0]}</p></Link>
                            <p className="text-shade-500">
                                {date?.dateRequestText}
                            </p>
                        </div>
                        {/* INITIATOR COMMENT */}
                        {date.initiatorComment !== ""
                            ?
                            <div className="bg-fantsy-orange-200 rounded-lg p-2">

                                <div className="flex items-center gap-2">
                                    <Image
                                        src={date?.userAvatars[0]}
                                        width={30}
                                        height={30}
                                        className="rounded-full aspect-square"
                                        alt="Worker Image"
                                    />
                                    <p className="font-bold">{date?.daters[0]}</p>
                                    {date.initiatorRating === 0 && date.initiatorDate === user?.email ?
                                        <div className="flex items-center">
                                            <h1 className="mr-3">Bewerte dein Date!</h1>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <AiFillStar
                                                    size={20}
                                                    className={`${star <= selectedStar ? 'text-fantsy-orange-500' : 'text-shade-400'} hover:text-fantsy-orange-500`}
                                                    key={star}
                                                    onClick={() => handleRating(star)}
                                                    onMouseEnter={() => hoveringStar(star)}
                                                    onMouseLeave={() => setSelectedStar(0)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </div>
                                        :
                                        <div className="flex items-center">
                                            {date.initiatorRating === 0 ?
                                                <>
                                                    <AiFillStar
                                                        size={20}
                                                        className="text-shade-500" />
                                                    <p className="text-shade-500">Keine Bewertung</p>
                                                </>
                                                :
                                                <>
                                                    <AiFillStar
                                                        size={20}
                                                        className="text-fantsy-orange-500" />
                                                    <p>{date?.initiatorRating}/5</p>
                                                </>
                                            }
                                        </div>
                                    }
                                </div>
                                <p className="font-bold">{date.initiatorTitle}</p>
                                <p>{date.initiatorComment}</p>
                            </div>
                            :
                            <>
                            </>
                        }
                        {/* RECEIVER COMMENT */}
                        {date.receiverComment !== ""
                            ?
                            <div className="bg-fantsy-blue-200 rounded-lg p-2">

                                <div className="flex items-center gap-2">
                                    <Image
                                        src={date?.userAvatars[1]}
                                        width={30}
                                        height={30}
                                        className="rounded-full aspect-square"
                                        alt="Worker Image"
                                    />
                                    <p className="font-bold">{date?.daters[1]}</p>
                                    {date.receiverRating === 0 && date.receiverDate === user?.email ?
                                        <div className="flex items-center">
                                            <h1 className="mr-3">Bewerte dein Date!</h1>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <AiFillStar
                                                    size={20}
                                                    className={`${star <= selectedStar ? 'text-fantsy-orange-500' : 'text-shade-400'} hover:text-fantsy-orange-500`}
                                                    key={star}
                                                    onClick={() => handleRating(star)}
                                                    onMouseEnter={() => hoveringStar(star)}
                                                    onMouseLeave={() => setSelectedStar(0)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </div>
                                        :
                                        <div className="flex items-center">
                                            {date.receiverRating === 0 ?
                                                <>
                                                    <AiFillStar
                                                        size={20}
                                                        className="text-shade-500" />
                                                    <p className="text-shade-500">Keine Bewertung</p>
                                                </>
                                                :
                                                <>
                                                    <AiFillStar
                                                        size={20}
                                                        className="text-fantsy-orange-500" />
                                                    <p className="text-shade-500">{date?.receiverRating}/5</p>
                                                </>
                                            }
                                        </div>
                                    }
                                </div>
                                <p className="font-bold">{date.receiverTitle}</p>
                                <p>{date.receiverComment}</p>
                            </div>
                            :
                            <>
                            </>
                        }
                        {date.archived === true && date.initiatorDate === user?.email && date.initiatorComment === "" ?
                            <div className="py-4">
                                <h2 className="font-bold">Wie war dein Date?</h2>
                                <form
                                    className="w-full"
                                    onSubmit={handleSubmit(addComment)}>
                                    <input
                                        {...register('title', {
                                            required: true,
                                        })}
                                        id="title"
                                        type="text"
                                        className={styles.fantsyInput}
                                        placeholder="Titel ..."
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                    />
                                    <textarea
                                        {...register('comment', {
                                            required: true,
                                        })}
                                        id="comment"
                                        type="text"
                                        placeholder="Beschreibe deine Erfahrung ..."
                                        className={styles.fantsyInput}
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}
                                        style={{
                                            maxHeight: "200px",
                                            marginTop: "5px",
                                            resize: "vertical"
                                        }}
                                    />
                                    <div className="flex items-center gap-10 justify-end">
                                        {date.initiatorRating === 0 ?
                                            <div className="flex items-center">
                                                <h1 className="mr-3">Bewerte dein Date!</h1>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <AiFillStar
                                                        size={20}
                                                        className={`${star <= selectedStar ? 'text-fantsy-orange-500' : 'text-shade-400'} hover:text-fantsy-orange-500`}
                                                        key={star}
                                                        onClick={() => handleRating(star)}
                                                        onMouseEnter={() => hoveringStar(star)}
                                                        onMouseLeave={() => setSelectedStar(0)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                ))}
                                            </div>
                                            :
                                            <div className="flex items-center">
                                                <AiFillStar
                                                    size={20}
                                                    className="text-fantsy-orange-500" />
                                                <p className="text-shade-500">{date?.initiatorRating}/5</p>
                                            </div>
                                        }
                                        <input
                                            type="submit"
                                            disabled={!comment}
                                            className="rounded-lg py-2 px-4 bg-fantsy-green-400 hover:bg-fantsy-green-500 cursor-pointer  disabled:bg-fantsy-green-300  disabled:hover:cursor-default text-white"
                                        />
                                    </div>
                                </form>
                            </div>
                            :
                            <>
                            </>
                        }
                        {date.archived === true && date.receiverDate === user?.email && date.receiverComment === "" ?
                            <div className="py-4">
                                <h2 className="font-bold">Wie war dein Date?</h2>
                                <form
                                    className="w-full"
                                    onSubmit={handleSubmit(addComment)}>
                                    <input
                                        {...register('title', {
                                            required: true,
                                        })}
                                        id="title"
                                        type="text"
                                        className={styles.fantsyInput}
                                        placeholder="Titel ..."
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                    />
                                    <textarea
                                        {...register('comment', {
                                            required: true,
                                        })}
                                        id="comment"
                                        type="text"
                                        placeholder="Beschreibe deine Erfahrung ..."
                                        className={styles.fantsyInput}
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}
                                        style={{
                                            maxHeight: "200px",
                                            marginTop: "5px",
                                            resize: "vertical"
                                        }}
                                    />
                                    <div className="flex items-center gap-10 justify-end">
                                        {date.receiverRating === 0 ?
                                            <div className="flex items-center">
                                                <h1 className="mr-3">Bewerte dein Date!</h1>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <AiFillStar
                                                        size={20}
                                                        className={`${star <= selectedStar ? 'text-fantsy-orange-500' : 'text-shade-400'} hover:text-fantsy-orange-500`}
                                                        key={star}
                                                        onClick={() => handleRating(star)}
                                                        onMouseEnter={() => hoveringStar(star)}
                                                        onMouseLeave={() => setSelectedStar(0)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                ))}
                                            </div>
                                            :
                                            <div className="flex items-center">
                                                <AiFillStar
                                                    size={20}
                                                    className="text-fantsy-orange-500" />
                                                <p className="text-shade-500">{date?.receiverRating}/5</p>
                                            </div>
                                        }
                                        <input
                                            type="submit"
                                            disabled={!comment}
                                            className="rounded-lg py-2 px-4 bg-fantsy-green-400 hover:bg-fantsy-green-500 cursor-pointer  disabled:bg-fantsy-green-300  disabled:hover:cursor-default text-white"
                                        />
                                    </div>
                                </form>
                            </div>
                            :
                            <>
                            </>
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default DateToRate