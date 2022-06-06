// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbHQRdl5E3EswJgq7iHQ7Jm8QFAFF8U2o",
  authDomain: "react-todo-list-6efed.firebaseapp.com",
  projectId: "react-todo-list-6efed",
  storageBucket: "react-todo-list-6efed.appspot.com",
  messagingSenderId: "797330113105",
  appId: "1:797330113105:web:6dbaeaea8069b6ea5e6e70",
  measurementId: "G-LZHYJ9TWL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)
export default app;

// 