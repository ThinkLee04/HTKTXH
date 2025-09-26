import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const parchmentTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' fill='%23221610'/%3E%3Cg fill='%23f1d4a4' fill-opacity='0.05'%3E%3Cpath d='M0 0h2v2H0zm120 38h2v1h-2zM70 90h1v2h-1zM205 72h2v1h-2zM42 160h2v2h-2zM182 148h1v2h-1zM95 210h2v1H95zM150 186h2v1h-2z'/%3E%3C/g%3E%3C/svg%3E\")";
const fiberTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23d6b485' fill-opacity='0.08'%3E%3Crect width='120' height='1' y='28'/%3E%3Crect width='120' height='1' y='76'/%3E%3Crect width='1' height='120' x='34'/%3E%3Crect width='1' height='120' x='86'/%3E%3C/g%3E%3C/svg%3E\")";

const FooterNav = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-[#22170f] py-24"
      style={{ backgroundImage: parchmentTexture, backgroundSize: '220px 220px', backgroundBlendMode: 'multiply' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e6cba1]/12 mix-blend-soft-light"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(188,143,95,0.16),_transparent_70%)]"></div>
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 font-serif-heading text-3xl font-semibold tracking-wide text-amber-200 md:text-5xl"
        >
          Tiếp tục hành trình học tập
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-12 max-w-3xl font-serif-main text-xl leading-relaxed text-amber-100/85 md:text-2xl"
        >
          Khám phá thêm về cách sử dụng AI trong học tập hoặc thử thách bản thân với bài kiểm tra
        </motion.p>

        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 md:flex-row">
          {/* AI Usage Button */}
          <motion.button
            onClick={() => navigate('/ai-usage')}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 22px 40px rgba(0, 0, 0, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-[30px] border border-amber-900/40 bg-[#2b1f16]/94 py-6 px-12 font-serif-heading text-[1.15rem] font-semibold uppercase tracking-[0.18em] text-amber-100 shadow-[0_26px_42px_rgba(0,0,0,0.43)] transition-all duration-300"
            style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></div>
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3a281c]/75 ring-2 ring-amber-500/35"
              >
                <svg className="h-6 w-6 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </motion.div>
              <div className="text-left">
                <div className="text-lg font-semibold tracking-[0.25em] text-amber-200">AI USAGE</div>
                <div className="text-xs tracking-[0.3em] text-amber-400/80">Liêm chính học thuật</div>
              </div>
              <motion.svg
                className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" className="text-amber-200" />
              </motion.svg>
            </div>
          </motion.button>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-amber-300/60 to-transparent"
          ></motion.div>

          {/* Quiz Button */}
          <motion.button
            onClick={() => navigate('/quiz')}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 22px 40px rgba(0, 0, 0, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-[30px] border border-amber-900/40 bg-[#2a1e15]/94 py-6 px-12 font-serif-heading text-[1.15rem] font-semibold uppercase tracking-[0.18em] text-amber-100 shadow-[0_26px_42px_rgba(0,0,0,0.43)] transition-all duration-300"
            style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></div>
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3a281c]/75 ring-2 ring-amber-500/35"
              >
                <svg className="h-6 w-6 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </motion.div>
              <div className="text-left">
                <div className="text-lg font-semibold tracking-[0.25em] text-amber-200">JOIN QUIZ</div>
                <div className="text-xs tracking-[0.3em] text-amber-400/80">Kiểm tra kiến thức</div>
              </div>
              <motion.svg
                className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" className="text-amber-200" />
              </motion.svg>
            </div>
          </motion.button>
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 border-t border-amber-900/35 pt-8"
        >
          <div className="flex justify-center space-x-8 text-amber-200/70">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="text-3xl"
            >
              📚
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="text-3xl"
            >
              🤖
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="text-3xl"
            >
              🧠
            </motion.div>
          </div>
          <p className="mt-4 font-serif-main text-sm tracking-[0.35em] text-amber-300/60">
            © 2024 Marx-Lenin Economic Theory Learning Platform
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FooterNav;