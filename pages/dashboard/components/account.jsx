import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
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
import { builder } from '@invertase/image-processing-api';
import galleryPlaceholder from "../../../images/gallery-placeholder.png"
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

const styles = {
    fantsyInput: "focus:outline-fantsy-orange-500 col-span-3 px-2 py-1 ml-4 bg-shade-50 rounded-lg",
    fantsyInputSm: "focus:outline-fantsy-orange-500 col-span-2 px-2 py-1 ml-4 bg-shade-50 rounded-lg",
    fantsyTextarea: "focus:outline-fantsy-orange-500 h-40 col-span-3 px-2 py-1 ml-4 bg-shade-50 rounded-lg",
    errormsg: "text-red text-sm",
    submitBtn: "bg-fantsy-green-400 rounded-lg px-2 py-1 mt-4 col-start-4 col-end-7 text-white disabled:bg-shade-200 hover:bg-fantsy-green-500 font-bold",
    deleteBtn: "border border-red rounded-lg px-2 py-1 mt-4 hover:bg-red hover:text-white disabled:border-shade-300 disabled:opacity-50",
    dotDone: "h-10 w-10 mx-5 rounded-full bg-fantsy-orange-500 flex items-center justify-center text-white font-bold",
    dot: "h-10 w-10 mx-5 rounded-full bg-shade-200 flex items-center justify-center text-shade-600",
    imageUploadBtn: "cursor-pointer inline-block w-full text-sm mx-10 text-slate-500 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fantsy-green-200 file:text-fantsy-green-500 hover:file:bg-fantsy-green-500 hover:file:text-white",
    avatarOut: "aspect-square mx-auto rounded-full border-8 shadow-lg border-fantsy-green-500",
    avatarIn: "aspect-square mx-auto rounded-full border-8 shadow-lg border-white",
    formRow: "my-10 text-center flex flex-wrap gap-2 w-full",
    fantsyCheck: "appearance-none",
    showUploadBtn: "rounded-full p-2 self-end -ml-8 hover:bg-shade-200 hover:text-white bg-shade-100 text-shade-400",
    uploadBtn: "mt-4 inline-block max-w-max mx-auto py-2 px-4 flex items-center bg-fantsy-green-400 hover:bg-fantsy-green-500 text-white font-bold disabled:font-normal disabled:text-shade-300 disabled:bg-shade-50 rounded-full"
}


const Account = ({ currentProfile }) => {

    // PROFILE DATA FIELDS
    const [userName, setUserName] = useState("");
    const [prename, setPrename] = useState("");
    const [lastname, setLastname] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [origin, setOrigin] = useState("");
    const [postcode, setPostcode] = useState("");
    const [bio, setBio] = useState("");
    const [sex, setSex] = useState("");
    const [size, setSize] = useState("");
    const [stature, setStature] = useState("");
    const [weight, setWeight] = useState("");

    const myInterests = "blond, rothaarig, brünette, schwarzehaare, amateur, studentin, student, trans, domina, fetisch, bdsm, bizarr, tabulos, girlfriendsex, teen, schwul, lesbisch, bisexuell, anal, grosserarsch, petite, kurvig, schlank, sportlich, hourglas, bbw, dünn, grossebrust, kleinebrust, kleinerarsch, pornstar, camgirl, milf, reif, sklave, sklavin, hardcore, safersex, tattoos, piercings, arsch, rimming, blowjob, deepthroat, cim, cof, hartersex, vanilla, naturfranzösisch, französisch, griechisch, spanisch, küssen, rollenspiele, sextoys, spielzeug, vomit, spitting, kavier, natursekt, goldenshower, privat, onenightstand, sugarbabe, sugardaddy, swinger, pornstarexperience, girlfriendexperience, kuscheln, lingerie, strapse, highheels, strümpfe, kostüme, softcore, hobbyhure, fotos, videos, nymphomanisch, dominant, devot, dunkelhäutig, latina, südeuropäisch, mitteleuropäisch, orientalisch, asiatisch, lateinamerikanisch, mischtyp, westeuropäisch, osteuropäisch, ebony, rasiert, unrasiert, behaart, raucher, nichtraucher, natürlich, silikon, outcall, incall, vaginalsex, taschengeld, paar, dreier, erotischemassage, thaimassage, massage".split(",")
    const [interests, setInterests] = useState({});

    useEffect(() => {
        const userInterests = currentProfile?.userInterests || [];

        // Create a new object based on the current state of interests
        // and update the checked state for each interest based on whether
        // it is in the user's interests array or not
        setInterests(prevInterests => {
            const newInterests = { ...prevInterests };

            myInterests.forEach(interest => {
                newInterests[interest] = userInterests.includes(interest);
            });

            return newInterests;
        });
    }, [currentProfile]);

    const handleInterestChange = (event) => {
        const { name, checked } = event.target;

        // Update the interests state when a checkbox is checked or unchecked
        setInterests(prevInterests => ({
            ...prevInterests,
            [name]: checked
        }));
    };

    const handleSaveInterests = async () => {
        const userInterests = myInterests.filter(int => interests[int]);
        // save userInterests to Firestore
        await updateDoc(doc(fireDb, "profiles", userID), { userInterests })
            .then(() => {
                toast.success("Interessen aktualisiert!")
                window.location.reload();
            }).catch(function (error) {
                const message = error.message;
                console.log(error.message);
            })
    };


    const addInterestsToProfile = async (data) => {
        const checkedValues = Object.values(data).filter(Boolean)
        const checkedArrayOfInterests = checkedValues[0];
        // console.log("Array of the selected Checkboxes", checkedValues[1])

        // CLEAR INTERESTS FIELD BEFORE UPDATING
        await updateDoc(doc(fireDb, "profiles", userID), {
            userInterests: firebase.firestore.FieldValue.delete(),
        })
        await updateDoc(doc(fireDb, "profiles", userID), {
            userInterests: firebase.firestore.FieldValue.arrayUnion(...checkedArrayOfInterests),
        })
            .then(() => {
                toast.success("Interessen aktualisiert!")
                router.push("/");
            }).catch(function (error) {
                const message = error.message;
                console.log(error.message);
            })
    }

    const [workerPrices, setWorkerPrices] = useState("")

    const [workerPrices1, setWorkerPrices1] = useState("")
    const [workerPrices2, setWorkerPrices2] = useState("")
    const [workerPrices3, setWorkerPrices3] = useState("")
    const [workerPrices4, setWorkerPrices4] = useState("")
    const [workerPrices5, setWorkerPrices5] = useState("")
    const [workerPrices6, setWorkerPrices6] = useState("")
    const [workerPrices7, setWorkerPrices7] = useState("")
    const [workerPrices8, setWorkerPrices8] = useState("")

    const profilePrice = currentProfile?.workerPrices;

    useEffect(() => {
        if (profilePrice) {
            const sortedPrices = Object.entries(profilePrice)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map((price) => price[1]);
            setWorkerPrices(sortedPrices);
            setWorkerPrices1(sortedPrices[0]);
            setWorkerPrices2(sortedPrices[1]);
            setWorkerPrices3(sortedPrices[2]);
            setWorkerPrices4(sortedPrices[3]);
            setWorkerPrices5(sortedPrices[4]);
            setWorkerPrices6(sortedPrices[5]);
            setWorkerPrices7(sortedPrices[6]);
            setWorkerPrices8(sortedPrices[7]);
        }
    }, [profilePrice]);


    console.log("PROFILEEEEEEEEEE", workerPrices)
    // Define an array of keys in the desired order
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

    useEffect(() => {
        const fetchData = async () => {
            setUserName(currentProfile?.displayName)
            setPrename(currentProfile?.userPrename)
            setLastname(currentProfile?.userLastname)
            setCity(currentProfile?.userCity)
            setCountry(currentProfile?.userCountry)
            setOrigin(currentProfile?.userOrigin)
            setPostcode(currentProfile?.userPostcode)
            setBio(currentProfile?.bio)
            setSex(currentProfile?.userSex)
            setSize(currentProfile?.userSize)
            setStature(currentProfile?.userStature)
            setWeight(currentProfile?.userWeight)
        };
        fetchData();

    }, [currentProfile?.displayName]);

    const { user } = useContext(AuthContext);
    const userID = user?.uid

    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, submitting, watch } = useForm();
    const bgImg = currentProfile?.userBgUrl;
    const img = currentProfile?.userProfileUrl;
    const img1 = currentProfile?.userImage1;
    const img2 = currentProfile?.userImage2;
    const img3 = currentProfile?.userImage3;
    const img4 = currentProfile?.userImage4;
    // console.log(img, "IMG")


    // GET FILE & URL FROM STORAGE
    const [file, setFile] = useState(null)
    const defaultGalleryImage = galleryPlaceholder

    const [bgUrl, setBgUrl] = useState(bgImg)
    const [url, setURL] = useState(img)
    const [url1, setURL1] = useState(img1)
    const [url2, setURL2] = useState(img2)
    const [url3, setURL3] = useState(img3)
    const [url4, setURL4] = useState(img4)

    const [stepBg, setStepBg] = useState(false)
    const [step, setStep] = useState(false)
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [step4, setStep4] = useState(false)

    const [uploadNavBg, setUploadNavBg] = useState(false)
    const [uploadNav, setUploadNav] = useState(false)
    const [uploadNav1, setUploadNav1] = useState(false)
    const [uploadNav2, setUploadNav2] = useState(false)
    const [uploadNav3, setUploadNav3] = useState(false)
    const [uploadNav4, setUploadNav4] = useState(false)

    const handleUploadNavBg = () => {
        setUploadNavBg(!uploadNavBg);
    };
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



    const getUrl = (source) => {
        const URL = `https://europe-west3-fantsy-net.cloudfunctions.net/ext-image-processing-api-handler/process?operations=`;

        const options = builder()
            .input({
                type: "gcs",
                source: encodeURIComponent(source),
            })
            .output({ webp: {} })
            .toEncodedString();

        return `${URL}${options}`;
    };
    // UPLOAD BACKGROUND IMAGE TO PROFILE
    const updateBackgroundPic = async event => {
        event.preventDefault()
        await updateDoc(doc(fireDb, "profiles", user.uid), {
            userBgUrl: bgUrl
        })
            .then(() => {
                toast.success("Hintergrundbild aktualisiert!");
                window.location.reload();
            })
    }
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
                toast.success("Galleriebild aktualisiert!");
                window.location.reload();
            })
    }
    const updateProfilePic2 = async event => {
        event.preventDefault()
        await updateDoc(doc(fireDb, "profiles", user.uid), {
            userImage2: url2
        })
            .then(() => {
                toast.success("Galleriebild aktualisiert!");
                window.location.reload();
            })
    }
    const updateProfilePic3 = async event => {
        event.preventDefault()
        await updateDoc(doc(fireDb, "profiles", user.uid), {
            userImage3: url3
        })
            .then(() => {
                toast.success("Galleriebild aktualisiert!");
                window.location.reload();
            })
    }
    const updateProfilePic4 = async event => {
        event.preventDefault()
        await updateDoc(doc(fireDb, "profiles", user.uid), {
            userImage4: url4
        })
            .then(() => {
                toast.success("Galleriebild aktualisiert!");
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
            bio: bio,
            userOrigin: origin,
            userSex: sex,
            userSize: size,
            userStature: stature,
            userWeigth: weight,
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

    const updateVIPonly = async (data) => {
        const vipOnly = data.vipOnly; // Get the value of the "vipOnly" field
        await updateDoc(doc(fireDb, "profiles", user.uid), { vipOnly })
            .then(() => {
                toast.success("VIP Status aktualisiert!");
                window.location.reload();
            }).catch(function (error) {
                const message = error.message;
                console.log(error.message);
            })
    }

    // CREATE PROFILE DOC & SAVE TO FIRESTORE
    const updateDetails = async () => {

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
    async function handleUploadBg(e) {
        e.preventDefault();
        const userId = user.uid;
        if (!file) {
            return;
        }
        const path = `/images/${userId}/${file.name}`;
        const ref = storage.ref(path);
        await ref.put(file);
        const bgUrl = await ref.getDownloadURL();
        setBgUrl(bgUrl);
        setStepBg(true);
        setFile(null);
    }

    async function handleUpload(e) {
        e.preventDefault();
        const userId = user.uid;
        if (!file) {
            return;
        }
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
        const userId = user.uid;
        if (!file) {
            return;
        }
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
        const userId = user.uid;
        if (!file) {
            return;
        }
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
        const userId = user.uid;
        if (!file) {
            return;
        }
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
        const userId = user.uid;
        if (!file) {
            return;
        }
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

    const addPricesToProfile = async () => {

        // CLEAR INTERESTS FIELD BEFORE UPDATING
        await updateDoc(doc(fireDb, "profiles", userID), {
            workerPrices: firebase.firestore.FieldValue.delete(),
        })
        const workerPrices = {
            "01_15 min": workerPrices1,
            "02_30 min": workerPrices2,
            "03_1 Std": workerPrices3,
            "04_2 Std": workerPrices4,
            "05_3 Std": workerPrices5,
            "06_4 Std": workerPrices6,
            "07_8 Std": workerPrices7,
            "08_12 Std": workerPrices8
        };

        await updateDoc(doc(fireDb, "profiles", userID), {
            workerPrices: workerPrices
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
                window.location.reload();
            }).catch(function (error) {
                const message = error.message;
                console.log(error.message);
            })
    }

    return (
        <div>
            <h1 className="text-4xl text-center font-bold">Mein Account</h1>
            <div className="grid mt-10 grid-cols-2 sm:grid-cols-4 items-center">
                <div className="col-span-4 flex flex-row">
                    <Image
                        src={bgImg}
                        width={1000}
                        height={100}
                        className="rounded-lg"
                    />
                </div>
                <button className="rounded-full p-2 w-max ml-2 -mt-12 hover:bg-shade-200 hover:text-white bg-shade-100 text-shade-400" onClick={handleUploadNavBg}><AiFillEdit size={20} /></button>
            </div>
            <div className="flex flex-col items-center gap-4 -mt-40">
                <div className="col-span-1 flex flex-row">
                    <div className="block sm:hidden mt-24">
                        <Image
                            src={img}
                            alt="Avatar"
                            width={150}
                            height={150}
                            priority
                            className={styles.avatarIn}
                        />
                    </div>
                    <div className="hidden sm:block">
                        <Image
                            src={img}
                            alt="Avatar"
                            width={200}
                            height={200}
                            priority
                            className={styles.avatarIn}
                        />
                    </div>
                    <button className="rounded-full p-2 self-end -ml-12 hover:bg-shade-200 hover:text-white bg-shade-100 text-shade-400" onClick={handleUploadNav}><AiFillEdit size={20} /></button>
                </div>
                <form className={!uploadNavBg ? "hidden" : "block"} onSubmit={handleUploadBg}>
                    <h2 className="text-center font-semibold mb-4">Bild auswählen & bestätigen</h2>
                    <div className="flex flex-col">
                        <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                        <button className={styles.uploadBtn} disabled={!file}><AiOutlineUpload size={20} className="mr-1" />Hochladen</button>
                        {stepBg ? <button className={styles.submitBtn} onClick={updateBackgroundPic}>Bestätigen</button> : <></>}
                    </div>
                </form>
                <form className={!uploadNav ? "hidden" : "block"} onSubmit={handleUpload}>
                    <h2 className="text-center font-semibold mb-4">Bild auswählen & bestätigen</h2>
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
                    {currentProfile?.userImage1 === "" ?
                        <Image
                            src={defaultGalleryImage}
                            alt="userImage1"
                            width={300}
                            height={300}
                            className="p-2"
                            priority

                        />
                        :
                        <Image
                            src={getUrl(img1)}
                            alt="userImage1"
                            width={300}
                            height={300}
                            className="p-2"
                            priority

                        />
                    }
                    <button className={styles.showUploadBtn} onClick={handleUploadNav1}><AiFillEdit size={20} /></button>
                </div>
                <div className="col-span-1 flex flex-row">
                    {currentProfile?.userImage2 === "" ?
                        <Image
                            src={defaultGalleryImage}
                            alt="userImage2"
                            width={300}
                            height={300}
                            className="p-2"
                            priority

                        />
                        :
                        <Image
                            src={getUrl(img2)}
                            alt="userImage2"
                            width={300}
                            height={300}
                            className="p-2"
                            priority

                        />
                    }
                    <button className={styles.showUploadBtn} onClick={handleUploadNav2}><AiFillEdit size={20} /></button>
                </div>
                <div className="col-span-1 flex flex-row">
                    {currentProfile?.userImage3 === "" ?
                        <Image
                            src={defaultGalleryImage}
                            alt="userImage3"
                            width={300}
                            height={300}
                            className="p-2"
                            priority

                        />
                        :
                        <Image
                            src={getUrl(img3)}
                            alt="userImage3"
                            width={300}
                            height={300}
                            className="p-2"
                            priority

                        />
                    }
                    <button className={styles.showUploadBtn} onClick={handleUploadNav3}><AiFillEdit size={20} /></button>
                </div>
                <div className="col-span-1 flex flex-row">
                    {currentProfile?.userImage4 === "" ?
                        <Image
                            src={defaultGalleryImage}
                            alt="userImage4"
                            width={300}
                            height={300}
                            className="p-2"
                            priority

                        />
                        :
                        <Image
                            src={getUrl(img4)}
                            alt="userImage4"
                            width={300}
                            height={300}
                            className="p-2"
                            priority

                        />
                    }
                    <button className={styles.showUploadBtn} onClick={handleUploadNav4}><AiFillEdit size={20} /></button>
                </div>
            </div>
            <div className="flex flex-col">
                <form className={!uploadNav1 ? "hidden" : "block my-10 rounded-lg shadow-lg py-4"} onSubmit={handleUpload1}>
                    <h2 className="text-center font-semibold mb-4">Bild auswählen & bestätigen</h2>
                    <div className="col-span-1 flex flex-col ">
                        <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                        <button className={styles.uploadBtn} disabled={!file}><AiOutlineUpload size={20} className="mr-1" />Hochladen</button>
                        {step1 ? <button className={styles.submitBtn} onClick={updateProfilePic1}>Bestätigen</button> : <></>}
                    </div>
                </form>
                <form className={!uploadNav2 ? "hidden" : "block my-10 rounded-lg shadow-lg py-4"} onSubmit={handleUpload2}>
                    <h2 className="text-center font-semibold mb-4">Bild auswählen & bestätigen</h2>
                    <div className="col-span-1 flex flex-col ">
                        <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                        <button className={styles.uploadBtn} disabled={!file}><AiOutlineUpload size={20} className="mr-1" />Hochladen</button>
                        {step2 ? <button className={styles.submitBtn} onClick={updateProfilePic2}>Bestätigen</button> : <></>}
                    </div>
                </form>
                <form className={!uploadNav3 ? "hidden" : "block my-10 rounded-lg shadow-lg py-4"} onSubmit={handleUpload3}>
                    <h2 className="text-center font-semibold mb-4">Bild auswählen & bestätigen</h2>
                    <div className="col-span-1 flex flex-col ">
                        <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                        <button className={styles.uploadBtn} disabled={!file}><AiOutlineUpload size={20} className="mr-1" />Hochladen</button>
                        {step3 ? <button className={styles.submitBtn} onClick={updateProfilePic3}>Bestätigen</button> : <></>}
                    </div>
                </form>
                <form className={!uploadNav4 ? "hidden" : "block my-10 rounded-lg shadow-lg py-4"} onSubmit={handleUpload4}>
                    <h2 className="text-center font-semibold mb-4">Bild auswählen & bestätigen</h2>
                    <div className="col-span-1 flex flex-col ">
                        <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                        <button className={styles.uploadBtn} disabled={!file}><AiOutlineUpload size={20} className="mr-1" />Hochladen</button>
                        {step4 ? <button className={styles.submitBtn} onClick={updateProfilePic4}>Bestätigen</button> : <></>}
                    </div>
                </form>
            </div>
            <form onSubmit={handleSubmit(updateUsername)} className="grid">
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="name" className="py-1 col-span-1 font-semibold">Biographie </label>
                    <textarea
                        {...register('bio', {
                            required: false
                        })}
                        placeholder={currentProfile?.bio}
                        className={styles.fantsyTextarea}
                        type="text"
                        id="bio"
                        name="bio"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                    />
                </div>
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="name" className="py-1 col-span-1 font-semibold">Username </label>
                    <input
                        {...register('name', {
                            required: false
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
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="prename" className="py-1 col-span-1 font-semibold">Vorname </label>
                    <input
                        {...register('prename', {
                            required: false
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
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="lastname" className="py-1 col-span-1 font-semibold">Nachname </label>
                    <input
                        {...register('lastname', {
                            required: false
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
                <br></br>
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="city" className="py-1 col-span-1 font-semibold">Stadt </label>
                    <input
                        {...register('city', {
                            required: false
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
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="city" className="py-1 col-span-1 font-semibold">Postleitzahl </label>
                    <input
                        {...register('postcode', {
                            required: false
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
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="city" className="py-1 col-span-1 font-semibold">Wohnort </label>
                    <input
                        {...register('country', {
                            required: false
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
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="city" className="py-1 col-span-1 font-semibold">Herkunft </label>
                    <input
                        {...register('origin', {
                            required: false
                        })}
                        placeholder={currentProfile?.userOrigin}
                        className={styles.fantsyInput}
                        type="text"
                        id="origin"
                        name="origin"
                        onChange={(e) => setOrigin(e.target.value)}
                        value={origin}
                    />
                </div>

                <br></br>
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="city" className="py-1 col-span-1 font-semibold">Sexualität </label>
                    <input
                        {...register('sex', {
                            required: false
                        })}
                        placeholder={currentProfile?.userSex}
                        className={styles.fantsyInput}
                        type="text"
                        id="sex"
                        name="sex"
                        onChange={(e) => setSex(e.target.value)}
                        value={sex}
                    />
                </div>
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="city" className="py-1 col-span-1 font-semibold">Körpergröße in cm </label>
                    <input
                        {...register('size', {
                            required: false
                        })}
                        placeholder={currentProfile?.userSex}
                        className={styles.fantsyInput}
                        type="text"
                        id="size"
                        name="size"
                        onChange={(e) => setSize(e.target.value)}
                        value={size}
                    />
                </div>
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="city" className="py-1 col-span-1 font-semibold">Körperstatur </label>
                    <input
                        {...register('stature', {
                            required: false
                        })}
                        placeholder={currentProfile?.userStature}
                        className={styles.fantsyInput}
                        type="text"
                        id="stature"
                        name="stature"
                        onChange={(e) => setStature(e.target.value)}
                        value={stature}
                    />
                </div>
                <div className="mt-5 grid grid-cols-4">
                    <label htmlFor="city" className="py-1 col-span-1 font-semibold">Körpergewicht in kg </label>
                    <input
                        {...register('weight', {
                            required: false
                        })}
                        placeholder={currentProfile?.userWeight}
                        className={styles.fantsyInput}
                        type="text"
                        id="weight"
                        name="weight"
                        onChange={(e) => setWeight(e.target.value)}
                        value={weight}
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
            {/* PRICES FORM */}
            <form className="mt-10" onSubmit={handleSubmit(addPricesToProfile)}>
                <h2 className="mt-10 font-bold text-lg">Meine Preise</h2>
                <p>Nur ganze Zahlen angeben ohne Beistrich.<span className="text-shade-300"> (z.B. 50, 100, 150, 200)</span></p>
                <div className="w-full grid mt-4 grid-cols-1 sm:grid-cols-3 gap-4">
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
                    <div className="col-span-1 grid grid-cols-4 items-center">
                        <p className="col-span-1">15 min:</p>
                        <input
                            className={styles.fantsyInputSm}
                            {...register('workerPrices1', {
                                required: false,
                            })}
                            onChange={(e) => setWorkerPrices1(e.target.value)} value={workerPrices1}
                        />
                        <p className="ml-2 col-span-1">€</p>
                    </div>
                    <div className="col-span-1 grid grid-cols-4 items-center">
                        <p className="col-span-1">30 min:</p>
                        <input
                            className={styles.fantsyInputSm}
                            {...register('workerPrices2', {
                                required: false,
                            })}
                            onChange={(e) => setWorkerPrices2(e.target.value)} value={workerPrices2}
                        />
                        <p className="ml-2 col-span-1">€</p>
                    </div>
                    <div className="col-span-1 grid grid-cols-4 items-center">
                        <p className="col-span-1">1 Std:</p>
                        <input
                            className={styles.fantsyInputSm}
                            {...register('workerPrices3', {
                                required: false,
                            })}
                            onChange={(e) => setWorkerPrices3(e.target.value)} value={workerPrices3}
                        />
                        <p className="ml-2 col-span-1">€</p>
                    </div>
                    <div className="col-span-1 grid grid-cols-4 items-center">
                        <p className="col-span-1">2 Std:</p>
                        <input
                            className={styles.fantsyInputSm}
                            {...register('workerPrices4', {
                                required: false,
                            })}
                            onChange={(e) => setWorkerPrices4(e.target.value)} value={workerPrices4}
                        />
                        <p className="ml-2 col-span-1">€</p>
                    </div>
                    <div className="col-span-1 grid grid-cols-4 items-center">
                        <p className="col-span-1">3 Std:</p>
                        <input
                            className={styles.fantsyInputSm}
                            {...register('workerPrices5', {
                                required: false,
                            })}
                            onChange={(e) => setWorkerPrices5(e.target.value)} value={workerPrices5}
                        />
                        <p className="ml-2 col-span-1">€</p>
                    </div>
                    <div className="col-span-1 grid grid-cols-4 items-center">
                        <p className="col-span-1">4 Std:</p>
                        <input
                            className={styles.fantsyInputSm}
                            {...register('workerPrices6', {
                                required: false,
                            })}
                            onChange={(e) => setWorkerPrices6(e.target.value)} value={workerPrices6}
                        />
                        <p className="ml-2 col-span-1">€</p>
                    </div>
                    <div className="col-span-1 grid grid-cols-4 items-center">
                        <p className="col-span-1">8 Std:</p>
                        <input
                            className={styles.fantsyInputSm}
                            {...register('workerPrices7', {
                                required: false,
                            })}
                            onChange={(e) => setWorkerPrices7(e.target.value)} value={workerPrices7}
                        />
                        <p className="ml-2 col-span-1">€</p>
                    </div>
                    <div className="col-span-1 grid grid-cols-4 justify-between items-center">
                        <p className="col-span-1">12 Std:</p>
                        <input
                            className={styles.fantsyInputSm}
                            {...register('workerPrices8', {
                                required: false,
                            })}
                            onChange={(e) => setWorkerPrices8(e.target.value)} value={workerPrices8}
                        />
                        <p className="ml-2 col-span-1">€</p>
                    </div>
                </div>
                <input className="rounded-lg p-2 mt-4 float-right bg-fantsy-green-400 cursor-pointer hover:bg-fantsy-green-500 text-white" type="submit" value="Preise aktualisieren" />
            </form>

            {/* INTERESETS FORM */}
            <form className="mt-20" onSubmit={handleSubmit(handleSaveInterests)}>
                <h2 className="font-bold text-lg">Meine Interessen</h2>
                <ul className={styles.formRow}>
                    {myInterests.map(int => (
                        <li key={int}>
                            <input
                                type="checkbox"
                                className="rounded-full opacity-50 -mb-9 w-full appearance-none p-4 cursor-pointer text-fantsy-orange-600 border-fantsy-orange-400 border hover:bg-fantsy-orange-300 checked:bg-fantsy-orange-300 hover:text-white"
                                name={int}
                                checked={interests[int]}
                                onChange={handleInterestChange}
                            />
                            <label className="text-fantsy-orange-500">
    
                                {int}
                            </label>
                        </li>
                    ))}
                </ul>
                <input className="rounded-lg p-2 mt-4 float-right bg-fantsy-green-400 cursor-pointer hover:bg-fantsy-green-500 text-white" type="submit" value="Aktualisieren" />
            </form>

            <form onSubmit={handleSubmit(updateVIPonly)} className="grid my-10">
                <div>
                    <label htmlFor="vipOnly">VIP only:</label>
                    <input type="checkbox" {...register("vipOnly")} id="vipOnly" />
                </div>
                <button className="bg-fantsy-green-400 w-1/5 mx-auto text-white px-4 py-2 rounded-lg border-fantsy-green-400 hover:border-fantsy-green-500 hover:bg-fantsy-green-500 border-2" type="submit">Update VIP status</button>
            </form>

            <div className="mt-20">
                <h2 className="text-lg text-bold">Account löschen</h2>
                <p>Hier kannst du deinen Account löschen lassen.</p>
                <button
                    disabled={isDeleting}
                    onClick={handleDeleteAccount}
                    className={styles.deleteBtn}
                >Löschen</button>
            </div>

        </div>
    )
}

export default Account