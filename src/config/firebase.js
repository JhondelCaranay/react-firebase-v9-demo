// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgJ2E_DClQp9nK4SyYLUbdYOwFs4Hp53M",
  authDomain: "react-firebasev9-2ed88.firebaseapp.com",
  projectId: "react-firebasev9-2ed88",
  storageBucket: "react-firebasev9-2ed88.appspot.com",
  messagingSenderId: "791550527216",
  appId: "1:791550527216:web:deb2663cff834f134a2435",
  measurementId: "G-RLWXY2WC68",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// auth
export const auth = getAuth(app);
// google provider
export const googleProvider = new GoogleAuthProvider();

// firestore
export const firestoreDb = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
