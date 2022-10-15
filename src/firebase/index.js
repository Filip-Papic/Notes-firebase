// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRKyxO8owqGNESqFqP6Qde66bazutIrOA",
  authDomain: "notes-2a62e.firebaseapp.com",
  projectId: "notes-2a62e",
  storageBucket: "notes-2a62e.appspot.com",
  messagingSenderId: "680801861219",
  appId: "1:680801861219:web:1fcadd2846646a3765c256",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
