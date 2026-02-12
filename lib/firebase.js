"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9KoNa3pI-GA_5N2Pc6R8sjCD5uZVIZ_Q",
  authDomain: "sweetshopapp-9088c.firebaseapp.com",
  projectId: "sweetshopapp-9088c",
  storageBucket: "sweetshopapp-9088c.firebasestorage.app",
  messagingSenderId: "810127985708",
  appId: "1:810127985708:web:39e05918578fc73ef15589",
  measurementId: "G-G5D26VSP4K"
};
// ✅ Initialize Firebase only once (Next.js safe)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default app;               // 🔥 REQUIRED FIX
export { auth, googleProvider };
