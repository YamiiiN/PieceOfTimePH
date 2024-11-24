import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseCredentials } from "../assets/constants";
import { getMessaging } from "firebase/messaging"

// const firebaseConfig = {
//   apiKey: "AIzaSyBpDjFQQHvsPRYas7u1AdkJILaNOsKxkXE",
//   authDomain: "pieceoftimeph-e9385.firebaseapp.com",
//   projectId: "pieceoftimeph-e9385",
//   storageBucket: "pieceoftimeph-e9385.firebasestorage.app",
//   messagingSenderId: "32130242108",
//   appId: "1:32130242108:web:abc9804e95efab95385539",
//   measurementId: "G-VG843FWZM3"
// };


// const firebaseConfig = {firebaseCredentials};


const app = initializeApp(firebaseCredentials);


const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

// TOOLS
export const messaging = getMessaging(app);
export { auth, googleProvider, signInWithPopup };