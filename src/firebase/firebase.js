import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: "AIzaSyDpuCb0y7rwFf4pvtCJG3Ybte1ziFX0ofw",
  authDomain: "invoix-ef2de.firebaseapp.com",
  projectId: "invoix-ef2de",
  storageBucket: "invoix-ef2de.appspot.com",
  messagingSenderId: "145461393391",
  appId: "1:145461393391:web:dc56ecf118e52fbf3ba81a"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = firebase.firestore()

export {
  auth,
  db
}