import React, { useState } from 'react'
import { fireDb } from '../firebaseClient'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getDoc, doc } from 'firebase/firestore'
import { toast } from "react-toastify"


export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

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

            {/* ---LOGIN BUTTON--- */}
            <button
                className="mt-5 bg-fantsy-green-400 rounded-lg p-2 w-full text-white hover:bg-fantsy-green-500 float-left font-bold"
                type="submit"
                onClick={userLogin}
            >Einloggen</button>
            <div className="float-left sm:float-right">
                <span>Neu hier?</span>
                <span className="underline-offset-auto"><button className="mt-5 hover:text-fantsy-blue-500 p-2 underline-offset-auto"><a href="/join/register">Jetzt registrieren</a></button></span>
            </div>
        </div>
    )
}