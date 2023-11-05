// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg6fc70n93Jv0dG8H-BbbNSYFdb4pP6zA",
  authDomain: "ceo-complete-each-other.firebaseapp.com",
  projectId: "ceo-complete-each-other",
  storageBucket: "ceo-complete-each-other.appspot.com",
  messagingSenderId: "926419851454",
  appId: "1:926419851454:web:182e08c1d9b7315790e6ef",
  measurementId: "G-CYMK2YEYKQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
