import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FirebaseTest from '../components/FirebaseTest';

/**
 * Simplified Admin Page for debugging
 */
const AdminPageSimple = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải Admin Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🎯 Admin Panel (Simple)</h1>
            <p className="text-gray-600 mt-2">Simplified version for debugging</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              🏠 Về Trang Chủ
            </button>
          </div>
        </div>

        {/* Simple content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">✅ Admin Page Loaded Successfully!</h2>
          
          <div className="space-y-4 text-gray-600">
            <p>• React Router: ✅ Working</p>
            <p>• Component Render: ✅ Working</p>
            <p>• Framer Motion: ✅ Working</p>
            <p>• Navigation: ✅ Working</p>
          </div>

          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">🔧 Debug Status</h3>
            <p className="text-sm text-green-700">
              If you can see this page, the routing and basic component loading is working fine. 
              The issue might be with Firebase connections or complex component logic.
            </p>
          </div>

          <div className="mt-6">
            <FirebaseTest />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <button
              onClick={() => alert('Animation test successful!')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🎨 Test Animation
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageSimple;