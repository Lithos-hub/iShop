import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  deleteUser
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  setDoc,
  getDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
  increment,
  query,
  deleteDoc
} from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD6rGwIYCfqcCX_fO_S_aQjrweFKHNMbZA",
  authDomain: "ishop-10ba5.firebaseapp.com",
  projectId: "ishop-10ba5",
  storageBucket: "ishop-10ba5.appspot.com",
  messagingSenderId: "46371527274",
  appId: "1:46371527274:web:bb15fd1e5f81705b170813",
};

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(firebase);
const signAnon = signInAnonymously;

export {
  auth, // => auth
  signAnon, // => auth
  onAuthStateChanged, // => auth
  deleteUser, // => Auth
  db, // => Firestore
  collection, // => Firestore
  doc, // => Firestore
  addDoc, // => Firestore
  updateDoc, // => Firestore
  setDoc, // => Firestore
  getDoc, // => Firestore
  getDocs, // => Firestore
  arrayUnion, // => Firestore
  arrayRemove, // => Firestore
  deleteDoc, // => Firestore
  increment, // => Firestore
  query, // => Firestore
};
