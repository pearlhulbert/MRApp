// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5fI7jw_2yozNCpW8WquYVVUBpF2zI8Ww",
  authDomain: "mr-app-80f0a.firebaseapp.com",
  projectId: "mr-app-80f0a",
  storageBucket: "mr-app-80f0a.appspot.com",
  messagingSenderId: "470829140810",
  appId: "1:470829140810:web:4d7dbb2d401e13c6e54fb3",
  measurementId: "G-BXLB80EL3E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
