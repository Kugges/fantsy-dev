import React, { useState, useContext } from 'react'
import { collection, addDoc, serverTimestamp, updateDoc, doc, setDoc } from 'firebase/firestore'
import { fireDb } from '../../firebaseClient'

import { AuthContext } from "../../src/hook/auth"
import { toast } from "react-toastify"

import Container from '../../components/container'
import { useRouter } from 'next/router'


const styles = {
    dotDone: "h-10 w-10 mx-5 rounded-full bg-fantsy-orange-500 flex items-center justify-center text-white font-bold",
    dot: "h-10 w-10 mx-5 rounded-full bg-shade-200 flex items-center justify-center text-shade-600",
    fantsyInput: "focus:outline-fantsy-orange-500 hover:outline-fantsy-orange-200 px-2 py-1 w-full bg-shade-50 rounded-lg",
    imageUploadBtn: "cursor-pointer block w-full text-sm mx-10 text-slate-500 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fantsy-green-200 file:text-fantsy-green-700 hover:file:bg-fantsy-green-500 hover:file:text-white"
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
            <h1 className="text-4xl text-center font-bold">Erstelle dein Profil!</h1>
            <div className="my-10 flex flex-row gap-10">
                <div className="basis-1/2">
                    <label className="flex" htmlFor="prename">Vorname *</label>
                    <input className={styles.fantsyInput} type="text" id="preName" name="prename" required onChange={(e) => setPrename(e.target.value)} value={prename} />
                </div>
                <div className="basis-1/2">
                    <label className="flex" htmlFor="lastname">Nachname *</label>
                    <input className={styles.fantsyInput} type="text" id="lastName" name="lastname" required onChange={(e) => setLastname(e.target.value)} value={lastname} />
                </div>
            </div>
            <div className=" my-10 flex flex-row gap-10">
                <div className="basis-1/2">
                    <label className="flex" htmlFor="gender">Geschlecht *</label>
                    <select className={styles.fantsyInput} id="gender" name="gender" required onChange={(e) => setGender(e.target.value)} value={gender} >
                        <option selected>Wähle aus</option>
                        <option>Weiblich</option>
                        <option>Männlich</option>
                        <option>Divers</option>
                    </select>
                </div>
                <div className="basis-1/2">
                    <label className="flex" htmlFor="sexuality">Sexuelle Orientierung *</label>
                    <select className={styles.fantsyInput} id="sexuality" name="sexuality" required onChange={(e) => setSexuality(e.target.value)} value={sexuality} >
                        <option selected>Wähle aus</option>
                        <option>Heterosexuell</option>
                        <option>Homosexuell</option>
                        <option>Bisexuell</option>
                    </select>
                </div>
            </div>
            <div className="my-10 flex flex-row gap-10">
                <div className="basis-1/2">
                    <label className="flex" htmlFor="birthday">Geburtsdatum *</label>
                    <input className={styles.fantsyInput} type="date" id="birthDay" name="birthday" required onChange={(e) => setBirthday(e.target.value)} value={birthday} />
                </div>
                <div className="basis-1/2">
                    <label className="flex" htmlFor="postcode">Postleitzahl *</label>
                    <input className={styles.fantsyInput} type="number" maxLength="5" id="postCode" name="postcode" required onChange={(e) => setPostcode(e.target.value)} value={postcode} />
                </div>
            </div>
            <div className="my-10 flex flex-row gap-10">
                <div className="basis-1/2">
                    <label className="flex" htmlFor="lastname">Stadt *</label>
                    <input className={styles.fantsyInput} type="text" id="lastName" name="lastname" required onChange={(e) => setCity(e.target.value)} value={city} />
                </div>
                <div className="basis-1/2">
                    <label className="flex" htmlFor="lastname">Land *</label>
                    <input className={styles.fantsyInput} type="text" id="lastName" name="lastname" required onChange={(e) => setCountry(e.target.value)} value={country} />
                </div>
            </div>
            <div className="mt-10 flex">
                <input className="focus:outline-fantsy-orange-300 bg-shade-50 mr-2" type="checkbox" id="workerYes" name="workerType" onChange={(e) => setWorkerType(e.target.checked)} />
                <label className="flex" htmlFor="workerType">Ich möchte mich und meinen Content in einem Fantsy-Profil anbieten.</label>
            </div>
            <div className="mb-10 flex">
                <label className="flex italic text-shade-300" htmlFor="workerType">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nostrum, aspernatur incidunt reiciendis debitis iusto, a officia sequi nam, veniam qui est porro officiis impedit cum voluptatibus temporibus repudiandae ipsa.</label>
            </div>
            <div className="flex flex-row items-center justify-between">
                <p>* erforderliche Daten um das Profil zu erstellen.</p>
                <button
                    className="bg-fantsy-green-400 rounded-lg p-2 w-1/3 text-white hover:bg-fantsy-green-500 font-bold"
                    type="submit"
                    onClick={addProfileToFirebase}
                >Weiter</button>
            </div>
        </Container>

    )

}


export default WorkerAccountDetails;
