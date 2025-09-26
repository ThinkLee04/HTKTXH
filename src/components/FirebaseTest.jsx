import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Firebase Connection Test
 */
const FirebaseTest = () => {
  const [status, setStatus] = useState('testing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        console.log('Testing Firebase connection...');
        
        // Test basic connection
        const testCollection = collection(db, 'test');
        await getDocs(testCollection);
        
        console.log('✅ Firebase connected successfully');
        setStatus('connected');
      } catch (err) {
        console.error('❌ Firebase connection failed:', err);
        setError(err.message);
        setStatus('failed');
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-2">🔥 Firebase Connection Test</h3>
      
      {status === 'testing' && (
        <div className="flex items-center text-yellow-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
          Testing connection...
        </div>
      )}
      
      {status === 'connected' && (
        <div className="text-green-600">✅ Firebase connected successfully</div>
      )}
      
      {status === 'failed' && (
        <div className="text-red-600">
          ❌ Connection failed: {error}
        </div>
      )}
    </div>
  );
};

export default FirebaseTest;