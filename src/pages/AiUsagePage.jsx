import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AiUsagePage = () => {
  const navigate = useNavigate();

  const principles = [
    {
      icon: "🤝",
      title: "AI hỗ trợ học tập, không thay thế tư duy",
      description: "Sử dụng AI như một công cụ hỗ trợ để tìm hiểu, phân tích thông tin, nhưng việc suy nghĩ phản biện và đưa ra kết luận phải do bản thân thực hiện.",
      examples: [
        "Dùng AI để tóm tắt tài liệu dài",
        "Yêu cầu AI giải thích khái niệm phức tạp",
        "Nhờ AI gợi ý ý tưởng cho bài viết",
        "Tự mình phân tích và đánh giá thông tin"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📝",
      title: "Phải trích dẫn khi dùng nội dung AI",
      description: "Khi sử dụng ý tưởng, thông tin hoặc đoạn văn được tạo bởi AI trong bài làm của mình, cần phải ghi rõ nguồn và cách thức sử dụng.",
      examples: [
        "Ghi chú: 'Được hỗ trợ bởi ChatGPT/Claude/Gemini'",
        "Chỉ rõ phần nào được AI tạo ra",
        "Giải thích cách đã xử lý thông tin từ AI",
        "Không sao chép nguyên văn mà không ghi nguồn"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "🧠",
      title: "AI chỉ là công cụ, con người mới là trung tâm",
      description: "Trí tuệ nhân tạo là phương tiện hỗ trợ, nhưng khả năng tư duy phản biện, sáng tạo và đưa ra quyết định cuối cùng thuộc về con người.",
      examples: [
        "Kiểm tra độ chính xác của thông tin AI cung cấp",
        "Đối chiếu với nhiều nguồn khác nhau",
        "Sử dụng kiến thức cá nhân để đánh giá",
        "Tự chịu trách nhiệm với kết quả học tập"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "⚖️",
      title: "Tôn trọng liêm chính học thuật",
      description: "Duy trì tính trung thực, minh bạch trong quá trình học tập và nghiên cứu, không lạm dụng AI để gian lận hoặc đạo văn.",
      examples: [
        "Không nộp bài hoàn toàn do AI tạo ra",
        "Thành thật về việc sử dụng AI với giảng viên",
        "Tôn trọng quy định của trường về việc dùng AI",
        "Phát triển kỹ năng tư duy độc lập"
      ],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.button
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-8 flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-lg">Quay lại trang chính</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl"
            >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Liêm chính học thuật với AI
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Hướng dẫn sử dụng trí tuệ nhân tạo một cách đúng đắn và có trách nhiệm trong học tập
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`bg-gradient-to-br ${principle.color} p-1 rounded-2xl shadow-2xl`}
            >
              <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-8 h-full">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{principle.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {principle.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {principle.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-4">Ví dụ thực hành:</h4>
                  {principle.examples.map((example, exampleIndex) => (
                    <motion.div
                      key={exampleIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + (exampleIndex * 0.1) }}
                      className="flex items-start space-x-3 text-gray-300"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, delay: exampleIndex * 0.3, repeat: Infinity }}
                        className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 mt-2"
                      />
                      <span className="text-sm leading-relaxed">{example}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress indicator */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Best Practices Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Nguyên tắc vàng khi sử dụng AI
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { emoji: "🎯", text: "Mục tiêu rõ ràng" },
                { emoji: "🔍", text: "Kiểm tra thông tin" },
                { emoji: "📖", text: "Học hỏi liên tục" },
                { emoji: "🤔", text: "Tư duy phản biện" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1 + (index * 0.1) }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/20"
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <p className="text-white font-semibold">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Final message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-8 pt-8 border-t border-white/10 text-center"
            >
              <p className="text-lg md:text-xl text-white leading-relaxed">
                Hãy nhớ: <span className="text-cyan-400 font-semibold">AI là đối tác</span>, không phải là 
                <span className="text-red-400 font-semibold"> thay thế</span> cho việc học tập của bạn. 
                Sự kết hợp thông minh giữa <span className="text-green-400 font-semibold">công nghệ và tri thức con người</span> 
                sẽ tạo ra những kết quả học tập tuyệt vời!
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 flex justify-center space-x-6"
        >
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300"
          >
            Quay lại học thuyết
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/quiz')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300"
          >
            Tham gia Quiz
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AiUsagePage;