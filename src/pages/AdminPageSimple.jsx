import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FirebaseTest from '../components/FirebaseTest';

/**
 * Simplified Admin Page với vintage style
 */
const AdminPageSimple = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const vintagePaperTexture = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTA1NzQwNC1pbWFnZS1qb2I2MzAtYV8xLmpwZw.jpg')";

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-[#231812]"
        style={{ 
          backgroundImage: vintagePaperTexture, 
          backgroundBlendMode: "multiply",
          backgroundColor: "#180b03f5" 
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light"></div>
        <motion.div 
          className="relative z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-amber-300 text-lg">Đang tải Admin Panel...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-8 px-6 bg-[#231812]"
      style={{ 
        backgroundImage: vintagePaperTexture, 
        backgroundBlendMode: "multiply",
        backgroundColor: "#180b03f5" 
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-2">🎯 Admin Panel</h1>
            <p className="text-amber-300/80 text-lg">Simplified version for debugging</p>
          </div>
          <motion.div 
            className="mt-4 md:mt-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => navigate('/')}
              className="bg-amber-600 text-amber-50 px-6 py-3 rounded-xl font-semibold hover:bg-amber-500 transition-all shadow-lg"
            >
              🏠 Về Trang Chủ
            </button>
          </motion.div>
        </motion.div>

        {/* Main content */}
        <motion.div 
          className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-amber-200">✅ Admin Page Loaded Successfully!</h2>
          
          <div className="space-y-4 text-amber-100">
            <p>• React Router: ✅ Working</p>
            <p>• Component Render: ✅ Working</p>
            <p>• Framer Motion: ✅ Working</p>
            <p>• Navigation: ✅ Working</p>
          </div>

          <div className="mt-8 p-6 bg-green-900/30 border border-green-600/40 rounded-xl">
            <h3 className="font-bold text-green-300 mb-3 text-xl">🔧 Debug Status</h3>
            <p className="text-green-200 leading-relaxed">
              If you can see this page, the routing and basic component loading is working fine. 
              The issue might be with Firebase connections or complex component logic.
            </p>
          </div>

          <div className="mt-8">
            <FirebaseTest />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <button
              onClick={() => alert('Animation test successful!')}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-lg"
            >
              🎨 Test Animation
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPageSimple;