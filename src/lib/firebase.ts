import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
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
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
