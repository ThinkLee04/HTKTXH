import { motion } from 'framer-motion';

const parchmentTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23221712'/%3E%3Cg fill='%23f1d4a4' fill-opacity='0.05'%3E%3Cpath d='M0 0h2v2H0zm125 45h2v1h-2zM70 105h1v2h-1zM205 80h2v1h-2zM40 160h2v2h-2zM180 150h1v2h-1zM95 215h2v1H95zM150 195h2v1h-2z'/%3E%3C/g%3E%3C/svg%3E\")";
const fiberTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23d6b485' fill-opacity='0.08'%3E%3Crect width='120' height='1' y='30'/%3E%3Crect width='120' height='1' y='78'/%3E%3Crect width='1' height='120' x='36'/%3E%3Crect width='1' height='120' x='84'/%3E%3C/g%3E%3C/svg%3E\")";

const RealWorldExamples = () => {
  const examples = [
    {
      title: "Toàn cầu hóa",
      description: "Sự kết nối kinh tế, chính trị, văn hóa toàn cầu tạo ra những thay đổi sâu sắc trong quan hệ sản xuất và cấu trúc xã hội.",
  icon: "🌍",
      points: [
        "Chuỗi cung ứng toàn cầu",
        "Di cư lao động quốc tế", 
        "Trao đổi văn hóa và tri thức",
        "Các tổ chức đa quốc gia"
      ]
    },
    {
      title: "Cách mạng công nghiệp 4.0",
      description: "Sự phát triển của IoT, AI, robotics đang thay đổi căn bản cách thức sản xuất và tổ chức lao động.",
  icon: "🤖",
      points: [
        "Tự động hóa sản xuất",
        "Internet of Things (IoT)",
        "Dữ liệu lớn và phân tích",
        "Sản xuất thông minh"
      ]
    },
    {
      title: "Trí tuệ nhân tạo và lao động",
      description: "AI đang tái định hình thị trường lao động, tạo ra những ngành nghề mới và thay thế một số công việc truyền thống.",
  icon: "🧠",
      points: [
        "Thay thế lao động thủ công",
        "Tạo ra nghề nghiệp mới",
        "Nâng cao năng suất",
        "Đòi hỏi kỹ năng mới"
      ]
    },
    {
      title: "Kinh tế thị trường định hướng XHCN",
      description: "Mô hình kinh tế Việt Nam kết hợp cơ chế thị trường với định hướng xã hội chủ nghĩa.",
  icon: "🇻🇳",
      points: [
        "Đa dạng hóa sở hữu",
        "Vai trò của nhà nước",
        "Phát triển bền vững",
        "Công bằng xã hội"
      ]
    }
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#22170f] py-24"
      style={{ backgroundImage: parchmentTexture, backgroundSize: '230px 230px', backgroundBlendMode: 'multiply' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e7cda2]/12 mix-blend-soft-light"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(190,144,102,0.16),_transparent_68%)]"></div>
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif-heading text-4xl font-semibold tracking-wide text-amber-200 md:text-6xl">
            Liên hệ thực tiễn và ý nghĩa học thuyết
          </h2>
          <p className="mx-auto mt-4 max-w-3xl font-serif-main text-xl leading-relaxed text-amber-100/85 md:text-2xl">
            Ứng dụng học thuyết Mác - Lênin trong việc hiểu và giải thích các hiện tượng kinh tế - xã hội đương đại
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="relative overflow-hidden rounded-[30px] border border-amber-900/40 bg-[#2b1f16]/94 p-8 shadow-[0_26px_42px_rgba(0,0,0,0.45)] transition-transform duration-500"
              style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></div>
              <div className="relative">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4" aria-hidden>{example.icon}</div>
                  <h3 className="mb-4 font-serif-heading text-2xl font-semibold tracking-wide text-amber-100 md:text-3xl">
                    {example.title}
                  </h3>
                </div>

                <p className="mb-6 font-serif-main text-lg leading-relaxed text-amber-100/86">
                  {example.description}
                </p>

                <div className="space-y-3">
                  <h4 className="mb-3 font-serif-heading text-lg font-semibold text-amber-300">Điểm nổi bật:</h4>
                  {example.points.map((point, pointIndex) => (
                    <motion.div
                      key={pointIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + (pointIndex * 0.1) }}
                      className="flex items-center space-x-3 text-amber-100/84"
                    >
                      <div className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: '#d9af66' }}></div>
                      <span>{point}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative elements */}
                <div className="mt-6 border-t border-amber-900/35 pt-6">
                  <div className="flex items-center justify-center space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: '#f1d4a4' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecting diagram */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <div
            className="mx-auto max-w-5xl rounded-[32px] border border-amber-900/35 bg-[#281d15]/88 p-8 shadow-[0_26px_42px_rgba(0,0,0,0.43)] backdrop-blur-[1px] md:p-12"
            style={{ backgroundImage: fiberTexture, backgroundSize: '170px 170px', backgroundBlendMode: 'soft-light' }}
          >
            <h3 className="mb-8 text-center font-serif-heading text-3xl font-semibold tracking-wide text-amber-200 md:text-4xl">
              Mối liên hệ với học thuyết Mác - Lênin
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="rounded-2xl border border-amber-900/35 bg-[#2a1f16]/90 p-6 shadow-[0_16px_26px_rgba(0,0,0,0.35)]"
                style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
              >
                <div className="text-4xl mb-4">⚙️</div>
                <h4 className="mb-3 font-serif-heading text-xl font-semibold text-amber-200">Lực lượng sản xuất</h4>
                <p className="text-sm leading-relaxed text-amber-100/80">
                  Công nghệ AI, IoT, robotics là những lực lượng sản xuất mới, 
                  thúc đẩy sự phát triển mạnh mẽ của xã hội
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="rounded-2xl border border-amber-900/35 bg-[#291e15]/90 p-6 shadow-[0_16px_26px_rgba(0,0,0,0.35)]"
                style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
              >
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="mb-3 font-serif-heading text-xl font-semibold text-amber-200">Quan hệ sản xuất</h4>
                <p className="text-sm leading-relaxed text-amber-100/80">
                  Toàn cầu hóa và mô hình kinh tế mới đang thay đổi 
                  quan hệ sở hữu, phân phối và trao đổi
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="rounded-2xl border border-amber-900/35 bg-[#281d14]/90 p-6 shadow-[0_16px_26px_rgba(0,0,0,0.35)]"
                style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
              >
                <div className="text-4xl mb-4">🏛️</div>
                <h4 className="mb-3 font-serif-heading text-xl font-semibold text-amber-200">Kiến trúc thượng tầng</h4>
                <p className="text-sm leading-relaxed text-amber-100/80">
                  Chính sách, luật pháp, giáo dục cần thích ứng 
                  với những thay đổi của cơ sở kinh tế
                </p>
              </motion.div>
            </div>

            {/* Conclusion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="mt-8 border-t border-amber-900/30 pt-8 text-center"
            >
              <p className="font-serif-main text-lg leading-relaxed text-amber-100/85 md:text-xl">
                Học thuyết Mác - Lênin không chỉ là lý thuyết quá khứ,
                mà là <span className="font-semibold text-amber-200">công cụ khoa học</span> để
                hiểu và định hướng <span className="font-semibold text-amber-200/90">sự phát triển xã hội</span> trong thời đại mới.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RealWorldExamples;