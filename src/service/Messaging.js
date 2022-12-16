import "firebase/compat/messaging"
import firebase from "firebase/compat/app"
import localforage from "localforage"

const firebaseCloudMessaging = {
    init: async () => {
        if (!firebase?.apps?.length) {

            // Initialize the Firebase app with the credentials
            firebase?.initializeApp({
                apiKey: "AIzaSyA0YDPgk6wY7a3z-UD6dlB5OrquoZfNGlg",
                authDomain: "fantsy-net.firebaseapp.com",
                projectId: "fantsy-net",
                storageBucket: "fantsy-net.appspot.com",
                messagingSenderId: "362409393660",
                appId: "1:362409393660:web:4d8465911d0fb0c3080679",
            });

            try {
                const messaging = firebase.messaging();
                const tokenInLocalForage = await localforage.getItem("fcm_token");

                // Return token if it's already in local storage
                if (tokenInLocalForage !== null) {
                    return tokenInLocalForage;
                }

                // Request the push notification permission from browser
                const status = await Notification.requestPermission();
                if (status && status === "granted") {
                    // Get new token from Firebase
                    const fcm_token = await messaging.getToken({
                        vapidKey: "BII5llYekErUY6-yTCfdhRtZQhsKkhDRRwTEVfFhDEZ1I1_2_84d-WoIWvgH5vm1k6_7rRmyFP7YLkSL6EMTVYg",
                    });

                    // Set token in local storage
                    if (fcm_token) {
                        localforage.setItem("fcm_token", fcm_token);
                        console.log("Token stored!", fcm_token)
                        return fcm_token;
                    }
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    }
}

export { firebaseCloudMessaging };