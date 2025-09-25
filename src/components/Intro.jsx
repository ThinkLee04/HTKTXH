import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Intro = () => {
  const [showArrow, setShowArrow] = useState(false);
  const question = "Bạn cho rằng lịch sử có quy luật hay không?";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTimeline = () => {
    document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center z-10 max-w-4xl mx-auto px-6"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
        >
          Học thuyết Kinh tế - Xã hội
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-xl md:text-2xl lg:text-3xl font-semibold mb-12 text-gray-200"
        >
          Chủ nghĩa Mác - Lênin
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20"
        >
          <motion.p
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, delay: 2.5 }}
            className="text-lg md:text-xl lg:text-2xl font-medium overflow-hidden whitespace-nowrap border-r-2 border-yellow-400"
            style={{ borderRight: showArrow ? 'none' : '2px solid #facc15' }}
          >
            {question}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll down arrow */}
      {showArrow && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: [20, 0, -10, 0, 10, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop"
          }}
          onClick={scrollToTimeline}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
          aria-label="Scroll to timeline"
        >
          <svg 
            className="w-8 h-8 md:w-10 md:h-10" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default Intro;