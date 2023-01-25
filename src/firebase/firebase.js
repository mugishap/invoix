import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDpuCb0y7rwFf4pvtCJG3Ybte1ziFX0ofw",
    authDomain: "invoix-ef2de.firebaseapp.com",
    projectId: "invoix-ef2de",
    storageBucket: "invoix-ef2de.appspot.com",
    messagingSenderId: "145461393391",
    appId: "1:145461393391:web:974a7994befb4a483ba81a"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  export default firebaseApp.firestore();