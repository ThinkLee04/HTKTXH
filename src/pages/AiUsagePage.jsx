import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const parchmentTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' fill='%23221610'/%3E%3Cg fill='%23f1d4a4' fill-opacity='0.05'%3E%3Cpath d='M0 0h2v2H0zm120 38h2v1h-2zM70 90h1v2h-1zM205 72h2v1h-2zM42 160h2v2h-2zM182 148h1v2h-1zM95 210h2v1H95zM150 186h2v1h-2z'/%3E%3C/g%3E%3C/svg%3E\")";
const fiberTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23d6b485' fill-opacity='0.08'%3E%3Crect width='120' height='1' y='28'/%3E%3Crect width='120' height='1' y='76'/%3E%3Crect width='1' height='120' x='34'/%3E%3Crect width='1' height='120' x='86'/%3E%3C/g%3E%3C/svg%3E\")";

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
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#22170f]"
      style={{ backgroundImage: parchmentTexture, backgroundSize: '220px 220px', backgroundBlendMode: 'multiply' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e6cba1]/12 mix-blend-soft-light"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(188,143,95,0.18),_transparent_70%)]"></div>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(200,153,103,0.22),transparent_60%)]"></div>
        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.button
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-8 flex items-center space-x-2 font-serif-main text-amber-200/70 transition-colors duration-300 hover:text-amber-100"
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
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#70502d]/85 shadow-[0_26px_42px_rgba(0,0,0,0.45)]"
              style={{ backgroundImage: fiberTexture, backgroundSize: '150px 150px', backgroundBlendMode: 'soft-light' }}
            >
                <svg className="h-12 w-12 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </motion.div>

              <h1 className="mb-6 font-serif-heading text-4xl font-semibold tracking-wide text-amber-200 md:text-6xl">
              Liêm chính học thuật với AI
            </h1>
            
              <p className="mx-auto max-w-3xl font-serif-main text-xl leading-relaxed text-amber-100/80 md:text-2xl">
              Hướng dẫn sử dụng trí tuệ nhân tạo một cách đúng đắn và có trách nhiệm trong học tập
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative overflow-hidden rounded-[30px] border border-amber-900/40 bg-[#2b1f16]/94 p-8 shadow-[0_26px_42px_rgba(0,0,0,0.45)]"
              style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></div>
              <div className="relative">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{principle.icon}</div>
                    <h3 className="mb-4 font-serif-heading text-2xl font-semibold tracking-wide text-amber-100 md:text-3xl">
                    {principle.title}
                  </h3>
                </div>

                  <p className="mb-6 font-serif-main text-lg leading-relaxed text-amber-100/85">
                  {principle.description}
                </p>

                <div className="space-y-3">
                    <h4 className="mb-4 font-serif-heading text-lg font-semibold text-amber-300">Ví dụ thực hành:</h4>
                  {principle.examples.map((example, exampleIndex) => (
                    <motion.div
                      key={exampleIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + (exampleIndex * 0.1) }}
                        className="flex items-start space-x-3 text-amber-100/84"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, delay: exampleIndex * 0.3, repeat: Infinity }}
                          className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: '#d9af66' }}
                      />
                      <span className="text-sm leading-relaxed">{example}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress indicator */}
                  <div className="mt-6 border-t border-amber-900/35 pt-6">
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="h-8 w-8 rounded-full border-2 border-amber-800/35 border-t-amber-100"
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
            <div
              className="mx-auto max-w-5xl rounded-[32px] border border-amber-900/35 bg-[#281d15]/88 p-8 shadow-[0_26px_42px_rgba(0,0,0,0.43)] backdrop-blur-[1px] md:p-12"
              style={{ backgroundImage: fiberTexture, backgroundSize: '170px 170px', backgroundBlendMode: 'soft-light' }}
            >
              <h3 className="mb-8 text-center font-serif-heading text-3xl font-semibold tracking-wide text-amber-200 md:text-4xl">
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
                    className="rounded-2xl border border-amber-900/35 bg-[#2a1f16]/88 p-6 shadow-[0_16px_26px_rgba(0,0,0,0.35)]"
                    style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                    <p className="font-serif-heading text-amber-100 font-semibold">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Final message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
                className="mt-8 border-t border-amber-900/35 pt-8 text-center"
            >
                <p className="font-serif-main text-lg leading-relaxed text-amber-100/85 md:text-xl">
                  Hãy nhớ: <span className="font-semibold text-amber-200">AI là đối tác</span>, không phải là
                  <span className="font-semibold text-amber-200/90"> thay thế</span> cho việc học tập của bạn.
                  Sự kết hợp thông minh giữa <span className="font-semibold text-amber-200/90">công nghệ và tri thức con người</span>
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
              className="relative overflow-hidden rounded-full border border-amber-900/40 bg-[#2b1f16]/94 px-8 py-4 font-serif-heading text-sm font-semibold tracking-[0.3em] text-amber-100 shadow-[0_22px_36px_rgba(0,0,0,0.4)] transition-all duration-300"
              style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
          >
            <span className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></span>
            Quay lại học thuyết
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/quiz')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-full border border-amber-900/40 bg-[#2a1e15]/94 px-8 py-4 font-serif-heading text-sm font-semibold tracking-[0.3em] text-amber-100 shadow-[0_22px_36px_rgba(0,0,0,0.4)] transition-all duration-300"
              style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
          >
            <span className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></span>
            Tham gia Quiz
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AiUsagePage;