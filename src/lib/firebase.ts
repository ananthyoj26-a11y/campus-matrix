import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl1wMNs5oXpoN41wlcNKM3_HT22UYdrbY",
  authDomain: "ananth-3d4b1.firebaseapp.com",
  projectId: "ananth-3d4b1",
  storageBucket: "ananth-3d4b1.firebasestorage.app",
  messagingSenderId: "1040460942596",
  appId: "1:1040460942596:web:96812302c56d2562cc5451",
  measurementId: "G-9Z2J5QSTKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { 
  app, 
  auth, 
  googleProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged 
};
export type { FirebaseUser };
