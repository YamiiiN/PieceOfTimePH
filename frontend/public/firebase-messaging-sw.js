// import { firebaseCredentials } from "../src/assets/constants";

// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// eslint-disable-next-line no-undef
firebase.initializeApp({
    apiKey: "AIzaSyBpDjFQQHvsPRYas7u1AdkJILaNOsKxkXE",
    authDomain: "pieceoftimeph-e9385.firebaseapp.com",
    projectId: "pieceoftimeph-e9385",
    storageBucket: "pieceoftimeph-e9385.firebasestorage.app",
    messagingSenderId: "32130242108",
    appId: "1:32130242108:web:abc9804e95efab95385539",
    measurementId: "G-VG843FWZM3"
});

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(payload)
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});