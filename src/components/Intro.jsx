import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Intro = () => {
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const question = "Bạn cho rằng lịch sử có quy luật hay không?";
  
  const vintagePaperTexture = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTA1NzQwNC1pbWFnZS1qb2I2MzAtYV8xLmpwZw.jpg')";

  useEffect(() => {
    // Timer này chỉ để đảm bảo mũi tên xuất hiện sau khi animation chữ hoàn tất
    const timer = setTimeout(() => {
      setIsTypingCompleted(true);
    }, 4000); 
    return () => clearTimeout(timer);
  }, []);

  const scrollToTimeline = () => {
    document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
  };

  const cursorVariants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "linear",
        times: [0, 0.5, 0.5, 1]
      }
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#231812] text-stone-100"
      style={{ 
        backgroundImage: vintagePaperTexture, 
        backgroundBlendMode: "multiply",
        backgroundColor: "#180b03f5" 
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/12 mix-blend-soft-light"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 mx-auto px-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-6 text-3xl font-bold tracking-wide text-amber-100 md:text-5xl lg:text-6xl "
        >
          Học thuyết hình thái Kinh tế - Xã hội
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mb-10 text-xl font-semibold uppercase tracking-[0.3em] text-amber-300 md:text-2xl lg:text-3xl"
        >
          Chủ nghĩa Mác - Lênin
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          // [NỔI BẬT] Thêm `relative` để chứa các dấu trích dẫn
          className="relative mx-auto w-full max-w-3xl rounded-[28px] border border-amber-900/45 bg-[#2b2018]/92 p-8 shadow-[0_16px_32px_rgba(0,0,0,0.35)] backdrop-blur-[1px] md:p-12"
        >
          {/* [NỔI BẬT] Dấu trích dẫn trang trí */}
          <span className="absolute left-4 top-2  text-7xl text-amber-200/10 select-none">“</span>
          <span className="absolute right-4 bottom-[-1.5rem]  text-7xl text-amber-200/10 select-none">”</span>

          <div className="pointer-events-none absolute -inset-3 rounded-[30px] border border-amber-900/30 opacity-40"></div>
          
          <div className="flex justify-center items-center">
            <motion.p
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 3, delay: 2.5 }}
              // [NỔI BẬT] Đổi màu chữ và thêm hiệu ứng tỏa sáng
              className="text-lg md:text-xl lg:text-2xl font-semibold tracking-wide text-amber-100"
              style={{
                textShadow: '0 0 10px rgba(233, 199, 90, 0.5)',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
            >
              {question}
            </motion.p>
            {/* [NỔI BẬT] Con trỏ nhấp nháy liên tục sau khi gõ xong */}
            <motion.div
              className="w-[3px] h-[1.8rem] ml-2 bg-amber-400"
              variants={cursorVariants}
              animate={isTypingCompleted ? "blinking" : ""}
            />
          </div>
        </motion.div>
      </motion.div>

      {isTypingCompleted && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }} // nhấp nhô nhẹ
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-7 h-7 text-amber-300/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {/* Chevron chính */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
            {/* Chevron phụ mờ hơn */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 15l-7 7-7-7"
              opacity="0.5"
            />
          </svg>
        </motion.div>
      </motion.div>
    )}
    </div>
  );
};

export default Intro;