// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcJRT8VYdF_cTKhdGBv1Syit1yYICvFTQ",
  authDomain: "bookspot-6a538.firebaseapp.com",
  projectId: "bookspot-6a538",
  storageBucket: "bookspot-6a538.firebasestorage.app",
  messagingSenderId: "800114776196",
  appId: "1:800114776196:web:946e921c6bcf315e1b8ad1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db = getFirestore(app);
export default app;