// Quick Firebase Test - Paste this in browser console to test Firebase connection

import { db } from './src/firebase.js';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

console.log('🔥 Testing Firebase connection...');

// Test 1: Write to Firestore
const testWrite = async () => {
  try {
    await setDoc(doc(db, 'test', 'connection'), {
      message: 'Firebase is working!',
      timestamp: new Date()
    });
    console.log('✅ Write test passed');
  } catch (error) {
    console.error('❌ Write test failed:', error);
  }
};

// Test 2: Listen to Firestore
const testListen = () => {
  const unsubscribe = onSnapshot(doc(db, 'test', 'connection'), (doc) => {
    if (doc.exists()) {
      console.log('✅ Listen test passed:', doc.data());
    } else {
      console.log('❌ Listen test failed: No data');
    }
  });
  
  // Cleanup after 5 seconds
  setTimeout(() => {
    unsubscribe();
    console.log('🧹 Cleanup done');
  }, 5000);
};

// Run tests
testWrite();
testListen();