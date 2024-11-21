// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcLnnZylStq8l-SD0VtwLya44t0m3n9YA",
  authDomain: "notion-clone-youtude.firebaseapp.com",
  projectId: "notion-clone-youtude",
  storageBucket: "notion-clone-youtude.firebasestorage.app",
  messagingSenderId: "739482648779",
  appId: "1:739482648779:web:665e6529df31dbe4131b4e"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig): getApp()
const db=getFirestore(app);
export {db}