import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AIReportPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('tools');

  const vintagePaperTexture = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTA1NzQwNC1pbWFnZS1qb2I2MzAtYV8xLmpwZw.jpg')";

  const sections = [
    { id: 'tools', title: 'Công cụ AI đã sử dụng', icon: '🤖' },
    { id: 'verification', title: 'Kiểm chứng nguồn', icon: '🔍' },
    { id: 'creativity', title: 'Ứng dụng AI sáng tạo', icon: '✨' },
    { id: 'commitment', title: 'Cam kết liêm chính', icon: '📜' }
  ];

  const aiTools = [
    {
      name: 'GitHub Copilot',
      purpose: 'Cải thiện, tối ưu thiết kế và animation',
      prompt: 'Cải thiện component React hiện tại với animations mượt mà hơn, tối ưu responsive design và enhanced user experience cho ứng dụng',
      output: 'Suggestions for advanced animations, improved responsive layouts, enhanced visual effects and performance optimizations',
      modifications: 'Áp dụng selective các đề xuất phù hợp, tùy chỉnh animations timing, điều chỉnh breakpoints và tối ưu performance'
    },
    {
      name: 'Gemini Gem và NotebookLM',
      purpose: 'Tổng hợp, tư vấn nội dung và cấu trúc',
      prompt: 'Phân tích và tổng hợp các khái niệm kinh tế Marx-Lenin, đưa ra cấu trúc học tập logic và tạo nội dung phù hợp với sinh viên Việt Nam',
      output: 'Structured content về các hình thái kinh tế-xã hội, timeline lịch sử, các khái niệm cốt lõi được giải thích dễ hiểu và mind maps tổng hợp',
      modifications: 'Điều chỉnh ngôn ngữ học thuật cho dễ tiếp cận, bổ sung ví dụ thực tế Việt Nam, tối ưu cấu trúc thông tin cho web interface'
    },
    {
      name: 'Gemini Nano Banana',
      purpose: 'Tạo hình ảnh minh họa',
      prompt: 'Create vintage-style illustrations for Marx-Lenin economic theory timeline',
      output: 'Các hình ảnh timeline và biểu tượng theo style cổ điển',
      modifications: 'Chỉnh sửa màu sắc, kích thước và tối ưu hóa cho web'
    }
  ];

  const verificationSources = [
    {
      category: 'Tài liệu học thuật chính thức',
      sources: [
        'Giáo trình Triết học Mác-Lênin, dùng cho sinh viên đại học hệ không chuyên lý luận chính trị - Bản dự thảo',
        'Slides Student Material MLN111'
        ]
    },
    {
      category: 'Nguồn tham khảo bổ sung',
      sources: [
        'Videos giảng dạy trên YouTube',
      ]
    },
    {
      category: 'Quy trình kiểm chứng',
      sources: [
        'Đối chiếu thông tin AI với giáo trình và slides chính thức',
        'So sánh và xác minh từ nhiều nguồn tài liệu',
      ]
    }
  ];

  const creativeApplications = [
    {
      title: 'Storytelling tương tác',
      description: 'Sử dụng AI để tạo ra câu chuyện kể lịch sử dưới dạng timeline tương tác với animations, giúp người học tiếp cận các khái niệm phức tạp thông qua narrative engaging và trực quan'
    },
    {
      title: 'Hệ thống Quiz thông minh',
      description: 'AI cải thiện sự đa dạng của câu hỏi với nhiều dạng bài tập sáng tạo, tối ưu hệ thống chấm điểm tự động, và hỗ trợ kiến trúc client-server hiện đại với real-time synchronization và multiplayer capabilities'
    },
    {
      title: 'Thiết kế UI/UX sáng tạo',
      description: 'AI hỗ trợ tạo giao diện phù hợp với nội dung học thuật, tối ưu hiệu năng loading và rendering, đồng thời đảm bảo accessibility và responsive design cho trải nghiệm học tập tối ưu trên mọi thiết bị'
    },
    {
      title: 'Hỗ trợ tạo Hình ảnh và Mindmaps',
      description: 'AI sinh tạo illustrations phù hợp với theme vintage/cổ điển, tạo mindmaps tổng hợp các khái niệm kinh tế Marx-Lenin, và hỗ trợ visual storytelling để complex theories trở nên dễ hiểu và memorable'
    }
  ];

  return (
    <div 
      className="min-h-screen bg-[#231812] text-stone-100"
      style={{ 
        backgroundImage: vintagePaperTexture, 
        backgroundBlendMode: "multiply",
        backgroundColor: "#180b03f5" 
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/12 mix-blend-soft-light"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.button
            onClick={() => navigate('/')}
            className="mb-6 rounded-[16px] bg-[#2b2018]/95 border border-amber-900/45 px-4 py-2 text-sm text-amber-200 hover:text-amber-100 transition-colors backdrop-blur-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Quay lại trang chủ
          </motion.button>
          
          <h1 className="text-4xl md:text-6xl font-bold text-amber-100 mb-4" style={{ textShadow: '0 0 20px rgba(233, 199, 90, 0.5)' }}>
            Báo cáo Sử dụng AI
          </h1>
          <h2 className="text-xl md:text-2xl text-amber-300 tracking-wide">
            Cam kết Liêm chính Học thuật
          </h2>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`rounded-[16px] px-6 py-3 font-semibold transition-all border backdrop-blur-md ${
                activeSection === section.id
                  ? 'bg-amber-600/90 text-stone-100 border-amber-500/50 shadow-lg'
                  : 'bg-[#2b2018]/95 text-amber-200 border-amber-900/45 hover:bg-amber-600/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{section.icon}</span>
              {section.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {activeSection === 'tools' && (
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-amber-100 mb-6 text-center">
                🤖 Công cụ AI đã sử dụng
              </h3>
              
              {aiTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[28px] bg-[#2b2018]/95 border border-amber-900/45 p-8 shadow-lg backdrop-blur-md"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light rounded-[28px]"></div>
                  
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold text-amber-100 mb-4">{tool.name}</h4>
                    <p className="text-amber-200 mb-4"><strong>Mục đích:</strong> {tool.purpose}</p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-[#1a0f08]/60 rounded-[16px] p-4 border border-amber-800/30">
                        <h5 className="font-semibold text-amber-300 mb-2">Prompt chính:</h5>
                        <p className="text-sm text-amber-100/80">{tool.prompt}</p>
                      </div>
                      
                      <div className="bg-[#1a0f08]/60 rounded-[16px] p-4 border border-amber-800/30">
                        <h5 className="font-semibold text-amber-300 mb-2">Output từ AI:</h5>
                        <p className="text-sm text-amber-100/80">{tool.output}</p>
                      </div>
                      
                      <div className="bg-[#1a0f08]/60 rounded-[16px] p-4 border border-amber-800/30">
                        <h5 className="font-semibold text-amber-300 mb-2">Chỉnh sửa của nhóm:</h5>
                        <p className="text-sm text-amber-100/80">{tool.modifications}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeSection === 'verification' && (
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-amber-100 mb-6 text-center">
                🔍 Kiểm chứng và Đối chiếu Nguồn
              </h3>
              
              {verificationSources.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[28px] bg-[#2b2018]/95 border border-amber-900/45 p-8 shadow-lg backdrop-blur-md"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light rounded-[28px]"></div>
                  
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold text-amber-100 mb-6">{category.category}</h4>
                    <div className="grid gap-4">
                      {category.sources.map((source, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <span className="text-amber-400 mt-1">✓</span>
                          <p className="text-amber-100/90">{source}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeSection === 'creativity' && (
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-amber-100 mb-6 text-center">
                ✨ Ứng dụng AI Sáng tạo
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {creativeApplications.map((app, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-[28px] bg-[#2b2018]/95 border border-amber-900/45 p-8 shadow-lg backdrop-blur-md"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light rounded-[28px]"></div>
                    
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold text-amber-100 mb-4">{app.title}</h4>
                      <p className="text-amber-100/80 leading-relaxed">{app.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'commitment' && (
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-amber-100 mb-6 text-center">
                📜 CAM KẾT LIÊM CHÍNH HỌC THUẬT
              </h3>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[28px] bg-[#2b2018]/95 border border-amber-900/45 p-12 shadow-lg backdrop-blur-md text-center"
              >
                <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light rounded-[28px]"></div>
                
                <div className="relative z-10 space-y-8">
                  <div className="text-6xl mb-6">🤝</div>
                  
                  <div className="space-y-6 text-left max-w-4xl mx-auto">
                    <div className="border-l-4 border-amber-500 pl-6">
                      <p className="text-lg text-amber-100 leading-relaxed">
                        <strong className="text-amber-300">Chúng tôi cam kết:</strong> Sử dụng AI như một công cụ hỗ trợ, không thay thế hoàn toàn quá trình tư duy và sáng tạo của con người.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-amber-500 pl-6">
                      <p className="text-lg text-amber-100 leading-relaxed">
                        <strong className="text-amber-300">Chúng tôi đảm bảo:</strong> Mọi nội dung được tạo ra đều trải qua quá trình kiểm chứng, chỉnh sửa và bổ sung bởi thành viên nhóm.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-amber-500 pl-6">
                      <p className="text-lg text-amber-100 leading-relaxed">
                        <strong className="text-amber-300">Chúng tôi tuân thủ:</strong> Các nguyên tắc đạo đức trong nghiên cứu học thuật và minh bạch trong việc sử dụng công nghệ AI.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-amber-800/30">
                    <p className="text-amber-200 text-sm">
                      Báo cáo này được lập nhằm đảm bảo tính minh bạch và trách nhiệm trong việc sử dụng công nghệ AI
                      <br />trong quá trình học tập và nghiên cứu học thuật.
                    </p>
                    
                    <div className="mt-6 text-amber-300 font-semibold">
                      <div className="flex items-center justify-center space-x-2">
                        <span>📅</span>
                        <span>Ngày lập: {new Date().toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AIReportPage;