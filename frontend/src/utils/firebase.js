import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBpDjFQQHvsPRYas7u1AdkJILaNOsKxkXE",
  authDomain: "pieceoftimeph-e9385.firebaseapp.com",
  projectId: "pieceoftimeph-e9385",
  storageBucket: "pieceoftimeph-e9385.firebasestorage.app",
  messagingSenderId: "32130242108",
  appId: "1:32130242108:web:abc9804e95efab95385539",
  measurementId: "G-VG843FWZM3"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);