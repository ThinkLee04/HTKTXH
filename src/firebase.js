// Firebase configuration và initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase config - Sử dụng biến môi trường
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Kết nối với Firestore Emulator nếu được cấu hình cho development
if (import.meta.env.VITE_USE_EMULATOR === 'true' && import.meta.env.DEV) {
  const emulatorHost = import.meta.env.VITE_EMULATOR_HOST || 'localhost';
  const emulatorPort = parseInt(import.meta.env.VITE_EMULATOR_PORT) || 8080;
  connectFirestoreEmulator(db, emulatorHost, emulatorPort);
}

export default app;