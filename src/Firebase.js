// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyC19CyScMRG-5v6sbbLKizmsk78FpzD7U0",
  authDomain: "medrec-49b81.firebaseapp.com",
  projectId: "medrec-49b81",
  storageBucket: "medrec-49b81.appspot.com",
  messagingSenderId: "846588732290",
  appId: "1:846588732290:web:ead22cc37d1981a607259b",
  measurementId: "G-8DTXFF80PE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
const firestore = getFirestore(app)
export { app, auth, storage, firestore };