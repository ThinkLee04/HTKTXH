import { motion } from 'framer-motion';

const RealWorldExamples = () => {
  const examples = [
    {
      title: "Toàn cầu hóa",
      description: "Sự kết nối kinh tế, chính trị, văn hóa toàn cầu tạo ra những thay đổi sâu sắc trong quan hệ sản xuất và cấu trúc xã hội.",
      icon: "🌍",
      color: "from-blue-500 to-cyan-500",
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
      color: "from-purple-500 to-pink-500",
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
      color: "from-emerald-500 to-teal-500",
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
      color: "from-red-500 to-yellow-500",
      points: [
        "Đa dạng hóa sở hữu",
        "Vai trò của nhà nước",
        "Phát triển bền vững",
        "Công bằng xã hội"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Liên hệ thực tiễn và ý nghĩa học thuyết
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Ứng dụng học thuyết Mác - Lênin trong việc hiểu và giải thích các hiện tượng kinh tế - xã hội đương đại
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -10 }}
              className={`bg-gradient-to-br ${example.color} p-1 rounded-2xl shadow-2xl`}
            >
              <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 h-full">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{example.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {example.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {example.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">Điểm nổi bật:</h4>
                  {example.points.map((point, pointIndex) => (
                    <motion.div
                      key={pointIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + (pointIndex * 0.1) }}
                      className="flex items-center space-x-3 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                      <span>{point}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative elements */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                        className="w-2 h-2 bg-white/30 rounded-full"
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
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
              Mối liên hệ với học thuyết Mác - Lênin
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-400/30"
              >
                <div className="text-4xl mb-4">⚙️</div>
                <h4 className="text-xl font-bold text-orange-400 mb-3">Lực lượng sản xuất</h4>
                <p className="text-gray-300 text-sm">
                  Công nghệ AI, IoT, robotics là những lực lượng sản xuất mới, 
                  thúc đẩy sự phát triển mạnh mẽ của xã hội
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-400/30"
              >
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="text-xl font-bold text-blue-400 mb-3">Quan hệ sản xuất</h4>
                <p className="text-gray-300 text-sm">
                  Toàn cầu hóa và mô hình kinh tế mới đang thay đổi 
                  quan hệ sở hữu, phân phối và trao đổi
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-6 border border-green-400/30"
              >
                <div className="text-4xl mb-4">🏛️</div>
                <h4 className="text-xl font-bold text-green-400 mb-3">Kiến trúc thượng tầng</h4>
                <p className="text-gray-300 text-sm">
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
              className="mt-8 pt-8 border-t border-white/10 text-center"
            >
              <p className="text-lg md:text-xl text-white leading-relaxed">
                Học thuyết Mác - Lênin không chỉ là lý thuyết quá khứ, 
                mà là <span className="text-yellow-400 font-semibold">công cụ khoa học</span> để 
                hiểu và định hướng <span className="text-cyan-400 font-semibold">sự phát triển xã hội</span> trong thời đại mới.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RealWorldExamples;