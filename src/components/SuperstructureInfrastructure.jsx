import { motion } from 'framer-motion';

const SuperstructureInfrastructure = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 flex items-center justify-center py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Mối quan hệ giữa Cơ sở hạ tầng và Kiến trúc thượng tầng
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column - Superstructure */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl border border-purple-400/30"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                KIẾN TRÚC THƯỢNG TẦNG
              </h3>
            </div>
            
            <div className="space-y-4 text-white">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Chính trị:</h4>
                <p className="text-sm">Nhà nước, chính quyền, các tổ chức chính trị</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Pháp luật:</h4>
                <p className="text-sm">Hệ thống luật pháp, quy tắc xã hội</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Tư tưởng:</h4>
                <p className="text-sm">Triết học, tôn giáo, đạo đức, nghệ thuật</p>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Giáo dục:</h4>
                <p className="text-sm">Hệ thống giáo dục, văn hóa</p>
              </div>
            </div>
          </motion.div>

          {/* Center Column - Arrow and Interaction */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center text-white"
          >
            <div className="relative">
              {/* Upward arrow */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-16"
              >
                <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
              </motion.div>

              {/* Central interaction symbol */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl"
              >
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>

              {/* Downward arrow */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-16"
              >
                <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-20 text-lg font-semibold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent"
            >
              TƯƠNG TÁC QUA LẠI
            </motion.p>
          </motion.div>

          {/* Right Column - Infrastructure */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl p-8 shadow-2xl border border-green-400/30"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                CƠ SỞ HẠ TẦNG
              </h3>
            </div>
            
            <div className="space-y-4 text-white">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Lực lượng sản xuất:</h4>
                <p className="text-sm">Con người lao động và công cụ lao động</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Quan hệ sản xuất:</h4>
                <p className="text-sm">Quan hệ sở hữu, phân phối, trao đổi</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Kinh tế:</h4>
                <p className="text-sm">Cơ sở vật chất, công nghệ sản xuất</p>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Tài nguyên:</h4>
                <p className="text-sm">Tài nguyên thiên nhiên, lao động</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom explanation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <p className="text-white text-lg md:text-xl leading-relaxed">
              <span className="text-yellow-400 font-semibold">Cơ sở hạ tầng</span> quyết định và chi phối{' '}
              <span className="text-purple-400 font-semibold">kiến trúc thượng tầng</span>, 
              nhưng kiến trúc thượng tầng cũng có tác động trở lại, 
              có thể thúc đẩy hoặc cản trở sự phát triển của cơ sở hạ tầng.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperstructureInfrastructure;