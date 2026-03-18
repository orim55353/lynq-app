import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
if (!apiKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_FIREBASE_API_KEY"
  );
}

const firebaseConfig = {
  apiKey,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

let db: Firestore | null = null;
try {
  db = getFirestore(app);
} catch {
  // Firestore is not available in this environment (e.g. Expo Go / some React Native runtimes).
  // Auth still works; callers should check isFirestoreAvailable() before using db.
}

export { app, auth, db };

export function isFirestoreAvailable(
  dbRef: Firestore | null
): dbRef is Firestore {
  return dbRef != null;
}
