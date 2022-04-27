import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCFA-PpdS_EllUvRLGcmPivvN9dJzLgiA0",
  authDomain: "istore-2ae7a.firebaseapp.com",
  projectId: "istore-2ae7a",
  storageBucket: "istore-2ae7a.appspot.com",
  messagingSenderId: "934775781718",
  appId: "1:934775781718:web:5e63b4556d4e5f189d3ef7",
};

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(firebase);
const signAnon = signInAnonymously;

export {
  auth,
  signAnon,
  db,
  collection,
  addDoc,
  onAuthStateChanged,
  getDocs,
  doc,
  updateDoc,
};
