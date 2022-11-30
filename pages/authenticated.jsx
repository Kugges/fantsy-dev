import React from 'react'
import nookies from "nookies"
import { verifyIdToken } from '../firebaseAdmin'
import firebase from "firebase/compat/app"


function Authenticated({ session }) {
    // firebaseClient();
    if (session) {
        return (
            <div className="flex items-center justify-center text-center h-screen w-1/3 mx-auto p-5 pt-40">
                <div className="">

                    <h1 className="text-center text-4xl">
                        Authenticated!
                    </h1>
                    <p className="text-center">{session}</p>
                    <p>Yo go girl!</p>
                    
                    <button
                        className="rounded-lg bg-fantsy-orange-500 p-2"
                        onClick={async () => {
                            await firebase.auth().signOut();
                            window.location.href = "/"
                        }}>
                        Logout
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="w-1/3 h-screen p-5">
                <div>
                    <p className="text-4xl">Loading...</p>
                </div>
            </div>
        );
    }
}

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);
        const { uid, email } = token;
        return {
            props: { session: `Your email is ${email} and your UID is ${uid}.` },


        };
    } catch (err) {
        context.res.writeHead(302, { location: "/login" });
        context.res.end();
        return { props: [] };
    }
}

export default Authenticated;