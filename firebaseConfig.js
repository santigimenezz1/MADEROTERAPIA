import React, { useContext } from "react";
import { CartContext } from "./Context/Context";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";



// Firebase config
const firebaseConfig = {
 apiKey: "AIzaSyCTVEkOxomB8CQMb1BF2LPytVqNbXl57aI",
  authDomain: "maderoterapia-4fd62.firebaseapp.com",
  projectId: "maderoterapia-4fd62",
  storageBucket: "maderoterapia-4fd62.firebasestorage.app",
  messagingSenderId: "757788765388",
  appId: "1:757788765388:web:b6e4c01f66022965a36669",
  measurementId: "G-CNWWFNW3RL"
};



// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// =======================
// FUNCIONES DE NOTIFICACIÓN
// =======================


// =======================
// FUNCIÓN LOGIN
// =======================

export const login = async (email, password, setUsuarioOn) => {
  try {
  
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (res && res.user) {
      setUsuarioOn(true);
      console.log("✅ Sesión iniciada");
       let ms = auth.currentUser
    console.log({ms})
    } else {
      console.log("❌ No se pudo iniciar sesión");
    }
  } catch (error) {
    console.log("❌ Error en login:", error);
    showMessage({
      message: 'Error en el inicio de sesión',
      description: 'Revisa tu correo y contraseña',
      type: 'danger',
    });
  }
   
};

// =======================
// FUNCIÓN CREATE (registro)
// =======================

export const create = async (email, password, setUsuarioOn) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res && res.user) {
      setUsuarioOn(true);
      console.log("✅ Usuario creado");
    }
  } catch (error) {
    console.log("❌ Error en registro:", error);
  }
};
