import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * TestAdminPage - Styled test page with vintage Marx-Lenin theme
 * Features vintage paper texture background, amber color scheme, smooth animations
 */
const TestAdminPage = () => {
  const navigate = useNavigate();

  // Vintage paper texture for consistent styling
  const vintagePaperTexture = `
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, #f5f1eb 0%, #e8dcc0 100%)
  `;

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
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div 
          className="bg-gradient-to-br from-amber-100/95 to-amber-200/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-300/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-amber-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              🔧 Test Admin Page
            </motion.h1>
            
            <motion.p 
              className="text-amber-700 mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Trang test để xác minh routing hoạt động chính xác trong hệ thống Marx-Lenin.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600/90 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500/95 transition-all shadow-lg hover:scale-105"
              >
                🏠 Về Trang Chủ
              </button>
              
              <button
                onClick={() => navigate('/quiz')}
                className="bg-green-600/90 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-500/95 transition-all shadow-lg hover:scale-105"
              >
                🎯 Vào Quiz
              </button>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-r from-amber-50/80 to-amber-100/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="font-bold text-amber-900 mb-4 text-xl">📊 Debug Information</h3>
              <div className="text-sm text-amber-800 text-left space-y-2">
                <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                  <strong>Current URL:</strong> 
                  <code className="bg-amber-200/50 px-2 py-1 rounded text-xs">{window.location.href}</code>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                  <strong>Route Path:</strong> 
                  <code className="bg-amber-200/50 px-2 py-1 rounded text-xs">/admin-test</code>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                  <strong>Navigation Works:</strong> 
                  <span className="text-green-700 font-semibold">✅ Có</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                  <strong>Component Loads:</strong> 
                  <span className="text-green-700 font-semibold">✅ Có</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                  <strong>Vintage Styling:</strong> 
                  <span className="text-green-700 font-semibold">✅ Hoạt động</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestAdminPage;