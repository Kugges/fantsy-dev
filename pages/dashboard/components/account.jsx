import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../src/hook/auth'
import { fireDb, storage } from '../../../firebaseClient'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from "react-toastify"
import Image from 'next/image'
import { AiOutlineUpload, AiFillEdit } from 'react-icons/ai'
import { BsImage } from 'react-icons/bs'
import starterImg from "../../../images/profile-starter.png"
import { deleteUser } from 'firebase/auth'

const styles = {
    fantsyInput: "focus:outline-fantsy-orange-500 col-span-3 px-2 py-1 ml-4 bg-shade-50 rounded-lg",
    errormsg: "text-red text-sm",
    submitBtn: "bg-fantsy-green-400 rounded-lg px-2 py-1 mt-4 col-start-4 col-end-7 text-white disabled:bg-shade-200 hover:bg-fantsy-green-500 font-bold",
    deleteBtn: "border border-red rounded-lg px-2 py-1 mt-4 disabled:border-shade-300 disabled:opacity-50",
    dotDone: "h-10 w-10 mx-5 rounded-full bg-fantsy-orange-500 flex items-center justify-center text-white font-bold",
    dot: "h-10 w-10 mx-5 rounded-full bg-shade-200 flex items-center justify-center text-shade-600",
    imageUploadBtn: "cursor-pointer block w-full text-sm mx-10 text-slate-500 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fantsy-green-200 file:text-fantsy-green-500 hover:file:bg-fantsy-green-500 hover:file:text-white",
    avatarOut: "aspect-square mx-auto rounded-full border-8 shadow-lg border-fantsy-green-500",
    avatarIn: "aspect-square mx-auto rounded-full border-8 shadow-lg border-white",
    showUploadBtn: "rounded-full p-2 self-end -ml-8 hover:bg-shade-200 hover:text-white bg-shade-100 text-shade-400",
    uploadBtn: "mt-4 max-w-max mx-auto py-2 px-4 flex items-center bg-fantsy-green-400 hover:bg-fantsy-green-500 text-white font-bold disabled:font-normal disabled:text-shade-300 disabled:bg-shade-50 rounded-full"
}


const Account = ({ currentProfile }) => {

    // PROFILE DATA FIELDS
    const [userName, setUserName] = useState("");
    const [prename, setPrename] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("")
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [postcode, setPostcode] = useState("");
    const { user } = useContext(AuthContext);

    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, submitting } = useForm();
    const img = currentProfile?.userProfileUrl;
    const img1 = currentProfile?.userImage1;
    const img2 = currentProfile?.userImage2;
    const img3 = currentProfile?.userImage3;
    const img4 = currentProfile?.userImage4;
    // console.log(img, "IMG")


    // GET FILE & URL FROM STORAGE
    const [file, setFile] = useState(null)

    const [url, setURL] = useState(img)
    const [url1, setURL1] = useState(img1)
    const [url2, setURL2] = useState(img2)
    const [url3, setURL3] = useState(img3)
    const [url4, setURL4] = useState(img4)

    const [step, setStep] = useState(false)
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [step4, setStep4] = useState(false)

    const [uploadNav, setUploadNav] = useState(false)
    const [uploadNav1, setUploadNav1] = useState(false)
    const [uploadNav2, setUploadNav2] = useState(false)
    const [uploadNav3, setUploadNav3] = useState(false)
    const [uploadNav4, setUploadNav4] = useState(false)

    const handleUploadNav = () => {
        setUploadNav(!uploadNav);
    };
    const handleUploadNav1 = () => {
        setUploadNav1(!uploadNav1);
    };
    const handleUploadNav2 = () => {
        setUploadNav2(!uploadNav2);
    };
    const handleUploadNav3 = () => {
        setUploadNav3(!uploadNav3);
    };
    const handleUploadNav4 = () => {
        setUploadNav4(!uploadNav4);
    };

    // UPLOAD IMAGE TO PROFILE
    const updateProfilePic = async event => {
        event.preventDefault()
        await updateDoc(doc(fireDb, "profiles", user.uid), {
            userProfileUrl: url
        })
            .then(() => {
                toast.success("Profilbild aktualisiert!");
                window.location.reload();
            })
    }
    const updateProfilePic1 = async event => {
        event.preventDefault()
        await updateDoc(doc(fireDb, "profiles", user.uid), {
            userImage1: url1
        })
            .then(() => {
                toast.success("Profilbild aktualisiert!");
                window.location.reload();
            })
    }
    const updateProfilePic2 = async event => {
        event.preventDefault()
        await updateDoc(doc(fireDb, "profiles", user.uid), {
            userImage2: url2
        })
            .then(() => {
                toast.success("Profilbild aktualisiert!");
                window.location.reload();
            })
    }
    const updateProfilePic3 = async event => {
        event.preventDefault()
        await updateDoc(doc(fireDb, "profiles", user.uid), {
            userImage3: url3
        })
            .then(() => {
                toast.success("Profilbild aktualisiert!");
                window.location.reload();
            })
    }
    const updateProfilePic4 = async event => {
        event.preventDefault()
        await updateDoc(doc(fireDb, "profiles", user.uid), {
            userImage4: url4
        })
            .then(() => {
                toast.success("Profilbild aktualisiert!");
                window.location.reload();
            })
    }

    // CREATE PROFILE DOC & SAVE TO FIRESTORE
    const updateUsername = async () => {

        const profileData = {
            displayName: userName,
            userPrename: prename,
            userLastname: lastname,
            userCity: city,
            userPostcode: postcode,
            userCountry: country,
        }
        // userGender: gender,
        // userSex: sexuality,
        // userBirthday: birthday,

        // UPDATE PROFILE DOC
        await updateDoc(doc(fireDb, "profiles", user.uid), profileData)
            .then(() => {
                // setPrename("")
                // router.push("/dashboard/account")
                toast.success("Accountdaten aktualisiert!");
                window.location.reload();
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
        setStep(true);
        setFile(null);
    }

    async function handleUpload1(e) {
        e.preventDefault();
        const userId = user.uid
        const path = `/images/${userId}/${file.name}`;
        const ref = storage.ref(path);
        await ref.put(file);
        const url1 = await ref.getDownloadURL();
        setURL1(url1);
        setStep1(true);
        setFile(null);
    }

    async function handleUpload2(e) {
        e.preventDefault();
        const userId = user.uid
        const path = `/images/${userId}/${file.name}`;
        const ref = storage.ref(path);
        await ref.put(file);
        const url2 = await ref.getDownloadURL();
        setURL2(url2);
        setStep2(true);
        setFile(null);
    }

    async function handleUpload3(e) {
        e.preventDefault();
        const userId = user.uid
        const path = `/images/${userId}/${file.name}`;
        const ref = storage.ref(path);
        await ref.put(file);
        const url3 = await ref.getDownloadURL();
        setURL3(url3);
        setStep3(true);
        setFile(null);
    }

    async function handleUpload4(e) {
        e.preventDefault();
        const userId = user.uid
        const path = `/images/${userId}/${file.name}`;
        const ref = storage.ref(path);
        await ref.put(file);
        const url4 = await ref.getDownloadURL();
        setURL4(url4);
        setStep4(true);
        setFile(null);
    }

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        await deleteDoc(doc(fireDb, "users", user.uid))
        await deleteDoc(doc(fireDb, "profiles", user.uid))
            .then(() => {
                console.log("Account Deleted!")
                deleteUser(user)
            })
        setIsDeleting(false);
        toast.success("Account Documents Deleted!");
        router.push("/")

    }

    return (
        <div>
            <h1 className="text-4xl text-center font-bold">Mein Account</h1>
            <div className="flex flex-col items-center gap-4 mt-10">
                <div className="col-span-1 flex flex-row">
                    <Image
                        src={img}
                        alt="Avatar"
                        width={200}
                        height={200}
                        priority
                        // className={file ? styles.avatarOut : styles.avatarIn}
                        className={styles.avatarIn}
                    />
                    <button className="rounded-full p-2 self-end -ml-10 hover:bg-shade-200 hover:text-white bg-shade-100 text-shade-400" onClick={handleUploadNav}><AiFillEdit size={20} /></button>
                </div>
                <form className={!uploadNav ? "hidden" : "block"} onSubmit={handleUpload}>
                    <div className="col-span-1 flex flex-col mt-10">
                        <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                        <button className="mt-4 max-w-max mx-auto py-2 px-4 flex items-center bg-fantsy-green-400 hover:bg-fantsy-green-500 text-white font-bold disabled:font-normal disabled:text-shade-300 disabled:bg-shade-50 rounded-full" disabled={!file}><AiOutlineUpload size={20} className="mr-1" />Hochladen</button>
                        {step ? <button className={styles.submitBtn} onClick={updateProfilePic}>Bestätigen</button> : <></>}
                    </div>
                </form>
            </div>
            <h2>Bildergalerie</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 items-center">
                <div className="col-span-1 flex flex-row">
                    <Image
                        src={img1}
                        alt="userImage1"
                        width={300}
                        height={300}
                        className="p-2"
                    />
                    <button className={styles.showUploadBtn} onClick={handleUploadNav1}><AiFillEdit size={20} /></button>
                </div>
                <div className="col-span-1 flex flex-row">
                    <Image
                        src={img2}
                        alt="userImage2"
                        width={300}
                        height={300}
                        className="p-2"
                    />
                    <button className={styles.showUploadBtn} onClick={handleUploadNav2}><AiFillEdit size={20} /></button>
                </div>
                <div className="col-span-1 flex flex-row">
                    <Image
                        src={img3}
                        alt="userImage3"
                        width={300}
                        height={300}
                        className="p-2"
                    />
                    <button className={styles.showUploadBtn} onClick={handleUploadNav3}><AiFillEdit size={20} /></button>
                </div>
                <div className="col-span-1 flex flex-row">
                    <Image
                        src={img4}
                        alt="userImage4"
                        width={300}
                        height={300}
                        className="p-2"
                    />
                    <button className={styles.showUploadBtn} onClick={handleUploadNav4}><AiFillEdit size={20} /></button>
                </div>
            </div>
            <form className={!uploadNav1 ? "hidden" : "flex items-center justify-center my-5"} onSubmit={handleUpload1}>
                <div className="col-span-2 flex flex-col">
                    <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                    <button className={styles.uploadBtn} disabled={!file}><AiOutlineUpload size={20} className="mr-1" />Hochladen</button>
                    {step1 ? <button className={styles.submitBtn} onClick={updateProfilePic1}>Bestätigen</button> : <></>}
                </div>
            </form>
            <form className={!uploadNav2 ? "hidden" : "flex items-center justify-center my-5"} onSubmit={handleUpload2}>
                <div className="col-span-2 flex flex-col">
                    <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                    <button className={styles.uploadBtn} disabled={!file}><AiOutlineUpload size={20} className="mr-1" />Hochladen</button>
                    {step2 ? <button className={styles.submitBtn} onClick={updateProfilePic2}>Bestätigen</button> : <></>}
                </div>
            </form>
            <form className={!uploadNav3 ? "hidden" : "flex items-center justify-center my-5"} onSubmit={handleUpload3}>
                <div className="col-span-2 flex flex-col">
                    <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                    <button className={styles.uploadBtn} disabled={!file}><AiOutlineUpload size={20} className="mr-1" />Hochladen</button>
                    {step3 ? <button className={styles.submitBtn} onClick={updateProfilePic3}>Bestätigen</button> : <></>}
                </div>
            </form>
            <form className={!uploadNav4 ? "hidden" : "flex items-center justify-center my-5"} onSubmit={handleUpload4}>
                <div className="col-span-2 flex flex-col">
                    <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                    <button className={styles.uploadBtn} disabled={!file}><AiOutlineUpload size={20} className="mr-1" />Hochladen</button>
                    {step4 ? <button className={styles.submitBtn} onClick={updateProfilePic4}>Bestätigen</button> : <></>}
                </div>
            </form>
            <form onSubmit={handleSubmit(updateUsername)} className="grid">
                {/* ---USERNAME--- */}
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="name" className="py-1 col-span-1">Username </label>
                    <input
                        {...register('name', {
                            required: true
                        })}
                        placeholder={currentProfile?.displayName}
                        className={styles.fantsyInput}
                        type="text"
                        id="username"
                        name="name"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                    />
                </div>
                <br></br>
                {/* ---PRENAME--- */}
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="prename" className="py-1 col-span-1">Vorname </label>
                    <input
                        {...register('prename', {
                            required: true
                        })}
                        placeholder={currentProfile?.userPrename}
                        className={styles.fantsyInput}
                        type="text"
                        id="prename"
                        name="prename"
                        onChange={(e) => setPrename(e.target.value)}
                        value={prename}
                    />
                </div>
                {/* ---LASTNAME--- */}
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="lastname" className="py-1 col-span-1">Nachname </label>
                    <input
                        {...register('lastname', {
                            required: true
                        })}
                        placeholder={currentProfile?.userLastname}
                        className={styles.fantsyInput}
                        type="text"
                        id="lastname"
                        name="lastname"
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                    />
                </div>
                {/* ---GENDER---
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="gender">Geschlecht *</label>
                    <select
                        defaultValue={currentProfile?.gender}
                        className={styles.fantsyInput}
                        {...register('gender', {
                            required: true
                        })}
                        id="gender"
                        name="gender"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
            userCity: city,
                    >
                        <option value="Weiblich">Weiblich</option>
                        <option value="Männlich">Männlich</option>
                        <option value="Divers">Divers</option>
                    </select>
                </div> */}
                <br></br>
                {/* ---CITY--- */}
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="city" className="py-1 col-span-1">Stadt </label>
                    <input
                        {...register('city', {
                            required: true
                        })}
                        placeholder={currentProfile?.userCity}
                        className={styles.fantsyInput}
                        type="text"
                        id="city"
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />
                </div>
                {/* ---POSTCODE--- */}
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="city" className="py-1 col-span-1">Postleitzahl </label>
                    <input
                        {...register('postcode', {
                            required: true
                        })}
                        placeholder={currentProfile?.userPostcode}
                        className={styles.fantsyInput}
                        type="number"
                        id="postcode"
                        name="postcode"
                        onChange={(e) => setPostcode(e.target.value)}
                        value={postcode}
                    />
                </div>
                {/* ---COUNTRY--- */}
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="city" className="py-1 col-span-1">Land </label>
                    <input
                        {...register('country', {
                            required: true
                        })}
                        placeholder={currentProfile?.userCountry}
                        className={styles.fantsyInput}
                        type="text"
                        id="country"
                        name="country"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                    />
                </div>

                <br></br>
                <br></br>
                <br></br>
                <div className="mt-5 grid grid-cols-6">
                    <button
                        disabled={submitting}
                        type="submit"
                        className={styles.submitBtn}
                    >Aktualisieren</button>
                </div>
            </form>
            <div>
                <h2 className="text-lg tetx-bold">Account löschen</h2>
                <button
                    disabled={isDeleting}
                    onClick={handleDeleteAccount}
                    className={styles.deleteBtn}
                >Account löschen</button>
            </div>

        </div>
    )
}

export default Account