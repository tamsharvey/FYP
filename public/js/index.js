// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const functions = require("firebase-functions");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1Hx44cww4Hs0GKsW-f5YyDwtOTW5hck4",
  authDomain: "finalyearproject-4e560.firebaseapp.com",
  databaseURL: "https://finalyearproject-4e560-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "finalyearproject-4e560",
  storageBucket: "finalyearproject-4e560.appspot.com",
  messagingSenderId: "245045305412",
  appId: "1:245045305412:web:2e9894028ed49f2fc29c11",
  measurementId: "G-Y6PZ2E3WQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);