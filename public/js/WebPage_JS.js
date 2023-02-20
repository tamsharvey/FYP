// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyEbtegGBSKBrX91PLT_fqEPuaJHY3fCk",
  authDomain: " rateittknh.firebaseapp.com",
  projectId: " rateittknh",
  storageBucket: "rateittknh.appspot.com",
  messagingSenderId: "332274706767",
  appId: "1:332274706767:web:e622db1600ef01029abd3a",
  measurementId: "G-Q34JZ7NRBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);