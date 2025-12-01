import { initializeApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

// Firebase configuration - Replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDVuCXsXQA08Ro8OvCbVzR7V8W_CAVFDT8",
  authDomain: "depi-3bffd.firebaseapp.com",
  projectId: "depi-3bffd",
  storageBucket: "depi-3bffd.firebasestorage.app",
  messagingSenderId: "43848852104",
  appId: "1:43848852104:web:2814f33f031ec20b5c753d",
  measurementId: "G-4YY480ZGGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
const auth: Auth = getAuth(app)
const db: Firestore = getFirestore(app)
const storage: FirebaseStorage = getStorage(app)

export { auth, db, storage }
