import firebase from "firebase/compat/app";
import {getAuth}from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// import { initializeApp } from "firebase/app";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZu9f8WgodmYjmTaB9_hvW5qchflvv5PA",
  authDomain: "cone-98498.firebaseapp.com",
  projectId: "cone-98498",
  storageBucket: "cone-98498.firebasestorage.app",
  messagingSenderId: "649694923754",
  appId: "1:649694923754:web:9c21ab4cc1f586fecd8093"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const db = app.firestore()






