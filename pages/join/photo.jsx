import React, { useContext, useState } from 'react'
import Container from '../../components/container'
import starterImg from "../../images/profile-starter.png"
import { AuthContext } from '../../src/hook/auth'
import { fireDb, storage } from '../../firebaseClient'
import { AiOutlineUpload } from 'react-icons/ai'
import Image from 'next/image'
import { updateDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import Link from 'next/link'

const styles = {
    dotDone: "h-10 w-10 mx-5 rounded-full bg-fantsy-orange-500 flex items-center justify-center text-white font-bold",
    dot: "h-10 w-10 mx-5 rounded-full bg-shade-200 flex items-center justify-center text-shade-600",
    fantsyInput: "focus:outline-fantsy-orange-500 hover:outline-fantsy-orange-200 px-4 py-2 w-full bg-shade-50 rounded-lg",
    imageUploadBtn: "cursor-pointer block w-full text-sm mx-10 text-slate-500 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fantsy-green-200 file:text-fantsy-green-500 hover:file:bg-fantsy-green-500 hover:file:text-white",
    avatarOut: "aspect-square mx-auto rounded-full border-8 shadow-lg border-fantsy-green-500",
    avatarIn: "aspect-square mx-auto rounded-full border-8 shadow-lg border-white"
}


const Photo = () => {

    const { user } = useContext(AuthContext)
    const router = useRouter();

    // GET FILE & URL FROM STORAGE
    const [file, setFile] = useState(null)
    const [url, setURL] = useState(starterImg)
    const [step, setStep ] = useState(false)

    // UPLOAD IMAGE TO PROFILE
    const updateProfilePic = async event => {
        event.preventDefault()
        await updateDoc(doc(fireDb, "profiles", user.uid), {
            userProfileUrl: url
        })
            .then(() => {
                router.push("/join/account");
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


    return (
        <Container>
            <div className="flex flex-col justify-center items-center">

                <div className="flex flex-row absolute top-24">
                    <div className={styles.dotDone}>
                        <div>1</div>
                    </div>
                    <div className={styles.dot}>
                        <div>2</div>
                    </div>
                    <div className={styles.dot}>
                        <div>3</div>
                    </div>                    
                    <div className={styles.dot}>
                        <div>4</div>
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl text-center font-bold">Lade ein Profilbild hoch!</h1>
                    <form className="flex flex-col items-center gap-4 mt-10" onSubmit={handleUpload}>
                        <div className="col-span-1">
                            <Image
                                src={url}
                                alt="Avatar"
                                width={200}
                                height={200}
                                placeholder="Avatar"
                                priority
                                // className={file ? styles.avatarOut : styles.avatarIn}
                                className={styles.avatarIn}
                            />
                        </div>
                        <div className="col-span-1 flex flex-col mt-10">
                            <input type="file" className={styles.imageUploadBtn} onChange={handleChange} />
                            <button className="mt-4 max-w-max mx-auto py-2 px-4 flex items-center bg-fantsy-green-400 hover:bg-fantsy-green-500 text-white font-bold disabled:font-normal disabled:text-shade-300 disabled:bg-shade-50 rounded-full" disabled={!file}><AiOutlineUpload size={20} className="mr-1" />Hochladen</button>
                        </div>
                        <div className="mt-10 flex flex-row items-center gap-4">
                            <button className="py-2 px-4 rounded-lg border-2 border-white hover:border-fantsy-green-200"><Link href="/join/account">Überspringen</Link></button>
                            <button disabled={step === false} className="bg-fantsy-green-400 hover:bg-fantsy-green-500 rounded-lg py-2 px-4 text-white disabled:bg-fantsy-green-300 font-bold" onClick={updateProfilePic}>Weiter</button>

                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default Photo