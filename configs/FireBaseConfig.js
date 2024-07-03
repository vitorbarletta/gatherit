import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAg08UeKIAHcSLBkNUlyT6c1eqtvfk4n8",
  authDomain: "gather-it.firebaseapp.com",
  projectId: "gather-it",
  storageBucket: "gather-it.appspot.com",
  messagingSenderId: "472676625354",
  appId: "1:472676625354:web:9aa106486e2e76f50cfd33",
  measurementId: "G-27WYV2ZLKQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

