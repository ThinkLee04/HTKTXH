import { motion } from 'framer-motion';

const parchmentTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23221712'/%3E%3Cg fill='%23f2d6a8' fill-opacity='0.05'%3E%3Cpath d='M0 0h2v2H0zm125 45h2v1h-2zM70 105h1v2h-1zM205 80h2v1h-2zM40 160h2v2h-2zM180 150h1v2h-1zM95 215h2v1H95zM150 195h2v1h-2z'/%3E%3C/g%3E%3C/svg%3E\")";
const fiberTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23d6b485' fill-opacity='0.08'%3E%3Crect width='120' height='1' y='30'/%3E%3Crect width='120' height='1' y='78'/%3E%3Crect width='1' height='120' x='36'/%3E%3Crect width='1' height='120' x='84'/%3E%3C/g%3E%3C/svg%3E\")";

// Dữ liệu KTTT
const ktttData = [
  { 
    title: 'Chính trị', 
    desc: 'Nhà nước, chính quyền, các tổ chức chính trị',
    icon: '🏛️'
  },
  { 
    title: 'Pháp luật', 
    desc: 'Hệ thống luật pháp, quy tắc xã hội',
    icon: '⚖️'
  },
  { 
    title: 'Tư tưởng', 
    desc: 'Triết học, tôn giáo, đạo đức, nghệ thuật',
    icon: '💭'
  },
  { 
    title: 'Giáo dục', 
    desc: 'Hệ thống giáo dục, văn hóa',
    icon: '📚'
  }
];

// Dữ liệu CSHT
const cshtData = [
  { 
    title: 'Lực lượng sản xuất', 
    desc: 'Con người lao động và công cụ lao động',
    icon: '⚙️'
  },
  { 
    title: 'Quan hệ sản xuất', 
    desc: 'Quan hệ sở hữu, phân phối, trao đổi',
    icon: '🤝'
  },
  { 
    title: 'Kinh tế', 
    desc: 'Cơ sở vật chất, công nghệ sản xuất',
    icon: '💼'
  },
  { 
    title: 'Tài nguyên', 
    desc: 'Tài nguyên thiên nhiên, lao động',
    icon: '🌿'
  }
];

const SuperstructureInfrastructure = () => {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#23170f] py-24"
      style={{ backgroundImage: parchmentTexture, backgroundSize: '230px 230px', backgroundBlendMode: 'multiply' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e4c89d]/12 mix-blend-soft-light"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,_rgba(184,138,96,0.18),_transparent_70%)]"></div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center text-4xl font-semibold tracking-wide text-amber-200 md:text-6xl"
        >
          Cấu trúc và mối quan hệ giữa Cơ sở hạ tầng và Kiến trúc thượng tầng
        </motion.h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-10 lg:grid-cols-3">
          {/* Left Column - Superstructure */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-amber-900/40 bg-[#2c2119]/94 p-8 shadow-[0_22px_36px_rgba(0,0,0,0.45)]"
            style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></div>
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#3a281c]/70 ring-2 ring-amber-500/35">
                <svg className="h-8 w-8 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold uppercase tracking-[0.18em] text-amber-200 md:text-3xl">
                KIẾN TRÚC THƯỢNG TẦNG
              </h3>
            </div>
            
            <div className="flex-1 space-y-4 text-amber-100/95">
              {ktttData.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="group rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5 transition-all duration-300 hover:border-amber-700/60 hover:bg-[#2a1f16]/90 hover:shadow-lg"
                  style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <h4 className="text-lg font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-base leading-relaxed text-amber-100/85 group-hover:text-amber-100 transition-colors">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center Column - Arrow and Interaction */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex h-full flex-col items-center justify-center text-amber-100"
          >
            <div className="relative flex flex-col items-center">
              {/* Upward arrow - CSHT ảnh hưởng lên KTTT */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="mb-4 flex flex-col items-center"
              >
                <svg className="h-10 w-10 text-amber-400 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
                <span className="mt-1 text-xs font-semibold text-amber-300 opacity-80">CSHT → KTTT</span>
              </motion.div>

              {/* Central interaction symbol */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-600/40 to-orange-700/50 shadow-2xl ring-2 ring-amber-400/30"
                style={{ backgroundImage: fiberTexture, backgroundSize: '120px 120px', backgroundBlendMode: 'soft-light' }}
              >
                {/* Inner gear effect */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500/60 to-orange-600/60"
                >
                  <svg className="h-8 w-8 text-amber-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                  </svg>
                </motion.div>
                
                {/* Pulse ring effect */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 0, 0.7]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-amber-400"
                />
              </motion.div>

              {/* Downward arrow - KTTT tác động ngược lại CSHT */}
              <motion.div
                animate={{ y: [3, -3, 3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
                className="mt-4 flex flex-col items-center"
              >
                <span className="mb-1 text-xs font-semibold text-amber-300 opacity-80">KTTT → CSHT</span>
                <svg className="h-10 w-10 text-amber-400 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>

            {/* Text label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-6 text-center text-sm font-bold uppercase tracking-[0.15em] text-amber-300"
            >
              Tương tác hai chiều
            </motion.p>
          </motion.div>

          {/* Right Column - Infrastructure */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-amber-900/40 bg-[#2c2119]/94 p-8 shadow-[0_22px_36px_rgba(0,0,0,0.45)]"
            style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></div>
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#3a281c]/70 ring-2 ring-amber-500/35">
                <svg className="h-8 w-8 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold uppercase tracking-[0.18em] text-amber-200 md:text-3xl">
                CƠ SỞ HẠ TẦNG
              </h3>
            </div>
            
            <div className="flex-1 space-y-4 text-amber-100/95">
              {cshtData.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="group rounded-2xl border border-orange-900/40 bg-[#251a13]/85 p-5 transition-all duration-300 hover:border-orange-700/60 hover:bg-[#2a1f16]/90 hover:shadow-lg"
                  style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <h4 className="text-lg font-bold text-orange-300 group-hover:text-orange-200 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-base leading-relaxed text-amber-100/85 group-hover:text-amber-100 transition-colors">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Phần giải thích mối quan hệ với ví dụ thực tế */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-20 max-w-6xl"
        >
          {/* Giải thích chính */}
          <div
            className="mb-8 rounded-[32px] border border-amber-900/35 bg-[#291e16]/85 p-8 text-center shadow-[0_24px_40px_rgba(0,0,0,0.38)] backdrop-blur-[1px] md:p-10"
            style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <h3 className="mb-4 text-2xl font-bold text-amber-300 md:text-3xl">
                Mối quan hệ tương tác hai chiều
              </h3>
            </motion.div>
            
            <p className="mb-6 text-lg leading-relaxed text-amber-100/88 md:text-xl">
              <span className="font-bold text-orange-300">Cơ sở hạ tầng</span>{' '}
              <span className="text-amber-200">quyết định và chi phối</span>{' '}
              <span className="font-bold text-amber-300">kiến trúc thượng tầng</span>,{' '}
              <span className="text-amber-200">nhưng kiến trúc thượng tầng cũng có</span>{' '}
              <span className="font-bold text-cyan-300">tác động trở lại</span>,{' '}
              <span className="text-amber-200">có thể</span>{' '}
              <span className="font-semibold text-green-300">thúc đẩy</span>{' '}
              <span className="text-amber-200">hoặc</span>{' '}
              <span className="font-semibold text-red-300">cản trở</span>{' '}
              <span className="text-amber-200">sự phát triển của cơ sở hạ tầng.</span>
            </p>
          </div>

          {/* Ví dụ minh họa: Cách mạng công nghiệp 4.0 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            {/* Ví dụ CSHT → KTTT */}
            <div className="rounded-2xl border border-green-900/40 bg-gradient-to-br from-[#1a2f1a]/90 to-[#2d4a2d]/90 p-6 shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                  <span className="text-2xl">🏭</span>
                </div>
                <h4 className="text-lg font-bold text-green-300">
                  CSHT → KTTT: Cách mạng Công nghiệp 4.0
                </h4>
              </div>
              <p className="mb-4 text-base leading-relaxed text-green-100/90">
                <span className="font-bold text-green-200">Cơ sở hạ tầng:</span> AI, IoT, Robot, Big Data, 5G
              </p>
              <p className="mb-4 text-base leading-relaxed text-green-100/90">
                <span className="font-bold text-green-200">Tác động lên KTTT:</span>
              </p>
              <ul className="space-y-3 text-sm text-green-100/85">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">•</span>
                  <span><strong className="text-green-300">Chính trị:</strong> Chính phủ số, Quản lý thông minh</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">•</span>
                  <span><strong className="text-green-300">Pháp luật:</strong> Luật bảo vệ dữ liệu, Luật AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">•</span>
                  <span><strong className="text-green-300">Giáo dục:</strong> Đào tạo kỹ năng số</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">•</span>
                  <span><strong className="text-green-300">Tư tưởng:</strong> Văn hóa làm việc từ xa</span>
                </li>
              </ul>
            </div>

            {/* Ví dụ KTTT → CSHT */}
            <div className="rounded-2xl border border-blue-900/40 bg-gradient-to-br from-[#1a1f2f]/90 to-[#2d344a]/90 p-6 shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                  <span className="text-2xl">📜</span>
                </div>
                <h4 className="text-lg font-bold text-blue-300">
                  KTTT → CSHT: Chuyển đổi số Quốc gia
                </h4>
              </div>
              <p className="mb-4 text-base leading-relaxed text-blue-100/90">
                <span className="font-bold text-blue-200">Kiến trúc thượng tầng:</span> Chiến lược số, Chính sách khuyến khích
              </p>
              <p className="mb-4 text-base leading-relaxed text-blue-100/90">
                <span className="font-bold text-blue-200">Tác động ngược lại CSHT:</span>
              </p>
              <ul className="space-y-3 text-sm text-blue-100/85">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">•</span>
                  <span><strong className="text-blue-300">Đầu tư:</strong> Hạ tầng 5G, Data center</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">•</span>
                  <span><strong className="text-blue-300">Giáo dục:</strong> Đào tạo nhân lực ICT</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">•</span>
                  <span><strong className="text-blue-300">R&D:</strong> Nghiên cứu AI, Blockchain</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">•</span>
                  <span><strong className="text-blue-300">Startup:</strong> Hệ sinh thái công nghệ</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Kết luận */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 rounded-2xl border border-amber-800/40 bg-gradient-to-r from-[#2a1e16]/90 to-[#3f2f20]/90 p-6 text-center"
          >
            <p className="text-lg font-semibold italic text-amber-200">
              "Sự phát triển bền vững đòi hỏi sự hài hòa và tương tác tích cực giữa 
              <span className="text-orange-300"> Cơ sở hạ tầng</span> và 
              <span className="text-amber-300"> Kiến trúc thượng tầng</span>"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperstructureInfrastructure;