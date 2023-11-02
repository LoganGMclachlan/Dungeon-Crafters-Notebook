// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBk9natbybSJFPINEPkpcC_gwOOJZKZkFM",
  authDomain: "dungeon-crafters-notebook.firebaseapp.com",
  projectId: "dungeon-crafters-notebook",
  storageBucket: "dungeon-crafters-notebook.appspot.com",
  messagingSenderId: "68474012183",
  appId: "1:68474012183:web:fd0941ad84a6e7eabc1252",
  measurementId: "G-9SN1Z38ZBM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)