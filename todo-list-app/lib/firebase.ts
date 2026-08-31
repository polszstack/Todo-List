import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const requiredKeys = [
  'apiKey',
  'authDomain',
  'projectId',
  'appId',
] as const;

for (const key of requiredKeys) {
  if (!firebaseConfig[key]) {
    throw new Error(`Missing Firebase config value: NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`);
  }
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
