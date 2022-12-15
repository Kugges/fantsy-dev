import React, { useRef, useState } from 'react';
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
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import { useForm } from 'react-hook-form';

const styles = {
  fantsyInput: "focus:outline-fantsy-orange-500 px-2 py-1 w-full bg-shade-50 rounded-lg",
  errormsg: "text-red text-sm"
}

export default function Register() {

  const [url, setURL] = useState(starterImg);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [readTerms, hasReadTerms] = useState(false);
  const [readAgb, hasReadAgb] = useState(false);
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter();

  // -- REACT HOOK FORM
  const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm();
  const checkPassword = useRef({});
  checkPassword.current = watch("password", "");


  const [showModal, setShowModal] = useState(false)

  // -- USER REGISTRATION + SENDING USER DOCUMENT TO FIRESTORE
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
      <form onSubmit={handleSubmit(userRegister)}>
        <h1 className="text-4xl text-center font-bold">Registrierung</h1>
        {/* ---USERNAME--- */}
        <div className="my-5">
          <label className="flex" htmlFor="name">Username</label>
          <input
            className={styles.fantsyInput}
            {...register('name', {
              required: true,
              maxLength: { value: 20, message: "Username darf höchstens 20 Zeichen beinhalten." }
            })}
            type="text"
            id="username"
            name="name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          {errors?.name && errors?.name.type === "required" && <p className={styles.errormsg}>Username fehlt.</p>}
          {errors?.name && errors?.name.type === "maxLength" && <p className={styles.errormsg}>{errors?.name.message}</p>}
        </div>
        {/* ---EMAIL--- */}
        <div className="my-5">
          <label className="flex" htmlFor="email">Email</label>
          <input
            className={styles.fantsyInput}
            {...register('email', {
              required: true,
              pattern: { value: /\S+@\S+\.\S+/, message: "Eingabe entspricht keinem Email-Format." }
            })}
            type="email"
            id="emailAdress"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errors?.email && errors?.email.type === "required" && <p className={styles.errormsg}>Emailadresse fehlt.</p>}
          {errors?.email && errors?.email.type === "pattern" && <p className={styles.errormsg}>{errors?.email.message}</p>}
        </div>
        {/* ---PASSWORD--- */}
        <div className="my-5">
          <label className="flex" htmlFor="password">Passwort</label>

          <input
            className={styles.fantsyInput}
            {...register('password',
              {
                required: true,
                minLength: { value: 8, message: "Passwort muss mindestens 8 Zeichen beinhalten." }
              })}
            type={showPassword ? "text" : "password"}
            id="pass"
            name="password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />

          {errors?.password && errors?.password.type === "required" && <p className={styles.errormsg}>Passwort fehlt.</p>}
          {errors?.password && errors?.password.type === "minLength" && <p className={styles.errormsg}>{errors?.password.message}</p>}
        </div>
        {/* ---CONFIRM PASSWORD--- */}
        <div className="my-5">
          <label className="flex" htmlFor="confirmPassword">Passwort wiederholen</label>
          <div className="flex items-center">
            <input
              className={styles.fantsyInput}
              {...register('confirmPassword',
                {
                  required: true,
                  minLength: { value: 8, message: "Passwort muss aus mindestens 8 Zeichen bestehen." },
                  validate: value =>
                    value === checkPassword.current || "Passwörter stimmen nicht überein."
                })}
              type={showPassword ? "text" : "password"}
              id="confirmPass"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            {showPassword ?
              <AiFillEyeInvisible size={30} className="text-shade-300 hover:text-shade-600 mx-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
              :
              <AiFillEye size={30} className="text-shade-300 hover:text-shade-600 mx-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />}
          </div>

          {errors?.confirmPassword && errors?.confirmPassword.type === "required" && <p className={styles.errormsg}>Passwort fehlt.</p>}
          {errors?.confirmPassword && errors?.confirmPassword.type === "minLength" && <p className={styles.errormsg}>{errors?.password.message}</p>}
          {errors?.confirmPassword && errors?.confirmPassword.type === "validate" && <p className={styles.errormsg}>Passwörter stimmen nicht überein.</p>}
        </div>
        {/* ---READ AGB--- */}
        <div className="my-5 flex">
          <input className="focus:outline-fantsy-orange-500 px-2 mr-2 bg-shade-50" type="checkbox" required onChange={(e) => hasReadAgb(e.target.checked)} />
          <label htmlFor="workerType">Ich habe die <Link href="/agb" className="text-fantsy-blue-800 hover:underline">AGB</Link> gelesen und bin einverstanden</label>
        </div>
        {/* ---READ TERMS--- */}
        <div className="mt-5 flex">
          <input className="focus:outline-fantsy-orange-500 px-2 mr-2 bg-shade-50" type="checkbox" required onChange={(e) => hasReadTerms(e.target.checked)} />
          <label htmlFor="workerType">Ich habe die <Link href="/terms" className="text-fantsy-blue-800 hover:underline">Datenschutzerklärung</Link> gelesen und bin einverstanden</label>
        </div>
        <p className="text-shade-300">Ich willige in die Verarbeitung meiner Daten gemäß der DSE ein. Ich bin mir bewusst und willige ausdrücklich ein, dass sensible Daten zu meiner sexuellen Orientierung & meinen Vorlieben verarbeitet werden, und dass diese Verarbeitung gemäß Nr. 4 & 7 DSE in Ländern außerhalb des Europäischen Wirtschaftsraums („EWR“) stattfindet.</p>

        {/* ---REGISTER BUTTON--- */}
        <input
          disabled={!readTerms || !readAgb}
          className="mt-5 bg-fantsy-green-400 rounded-lg p-2 cursor-pointer w-full text-white hover:bg-fantsy-green-500 disabled:bg-fantsy-green-300 float-left font-bold"
          type="submit"
        />
        <div className="float-left sm:float-right">
          <span className="font-bold">Bereits registriert?</span>
          <span className="underline-offset-auto"><button onClick={() => setShowModal(true)} className="mt-5 text-fantsy-blue-500 p-2 hover:underline">Einloggen</button></span>
        </div>
      </form>
      <Modal isVisible={showModal} onClose={() => { setShowModal(false) }}>
        <Login />
      </Modal>
    </Container>
  )
}
