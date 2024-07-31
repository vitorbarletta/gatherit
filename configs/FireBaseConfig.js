import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged  } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  '@firebase/auth'
]);


const firebaseConfig = {
  apiKey: "AIzaSyDAg08UeKIAHcSLBkNUlyT6c1eqtvfk4n8",
  authDomain: "gather-it.firebaseapp.com",
  projectId: "gather-it",
  storageBucket: "gather-it.appspot.com",
  messagingSenderId: "472676625354",
  appId: "1:472676625354:web:9aa106486e2e76f50cfd33",
  measurementId: "G-27WYV2ZLKQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)


// Observador de autenticação
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Usuário logado:', user);
  } else {
    console.log('Usuário não está logado');
  }
});

export {auth, db, app, storage}


