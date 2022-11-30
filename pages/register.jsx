import React, { useState } from 'react';
import { fireDb } from '../firebaseClient';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Link from 'next/link';
// import "firebase/firestore";
import { setDoc, doc } from 'firebase/firestore';
// import { toast } from "react-toastify"


export default function Register() {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [readTerms, hasReadTerms] = useState(false);

  // USER REGISTRATION + SENDING USER DOCUMENT TO FIRESTORE
  const userRegister = async () => {
    await firebase.auth().createUserWithEmailAndPassword(email, pass, confirmPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          id: user.uid,
          email: user.email,
          hasSubscription: false,
          profileId: "No profile created yet."
        }
        setDoc(doc(fireDb, "users", user.uid), userData);
        console.log(userData, "USER INCOMING");
      })
      .then(function () {
        window.location.href = "/account"
      }).catch(function (error) {
        const message = error.message;
        console.log(error.message);
      })

  }

  return (
    <div className="p-4 w-full justify-center items-center">
      <div className="p-4 flex items-center justify-center h-screen">
        <div className="p-4 sm:p-10 w-screen sm:w-1/2 rounded-lg bg-white shadow-lg flex items-center justify-center">

          {/* ---REGISTER FORM--- */}
          <div className="h-full w-3/4">
            <h1 className="text-4xl text-center font-bold mt-5">Registrierung</h1>
            <div className="my-5">
              <label className="flex" htmlFor="email">Email</label>
              <input className="w-full bg-shade-50" type="email" id="emailAdress" name="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="my-5">
              <label className="flex" htmlFor="password">Passwort</label>
              <input className="w-full bg-shade-50" type="password" id="pass" name="password" required onChange={(e) => setPass(e.target.value)} value={pass} />
            </div>
            <div className="my-5">
              <label className="flex" htmlFor="confirmPassword">Passwort wiederholen</label>
              <input className="w-full bg-shade-50" type="password" id="confirmPass" name="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
            </div>
            <div className="my-5 flex">
              <input className="mr-2 bg-shade-50" type="checkbox" id="workerYes" name="workerType" required onChange={(e) => hasReadTerms(e.target.checked)} />
              <label className="flex" htmlFor="workerType">Ich habe die <span><Link href="/agb" className="text-fantsy-blue-800 hover:underline mx-1 text-bold">Nutzerbedingungen</Link></span> gelesen und bin einverstanden</label>
            </div>

            {/* ---REGISTER BUTTON--- */}
            <button
              disabled={!readTerms}
              className="mt-5 bg-fantsy-green-400 rounded-lg p-2 w-full text-white hover:bg-fantsy-green-500 disabled:bg-fantsy-green-300 float-left font-bold"
              type="submit"
              onClick={userRegister}
            >Registrieren</button>
            <div className="float-left sm:float-right">
              <span className="font-bold">Bereits registriert?</span>
              <span className="underline-offset-auto"><button className="mt-5 hover:text-fantsy-green-500 p-2 underline-offset-0"><Link href="/login">Hier einloggen</Link></button></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
