// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzvZi-7faMiHJVkFIUJUHxTdw4CeOYK6c",
  authDomain: "stacks-65a73.firebaseapp.com",
  projectId: "stacks-65a73",
  storageBucket: "stacks-65a73.firebasestorage.app",
  messagingSenderId: "724658247580",
  appId: "1:724658247580:web:31f2d3b4b79d11c7485a59",
  measurementId: "G-HZJHGE8FX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
