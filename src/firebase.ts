// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBepBQJ_s6_yrvf-Xk8C2pOA0dzqDA9pF4",
  authDomain: "todos-227f3.firebaseapp.com",
  projectId: "todos-227f3",
  storageBucket: "todos-227f3.appspot.com",
  messagingSenderId: "928562511603",
  appId: "1:928562511603:web:f7ace01f33c6a869864186"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
