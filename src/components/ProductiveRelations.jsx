import { motion } from 'framer-motion';

const ProductiveRelations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 flex items-center justify-center py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
        >
          Lực lượng sản xuất và Quan hệ sản xuất
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column - Productive Forces */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-8 shadow-2xl border border-orange-400/30"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                LỰC LƯỢNG SẢN XUẤT
              </h3>
            </div>
            
            <div className="space-y-4 text-white">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Con người lao động:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Trình độ kỹ năng</li>
                  <li>• Kinh nghiệm sản xuất</li>
                  <li>• Sức khỏe thể chất</li>
                  <li>• Trình độ văn hóa</li>
                </ul>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Tư liệu lao động:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Máy móc, thiết bị</li>
                  <li>• Công nghệ, kỹ thuật</li>
                  <li>• Nguyên liệu, vật liệu</li>
                  <li>• Cơ sở hạ tầng</li>
                </ul>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Khoa học - Kỹ thuật:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Nghiên cứu khoa học</li>
                  <li>• Ứng dụng công nghệ</li>
                  <li>• Đổi mới sáng tạo</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Center Column - Factory/Gear Icon and Interaction */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center text-white"
          >
            <div className="relative mb-8">
              {/* Main factory/gear icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
              >
                <motion.svg 
                  className="w-20 h-20 text-white"
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                </motion.svg>
              </motion.div>

              {/* Smaller gears around */}
              <motion.div
                animate={{ rotate: -180 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ rotate: 270 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-2 -right-6 w-10 h-10 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                </svg>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center text-lg font-semibold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent"
            >
              MÂU THUẪN VÀ THỐNG NHẤT
            </motion.p>
          </motion.div>

          {/* Right Column - Production Relations */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-2xl border border-blue-400/30"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                QUAN HỆ SẢN XUẤT
              </h3>
            </div>
            
            <div className="space-y-4 text-white">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Quan hệ sở hữu:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Sở hữu tư liệu sản xuất</li>
                  <li>• Quyền kiểm soát</li>
                  <li>• Quyền định đoạt</li>
                </ul>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Quan hệ trao đổi:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Mua bán hàng hóa</li>
                  <li>• Thị trường lao động</li>
                  <li>• Lưu thông tiền tệ</li>
                </ul>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-300">Quan hệ phân phối:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Phân phối sản phẩm</li>
                  <li>• Phân phối thu nhập</li>
                  <li>• Công bằng xã hội</li>
                </ul>
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
            <p className="text-white text-lg md:text-xl leading-relaxed mb-4">
              <span className="text-orange-400 font-semibold">Lực lượng sản xuất</span> có xu hướng phát triển liên tục, 
              trong khi <span className="text-blue-400 font-semibold">quan hệ sản xuất</span> tương đối ổn định.
            </p>
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Khi lực lượng sản xuất phát triển mạnh mà quan hệ sản xuất cũ không phù hợp, 
              sẽ dẫn đến <span className="text-yellow-400 font-semibold">mâu thuẫn</span> và 
              thúc đẩy <span className="text-green-400 font-semibold">biến đổi xã hội</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductiveRelations;