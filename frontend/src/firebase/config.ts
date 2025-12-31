import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your full Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFHHIUlzSDROryN_LmOAElCHCQIATenKU",
    authDomain: "bhaktipath-62863.firebaseapp.com",
    projectId: "bhaktipath-62863",
    storageBucket: "bhaktipath-62863.firebasestorage.app",
    messagingSenderId: "815747486878",
    appId: "1:815747486878:web:4b53ae15d07b8bab46d78f",
    measurementId: "G-HCBKNW553G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
