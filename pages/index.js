import React, { useContext } from "react"
import Head from 'next/head'

import UserList from '../components/userlist'
import { AuthContext } from "../src/hook/auth";
import firebase from "firebase/compat/app"
import Image from 'next/image'
import logo from '../images/fantsy-logo-300x150.png'

export default function Home(props) {
  return (
    <>
      {props.ssrWorking ? (
        <div className="pt-40">
        <div className="flex items-center justify-center">
            <div>
                <Image
                    src={logo}
                    alt="fantsy logo"
                    width="600px"
                    height="200px"
                    placeholder="empty"
                    priority="eager"
                />
            </div>
            <div>
                <h2 className="text-2xl">Welcome!</h2>
                <p>Hello there boys and girls!</p>
            </div>
        </div>
          <UserList />
        </div>
      ) : (
        <h2>SSR not working</h2>
      )}
    </>    
  );
}

export async function getServerSideProps() {
  return { props: { ssrWorking: true } };
}