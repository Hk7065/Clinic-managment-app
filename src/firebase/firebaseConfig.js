import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAy9DaveRduKjpOviRjZXQRHL8syVi9elE",
    authDomain: "clinic-management-61d98.firebaseapp.com",
    projectId: "clinic-management-61d98",
    storageBucket: "clinic-management-61d98.firebasestorage.app",
    messagingSenderId: "896116701584",
    appId: "1:896116701584:web:11326044205f8d5f50db15",
    measurementId: "G-ZQLQPHCNDQ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
