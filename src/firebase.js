import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9rngZbnT3I23Sown933Bd9SvNgjpjjg8",
  authDomain: "meal-prep-generator-94e28.firebaseapp.com",
  projectId: "meal-prep-generator-94e28",
  storageBucket: "meal-prep-generator-94e28.firebasestorage.app",
  messagingSenderId: "837485407771",
  appId: "1:837485407771:web:48a680db436e93c5f6d2be",
  measurementId: "G-4N4RGYLMRN"
};

const app = initializeApp(firebaseConfig);

// 🔥 Firestore database 
export const db = getFirestore(app);
