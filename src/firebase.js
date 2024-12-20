// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwS0Sw9PE7kJftnEFMOkMJPZKZaCu-jFA",
  authDomain: "react-firebase-8eeec.firebaseapp.com",
  projectId: "react-firebase-8eeec",
  storageBucket: "react-firebase-8eeec.firebasestorage.app",
  messagingSenderId: "143721486047",
  appId: "1:143721486047:web:c571e87363c328af967b6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}