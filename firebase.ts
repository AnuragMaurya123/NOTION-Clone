// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_APIKEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_SENDERID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID!
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig): getApp()
const db=getFirestore(app);
export {db}