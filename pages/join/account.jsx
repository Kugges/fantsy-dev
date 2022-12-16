import React, { useState, useContext } from 'react'
import { collection, addDoc, serverTimestamp, updateDoc, doc, setDoc } from 'firebase/firestore'
import { fireDb } from '../../firebaseClient'
import { AuthContext } from "../../src/hook/auth"
import { toast } from "react-toastify"
import Container from '../../components/container'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'


const styles = {
    dotDone: "h-10 w-10 mx-5 rounded-full bg-fantsy-orange-500 flex items-center justify-center text-white font-bold",
    dot: "h-10 w-10 mx-5 rounded-full bg-shade-200 flex items-center justify-center text-shade-600",
    fantsyInput: "focus:outline-fantsy-orange-500 hover:outline-fantsy-orange-200 px-2 py-1 w-full bg-shade-50 rounded-lg",
    imageUploadBtn: "cursor-pointer block w-full text-sm mx-10 text-slate-500 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fantsy-green-200 file:text-fantsy-green-700 hover:file:bg-fantsy-green-500 hover:file:text-white",
    errormsg: "text-red text-sm"
}

const WorkerAccountDetails = () => {

    // GET LOGGED-IN-USER ID
    const { user } = useContext(AuthContext)

    // GET ROUTER
    const router = useRouter();

    // PROFILE DOC DETAILS
    const [prename, setPrename] = useState("")
    const [lastname, setLastname] = useState("")
    const [gender, setGender] = useState("")
    const [sexuality, setSexuality] = useState("")
    const [birthday, setBirthday] = useState("");
    const [postcode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [workertype, setWorkerType] = useState(false);

    const { register, handleSubmit, formState: { errors }, submitting } = useForm();



    // const genderSelection = (value) => {
    //     return value === "1" || value === "2" || value === "3";
    // }
    // const sexSelection = (value) => {
    //     return value === "5" || value === "6" || value === "7";
    // }
    // const prenameSelection = (value) => {
    //     return value !== "";
    // }
    // const prenameWatch = watch("prename")
    // const lastnameWatch = watch("lastname")
    // const genderWatch = watch("gender")
    // const sexuAlityWatch = watch("sexuality")



    // CREATE PROFILE DOC & SAVE TO FIRESTORE
    const addProfileToFirebase = async () => {
        const profileData = {
            userPrename: prename,
            userLastname: lastname,
            email: user.email,
            userGender: gender,
            userSex: sexuality,
            userBirthday: birthday,
            userCity: city,
            userPostcode: postcode,
            userCountry: country,
            workerProfile: workertype
        }
        // UPDATE PROFILE DOC
        await updateDoc(doc(fireDb, "profiles", user.uid), profileData)
            .then(() => {
                router.push("/");
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
                    <div className={styles.dot}>
                        <div>3</div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(addProfileToFirebase)}>
                <h1 className="text-4xl text-center font-bold">Erstelle dein Profil!</h1>
                <div className="my-10 flex flex-row gap-10">
                    <div className="basis-1/2">
                        <label htmlFor="prename">Vorname *</label>
                        <input className={styles.fantsyInput}
                            {...register('prename', {
                                required: true
                            })}
                            type="text"
                            id="preName"
                            name="prename"
                            onChange={(e) => setPrename(e.target.value)}
                            value={prename}
                        />
                        {errors.prename && <p className={styles.errormsg}>Vorname fehlt.</p>}

                    </div>
                    <div className="basis-1/2">
                        <label htmlFor="lastname">Nachname *</label>
                        <input
                            className={styles.fantsyInput}
                            {...register('lastname', {
                                required: true
                            })}
                            type="text"
                            id="lastName"
                            name="lastname"
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastname}
                        />
                        {errors.lastname && <p className={styles.errormsg}>Nachname fehlt.</p>}
                    </div>
                </div>
                <div className=" my-10 flex flex-row gap-10">
                    <div className="basis-1/2">
                        <label htmlFor="gender">Geschlecht *</label>
                        <select
                            className={styles.fantsyInput}
                            {...register('gender', {
                                required: true
                            })}
                            id="gender"
                            name="gender"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                        >
                            <option value="">Wähle aus</option>
                            <option value="1">Weiblich</option>
                            <option value="2">Männlich</option>
                            <option value="3">Divers</option>
                        </select>
                        {errors.gender && <p className={styles.errormsg}>Wähle dein Geschlecht aus.</p>}
                    </div>
                    <div className="basis-1/2">
                        <label htmlFor="sexuality">Sexuelle Orientierung *</label>
                        <select
                            className={styles.fantsyInput}
                            {...register('sexuality', {
                                required: true
                            })}
                            id="sexuality"
                            name="sexuality"
                            onChange={(e) => setSexuality(e.target.value)}
                            value={sexuality}
                        >
                            <option value="">Wähle aus</option>
                            <option value="5">Heterosexuell</option>
                            <option value="6">Homosexuell</option>
                            <option value="7">Bisexuell</option>
                        </select>
                        {errors.sexuality && <p className={styles.errormsg}>Wähle deine Sexualität.</p>}
                    </div>
                </div>
                <div className="my-10 flex flex-row gap-10">
                    <div className="basis-1/2">
                        <label htmlFor="birthday">Geburtsdatum *</label>
                        <input
                            className={styles.fantsyInput}
                            {...register('birthday', {
                                required: true
                            })}
                            type="date"
                            id="birthDay"
                            name="birthday"
                            onChange={(e) => setBirthday(e.target.value)}
                            value={birthday}
                        />
                        {errors.birthday && <p className={styles.errormsg}>Geburtstag fehlt.</p>}
                    </div>
                    <div className="basis-1/2">
                        <label htmlFor="postcode">Postleitzahl *</label>
                        <input
                            className={styles.fantsyInput}
                            {...register('postcode', {
                                required: true,
                                minLength: { value: 4, message: "Postleitzahl besteht aus mindestens 4 Ziffern." }
                            })}
                            type="number"
                            id="postCode"
                            name="postcode"
                            onChange={(e) => setPostcode(e.target.value)}
                            value={postcode}
                        />
                        {errors.postcode && errors.postcode.type === "required" && <p className={styles.errormsg}>Postleitzahl fehlt.</p>}
                        {errors.postcode && errors.postcode.type === "minLength" && <p className={styles.errormsg}>{errors.postcode.message}</p>}
                    </div>
                </div>
                <div className="my-10 flex flex-row gap-10">
                    <div className="basis-1/2">
                        <label htmlFor="city">Stadt *</label>
                        <input
                            className={styles.fantsyInput}
                            {...register('city', {
                                required: true
                            })}
                            type="text"
                            id="City"
                            name="city"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        />
                        {errors.city && <p className={styles.errormsg}>Stadt fehlt.</p>}
                    </div>
                    <div className="basis-1/2">
                        <label htmlFor="country">Land *</label>
                        <input
                            className={styles.fantsyInput}
                            {...register('country', {
                                required: true
                            })}
                            type="text"
                            id="Country"
                            name="country"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                        />
                        {errors.country && <p className={styles.errormsg}>Land fehlt.</p>}
                    </div>
                </div>
                <div className="mt-10 flex">
                    <input className="focus:outline-fantsy-orange-300 bg-shade-50 mr-2" type="checkbox" id="workerYes" name="workerType" onChange={(e) => setWorkerType(e.target.checked)} />
                    <label htmlFor="workerType">Ich möchte mich und meinen Content in einem Fantsy-Profil anbieten.</label>
                </div>
                <div className="mb-10 flex">
                    <label className="flex italic text-shade-300" htmlFor="workerType">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nostrum, aspernatur incidunt reiciendis debitis iusto, a officia sequi nam, veniam qui est porro officiis impedit cum voluptatibus temporibus repudiandae ipsa.</label>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <p>* erforderliche Daten um das Profil zu erstellen.</p>
                    <button
                        disabled={submitting}
                        className="bg-fantsy-green-400 rounded-lg p-2 w-1/3 text-white disabled:bg-fantsy-green-300 hover:bg-fantsy-green-500 font-bold"
                        type="submit"
                    >Weiter</button>
                </div>
            </form>
        </Container>

    )

}


export default WorkerAccountDetails;
