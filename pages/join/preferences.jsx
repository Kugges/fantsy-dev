import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/container'
import { fireDb } from '../../firebaseClient'
import { AuthContext } from '../../src/hook/auth'
import { FantsyContext } from "../../src/hook/FantsyContext"
import { toast } from "react-toastify"
import { useForm } from 'react-hook-form'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const styles = {
    dotDone: "h-10 w-10 mx-5 rounded-full bg-fantsy-orange-500 flex items-center justify-center text-white font-bold",
    dot: "h-10 w-10 mx-5 rounded-full bg-shade-200 flex items-center justify-center text-shade-600",
    fantsyInput: "focus:outline-fantsy-orange-500 hover:outline-fantsy-orange-200 px-2 py-1 w-full bg-shade-50 rounded-lg",
    fantsyCheck: "mr-2",
    formRow: "my-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full",
    checkBoxLabel: "py-1 px-4 border rounded-full border-shade-200 text-shade-200 hover:border-fantsy-orange-500 hover:text-fantsy-orange-500 cursor-pointer peer-checked:text-fantsy-orange-500"
}

const Preferences = () => {

    // GET LOGGED-IN-USER ID
    const { user } = useContext(AuthContext)
    const userID = user?.uid
    // const [interests, setInterests] = useState([])
    const [workerPrices1, setWorkerPrices1] = useState("")
    const [workerPrices2, setWorkerPrices2] = useState("")
    const [workerPrices3, setWorkerPrices3] = useState("")
    const [workerPrices4, setWorkerPrices4] = useState("")
    const [workerPrices5, setWorkerPrices5] = useState("")
    const [workerPrices6, setWorkerPrices6] = useState("")
    const [workerPrices7, setWorkerPrices7] = useState("")
    const [workerPrices8, setWorkerPrices8] = useState("")

    // const myInterests = "Softcore Hardcore BDSM Anal Oral".split(" ")
    const myInterests = "Echte Treffen, Overnight, Sex & Erotik, Webcam-Sex, Telefon-Sex, Abendbegleitung, Reisebegleitung, Abendessen, Swingerclub-Besuch, Partybegleitung, Geschäftsbegleitung, Treffen mit Menschen mit Behinderung".split(",")
    const mySoftcoreInterests = "Striptease, Kuscheln, Zungenküsse, Dirty Talk, Intimrasur, Dusch-/Badespiele, Erotische Massage, Ölmassage, Thai-Massage, Tantra-Sex, Busensex, Schenkelsex, Vaginalsex, Girlfriendsex, Oralverkehr, Lecken, Masturbation, Fingern, 69, Handjob, Footjob, Spanking".split(",")
    const workerPricesKeys = "15 min, 30min, 1 Std, 2 Std, 3 Std, 4 Std, 8 Std, 12 Std".split(",")
    const { register, handleSubmit, formState: { errors }, submitting } = useForm();

    // GET CURRENT PROFILE DOC DATA
    const [currentProfile, setCurrentProfile] = useState([])
    useEffect(() => {
        if (user) {
            const getCurrentProfile = async () => {
                const profileRef = doc(fireDb, "profiles", userID)
                const docSnap = await getDoc(profileRef)
                // console.log("Document data:", docSnap.data());
                setCurrentProfile(docSnap.data())
            }
            getCurrentProfile();
        }
    }, [user])

    // console.log("WUPPI", currentProfile?.workerProfile)
    const isWorker = currentProfile?.workerProfile;
    // const workerPricesKeys = Object.keys(workerPrices);

    const addPricesToProfile = async () => {

        // CLEAR INTERESTS FIELD BEFORE UPDATING
        await updateDoc(doc(fireDb, "profiles", userID), {
            workerPrices: firebase.firestore.FieldValue.delete(),
        })
        await updateDoc(doc(fireDb, "profiles", userID), {
            workerPrices: Object.fromEntries(
                Object.entries({
                    ["15 min"]: workerPrices1,
                    ["30 min"]: workerPrices2,
                    ["1 Std"]: workerPrices3,
                    ["2 Std"]: workerPrices4,
                    ["3 Std"]: workerPrices5,
                    ["4 Std"]: workerPrices6,
                    ["8 Std"]: workerPrices7,
                    ["12 Std"]: workerPrices8
                }).sort((a, b) =>
                    ["15 min", "30 min", "1 Std", "2 Std", "3 Std", "4 Std", "8 Std", "12 Std"].indexOf(a[0]) -
                    ["15 min", "30 min", "1 Std", "2 Std", "3 Std", "4 Std", "8 Std", "12 Std"].indexOf(b[0])
                )
            )
        })
            .then(() => {
                setWorkerPrices1("")
                setWorkerPrices2("")
                setWorkerPrices3("")
                setWorkerPrices4("")
                setWorkerPrices5("")
                setWorkerPrices6("")
                setWorkerPrices7("")
                setWorkerPrices8("")
                toast.success("Preise aktualisiert!")
            }).catch(function (error) {
                const message = error.message;
                console.log(error.message);
            })
    }

    const addInterestsToProfile = async (data) => {
        const checkedValues = Object.values(data).filter(Boolean)
        const checkedArrayOfInterests = checkedValues[0];
        const checkedArrayOfSoftcoreInterests = checkedValues[1];
        // console.log("Array of the selected Checkboxes", checkedValues[1])

        // CLEAR INTERESTS FIELD BEFORE UPDATING
        await updateDoc(doc(fireDb, "profiles", userID), {
            userInterests: firebase.firestore.FieldValue.delete(),
            userInterestsSoftcore: firebase.firestore.FieldValue.delete()
        })
        await updateDoc(doc(fireDb, "profiles", userID), {
            userInterests: firebase.firestore.FieldValue.arrayUnion(...checkedArrayOfInterests),
            userInterestsSoftcore: firebase.firestore.FieldValue.arrayUnion(...checkedArrayOfSoftcoreInterests)
        })
            .then(() => {
                // router.push("/");
                toast.success("Interessen aktualisiert!")
            }).catch(function (error) {
                const message = error.message;
                console.log(error.message);
            })
    }

    return (
        <Container>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row absolute top-24">
                    <div className={styles.dotDone}>
                        <div>1</div>
                    </div>
                    <div className={styles.dotDone}>
                        <div>2</div>
                    </div>
                    <div className={styles.dotDone}>
                        <div>3</div>
                    </div>
                    <div className={styles.dotDone}>
                        <div>4</div>
                    </div>
                </div>
                {isWorker === undefined ?
                    // PROFILE IS YET UNDEFINED
                    <div>Loading...</div>
                    :
                    <div>{isWorker === true ?
                        // PROFILE IS WORKER
                        <div>
                            <h1 className="text-4xl text-center font-bold">Was bietest du an?</h1>
                            <form className="mt-10" onSubmit={handleSubmit(addPricesToProfile)}>
                                <h2 className="my-10 font-bold text-lg">Meine Preise</h2>
                                <div className="w-full grid grid-cols-3 gap-4">
                                    <div className="col-span-1 grid grid-cols-2 items-center">
                                        <p>15 min:</p>
                                        <input
                                            className={styles.fantsyInput}
                                            {...register('workerPrices1', {
                                                required: false,
                                            })}
                                            onChange={(e) => setWorkerPrices1(e.target.value)} value={workerPrices1}
                                        />
                                    </div>
                                    <div className="col-span-1 grid grid-cols-2 items-center">
                                        <p>30 min:</p>
                                        <input
                                            className={styles.fantsyInput}
                                            {...register('workerPrices2', {
                                                required: false,
                                            })}
                                            onChange={(e) => setWorkerPrices2(e.target.value)} value={workerPrices2}
                                        />
                                    </div>
                                    <div className="col-span-1 grid grid-cols-2 items-center">
                                        <p>1 Std:</p>
                                        <input
                                            className={styles.fantsyInput}
                                            {...register('workerPrices3', {
                                                required: false,
                                            })}
                                            onChange={(e) => setWorkerPrices3(e.target.value)} value={workerPrices3}
                                        />
                                    </div>
                                    <div className="col-span-1 grid grid-cols-2 items-center">
                                        <p>2 Std:</p>
                                        <input
                                            className={styles.fantsyInput}
                                            {...register('workerPrices4', {
                                                required: false,
                                            })}
                                            onChange={(e) => setWorkerPrices4(e.target.value)} value={workerPrices4}
                                        />
                                    </div>
                                    <div className="col-span-1 grid grid-cols-2 items-center">
                                        <p>3 Std:</p>
                                        <input
                                            className={styles.fantsyInput}
                                            {...register('workerPrices5', {
                                                required: false,
                                            })}
                                            onChange={(e) => setWorkerPrices5(e.target.value)} value={workerPrices5}
                                        />
                                    </div>
                                    <div className="col-span-1 grid grid-cols-2 items-center">
                                        <p>4 Std:</p>
                                        <input
                                            className={styles.fantsyInput}
                                            {...register('workerPrices6', {
                                                required: false,
                                            })}
                                            onChange={(e) => setWorkerPrices6(e.target.value)} value={workerPrices6}
                                        />
                                    </div>
                                    <div className="col-span-1 grid grid-cols-2 items-center">
                                        <p>8 Std:</p>
                                        <input
                                            className={styles.fantsyInput}
                                            {...register('workerPrices7', {
                                                required: false,
                                            })}
                                            onChange={(e) => setWorkerPrices7(e.target.value)} value={workerPrices7}
                                        />
                                    </div>
                                    <div className="col-span-1 grid grid-cols-2 items-center">
                                        <p>12 Std:</p>
                                        <input
                                            className={styles.fantsyInput}
                                            {...register('workerPrices8', {
                                                required: false,
                                            })}
                                            onChange={(e) => setWorkerPrices8(e.target.value)} value={workerPrices8}
                                        />
                                    </div>
                                </div>
                                <input type="submit" />
                            </form>
                            <form className="mt-10" onSubmit={handleSubmit(addInterestsToProfile)}>
                                <h2 className="font-bold text-lg">Ich biete an</h2>
                                <div className={styles.formRow}>
                                    {myInterests.map(
                                        (c) =>
                                            <label
                                                className="flex col-span-1"
                                                key={c}>
                                                <input type="checkbox"
                                                    className={styles.fantsyCheck}
                                                    value={c}
                                                    name="interests"
                                                    {...register('interests', {
                                                        required: false
                                                    })}
                                                />
                                                {c}
                                            </label>
                                    )}
                                </div>
                                <h2 className="font-bold text-lg">Softcore</h2>
                                <div className={styles.formRow}>
                                    {mySoftcoreInterests.map(
                                        (c) =>
                                            <label
                                                className="flex col-span-1"
                                                key={c}>
                                                <input type="checkbox"
                                                    className={styles.fantsyCheck}
                                                    value={c}
                                                    name="userInterestsSoftcore"
                                                    {...register('userInterestsSoftcore', {
                                                        required: false
                                                    })}
                                                />
                                                {c}
                                            </label>
                                    )}
                                </div>
                                <input type="submit" />
                            </form>
                        </div>
                        :
                        // PROFILE IS NOT WORKER
                        <div>
                            <h1 className="text-4xl text-center font-bold">Was suchst du?</h1>
                            <form className="mt-10" onSubmit={handleSubmit(addInterestsToProfile)}>
                                <h2 className="font-bold text-lg">Meine Interessen</h2>
                                <div className={styles.formRow}>
                                    {myInterests.map(
                                        (c) =>
                                            <label
                                                className="flex col-span-1"
                                                key={c}>
                                                <input type="checkbox"
                                                    className={styles.fantsyCheck}
                                                    value={c}
                                                    name="interests"
                                                    {...register('interests', {
                                                        required: false
                                                    })}
                                                />
                                                {c}
                                            </label>
                                    )}
                                </div>
                                <h2 className="font-bold text-lg">Softcore</h2>
                                <div className={styles.formRow}>
                                    {mySoftcoreInterests.map(
                                        (c) =>
                                            <label
                                                className="flex col-span-1"
                                                key={c}>
                                                <input type="checkbox"
                                                    className={styles.fantsyCheck}
                                                    value={c}
                                                    name="userInterestsSoftcore"
                                                    {...register('userInterestsSoftcore', {
                                                        required: false
                                                    })}
                                                />
                                                {c}
                                            </label>
                                    )}
                                </div>
                                <input type="submit" />
                            </form>
                        </div>
                    }</div>}

            </div>
        </Container>
    )
}

export default Preferences