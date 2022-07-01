// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFmt0C1qxLArgC1EDrR6VZ38zBPu-rGks",
    authDomain: "ahumadero-284ae.firebaseapp.com",
    projectId: "ahumadero-284ae",
    storageBucket: "ahumadero-284ae.appspot.com",
    messagingSenderId: "407120723981",
    appId: "1:407120723981:web:5a2ae509162b80f3d19544",
    measurementId: "G-1069JM84CN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)