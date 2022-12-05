import React, { useState, useContext } from 'react'
import { collection, addDoc, serverTimestamp, updateDoc, doc, setDoc } from 'firebase/firestore'
import { fireDb, storage } from '../firebaseClient'

import Image from 'next/image'
import starterImg from '../images/profile-starter.png'
import { AuthContext } from "../src/hook/auth"
import { toast } from "react-toastify"
import { AiOutlineUpload } from 'react-icons/ai'
import { FantsyContext } from '../src/hook/FantsyContext'


const styles = {
    imageUploadBtn: "cursor-pointer block w-full text-sm mx-10 text-slate-500 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fantsy-blue-50 file:text-fantsy-blue-700 hover:file:bg-fantsy-blue-100"
}

const WorkerAccountDetails = () => {

    // GET LOGGED-IN-USER ID
    const { user } = useContext(AuthContext)
    console.log(user, "USER READY FOR PROFILE")
    const { currentProfile } = useContext(FantsyContext)    
    // console.log(currentProfile.id, "UUUUUUUUUU")

    // GET FILE & URL FROM STORAGE
    const [file, setFile] = useState(null)
    const [url, setURL] = useState(starterImg)

    // CREATE PROFILE
    const [username, setUsername] = useState("")
    const [prename, setPrename] = useState("")
    const [lastname, setLastname] = useState("")
    const [gender, setGender] = useState("")
    // const [age, setAge] = useState("");
    const [workertype, setWorkerType] = useState(false);
    // const handleChange = () => {
    //     setWorkerType(!workertype);
    // }

    const addProfileToFirebase = async event => {
        event.preventDefault()
        // const profileAdded = await addDoc(collection(fireDb, "profiles"), {
        await setDoc(doc(fireDb, "profiles", user.uid), {
            displayName: username,
            userPrename: prename,
            userLastname: lastname,
            email: user.email,
            userGender: gender,
            userProfileUrl: url,
            workerProfile: workertype,
            createdAt: serverTimestamp(),
            likesCount: 0,
            bio: "Fantsy meeting you here!"
        })
        // console.log(profileAdded.id, "is this the profiles ID?")
        await updateDoc(doc(fireDb, "users", user.uid), {
            profileId: profileAdded.id,
            photoURL: url
        })
        .then(function () {
            toast.success("Profil erstellt!");
            window.location.href = "/"
            // window.location.href = `/profile/${profileAdded.id}` //TODO route User to own profile page after successfull profile
        }).catch(function (error) {
            const message = error.message;
            console.log(error.message);
        })
    }

    // SHOW UPLOADED USER IMAGE
    function handleChange(e) {
        if (e.target.files[0])
            setFile(e.target.files[0]);
    }

    //UPLOAD USER IMAGE TO STORAGE AND RETURN DOWNLOADURL FOR PROFILE
    async function handleUpload(e) {
        e.preventDefault();
        const userId = user.uid
        const path = `/images/${userId}/${file.name}`;
        const ref = storage.ref(path);
        await ref.put(file);
        const url = await ref.getDownloadURL();
        setURL(url);
        setFile(null);
    }

    return (
        <div className="p-4 w-full py-40 justify-center items-center">
            <div className="p-4 flex items-center justify-center h-screen">
                <div className="p-4 sm:p-10 w-screen sm:w-1/2 rounded-lg bg-white shadow-lg flex items-center justify-center">
                    <div className="h-full w-3/4">
                        <h1 className="text-4xl text-center font-bold mt-5">Profil erstellen</h1>
                        <form className="flex items-center" onSubmit={handleUpload}>
                            <Image
                                src={url}
                                alt="fantsy logo"
                                width={100}
                                height={100}
                                placeholder="fantsy-logo"
                                priority="eager"
                                className="aspect-square mx-auto rounded-full border-4 border-shade-50"
                            />
                            <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                            <button className="py-2 px-4 flex items-center text-white bg-fantsy-orange-400 rounded-full" disabled={!file}><AiOutlineUpload size={20} className="mr-2" />Hochladen</button>
                        </form>
                        <div className="my-5">
                            <label className="flex" htmlFor="username">Username</label>
                            <input className="w-full bg-shade-50" type="text" id="userName" name="username" required onChange={(e) => setUsername(e.target.value)} value={username} />
                        </div>
                        <div className="my-5">
                            <label className="flex" htmlFor="prename">Vorname</label>
                            <input className="w-full bg-shade-50" type="text" id="preName" name="prename" required onChange={(e) => setPrename(e.target.value)} value={prename} />
                        </div>
                        <div className="my-5">
                            <label className="flex" htmlFor="lastname">Nachname</label>
                            <input className="w-full bg-shade-50" type="text" id="lastName" name="lastname" required onChange={(e) => setLastname(e.target.value)} value={lastname} />
                        </div>
                        <div className="my-5">
                            <label className="flex" htmlFor="gender">Geschlecht</label>
                            <select className="w-full bg-shade-50" type="text" id="gender" name="gender" required onChange={(e) => setGender(e.target.value)} value={gender} >
                                <option>Weiblich</option>
                                <option>Männlich</option>
                                <option>Divers</option>
                            </select>
                        </div>
                        {/* <div className="my-5">
                            <label className="flex" htmlFor="lastname">Nachname</label>
                            <input className="w-full bg-shade-50" type="text" id="lastName" name="lastname" required onChange={(e) => setLastname(e.target.value)} value={lastname} />
                        </div>
                        <div className="my-5">
                            <label className="flex" htmlFor="lastname">Nachname</label>
                            <input className="w-full bg-shade-50" type="text" id="lastName" name="lastname" required onChange={(e) => setLastname(e.target.value)} value={lastname} />
                        </div> */}
                        <div className="my-5 flex">
                            <input className="bg-shade-50 mr-2" type="checkbox" id="workerYes" name="workerType" onChange={(e) => setWorkerType(e.target.checked)} />
                            <label className="flex" htmlFor="workerType">Ich möchte mich und meinen Content in einem Fantsy-Profil anbieten.</label>
                        </div>
                        <button
                            className="mt-5 bg-fantsy-green-400 rounded-lg p-2 w-1/3 self-center text-white hover:bg-fantsy-green-500 float-left font-bold"
                            type="submit"
                            onClick={addProfileToFirebase}
                        >Profil erstellen</button>
                    </div>
                </div>
            </div>
        </div>

    )

}



// export async function getServerSideProps(context) {
//     try {
//         const cookies = nookies.get(context);
//         const token = await verifyIdToken(cookies.token);
//         const { uid, email } = token;

//         return {
//             props: { userUid: uid }

//         };
//     } catch (err) {
//         context.res.writeHead(302, { location: "/login" });
//         context.res.end();
//         return { props: [] };
//     }
// }

// const createWorkerDetails = async () => {

//     // await setDoc(doc(fireDb, "profiles", user.uid), {
//     //     userDisplayName: username,
//     //     userPreName: prename,
//     //     userLastName: lastname,
//     //     profilePic: profilePicUrl,
//     //     likesCount: 0

//     // })



//     // await getDoc(doc(fireDb, "users", user.uid))
//     //     .then((userUid) => {
//     //         const user = userUid.user;
//     //         const userData = {
//     //             userName: user.username,
//     //             preName: user.prename,
//     //             lastName: user.lastname
//     //             //   id: user.uid,
//     //             //   email: user.email,
//     //             //   profilePicUrl: '',
//     //             //   bio: 'Fantsy meeting you here!'
//     //         }
//     //         setDoc(doc(fireDb, "users", user.uid), userData);
//     //         console.log(userData);
//     //     }).catch(function (error) {
//     //         const message = error.message;
//     //         console.log(error.message);
//     //         toast.error(error.message);
//     //     })


// }

export default WorkerAccountDetails;
