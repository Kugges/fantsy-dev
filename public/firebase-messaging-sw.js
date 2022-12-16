importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyA0YDPgk6wY7a3z-UD6dlB5OrquoZfNGlg",
  authDomain: "fantsy-net.firebaseapp.com",
  projectId: "fantsy-net",
  storageBucket: "fantsy-net.appspot.com",
  messagingSenderId: "362409393660",
  appId: "1:362409393660:web:4d8465911d0fb0c3080679",
});

const messaging = firebase.messaging();