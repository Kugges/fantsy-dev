import React, { useState } from 'react';
import { fireDb } from '../../firebaseClient';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
// import { toast } from "react-toastify"
import Container from '../../components/container';
import Modal from '../../components/modal';
import Login from '../login';
import starterImg from "../../images/profile-starter.png"

const styles = {
  fantsyInput: "focus:outline-fantsy-orange-500 px-2 py-1 w-full bg-shade-50 rounded-lg"
}

export default function Register() {

  const [url, setURL] = useState(starterImg);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [readTerms, hasReadTerms] = useState(false);
  const [readAgb, hasReadAgb] = useState(false);
  const [userName, setUserName] = useState("");

  const router = useRouter();


  const [showModal, setShowModal] = useState(false)

  // USER REGISTRATION + SENDING USER DOCUMENT TO FIRESTORE
  const userRegister = async () => {
    await firebase.auth().createUserWithEmailAndPassword(email, pass, confirmPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setURL(url);             
        const userData = {
          id: user.uid,
          createdAt: serverTimestamp(),
          email: user.email
        }
        setDoc(doc(fireDb, "users", user.uid), userData); 
        setDoc(doc(fireDb, "profiles", user.uid), {
          email: user.email,
          displayName: userName,
          profileSince: serverTimestamp(),
          likesCount: 0,
          bio: "Fantsy meeting you here!",
          userProfileUrl: url

        });
      })
      .then(() => {
        router.push("/join/photo");
      }).catch(function (error) {
        const message = error.message;
        console.log(error.message);
      })

  }

  return (
    <Container>
      <h1 className="text-4xl text-center font-bold">Registrierung</h1>
      <div className="my-5">
        <label className="flex" htmlFor="name">Username</label>
        <input className={styles.fantsyInput} type="text" placeholder="max. 20 Zeichen" maxLength="20" id="username" name="name" required onChange={(e) => setUserName(e.target.value)} value={userName} />
      </div>
      <div className="my-5">
        <label className="flex" htmlFor="email">Email</label>
        <input className={styles.fantsyInput} type="email" id="emailAdress" name="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>
      <div className="my-5">
        <label className="flex" htmlFor="password">Passwort</label>
        <input className={styles.fantsyInput} type="password" id="pass" name="password" required onChange={(e) => setPass(e.target.value)} value={pass} />
      </div>
      <div className="my-5">
        <label className="flex" htmlFor="confirmPassword">Passwort wiederholen</label>
        <input className={styles.fantsyInput} type="password" id="confirmPass" name="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
      </div>
      <div className="my-5 flex">
        <input className="focus:outline-fantsy-orange-500 px-2 mr-2 bg-shade-50" type="checkbox" required onChange={(e) => hasReadAgb(e.target.checked)} />
        <label htmlFor="workerType">Ich habe die <Link href="/agb" className="text-fantsy-blue-800 hover:underline">AGB</Link> gelesen und bin einverstanden</label>
      </div>
      <div className="mt-5 flex">
        <input className="focus:outline-fantsy-orange-500 px-2 mr-2 bg-shade-50" type="checkbox" required onChange={(e) => hasReadTerms(e.target.checked)} />
        <label htmlFor="workerType">Ich habe die <Link href="/terms" className="text-fantsy-blue-800 hover:underline">Datenschutzerklärung</Link> gelesen und bin einverstanden</label>
      </div>
      <p> Ich willige in die Verarbeitung meiner Daten gemäß der DSE ein. Ich bin mir bewusst und willige ausdrücklich ein, dass sensible Daten zu meiner sexuellen Orientierung & meinen Vorlieben verarbeitet werden, und dass diese Verarbeitung gemäß Nr. 4 & 7 DSE in Ländern außerhalb des Europäischen Wirtschaftsraums („EWR“) stattfindet.</p>

      {/* ---REGISTER BUTTON--- */}
      <button
        disabled={!readTerms || !readAgb}
        className="mt-5 bg-fantsy-green-400 rounded-lg p-2 w-full text-white hover:bg-fantsy-green-500 disabled:bg-fantsy-green-300 float-left font-bold"
        type="submit"
        onClick={userRegister}
      >Registrieren</button>
      <div className="float-left sm:float-right">
        <span className="font-bold">Bereits registriert?</span>
        <span className="underline-offset-auto"><button onClick={() => setShowModal(true)} className="mt-5 hover:text-fantsy-blue-500 p-2 underline-offset-0">Einloggen</button></span>
      </div>
      <Modal isVisible={showModal} onClose={() => { setShowModal(false) }}>
        <Login />
      </Modal>
    </Container>
  )
}
