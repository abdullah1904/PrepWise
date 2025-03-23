import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD_F0vCRWopy5PvqOj7BVabCSjURSNli_U",
    authDomain: "prepwise-6c4d1.firebaseapp.com",
    projectId: "prepwise-6c4d1",
    storageBucket: "prepwise-6c4d1.firebasestorage.app",
    messagingSenderId: "139626185032",
    appId: "1:139626185032:web:0431954bb608d75ed0f37d",
    measurementId: "G-0TXKP9FZ7B"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
