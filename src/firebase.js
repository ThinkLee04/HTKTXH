// Firebase configuration và initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase config - Thay thế với config thực tế của bạn
const firebaseConfig = {
  apiKey: "AIzaSyBGRXjYxmInkewTr2JXereCI3-2B41RiE4",
  authDomain: "htktxh-cf1b8.firebaseapp.com",
  projectId: "htktxh-cf1b8",
  storageBucket: "htktxh-cf1b8.firebasestorage.app",
  messagingSenderId: "566263159459",
  appId: "1:566263159459:web:84dbe403675d7eb4c87d16",
  measurementId: "G-HRSNW7HLG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Để development, có thể dùng emulator (tùy chọn)
// if (window.location.hostname === 'localhost') {
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export default app;