// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyEbtegGBSKBrX91PLT_fqEPuaJHY3fCk",
    authDomain: "finalyearproject-837f4.firebaseapp.com",
    databaseURL: "https://finalyearproject-837f4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "finalyearproject-837f4",
    storageBucket: "finalyearproject-837f4.appspot.com",
    messagingSenderId: "332274706767",
    appId: "1:332274706767:web:8b13dd202dff70919abd3a",
    measurementId: "G-CJBQP402TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);