import Reac, { useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/messaging"
import { firebaseCloudMessaging } from "../src/service/Messaging"
import { ToastContainer, toast } from "react-toastify"
import { useRouter } from "next/router"

function PushNotificationLayout({ children }) {
    const router = useRouter();
    useEffect(() => {
        setToken();

        // Event listener that listens for the push notification event in the background
        if ("serviceworker" in navigator) {
            navigator.serviceWorker.addEventListener("message", (event) => {
                console.log("Event for the Serivce Worker", event);
            });
        }

        // Calls the getMessage() function if the token is there
        async function setToken() {
            try {
                const token = await firebaseCloudMessaging.init();
                if (token) {
                    console.log("token", token);
                    getMessage();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    // Handles the click function on the toast showing push notification
    const handleClickPushNotification = (url) => {
        router.push(url);
    };

    // Get the push notification message and triggers a toast do display it
    function getMessage() {
        const messaging = firebase.messaging();
        messaging.onMessage((message) => {
            toast(
                <div onClick={() => handleClickPushNotification(message?.data?.url)}>
                    <h5>{message?.notification?.title}</h5>
                    <h6>{message?.notification?.bofy}</h6>
                </div>,
                {
                    closeOnClick: false,
                }
            );
        });
    }

    return (
        <>
            <ToastContainer />
            {children}
        </>
    )
}

export default PushNotificationLayout;