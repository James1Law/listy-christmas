import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoHBrlqTT6z4KcSC5LtA8VNq0giSGw-xo",
  authDomain: "listy-christmas.firebaseapp.com",
  projectId: "listy-christmas",
  storageBucket: "listy-christmas.firebasestorage.app",
  messagingSenderId: "404525845100",
  appId: "1:404525845100:web:85a2c8896314ca72f86649",
  measurementId: "G-LC0C3QZS8S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
