import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY36RwXMV93zNjZ-l9xnkUYepjZMAFDkw",
  authDomain: "finding-things-fc220.firebaseapp.com",
  projectId: "finding-things-fc220",
  storageBucket: "finding-things-fc220.appspot.com",
  messagingSenderId: "610976419208",
  appId: "1:610976419208:web:80c6dd487f596de2f73e3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)
export const fireStore = getFirestore(app)