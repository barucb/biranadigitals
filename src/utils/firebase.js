// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "birana-digitals.firebaseapp.com",
  projectId: "birana-digitals",
  storageBucket: "birana-digitals.appspot.com",
  messagingSenderId: "682327403226",
  appId: "1:682327403226:web:0b80d5bdb045fec98353e3",
  measurementId: "G-WB65VW3QZJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);