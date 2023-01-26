import React, { useState, useContext } from 'react'
import { collection, addDoc, serverTimestamp, updateDoc, doc, setDoc } from 'firebase/firestore'
import { fireDb } from '../../firebaseClient'

import { AuthContext } from "../../src/hook/auth"
import { toast } from "react-toastify"
import { useForm } from 'react-hook-form'

import Container from '../../components/container'
import { useRouter } from 'next/router'
import { TagsInput } from "react-tag-input-component";
import { InputTag } from "../../components/inputTags"

const styles = {
    dotDone: "h-10 w-10 mx-5 rounded-full bg-fantsy-orange-500 flex items-center justify-center text-white font-bold",
    dot: "h-10 w-10 mx-5 rounded-full bg-shade-200 flex items-center justify-center text-shade-600",
    fantsyInput: "focus:outline-fantsy-orange-500 hover:outline-fantsy-orange-200 px-2 py-1 w-full bg-shade-50 rounded-lg",
    formRow: "my-10 flex flex-row gap-10 w-full",
}

const Details = () => {

    // PROFILE DOC DETAILS
    const [stature, setStature] = useState("")
    const [bodysize, setBodysize] = useState("")
    const [bodyweight, setBodyweight] = useState("")
    const [origin, setOrigin] = useState("")
    const [type, setType] = useState("")

    const [language, setLanguage] = useState(["Deutsch"]);

    const { register, handleSubmit, formState: { errors }, submitting } = useForm();

    // GET LOGGED-IN-USER ID
    const { user } = useContext(AuthContext)
    const userId = user?.uid

    // GET ROUTER
    const router = useRouter();

    // CREATE PROFILE DOC & SAVE TO FIRESTORE
    const addDetailsToProfile = async () => {
        const profileData = {
            userStature: stature,
            userSize: bodysize,
            userWeight: bodyweight,
            userOrigin: origin,
            userBodyType: type,
            // userLanguage: language,
        }
        // UPDATE PROFILE DOC
        await updateDoc(doc(fireDb, "profiles", userId), profileData)
            .then(() => {
                router.push("/join/preferences");
            }).catch(function (error) {
                const message = error.message;
                console.log(error.message);
            })
    }

    // const [tags, setTags] = useState(["Deutsch", "Englisch"]);
    // onAddTag = (tag) => {
    //     setTags([...tags, tag]);
    // }

    // onDeleteTag = (tag) => {
    //     alert(`deleting ${tag}`);
    //     let remainingTags = tags.filter((t) => {
    //         return (t !== tag);
    //     });
    //     setTags([...remainingTags]);
    // }



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
                    <div className={styles.dot}>
                        <div>4</div>
                    </div>
                </div>
                <h1 className="text-4xl text-center font-bold">Erzähle uns etwas über dich</h1>
                <form onSubmit={handleSubmit(addDetailsToProfile)}>
                    <div className={styles.formRow}>
                        <div className="basis-1/2">
                            <label className="flex" htmlFor="stature">Körperstatur</label>
                            <select
                                {...register('stature', {
                                    required: true
                                })}
                                className={styles.fantsyInput}
                                type="text"
                                id="stature"
                                name="stature"
                                required
                                onChange={(e) => setStature(e.target.value)} value={stature} >
                                <option selected>Wähle aus</option>
                                <option>Dünn</option>
                                <option>Schlank</option>
                                <option>Athletisch</option>
                                <option>Mollig</option>
                                <option>Dick</option>
                            </select>
                        </div>
                        <div className="basis-1/2">
                            <label className="flex" htmlFor="bodysize">Körpergröße in cm</label>
                            <input
                                {...register('bodysize', {
                                    required: true
                                })}
                                className={styles.fantsyInput}
                                type="number"
                                id="bodysize"
                                name="bodysize"
                                required
                                onChange={(e) => setBodysize(e.target.value)} value={bodysize} />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className="basis-1/2">
                            <label className="flex" htmlFor="bodyweight">Körpergewicht in kg</label>
                            <input
                                {...register('bodyweight', {
                                    required: true
                                })}
                                className={styles.fantsyInput}
                                type="number"
                                id="gender"
                                name="bodyweight"
                                required
                                onChange={(e) => setBodyweight(e.target.value)} value={bodyweight} />
                        </div>
                        <div className="basis-1/2">
                            <label className="flex" htmlFor="origin">Herkunft</label>
                            <select
                                {...register('origin', {
                                    required: true
                                })}
                                className={styles.fantsyInput}
                                id="origin"
                                name="origin"
                                required
                                onChange={(e) => setOrigin(e.target.value)} value={origin} >
                                <option selected>Wähle aus</option>
                                <option>Deutschland</option>
                                <option>Österreich</option>
                                <option>Schweiz</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className="basis-1/2">
                            <label className="flex" htmlFor="type">Typ</label>
                            <select
                                {...register('type', {
                                    required: true
                                })}
                                className={styles.fantsyInput}
                                id="type"
                                name="type"
                                required
                                onChange={(e) => setType(e.target.value)} value={type} >
                                <option selected>Wähle aus</option>
                                <option>Osteuropäisch</option>
                                <option>Mitteleuropäisch</option>
                                <option>Südeuropäisch</option>
                                <option>Mischtyp</option>
                                <option>Asiatisch</option>
                                <option>Dunkelhäutig</option>
                                <option>Westeuropäisch</option>
                                <option>Lateinamerikanisch</option>
                                <option>Orientalisch</option>
                                <option>Anderer Typ</option>
                            </select>
                        </div>
                        {/* <div className="basis-1/2">
                            <label className="flex" htmlFor="language">Sprache</label>
                             <input className={styles.fantsyInput} type="number" maxLength="5" id="postCode" name="postcode" required onChange={(e) => setPostcode(e.target.value)} value={postcode} />
                             <TagsInput
                                {...register('language', {
                                    required: true
                                })}
                                className={styles.fantsyInput}
                                onChange={setLanguage}
                                value={language}
                                name="language"
                                placeHolder="Welche Sprachen sprichst du?"
                            /> 

                             <InputTag
                                onAddTag={onAddTag}
                                onDeleteTag={onDeleteTag}
                                defaultTags={tags}
                                placeholder="enter tags separated by comma" /> 
                        </div> */}
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <p>* erforderliche Daten um das Profil zu erstellen.</p>
                        <button
                            disabled={submitting}
                            className="bg-fantsy-green-400 rounded-lg p-2 w-1/3 disabled:bg-fantsy-green-300 disabled:hover:bg-fantsy-green-300 text-white hover:bg-fantsy-green-500 font-bold"
                            type="submit"
                        >Weiter</button>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Details