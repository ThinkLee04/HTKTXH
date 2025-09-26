import { motion } from 'framer-motion';

const parchmentTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Crect width='260' height='260' fill='%23221712'/%3E%3Cg fill='%23f3d7a9' fill-opacity='0.05'%3E%3Cpath d='M0 0h3v3H0zm120 40h2v1h-2zM60 90h1v2h-1zM200 70h2v1h-2zM30 150h2v2h-2zM180 140h1v2h-1zM90 210h2v1H90zM150 190h2v1h-2z'/%3E%3C/g%3E%3C/svg%3E\")";
const fiberTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='110' viewBox='0 0 110 110'%3E%3Cg fill='%23d6b485' fill-opacity='0.08'%3E%3Crect width='110' height='1' y='32'/%3E%3Crect width='110' height='1' y='74'/%3E%3Crect width='1' height='110' x='38'/%3E%3Crect width='1' height='110' x='72'/%3E%3C/g%3E%3C/svg%3E\")";

const ProductiveRelations = () => {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#23170f] py-24 text-amber-100"
      style={{ backgroundImage: parchmentTexture, backgroundSize: '240px 240px', backgroundBlendMode: 'multiply' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e4c89d]/12 mix-blend-soft-light"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,129,92,0.18),_transparent_68%)]"></div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center text-4xl font-semibold tracking-wide text-amber-200 md:text-6xl"
        >
          Lực lượng sản xuất và Quan hệ sản xuất
        </motion.h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-3">
          {/* Left Column - Productive Forces */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-[32px] border border-amber-900/40 bg-[#2d2018]/95 p-8 shadow-[0_22px_36px_rgba(0,0,0,0.45)]"
            style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
          >
            <div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ backgroundImage: fiberTexture, opacity: 0.35 }}></div>
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#3a281c]/70 ring-2 ring-amber-500/35">
                <svg className="h-8 w-8 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold uppercase tracking-[0.18em] text-amber-200 md:text-3xl">
                LỰC LƯỢNG SẢN XUẤT
              </h3>
            </div>
            
            <div className="space-y-5 text-amber-100/95">
              <div className="rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3 classtext-lg font-semibold text-amber-300">Con người lao động:</h4>
                <ul className="space-y-1 text-sm text-amber-100/90">
                  <li>• Trình độ kỹ năng</li>
                  <li>• Kinh nghiệm sản xuất</li>
                  <li>• Sức khỏe thể chất</li>
                  <li>• Trình độ văn hóa</li>
                </ul>
              </div>
              
              <div className="rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3  text-lg font-semibold text-amber-300">Tư liệu lao động:</h4>
                <ul className="space-y-1 text-sm text-amber-100/90">
                  <li>• Máy móc, thiết bị</li>
                  <li>• Công nghệ, kỹ thuật</li>
                  <li>• Nguyên liệu, vật liệu</li>
                  <li>• Cơ sở hạ tầng</li>
                </ul>
              </div>
              
              <div className="rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3  text-lg font-semibold text-amber-300">Khoa học - Kỹ thuật:</h4>
                <ul className="space-y-1 text-sm text-amber-100/90">
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
            className="flex flex-col items-center justify-center text-amber-200"
          >
            <div className="relative mb-8">
              {/* Main factory/gear icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                className="flex h-32 w-32 items-center justify-center rounded-full bg-[#6c4a2a]/80 shadow-[0_20px_32px_rgba(0,0,0,0.4)]"
                style={{ backgroundImage: fiberTexture, backgroundSize: '150px 150px', backgroundBlendMode: 'soft-light' }}
              >
                <motion.svg
                  className="h-20 w-20 text-amber-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                >
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                </motion.svg>
              </motion.div>

              {/* Smaller gears around */}
              <motion.div
                animate={{ rotate: -180 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -top-5 -left-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#4a3320]/85 shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
              >
                <svg className="h-6 w-6 text-amber-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ rotate: 270 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-3 -right-7 flex h-11 w-11 items-center justify-center rounded-full bg-[#422c1b]/85 shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
              >
                <svg className="h-5 w-5 text-amber-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                </svg>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center  text-lg tracking-[0.3em] text-amber-300"
            >
              MÂU THUẪN & THỐNG NHẤT
            </motion.p>
          </motion.div>

          {/* Right Column - Production Relations */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-[32px] border border-amber-900/40 bg-[#2a1f16]/95 p-8 shadow-[0_22px_36px_rgba(0,0,0,0.45)]"
            style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
          >
            <div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ backgroundImage: fiberTexture, opacity: 0.35 }}></div>
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#3a281c]/70 ring-2 ring-amber-500/35">
                <svg className="h-8 w-8 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-4  text-2xl font-bold uppercase tracking-[0.18em] text-amber-200 md:text-3xl">
                QUAN HỆ SẢN XUẤT
              </h3>
            </div>
            
            <div className="space-y-5 text-amber-100/95">
              <div className="rounded-2xl border border-amber-900/40 bg-[#241911]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3  text-lg font-semibold text-amber-300">Quan hệ sở hữu:</h4>
                <ul className="space-y-1 text-sm text-amber-100/90">
                  <li>• Sở hữu tư liệu sản xuất</li>
                  <li>• Quyền kiểm soát</li>
                  <li>• Quyền định đoạt</li>
                </ul>
              </div>
              
              <div className="rounded-2xl border border-amber-900/40 bg-[#241911]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3  text-lg font-semibold text-amber-300">Quan hệ trao đổi:</h4>
                <ul className="space-y-1 text-sm text-amber-100/90">
                  <li>• Mua bán hàng hóa</li>
                  <li>• Thị trường lao động</li>
                  <li>• Lưu thông tiền tệ</li>
                </ul>
              </div>
              
              <div className="rounded-2xl border border-amber-900/40 bg-[#241911]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3  text-lg font-semibold text-amber-300">Quan hệ phân phối:</h4>
                <ul className="space-y-1 text-sm text-amber-100/90">
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
          className="mx-auto mt-20 max-w-4xl text-center"
        >
          <div
            className="rounded-[32px] border border-amber-900/35 bg-[#291e16]/85 p-8 shadow-[0_24px_40px_rgba(0,0,0,0.38)] backdrop-blur-[1px] md:p-10"
            style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}
          >
            <p className="mb-4  text-lg leading-relaxed text-amber-100/88 md:text-xl">
              <span className="font-semibold text-amber-300">Lực lượng sản xuất</span> có xu hướng phát triển liên tục,
              trong khi <span className="font-semibold text-amber-300/80">quan hệ sản xuất</span> tương đối ổn định.
            </p>
            <p className=" text-lg leading-relaxed text-amber-100/80 md:text-xl">
              Khi lực lượng sản xuất phát triển mạnh mà quan hệ sản xuất cũ không phù hợp,
              sẽ dẫn đến <span className="font-semibold text-amber-200">mâu thuẫn</span> và
              thúc đẩy <span className="font-semibold text-amber-200">biến đổi xã hội</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductiveRelations;