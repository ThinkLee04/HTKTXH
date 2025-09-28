import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FooterNav = () => {
  const navigate = useNavigate();
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [showAdminHint, setShowAdminHint] = useState(false);

  const vintagePaperTexture = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTA1NzQwNC1pbWFnZS1qb2I2MzAtYV8xLmpwZw.jpg')";

  // Reset admin click count sau 2 giây
  useEffect(() => {
    if (adminClickCount > 0) {
      const timer = setTimeout(() => {
        setAdminClickCount(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [adminClickCount]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (adminPassword === '987') {
      navigate('/admin');
      setAdminPassword('');
      setShowPasswordInput(false);
      setIsMenuOpen(false);
      setAdminClickCount(0);
    } else {
      setAdminPassword('');
      setTimeout(() => {
        setShowPasswordInput(false);
      }, 1000);
    }
  };

  const handleMainButtonClick = () => {
    setAdminClickCount(prev => prev + 1);

    if (adminClickCount === 4) { // Click lần thứ 5
      navigate('/admin');
      setAdminClickCount(0);
      setIsMenuOpen(false);
      return;
    }
    
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    {
      id: 'quiz',
      label: 'Tham gia Quizz',
      shortLabel: 'Quiz',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      onClick: () => {
        navigate('/quiz');
        setIsMenuOpen(false);
      },
      color: 'from-amber-600 via-amber-700 to-amber-800',
      shadowColor: 'shadow-amber-600/30'
    },
    {
      id: 'report',
      label: 'AI & Liêm chính',
      shortLabel: 'AI Report', 
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      onClick: () => {
        navigate('/ai-report');
        setIsMenuOpen(false);
      },
      color: 'from-amber-700 via-orange-600 to-red-700',
      shadowColor: 'shadow-orange-500/30'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Admin Hint */}
      <AnimatePresence>
        {showAdminHint && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute bottom-20 right-0 mb-2 rounded-[16px] bg-[#2b2018]/95 border border-amber-900/45 px-4 py-3 text-sm text-amber-200 backdrop-blur-md shadow-[0_16px_32px_rgba(0,0,0,0.35)]"
            style={{ 
              backgroundImage: vintagePaperTexture, 
              backgroundBlendMode: "multiply",
              backgroundColor: "#2b2018f5" 
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light rounded-[16px]"></div>
            <div className="relative z-10">🤫 Click thêm 2 lần nữa...</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={handleMainButtonClick}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[#2b2018]/95 text-amber-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] border border-amber-900/45 backdrop-blur-md"
        style={{ 
          backgroundImage: vintagePaperTexture, 
          backgroundBlendMode: "multiply",
          backgroundColor: "#2b2018f5" 
        }}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isMenuOpen ? 45 : 0,
          boxShadow: isMenuOpen 
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.6)"
        }}
      >
        {/* Vintage paper overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/12 mix-blend-soft-light rounded-full"></div>
        
        {/* Background glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/15 to-amber-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <motion.div
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isMenuOpen ? (
            <svg className="h-7 w-7 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-7 w-7 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </motion.div>
        
        {/* Pulse rings với màu amber */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-amber-300/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Menu Items */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 right-0 flex flex-col space-y-4"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="flex items-center justify-end space-x-3"
              >
                {/* Label với vintage style */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: index * 0.1 + 0.15 }}
                  className="rounded-[16px] w-32 bg-[#2b2018]/95 border border-amber-900/45 px-5 py-3 text-sm font-semibold text-amber-100 shadow-[0_16px_32px_rgba(0,0,0,0.35)] backdrop-blur-md"
                  style={{ 
                    backgroundImage: vintagePaperTexture, 
                    backgroundBlendMode: "multiply",
                    backgroundColor: "#2b2018f5",
                    textShadow: '0 0 8px rgba(233, 199, 90, 0.4)'
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light rounded-[16px]"></div>
                  <div className="relative z-10">{item.label}</div>
                </motion.div>

                {/* Button với vintage style */}
                <motion.button
                  onClick={item.onClick}
                  className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-stone-100 shadow-xl ${item.shadowColor} border border-amber-300/30 relative overflow-hidden group`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                  }}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="relative z-10"
                  >
                    {item.icon}
                  </motion.div>
                  
                  {/* Sparkle effect với màu amber */}
                  <motion.div
                    className="absolute top-2 right-2 h-1 w-1 rounded-full bg-amber-200"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Password Modal với vintage style */}
      <AnimatePresence>
        {showPasswordInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setShowPasswordInput(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="w-96 rounded-[28px] bg-[#2b2018]/95 border border-amber-900/45 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md"
              style={{ 
                backgroundImage: vintagePaperTexture, 
                backgroundBlendMode: "multiply",
                backgroundColor: "#2b2018f5" 
              }}
            >
              {/* Vintage paper overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/12 mix-blend-soft-light rounded-[28px]"></div>
              
              <div className="mb-6 text-center relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg border border-amber-300/30"
                >
                  <svg className="h-8 w-8 text-stone-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-amber-100" style={{ textShadow: '0 0 10px rgba(233, 199, 90, 0.5)' }}>🔐 Khu vực hạn chế</h3>
                <p className="text-sm text-amber-200/80 mt-1">Chỉ dành cho quản trị viên</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-5 relative z-10">
                <div>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Nhập mật khẩu bí mật..."
                    className="w-full rounded-[16px] border-2 border-amber-900/45 bg-[#1a0f08]/80 px-4 py-4 text-amber-100 placeholder-amber-300/60 focus:border-amber-600/70 focus:bg-[#1a0f08]/90 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all duration-200 backdrop-blur-sm"
                    style={{ textShadow: '0 0 8px rgba(233, 199, 90, 0.3)' }}
                    autoFocus
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-[16px] bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4 font-semibold text-stone-100 transition-all hover:from-amber-700 hover:to-amber-800 focus:ring-2 focus:ring-amber-500/50 shadow-lg border border-amber-300/30"
                    style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}
                  >
                    ✨ Truy cập
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordInput(false)}
                    className="flex-1 rounded-[16px] border-2 border-amber-900/45 bg-[#1a0f08]/60 px-6 py-4 font-semibold text-amber-200 transition-all hover:bg-[#1a0f08]/80 focus:ring-2 focus:ring-amber-400/30 backdrop-blur-sm"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FooterNav;