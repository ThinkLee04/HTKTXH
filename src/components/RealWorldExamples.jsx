import { motion } from 'framer-motion';
import { useState } from 'react';

const parchmentTexture = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTA1NzQwNC1pbWFnZS1qb2I2MzAtYV8xLmpwZw.jpg')";

const RealWorldExamples = () => {
  const [showQuestion, setShowQuestion] = useState(false);

  const summaryData = {
    title: "Tổng hợp",
    description: "Qua ba nội dung: Lịch sử - Tự nhiên, Cơ sở hạ tầng – Kiến trúc thượng tầng và Lực lượng sản xuất – Quan hệ sản xuất, có thể thấy sự phát triển xã hội loài người luôn tuân theo những quy luật khách quan.",
    icon: "📚",
    keyPoints: [
      {
        title: "Vai trò quyết định",
        description: "Sản xuất vật chất giữ vai trò quyết định trong sự phát triển xã hội",
        icon: "⚙️"
      },
      {
        title: "Tác động kinh tế",
        description: "Các yếu tố kinh tế tác động biện chứng lên cấu trúc xã hội",
        icon: "💰"
      },
      {
        title: "Tác động chính trị",
        description: "Các yếu tố chính trị tác động biện chứng lên kiến trúc thượng tầng",
        icon: "🏛️"
      },
      {
        title: "Tác động tư tưởng",
        description: "Các yếu tố tư tưởng tác động biện chứng lên ý thức xã hội",
        icon: "💭"
      }
    ]
  };

  const significanceData = {
    title: "Ý nghĩa",
    description: "Những quy luật này không chỉ giúp chúng ta nhận thức đúng về lịch sử mà còn là cơ sở khoa học để định hướng con đường phát triển xã hội.",
    icon: "🎯",
    applications: [
      {
        title: "Nhận thức lịch sử",
        description: "Hiểu đúng bản chất và quy luật phát triển của lịch sử nhân loại qua các giai đoạn",
        icon: "📖"
      },
      {
        title: "Định hướng phát triển",
        description: "Cơ sở khoa học để xây dựng đường lối, chính sách phù hợp với thực tiễn",
        icon: "🧭"
      }
    ]
  };

  const vintagePaperTexture = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTA1NzQwNC1pbWFnZS1qb2I2MzAtYV8xLmpwZw.jpg')";
  
  const quote = "Sự phát triển của các hình thái kinh tế - xã hội là một quá trình lịch sử - tự nhiên.";
  const author = "Karl Marx";
  const context = "Lời của Marx khẳng định rằng sự tiến hóa của xã hội loài người tuân theo những quy luật khách quan, không phụ thuộc vào ý chí chủ quan của con người.";
  const question = "Nếu lịch sử đang vận hành theo quy luật vậy thì điều gì đang chờ đợi nhân loại chúng ta ở phía trước?";

  return (
    <>
      {/* SECTION 1: TỔNG HỢP VÀ Ý NGHĨA */}
      <div className="relative min-h-screen py-20 flex items-center justify-center bg-gradient-to-br from-slate-900 via-amber-950 to-slate-800">
        {/* Background texture */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: parchmentTexture, backgroundSize: '200px 200px' }}
        />
        
        <div className="relative z-10 container mx-auto px-8 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-bold text-amber-200 mb-6">
              Tổng hợp và Ý nghĩa
            </h1>
            <p className="text-xl md:text-2xl text-amber-100/80 max-w-3xl mx-auto">
              Những nội dung cốt lõi và ý nghĩa thực tiễn của học thuyết Mác-Lênin
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Tổng hợp */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-amber-900/20 backdrop-blur-sm rounded-3xl border border-amber-800/30 p-10"
            >
              <div className="flex items-center mb-6">
                <span className="text-5xl mr-4">{summaryData.icon}</span>
                <h2 className="text-4xl font-bold text-amber-200">{summaryData.title}</h2>
              </div>
              
              <p className="text-amber-100/85 leading-relaxed mb-8 text-xl">
                {summaryData.description}
              </p>

              <div className="space-y-4">
                {summaryData.keyPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-amber-800/20 rounded-xl border border-amber-700/20 hover:bg-amber-800/30 transition-colors"
                  >
                    <span className="text-2xl mt-1">{point.icon}</span>
                    <div>
                      <h3 className="font-semibold text-amber-200 mb-1 text-lg">{point.title}</h3>
                      <p className="text-amber-100/75 leading-relaxed text-base">{point.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Ý nghĩa */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-yellow-900/20 backdrop-blur-sm rounded-3xl border border-yellow-800/30 p-10"
            >
              <div className="flex items-center mb-6">
                <span className="text-5xl mr-4">{significanceData.icon}</span>
                <h2 className="text-4xl font-bold text-yellow-200">{significanceData.title}</h2>
              </div>
              
              <p className="text-yellow-100/85 leading-relaxed mb-8 text-xl">
                {significanceData.description}
              </p>

              <div className="space-y-4">
                {significanceData.applications.map((app, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-5 p-5 bg-yellow-800/20 rounded-xl border border-yellow-700/20 hover:bg-yellow-800/30 transition-colors"
                  >
                    <span className="text-3xl mt-1">{app.icon}</span>
                    <div>
                      <h3 className="font-semibold text-yellow-200 mb-2 text-lg">{app.title}</h3>
                      <p className="text-yellow-100/75 leading-relaxed text-base">{app.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 2: TRÍCH DẪN VÀ CÂU HỎI */}
      <div 
        className="relative h-screen flex items-center justify-center overflow-hidden bg-[#231812] text-stone-100 border-t-4 border-amber-600/50"
        style={{ 
          backgroundImage: vintagePaperTexture, 
          backgroundBlendMode: "multiply",
          backgroundColor: "#180b03f5" 
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/12 mix-blend-soft-light"></div>
        
        <div className="relative z-10 container mx-auto px-8 max-w-4xl h-full flex flex-col justify-center">
          {/* Header */}
          {/* <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-amber-200 mb-6">
              Suy ngẫm và Triết lý
            </h1>
            <p className="text-lg text-amber-100/80 max-w-3xl mx-auto">
              Những trích dẫn kinh điển và câu hỏi gợi mở tư duy
            </p>
          </motion.div> */}

          {/* Marx Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-8"
          >
            <div className="relative bg-gradient-to-r from-slate-800/40 via-amber-900/30 to-slate-800/40 backdrop-blur-sm rounded-3xl border border-amber-700/30 p-16 shadow-2xl">
              {/* Decorative quotes */}
              <div className="absolute top-4 left-6 text-6xl text-amber-500/30 font-serif">"</div>
              <div className="absolute bottom-4 right-6 text-6xl text-amber-500/30 font-serif">"</div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-10"
              >
                <blockquote className="text-3xl md:text-4xl font-light italic text-amber-100 leading-relaxed mb-10 max-w-3xl mx-auto">
                  {quote}
                </blockquote>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex items-center justify-center space-x-4"
                >
                  <div className="w-16 h-0.5 bg-amber-500/60"></div>
                  <cite className="text-xl font-semibold text-amber-300 not-italic">
                    {author}
                  </cite>
                  <div className="w-16 h-0.5 bg-amber-500/60"></div>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="mt-8 text-amber-100/70 italic text-xl max-w-3xl mx-auto"
                >
                  {context}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Philosophical Question Trigger & Content */}
          <div className="text-center">
            {!showQuestion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={() => setShowQuestion(true)}
                className="cursor-pointer inline-block"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    className="w-8 h-8 text-amber-300/70 hover:text-amber-300 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 15l-7 7-7-7"
                      opacity="0.5"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {showQuestion && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative mx-auto w-full max-w-4xl rounded-[28px] border border-amber-900/45 bg-[#2b2018]/92 p-12 shadow-[0_16px_32px_rgba(0,0,0,0.35)] backdrop-blur-[1px] md:p-16"
              >
                {/* Decorative quotes */}
                <span className="absolute left-4 top-2 text-7xl text-amber-200/10 select-none font-serif">"</span>
                <span className="absolute right-4 bottom-[-1.5rem] text-7xl text-amber-200/10 select-none font-serif">"</span>

                <div className="pointer-events-none absolute -inset-3 rounded-[30px] border border-amber-900/30 opacity-40"></div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative z-10"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mb-6 flex items-center justify-center space-x-2"
                  >
                    <div className="w-12 h-0.5 bg-amber-500/50"></div>
                    <span className="text-amber-300/70 text-sm">✨</span>
                    <div className="w-12 h-0.5 bg-amber-500/50"></div>
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-2xl md:text-3xl text-amber-100 leading-relaxed max-w-4xl mx-auto font-semibold tracking-wide"
                    style={{
                      textShadow: '0 0 10px rgba(233, 199, 90, 0.3)'
                    }}
                  >
                    {question}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mt-6 flex items-center justify-center space-x-2"
                  >
                    <div className="w-24 h-0.5 bg-amber-500/50"></div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RealWorldExamples;