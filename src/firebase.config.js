import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD6rGwIYCfqcCX_fO_S_aQjrweFKHNMbZA",
  authDomain: "ishop-10ba5.firebaseapp.com",
  projectId: "ishop-10ba5",
  storageBucket: "ishop-10ba5.appspot.com",
  messagingSenderId: "46371527274",
  appId: "1:46371527274:web:bb15fd1e5f81705b170813"
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
  doc,
  updateDoc,
};
