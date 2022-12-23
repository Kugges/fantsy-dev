import React, { useContext, useState } from 'react'
import { fireDb } from '../firebaseClient'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getDoc, doc } from 'firebase/firestore'
import { toast } from "react-toastify"
import Link from 'next/link'
import { AuthContext } from '../src/hook/auth'


export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const { user } = useContext(AuthContext)

    const [reset, setReset] = useState(false);
    const [show, setShow] = useState(false);
    const [resetEmail, setResetEmail] = useState("");

    // HANDLE MOBILE NAVBAR
    const handleNav = () => {
        setReset(!reset);
    };

    const handleShow = () => {
        setShow(!show);
    };

    const userLogin = async () => {
        await firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                getDoc(doc(fireDb, "users", user.uid)).then((user) => {
                    console.log(user.data());
                })
            })
            .then(function () {
                toast.success("Login erfolgreich!");
                window.location.href = "/"
            }).catch(function (error) {
                const message = error.message;
                console.log(error.message);
                toast.error(error.message);
            })
    }

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function sendVerificationEmail(event) {
        event.preventDefault()
        setLoading(true)
        try {
            await firebase.auth().sendPasswordResetEmail(resetEmail)
            handleShow();
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-full w-3/4 mx-auto">
            <h1 className="text-4xl text-center font-bold mt-5">Login</h1>
            <div className="my-5">
                <label className="flex" htmlFor="email">Email</label>
                <input className="w-full bg-shade-50" type="email" id="emailAdress" name="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="my-5">
                <label className="flex" htmlFor="password">Passwort</label>
                <input className="w-full bg-shade-50" type="password" id="pass" name="password" required onChange={(e) => setPass(e.target.value)} value={pass} />
            </div>
            <div className="my-5">
                <p onClick={handleNav} className="mt-5 cursor-pointer hover:text-fantsy-blue-500 underline-offset-auto">Passwort vergessen?</p>
            </div>
            {reset ?
                <div className="my-5">
                    <label className="flex" htmlFor="resetemail">Email für Passwort Zurücksetzung</label>
                    <input className="w-full bg-shade-50" type="email" id="resetEmail" name="resetemail" required onChange={(e) => setResetEmail(e.target.value)} value={resetEmail} />
                    {show ? <p className="text-fantsy-green-500">Email versendet! Überprüfe dein Email-Fach</p> : <p className="text-red">{error?.message}</p>}
                    <button
                        disabled={!resetEmail}
                        className="mt-5 bg-fantsy-green-400 rounded-lg p-2 w-1/2 text-white disabled:bg-shade-100 hover:bg-fantsy-green-500 font-bold"
                        type="submit"
                        onClick={sendVerificationEmail}
                    >Sende Email</button>
                </div>
                :
                <></>}

            {/* ---LOGIN BUTTON--- */}
            <button
                className="mt-5 bg-fantsy-green-400 rounded-lg p-2 w-full text-white hover:bg-fantsy-green-500 float-left font-bold"
                type="submit"
                onClick={userLogin}
            >Einloggen</button>
            <div className="float-left sm:float-right">
                <span>Neu hier?</span>
                <span className="underline-offset-auto"><button className="mt-5 hover:text-fantsy-blue-500 p-2 underline-offset-auto"><Link href="/join/register">Jetzt registrieren</Link></button></span>
            </div>
        </div>
    )
}