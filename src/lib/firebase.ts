import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Web app's Firebase configuration using fallback to explicitly provided credentials
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAl1wMNs5oXpoN41wlcNKM3_HT22UYdrbY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ananth-3d4b1.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ananth-3d4b1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ananth-3d4b1.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1040460942596",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1040460942596:web:96812302c56d2562cc5451",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-9Z2J5QSTKY",
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Initialize Analytics for target tracking
let analytics: any = null;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(console.error);

export { analytics };
export default app;