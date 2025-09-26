import { motion } from 'framer-motion';

const parchmentTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23221712'/%3E%3Cg fill='%23f2d6a8' fill-opacity='0.05'%3E%3Cpath d='M0 0h2v2H0zm125 45h2v1h-2zM70 105h1v2h-1zM205 80h2v1h-2zM40 160h2v2h-2zM180 150h1v2h-1zM95 215h2v1H95zM150 195h2v1h-2z'/%3E%3C/g%3E%3C/svg%3E\")";
const fiberTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23d6b485' fill-opacity='0.08'%3E%3Crect width='120' height='1' y='30'/%3E%3Crect width='120' height='1' y='78'/%3E%3Crect width='1' height='120' x='36'/%3E%3Crect width='1' height='120' x='84'/%3E%3C/g%3E%3C/svg%3E\")";

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
          Mối quan hệ giữa Cơ sở hạ tầng và Kiến trúc thượng tầng
        </motion.h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-3">
          {/* Left Column - Superstructure */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-[32px] border border-amber-900/40 bg-[#2c2119]/94 p-8 shadow-[0_22px_36px_rgba(0,0,0,0.45)]"
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
            
            <div className="space-y-5 text-amber-100/95">
              <div className="rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3 text-lg font-semibold text-amber-300">Chính trị:</h4>
                <p className="text-sm text-amber-100/85">Nhà nước, chính quyền, các tổ chức chính trị</p>
              </div>
              
              <div className="rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3 text-lg font-semibold text-amber-300">Pháp luật:</h4>
                <p className="text-sm text-amber-100/85">Hệ thống luật pháp, quy tắc xã hội</p>
              </div>
              
              <div className="rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3 text-lg font-semibold text-amber-300">Tư tưởng:</h4>
                <p className="text-sm text-amber-100/85">Triết học, tôn giáo, đạo đức, nghệ thuật</p>
              </div>

              <div className="rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3 text-lg font-semibold text-amber-300">Giáo dục:</h4>
                <p className="text-sm text-amber-100/85">Hệ thống giáo dục, văn hóa</p>
              </div>
            </div>
          </motion.div>

          {/* Center Column - Arrow and Interaction */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center text-amber-100"
          >
            <div className="relative">
              {/* Upward arrow */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-16"
              >
                <svg className="h-12 w-12 text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
              </motion.div>

              {/* Central interaction symbol */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-[#6a4929]/80 shadow-[0_20px_32px_rgba(0,0,0,0.4)]"
                style={{ backgroundImage: fiberTexture, backgroundSize: '150px 150px', backgroundBlendMode: 'soft-light' }}
              >
                <svg className="h-12 w-12 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>

              {/* Downward arrow */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-16"
              >
                <svg className="h-12 w-12 text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-20 text-center text-lg tracking-[0.3em] text-amber-300"
            >
              TƯƠNG TÁC QUA LẠI
            </motion.p>
          </motion.div>

          {/* Right Column - Infrastructure */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-[32px] border border-amber-900/40 bg-[#2c2119]/94 p-8 shadow-[0_22px_36px_rgba(0,0,0,0.45)]"
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
            
            <div className="space-y-5 text-amber-100/95">
              <div className="rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3 text-lg font-semibold text-amber-300">Lực lượng sản xuất:</h4>
                <p className="text-sm text-amber-100/85">Con người lao động và công cụ lao động</p>
              </div>
              
              <div className="rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3 text-lg font-semibold text-amber-300">Quan hệ sản xuất:</h4>
                <p className="text-sm text-amber-100/85">Quan hệ sở hữu, phân phối, trao đổi</p>
              </div>
              
              <div className="rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5" style={{ backgroundImage: fiberTexture, backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3 text-lg font-semibold text-amber-300">Kinh tế:</h4>
                <p className="text-sm text-amber-100/85">Cơ sở vật chất, công nghệ sản xuất</p>
              </div>

              <div className="rounded-2xl border border-amber-900/40 bg-[#251a13]/85 p-5" style={{ backgroundImage: fiberTexture,  backgroundSize: '180px 180px', backgroundBlendMode: 'soft-light' }}>
                <h4 className="mb-3 text-lg font-semibold text-amber-300">Tài nguyên:</h4>
                <p className="text-sm text-amber-100/85">Tài nguyên thiên nhiên, lao động</p>
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
            <p className=" text-lg leading-relaxed text-amber-100/88 md:text-xl">
              <span className="font-semibold text-amber-300">Cơ sở hạ tầng</span> quyết định và chi phối{' '}
              <span className="font-semibold text-amber-300/80">kiến trúc thượng tầng</span>,
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