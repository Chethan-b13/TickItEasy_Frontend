import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAzT2g4sEzOnZ6z9mwJVLJRlHJ7E7lsu-g",
    authDomain: "tickiteasy-3c9ef.firebaseapp.com",
    projectId: "tickiteasy-3c9ef",
    storageBucket: "tickiteasy-3c9ef.appspot.com",
    messagingSenderId: "188079803189",
    appId: "1:188079803189:web:6f5662fa4c71889d9a1a7c",
    measurementId: "G-2LTY9EVHRW"
  };

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage, auth };