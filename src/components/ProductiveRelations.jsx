import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import { useRef, useState, useEffect } from 'react';

// Import local images
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';

// Textures for vintage style
const parchmentTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23221712'/%3E%3Cg fill='%23f1d4a4' fill-opacity='0.05'%3E%3Cpath d='M0 0h2v2H0zm125 45h2v1h-2zM70 105h1v2h-1zM205 80h2v1h-2zM40 160h2v2h-2zM180 150h1v2h-1zM95 215h2v1H95zM150 195h2v1h-2z'/%3E%3C/g%3E%3C/svg%3E\")";

const fiberTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23221712'/%3E%3Cg fill='%23f1d4a4' fill-opacity='0.03'%3E%3Cpath d='M0 0h1v1H0zm80 22h1v1h-1zM35 52h1v1h-1zM102 40h1v1h-1zM20 80h1v1h-1zM90 75h1v1h-1zM47 107h1v1h-1zM75 97h1v1h-1z'/%3E%3C/g%3E%3C/svg%3E\")";

const ProductiveRelations = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [currentEra, setCurrentEra] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activeScenario, setActiveScenario] = useState('private'); // private, company, public
  const [activeQHSX, setActiveQHSX] = useState(null); // for QHSX tooltip
  const [activeEra, setActiveEra] = useState('agriculture'); // agriculture, industrial, modern
  const [interactionMode, setInteractionMode] = useState('evolution'); // evolution, harmony, conflict

  // Tooltip data for mind map nodes
  const tooltipData = {
    llsx: {
      title: "Lực lượng sản xuất (LLSX)",
      concept: "Biểu thị mối quan hệ giữa con người với tự nhiên trong quá trình sản xuất, biểu hiện năng lực chinh phục tự nhiên của con người.",
      carExample: "Toàn bộ hệ thống từ động cơ, công nghệ, người lái... Nó cho chúng ta biết chúng ta mạnh đến đâu, đi nhanh đến đâu.",
      icon: "⚙️"
    },
    nld: {
      title: "Người lao động (NLĐ)",
      concept: "Là yếu tố con người trong sản xuất, có trí tuệ, kỹ năng, sức khỏe và kinh nghiệm.",
      carExample: "Là tài xế - trái tim và khối óc của chiếc xe. Không có người lái, xe không thể chạy. Người lái giỏi sẽ làm xe phát huy tối đa sức mạnh.",
      icon: "👨‍💼"
    },
    tlsx: {
      title: "Tư liệu sản xuất",
      concept: "Gồm tư liệu lao động và đối tượng lao động - những điều kiện vật chất cần thiết cho sản xuất.",
      carExample: "Bao gồm bản thân chiếc xe (công cụ) và những gì xe vận chuyển (đối tượng tác động).",
      icon: "🏭"
    },
    tlld: {
      title: "Tư liệu lao động",
      concept: "Các công cụ, máy móc, thiết bị mà con người sử dụng để tác động vào đối tượng lao động.",
      carExample: "Bản thân chiếc xe và các bộ phận: động cơ, hộp số, bánh xe, hệ thống phanh, vô lăng, máy tính điều khiển...",
      components: ["Động cơ", "Hộp số", "Bánh xe", "Hệ thống phanh", "Vô lăng", "Máy tính điều khiển"],
      icon: "🚗"
    },
    dtld: {
      title: "Đối tượng lao động",
      concept: "Những gì con người tác động vào hoặc sử dụng để tạo ra sản phẩm/dịch vụ trong quá trình sản xuất.",
      carExample: "Than, dầu, điện, nguyên liệu thô, xăng/dầu cho xe, hàng hóa được vận chuyển, hành khách được chở đi.",
      components: ["Điện", "Dầu", "Xăng", "Nguyên liệu thô", "Hàng hóa", "Hành khách"],
      icon: "📦"
    }
  };

  // QHSX Scenarios Data
  const qhsxScenarios = {
    private: {
      name: "Xe cá nhân",
      color: "from-amber-600 to-orange-600",
      ownership: "Cá nhân sở hữu 100%",
      management: "Tự quản lý, tuân thủ luật giao thông",
      distribution: "Lợi ích: Tiện lợi cá nhân, tiết kiệm thời gian",
      icon: "🚗",
      description: "Xe riêng của cá nhân"
    },
    company: {
      name: "Xe công ty",
      color: "from-orange-600 to-red-600", 
      ownership: "Công ty sở hữu, nhân viên sử dụng",
      management: "Công ty quản lý, GPS tracking, lịch sử di chuyển",
      distribution: "Lợi ích: Công ty (tài sản), nhân viên (tiện ích công việc)",
      icon: "🚐",
      description: "Xe do công ty cung cấp"
    },
    public: {
      name: "Xe công cộng",
      color: "from-red-600 to-orange-700",
      ownership: "Nhà nước/Tập đoàn sở hữu",
      management: "Hệ thống điều hành tập trung, lộ trình cố định",
      distribution: "Lợi ích: Xã hội (giao thông công cộng), hành khách (chi phí thấp)",
      icon: "🚌",
      description: "Phương tiện công cộng"
    }
  };

  // QHSX Tooltip Data
  const qhsxTooltipData = {
    ownership: {
      title: "Quan hệ sở hữu",
      concept: "Ai sở hữu phương tiện sản xuất? Đây là mối quan hệ cốt lõi quyết định tính chất của xã hội.",
      carExample: "Xe của bạn, xe công ty hay xe công cộng? Quyền sở hữu quyết định quyền quyết định và trách nhiệm.",
      icon: "🏆"
    },
    management: {
      title: "Quan hệ quản lý",
      concept: "Ai tổ chức, điều hành quá trình sản xuất? Hệ thống quản lý và điều hành hoạt động.",
      carExample: "Cảnh sát giao thông, đèn tín hiệu, GPS, luật lệ... ai điều khiển hệ thống giao thông?",
      icon: "🎮"
    },
    distribution: {
      title: "Quan hệ phân phối",
      concept: "Sản phẩm và lợi ích được phân chia như thế nào? Ai nhận được gì từ quá trình sản xuất?",
      carExample: "Chủ xe nhận lợi nhuận, tài xế nhận lương, hành khách đến được đích đến.",
      icon: "⚖️"
    }
  };

  // Historical Evolution Data with Real Images
  const evolutionEras = {
    agriculture: {
      name: "Thời đại Nông nghiệp",
      llsx: {
        name: "Cày sắt & Sức người",
        image: image1,
        description: "Công cụ đơn giản, sức lao động chính"
      },
      qhsx: {
        name: "Quan hệ Địa chủ - Nông nô",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
        description: "Đường làng, luật lệ phong kiến"
      },
      interaction: "Cày sắt tạo ra thặng dư nông sản → Hình thành tầng lớp địa chủ sở hữu ruộng đất"
    },
    industrial: {
      name: "Cách mạng Công nghiệp", 
      llsx: {
        name: "Máy hơi nước & Nhà máy",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
        description: "Cơ khí hóa, sản xuất hàng loạt"
      },
      qhsx: {
        name: "Quan hệ Tư sản - Vô sản",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
        description: "Đô thị hóa, luật lệ công nghiệp"
      },
      interaction: "Máy móc hiện đại → Khai tử thủ công nghiệp → Hình thành giai cấp công nhân"
    },
    modern: {
      name: "Thời đại 4.0",
      llsx: {
        name: "AI & Robot",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
        description: "Tự động hóa, trí tuệ nhân tạo"
      },
      qhsx: {
        name: "Kinh tế số & Toàn cầu hóa",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
        description: "Mạng lưới toàn cầu, luật công nghệ"
      },
      interaction: "Công nghệ AI → Đòi hỏi hệ thống giáo dục mới, luật pháp công nghệ số"
    }
  };

  // Vehicle-Road Interaction Scenarios
  const interactionModes = {
    evolution: {
      title: "LLSX quyết định QHSX",
      subtitle: "Phát triển công nghệ đòi hỏi thay đổi hệ thống",
      vehicle: {
        old: image1,
        new: image2
      },
      road: {
        old: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop",
        new: image3
      },
      description: "Siêu xe Range Rover trên đường làng đá → Đòi hỏi đường cao tốc mới"
    },
    harmony: {
      title: "QHSX thúc đẩy LLSX",
      subtitle: "Nền tảng vững chắc giúp công nghệ bay cao",
      foundation: {
        image: image4,
        title: "Nền tảng QHSX",
        description: "Hạ tầng hoàn hảo, chính sách hỗ trợ"
      },
      technology: {
        image: image5,
        title: "LLSX phát triển", 
        description: "Công nghệ hiện đại được nâng đỡ"
      },
      result: "Sự kết hợp hoàn hảo = Thành công ✓"
    },
    conflict: {
      title: "QHSX kìm hãm LLSX",
      subtitle: "Rào cản cũ kỹ ngăn chặn tiến bộ",
      center: {
        image: image3,
        title: "LLSX tiên tiến",
        description: "Công nghệ mạnh mẽ nhưng bị cản trở"
      },
      barriers: [
        {
          image: image1,
          title: "Hạ tầng lạc hậu",
          description: "Đường xấu, thiết bị cũ"
        },
        {
          image: image2,
          title: "Luật pháp cứng nhắc", 
          description: "Quy định lỗi thời"
        }
      ],
      result: "Tiềm năng bị lãng phí ✗"
    }
  };

  // Historical eras data
  const eras = [
    {
      name: "Săn bắt hái lượm",
      period: "~300,000 - 10,000 năm trước",
      description: "Con người sống bằng săn bắt động vật hoang dã và hái lượm thực vật tự nhiên",
      tools: ["Đá tạc", "Gậy gỗ", "Lửa"],
      society: "Bộ lạc nhỏ, di cư theo mùa",
      color: "from-stone-600 to-stone-800",
      bgColor: "bg-stone-900/30",
      imageUrl: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg"
    },
    {
      name: "Nông nghiệp",
      period: "~10,000 năm trước - 1760",
      description: "Cách mạng nông nghiệp: trồng trọt, chăn nuôi, định cư",
      tools: ["Cày", "Cuốc", "Lưỡi hái"],
      society: "Làng xã, thành phố đầu tiên",
      color: "from-green-600 to-green-800",
      bgColor: "bg-green-900/30",
      imageUrl: "https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg"
    },
    {
      name: "Công nghiệp",
      period: "1760 - 1970",
      description: "Máy móc thay thế sức người, sản xuất hàng loạt",
      tools: ["Máy hơi nước", "Dây chuyền", "Điện"],
      society: "Đô thị hóa, giai cấp công nhân",
      color: "from-orange-600 to-orange-800",
      bgColor: "bg-orange-900/30",
      imageUrl: "https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg"
    },
    {
      name: "Thời đại 4.0",
      period: "1970 - nay",
      description: "Công nghệ thông tin, trí tuệ nhân tạo, tự động hóa",
      tools: ["Internet", "AI", "Robot"],
      society: "Toàn cầu hóa, kinh tế số",
      color: "from-blue-600 to-purple-800",
      bgColor: "bg-blue-900/30",
      imageUrl: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg"
    }
  ];

  // Auto-advance eras
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEra(prev => (prev + 1) % eras.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Show question after a delay
  useEffect(() => {
    const questionTimer = setTimeout(() => {
      setShowQuestion(true);
    }, 16000); // After all eras have been shown

    return () => clearTimeout(questionTimer);
  }, []);

  // Era transition animation
  const eraTransform = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Tooltip component for mind map nodes - compact card design
  const TooltipComponent = ({ data, position, isVisible }) => {
    return (
      <AnimatePresence>
        {isVisible && data && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute z-[60] w-96 bg-gradient-to-br from-amber-900/95 to-orange-900/90 backdrop-blur-sm border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden ${position}`}
            style={{ pointerEvents: 'none' }}
          >
            {/* Header Bar */}
            <div className="bg-gradient-to-r from-amber-600/30 to-orange-600/30 px-4 py-3 border-b border-amber-500/20">
              <div className="flex items-center">
                <motion.span 
                  className="text-2xl mr-3"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {data.icon}
                </motion.span>
                <h4 className="font-bold text-amber-100 text-lg tracking-wide">{data.title}</h4>
              </div>
            </div>

            {/* Content Grid */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Concept Section */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-amber-800/20 rounded-lg p-3 border border-amber-600/20"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">📚</span>
                    <h5 className="font-semibold text-amber-300 text-sm">Khái niệm</h5>
                  </div>
                  <p className="text-amber-100/90 text-xs leading-relaxed">{data.concept}</p>
                </motion.div>

                {/* Car Example Section */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-orange-800/20 rounded-lg p-3 border border-orange-600/20"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">🚗</span>
                    <h5 className="font-semibold text-orange-300 text-sm">Ví dụ thực tế</h5>
                  </div>
                  <p className="text-orange-100/90 text-xs leading-relaxed">{data.carExample}</p>
                </motion.div>
              </div>

              {/* Components Section */}
              {data.components && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-amber-800/15 to-orange-800/15 rounded-lg p-3 border border-amber-600/15"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-lg mr-2">🔧</span>
                    <h5 className="font-semibold text-amber-300 text-sm">Thành phần cấu thành</h5>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {data.components.map((component, index) => (
                      <motion.div
                        key={index}
                        className="bg-amber-700/25 text-amber-200 text-xs px-3 py-2 rounded-lg text-center font-medium border border-amber-500/20 hover:bg-amber-600/30 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -1 }}
                      >
                        {component}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Historical timeline visualization
  const TimelineVisualization = () => (
    <div className="relative w-full h-96 overflow-hidden rounded-3xl border border-amber-900/40">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${eras[currentEra].imageUrl})`,
          filter: 'brightness(0.4) contrast(1.2)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-stone-900/40" />

      {/* Era-specific elements */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        key={currentEra}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 1 }}
      >
        {/* Era title overlay */}
        <div className="text-center">
          <motion.h3 
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {eras[currentEra].name}
          </motion.h3>
          <motion.p 
            className="text-xl md:text-2xl text-amber-200 font-semibold drop-shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {eras[currentEra].period}
          </motion.p>
        </div>
      </motion.div>

      {/* Era indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex justify-between items-center">
          <div className={`px-4 py-2 rounded-full ${eras[currentEra].bgColor} backdrop-blur-sm border border-amber-500/30`}>
            <span className="text-amber-200 font-semibold text-sm">
              {eras[currentEra].description}
            </span>
          </div>
          <div className="flex space-x-1">
            {eras.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentEra === index ? 'bg-amber-400' : 'bg-amber-600/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div
        ref={containerRef}
        className="relative min-h-screen overflow-hidden bg-[#22170f] py-24"
        style={{ 
          backgroundImage: parchmentTexture, 
          backgroundSize: '230px 230px', 
          backgroundBlendMode: 'multiply' 
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e4c89d]/12 mix-blend-soft-light"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          {/* Opening Statement */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-amber-200 mb-8">
              Tại sao lịch sử loài người không ngừng thay đổi?
            </h2>
            <p className="text-xl md:text-2xl text-amber-100/85 max-w-5xl mx-auto leading-relaxed mb-12">
              Sau khi chúng ta đã nhìn lại các giai đoạn lịch sử, hãy cùng đặt câu hỏi: 
              Tại sao chúng ta đi từ thời săn bắt hái lượm, đến nông nghiệp, rồi công nghiệp và bây giờ là thời đại 4.0?
            </p>
          </motion.div>

          {/* Historical Evolution Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-20"
          >
            <TimelineVisualization />
          </motion.div>

          {/* Era Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {eras.map((era, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden rounded-2xl border border-amber-900/40 bg-[#2b1f16]/94 p-6 shadow-2xl transition-all duration-500 ${
                  currentEra === index ? 'ring-2 ring-amber-400/50 scale-105' : 'hover:scale-102'
                }`}
                whileHover={{ y: -5 }}
              >
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-amber-200 mb-2">
                    {era.name}
                  </h3>
                  <p className="text-amber-300/70 text-sm mb-3">
                    {era.period}
                  </p>
                </div>

                <p className="text-amber-100/85 text-sm mb-4 leading-relaxed">
                  {era.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-amber-300 font-semibold text-sm mb-2">Công cụ chính:</h4>
                    <div className="flex flex-wrap gap-1">
                      {era.tools.map((tool, toolIndex) => (
                        <span key={toolIndex} className="px-2 py-1 bg-amber-900/30 text-amber-200 text-xs rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-amber-300 font-semibold text-sm mb-2">Xã hội:</h4>
                    <p className="text-amber-100/80 text-xs">
                      {era.society}
                    </p>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-900/30">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                    initial={{ width: "0%" }}
                    animate={{ width: currentEra === index ? "100%" : "0%" }}
                    transition={{ duration: 4 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* The Big Question */}
          <AnimatePresence>
            {showQuestion && (
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm border border-amber-500/40 rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-8"
                  >
                    <div className="text-8xl mb-6">🤔</div>
                  </motion.div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-amber-200 mb-8">
                    Câu trả lời nằm ở đâu?
                  </h3>
                  
                  <p className="text-xl md:text-2xl text-amber-100/90 leading-relaxed mb-8">
                    Thông qua một khía cạnh của học thuyết hình thái kinh tế xã hội: 
                    <span className="font-bold text-amber-300"> Biện chứng giữa Lực lượng sản xuất và Quan hệ sản xuất</span>, 
                    chúng ta sẽ có một lăng kính khác cho vấn đề này.
                  </p>

                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg rounded-full shadow-lg">
                      Khám phá câu trả lời
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transition hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showQuestion ? 1 : 0 }}
            transition={{ delay: 2 }}
            className="text-center mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-amber-400/70"
            >
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
            <p className="text-amber-300/60 text-sm mt-2">Cuộn xuống để tìm hiểu</p>
          </motion.div>
        </div>
      </div>

      {/* NEW SECTION: LLSX Dynamic Diagram and Car Analysis */}
      <div
        className="relative min-h-screen overflow-hidden bg-[#22170f] py-24"
        style={{ 
          backgroundImage: parchmentTexture, 
          backgroundSize: '230px 230px', 
          backgroundBlendMode: 'multiply' 
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e4c89d]/12 mix-blend-soft-light"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          {/* Introduction Text */}
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center text-4xl font-semibold tracking-wide text-amber-200 md:text-6xl"
          >
            Đầu tiên thì mình sẽ tìm hiểu thế nào là <span className="text-amber-400">LLSX</span>
          </motion.h2>

          {/* Dynamic Diagram for LLSX */}
          {/* Car and Road Metaphor Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-20"
          >
            {/* Introduction Text */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <p className="text-xl md:text-2xl text-amber-100/90 max-w-4xl mx-auto leading-relaxed">
                Để dễ hình dung hơn về khía cạnh này thì mình sẽ trình bày thông qua 1 hình ảnh đó chính là:
                <span className="font-bold text-amber-300"> chiếc xe với con đường và luật lệ</span>.
              </p>
            </motion.div>

            {/* Car Image with Interactive Analysis Points */}
            <div className="relative w-full max-w-4xl mx-auto">
              <img
                src="/image.png"
                alt="Hình ảnh minh họa: Chiếc xe, Con đường và Luật lệ"
                className="w-full h-auto rounded-3xl shadow-2xl border border-amber-900/40"
              />

              {/* Interactive Analysis Points */}
              {/* Người lao động - Driver */}
              <motion.div
                className="absolute top-[20%] left-[15%] group cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, zIndex: 20 }}
              >
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/80 ring-4 ring-blue-400/50 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">NLĐ</span>
                </div>
                {/* Tooltip */}
                <motion.div
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-64 p-4 rounded-xl border border-blue-500/50 bg-blue-900/80 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h4 className="font-bold text-blue-200 mb-2">Người lao động (Tài xế)</h4>
                  <p className="text-blue-100 text-sm">
                    Là người điều khiển chiếc xe, có kỹ năng, kinh nghiệm và sức khỏe.
                    Tương tự như người công nhân, kỹ sư trong sản xuất.
                  </p>
                </motion.div>
              </motion.div>

              {/* Tư liệu lao động - Car Itself */}
              <motion.div
                className="absolute top-[45%] right-[10%] group cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, zIndex: 20 }}
              >
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-amber-600/80 ring-4 ring-amber-400/50 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 10-4 0v1a1 1 0 001 1h3a1 1 0 001-1V4zM16 8a2 2 0 10-4 0v1a1 1 0 001 1h3a1 1 0 001-1V8zM8 16a2 2 0 10-4 0v1a1 1 0 001 1h3a1 1 0 001-1v-1zM16 16a2 2 0 10-4 0v1a1 1 0 001 1h3a1 1 0 001-1v-1z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">TLLĐ</span>
                </div>
                {/* Tooltip */}
                <motion.div
                  className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-64 p-4 rounded-xl border border-amber-500/50 bg-amber-900/80 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h4 className="font-bold text-amber-200 mb-2">Tư liệu lao động (Chiếc xe)</h4>
                  <p className="text-amber-100 text-sm">
                    Bản thân chiếc xe, động cơ, bánh xe, hệ thống phanh... là công cụ để vận chuyển.
                    Tương tự như máy móc, công cụ, nhà xưởng trong sản xuất.
                  </p>
                </motion.div>
              </motion.div>

              {/* Đối tượng lao động - Cargo/Passengers */}
              <motion.div
                className="absolute bottom-[15%] left-[25%] group cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, zIndex: 20 }}
              >
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/80 ring-4 ring-purple-400/50 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">ĐTLĐ</span>
                </div>
                {/* Tooltip */}
                <motion.div
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-64 p-4 rounded-xl border border-purple-500/50 bg-purple-900/80 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h4 className="font-bold text-purple-200 mb-2">Đối tượng lao động (Hàng hóa/Hành khách)</h4>
                  <p className="text-purple-100 text-sm">
                    Là những gì chiếc xe tác động vào để tạo ra giá trị: vận chuyển hàng hóa, chở hành khách.
                    Tương tự như nguyên vật liệu, thông tin được xử lý trong sản xuất.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* LLSX Concept Explanation Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            {/* LLSX Definition */}


            {/* Mind Map Style Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, type: "spring" }}
              className="mb-12 relative overflow-hidden rounded-3xl border border-amber-900/40 bg-gradient-to-br from-stone-900/60 to-amber-900/30 p-8 shadow-2xl"
            >
              {/* Mind Map SVG */}
              <div className="relative min-h-[600px] flex items-center justify-center">
                <svg 
                  viewBox="0 0 1200 600" 
                  className="w-full h-full max-w-6xl"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
                >
                  {/* Connecting Lines */}
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#D97706', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#F59E0B', stopOpacity: 0.6 }} />
                    </linearGradient>
                  </defs>
                  
                  {/* Main branches */}
                  <motion.path
                    d="M 700 400 Q 500 200 290 200"
                    stroke="url(#lineGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="0"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  
                  <motion.path
                    d="M 700 400 Q 800 200 910 200"
                    stroke="url(#lineGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="0"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.7 }}
                  />
                  
                  <motion.path
                    d="M 1045 220 Q 1080 200 1160 268"
                    stroke="url(#lineGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="0"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  />
                  
                  <motion.path
                    d="M 1045 220 Q 1080 200 1160 120"
                    stroke="url(#lineGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="0"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                  />
                </svg>

                {/* Central Node - LLSX */}
                <motion.div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${activeTooltip === 'llsx' ? 'z-50' : 'z-10'}`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  onMouseEnter={() => setActiveTooltip('llsx')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-4 border-amber-200/50 shadow-2xl flex flex-col items-center justify-center text-center cursor-pointer">
                    <div className="text-3xl mb-2">⚙️</div>
                    <div className="font-bold text-white text-lg">LLSX</div>
                    <div className="text-xs text-amber-100 font-medium">Lực lượng sản xuất</div>
                  </div>
                  
                  {/* Tooltip for LLSX */}
                  <TooltipComponent 
                    data={tooltipData.llsx}
                    position="bottom-full left-1/2 transform -translate-x-1/2 mb-4"
                    isVisible={activeTooltip === 'llsx'}
                  />
                </motion.div>

                {/* Branch 1: Người lao động */}
                <motion.div
                  className={`absolute top-[25%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 ${activeTooltip === 'nld' ? 'z-50' : 'z-10'}`}
                  initial={{ scale: 0, x: -100, opacity: 0 }}
                  whileInView={{ scale: 1, x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  onMouseEnter={() => setActiveTooltip('nld')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-amber-600/80 to-orange-600/70 border-3 border-amber-300/40 shadow-xl flex flex-col items-center justify-center text-center p-3 cursor-pointer">
                    <div className="text-2xl mb-2">👨‍💼</div>
                    <div className="font-bold text-amber-100 text-sm">Người lao động</div>
                    <div className="text-xs text-amber-200 font-medium">(NLĐ)</div>
                  </div>
                  
                  {/* Tooltip for NLĐ */}
                  <TooltipComponent 
                    data={tooltipData.nld}
                    position="top-full left-0 mt-4"
                    isVisible={activeTooltip === 'nld'}
                  />
                </motion.div>

                {/* Sub-branches for NLĐ */}
                <motion.div
                  className="absolute top-[15%] left-[8%]"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                >
         
                </motion.div>

                <motion.div
                  className="absolute top-[35%] left-[5%]"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  whileHover={{ scale: 1.05 }}
                >
           
                </motion.div>

                {/* Branch 2: Tư liệu sản xuất */}
                <motion.div
                  className={`absolute top-[25%] right-[20%] transform translate-x-1/2 -translate-y-1/2 ${activeTooltip === 'tlsx' ? 'z-50' : 'z-10'}`}
                  initial={{ scale: 0, x: 100, opacity: 0 }}
                  whileInView={{ scale: 1, x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  onMouseEnter={() => setActiveTooltip('tlsx')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-orange-600/80 to-amber-700/70 border-3 border-orange-300/40 shadow-xl flex flex-col items-center justify-center text-center p-3 cursor-pointer">
                    <div className="text-2xl mb-2">🏭</div>
                    <div className="font-bold text-orange-100 text-sm">Tư liệu sản xuất</div>
                  </div>
                  
                  {/* Tooltip for Tư liệu sản xuất */}
                  <TooltipComponent 
                    data={tooltipData.tlsx}
                    position="top-full right-0 mt-4"
                    isVisible={activeTooltip === 'tlsx'}
                  />
                </motion.div>

                {/* Sub-branch: Tư liệu lao động */}
                <motion.div
                  className={`absolute top-[8%] right-[9%] ${activeTooltip === 'tlld' ? 'z-50' : 'z-10'}`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  onMouseEnter={() => setActiveTooltip('tlld')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <div className="w-28 h-20 rounded-lg bg-gradient-to-br from-orange-500/60 to-orange-600/50 border border-orange-400/30 shadow-lg flex flex-col items-center justify-center text-center p-2 cursor-pointer">
                    <div className="text-lg">🚗</div>
                    <div className="text-xs text-orange-100 font-semibold leading-tight">Tư liệu lao động</div>
                  </div>
                  
                  {/* Tooltip for Tư liệu lao động */}
                  <TooltipComponent 
                    data={tooltipData.tlld}
                    position="top-full right-0 mt-2"
                    isVisible={activeTooltip === 'tlld'}
                  />
                </motion.div>

                {/* Sub-branch: Đối tượng lao động */}
                <motion.div
                  className={`absolute top-[45%] right-[8%] ${activeTooltip === 'dtld' ? 'z-50' : 'z-10'}`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  whileHover={{ scale: 1.05, rotate: -3 }}
                  onMouseEnter={() => setActiveTooltip('dtld')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <div className="w-28 h-20 rounded-lg bg-gradient-to-br from-amber-600/60 to-orange-700/50 border border-amber-500/30 shadow-lg flex flex-col items-center justify-center text-center p-2 cursor-pointer">
                    <div className="text-lg">📦</div>
                    <div className="text-xs text-amber-100 font-semibold leading-tight">Đối tượng lao động</div>
                  </div>
                  
                  {/* Tooltip for Đối tượng lao động */}
                  <TooltipComponent 
                    data={tooltipData.dtld}
                    position="top-full right-0 mt-2"
                    isVisible={activeTooltip === 'dtld'}
                  />
                </motion.div>

                {/* Detailed components floating around */}
                <motion.div
                  className="absolute top-[5%] right-[3%]"
                  initial={{ scale: 0, rotate: 45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 2.2 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
      
                </motion.div>

                <motion.div
                  className="absolute top-[12%] right-[1%]"
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 2.4 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
          
                </motion.div>

                <motion.div
                  className="absolute top-[52%] right-[2%]"
                  initial={{ scale: 0, rotate: 30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 2.6 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
       
                </motion.div>

                <motion.div
                  className="absolute top-[58%] right-[8%]"
                  initial={{ scale: 0, rotate: -30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
       
                </motion.div>
              </div>

       
            </motion.div>

     
          </motion.div>


   
        </div>
      </div>

      {/* QHSX SECTION: Traffic Control Center */}
      <div
        className="relative min-h-screen overflow-visible bg-[#1a1410] py-24"
        style={{ 
          backgroundImage: `linear-gradient(45deg, #1a1410 0%, #22170f 50%, #2d1f16 100%)`,
          backgroundSize: 'cover'
        }}
      >
        {/* Road Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
          <div className="absolute top-2/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-amber-200 mb-8">
              Quan hệ sản xuất (QHSX)
            </h2>
            <p className="text-xl md:text-2xl text-amber-100/85 max-w-5xl mx-auto leading-relaxed mb-12">
              Sau khi hiểu về <span className="text-amber-300 font-bold">LLSX</span>, chúng ta cần tìm hiểu:
              <span className="text-orange-300 font-bold"> Ai điều khiển "hệ thống giao thông"?</span>
            </p>
          </motion.div>

          {/* Scenario Selector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-16"
          >
            <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-2 flex gap-2">
              {Object.entries(qhsxScenarios).map(([key, scenario]) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveScenario(key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                    activeScenario === key
                      ? `bg-gradient-to-r ${scenario.color} text-white shadow-lg scale-105`
                      : 'text-amber-200 hover:bg-amber-800/20'
                  }`}
                  whileHover={{ scale: activeScenario === key ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{scenario.icon}</span>
                  <span className="text-sm md:text-base">{scenario.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Traffic Control Center */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Central Vehicle */}
            <div className="flex justify-center items-center mb-20">
              <motion.div
                key={activeScenario}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`relative w-32 h-32 rounded-2xl bg-gradient-to-br ${qhsxScenarios[activeScenario].color} border-4 border-amber-200/50 shadow-2xl flex flex-col items-center justify-center`}
              >
                <div className="text-4xl mb-2">{qhsxScenarios[activeScenario].icon}</div>
                <div className="text-white font-bold text-sm text-center leading-tight">
                  {qhsxScenarios[activeScenario].name}
                </div>

                {/* Animated Connection Lines */}
                <motion.div
                  className="absolute -top-20 left-1/2 w-0.5 h-16 bg-gradient-to-t from-amber-400 to-transparent"
                  initial={{ height: 0 }}
                  animate={{ height: 64 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
                <motion.div
                  className="absolute -bottom-20 left-1/2 w-0.5 h-16 bg-gradient-to-b from-amber-400 to-transparent"
                  initial={{ height: 0 }}
                  animate={{ height: 64 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                />
                <motion.div
                  className="absolute -left-20 top-1/2 h-0.5 w-16 bg-gradient-to-l from-amber-400 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
                <motion.div
                  className="absolute -right-20 top-1/2 h-0.5 w-16 bg-gradient-to-r from-amber-400 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </motion.div>
            </div>

            {/* Control Centers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              
              {/* Ownership Control */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group"
                onMouseEnter={() => setActiveQHSX('ownership')}
                onMouseLeave={() => setActiveQHSX(null)}
              >
                <div className="bg-gradient-to-br from-amber-900/50 to-orange-800/40 backdrop-blur-sm border border-amber-500/30 rounded-3xl p-6 shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-amber-500/20 h-full flex flex-col">
                  
                  {/* Header */}
                  <div className="text-center mb-6">
                    <motion.div
                      className="text-5xl mb-4 inline-block"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🏆
                    </motion.div>
                    <h3 className="text-2xl font-bold text-amber-200 mb-2">Quan hệ sở hữu</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 flex-grow flex flex-col justify-between">
                    <div className="bg-amber-800/20 rounded-lg p-4 border border-amber-600/20">
                      <h4 className="font-semibold text-amber-300 text-sm mb-2 flex items-center">
                        <span className="mr-2">🔑</span>
                        Quyền sở hữu
                      </h4>
                      <p className="text-amber-100/90 text-xs leading-relaxed">
                        {qhsxScenarios[activeScenario].ownership}
                      </p>
                    </div>

                    {/* Ownership Indicator */}
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-amber-600/30"></div>
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-amber-400 border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl">{qhsxScenarios[activeScenario].icon}</span>
                        </div>
                      </div>
                      <p className="text-xs text-amber-300 mt-2 font-medium">Ownership Status</p>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <TooltipComponent 
                    data={qhsxTooltipData.ownership}
                    position="bottom-full left-1/2 transform -translate-x-1/2 mb-4"
                    isVisible={activeQHSX === 'ownership'}
                  />
                </div>
              </motion.div>

              {/* Management Control */}
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative group"
                onMouseEnter={() => setActiveQHSX('management')}
                onMouseLeave={() => setActiveQHSX(null)}
              >
                <div className="bg-gradient-to-br from-orange-900/50 to-red-800/40 backdrop-blur-sm border border-orange-500/30 rounded-3xl p-6 shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-orange-500/20 h-full flex flex-col">
                  
                  {/* Header */}
                  <div className="text-center mb-6">
                    <motion.div
                      className="text-5xl mb-4 inline-block"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      🎮
                    </motion.div>
                    <h3 className="text-2xl font-bold text-orange-200 mb-2">Quan hệ quản lý</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 flex-grow flex flex-col justify-between">
                    <div className="bg-orange-800/20 rounded-lg p-4 border border-orange-600/20">
                      <h4 className="font-semibold text-orange-300 text-sm mb-2 flex items-center">
                        <span className="mr-2">🚦</span>
                        Hệ thống điều khiển
                      </h4>
                      <p className="text-orange-100/90 text-xs leading-relaxed">
                        {qhsxScenarios[activeScenario].management}
                      </p>
                    </div>

                    {/* Traffic Light Simulator */}
                    <div className="text-center">
                      <div className="bg-gray-800 rounded-lg p-3 inline-block">
                        <div className="space-y-2">
                          <motion.div
                            className="w-6 h-6 rounded-full mx-auto"
                            animate={{ 
                              backgroundColor: ["#ef4444", "#ef4444", "#fbbf24", "#22c55e"],
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              times: [0, 0.3, 0.6, 1]
                            }}
                          />
                          <motion.div
                            className="w-6 h-6 rounded-full mx-auto"
                            animate={{ 
                              backgroundColor: ["#374151", "#fbbf24", "#fbbf24", "#374151"],
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              times: [0, 0.3, 0.6, 1]
                            }}
                          />
                          <motion.div
                            className="w-6 h-6 rounded-full mx-auto"
                            animate={{ 
                              backgroundColor: ["#374151", "#374151", "#22c55e", "#22c55e"],
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              times: [0, 0.3, 0.6, 1]
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-orange-300 mt-2 font-medium">Traffic Control</p>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <TooltipComponent 
                    data={qhsxTooltipData.management}
                    position="bottom-full left-1/2 transform -translate-x-1/2 mb-4"
                    isVisible={activeQHSX === 'management'}
                  />
                </div>
              </motion.div>

              {/* Distribution Control */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative group"
                onMouseEnter={() => setActiveQHSX('distribution')}
                onMouseLeave={() => setActiveQHSX(null)}
              >
                <div className="bg-gradient-to-br from-amber-900/50 to-orange-800/40 backdrop-blur-sm border border-amber-500/30 rounded-3xl p-6 shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-amber-500/20 h-full flex flex-col">
                  
                  {/* Header */}
                  <div className="text-center mb-6">
                    <motion.div
                      className="text-5xl mb-4 inline-block"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      ⚖️
                    </motion.div>
                    <h3 className="text-2xl font-bold text-amber-200 mb-2">Quan hệ phân phối</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 flex-grow flex flex-col justify-between">
                    <div className="bg-amber-800/20 rounded-lg p-4 border border-amber-600/20">
                      <h4 className="font-semibold text-amber-300 text-sm mb-2 flex items-center">
                        <span className="mr-2">💰</span>
                        Phân chia lợi ích
                      </h4>
                      <p className="text-amber-100/90 text-xs leading-relaxed">
                        {qhsxScenarios[activeScenario].distribution}
                      </p>
                    </div>

                    {/* Benefit Flow Animation */}
                    <div className="text-center">
                      <div className="relative">
                        <div className="flex justify-center space-x-4">
                          <motion.div
                            className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className="text-xs">💎</span>
                          </motion.div>
                          <motion.div
                            className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          >
                            <span className="text-xs">⭐</span>
                          </motion.div>
                          <motion.div
                            className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          >
                            <span className="text-xs">🎯</span>
                          </motion.div>
                        </div>
                        {/* Flow particles */}
                        <motion.div
                          className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      <p className="text-xs text-amber-300 mt-2 font-medium">Benefit Flow</p>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <TooltipComponent 
                    data={qhsxTooltipData.distribution}
                    position="bottom-full left-1/2 transform -translate-x-1/2 mb-4"
                    isVisible={activeQHSX === 'distribution'}
                  />
                </div>
              </motion.div>
            </div>

            {/* Interactive Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 max-w-4xl mx-auto"
            >
            
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* DIALECTICAL RELATIONSHIP SECTION: LLSX ↔ QHSX */}
      <div
        className="relative flex min-h-screen items-center justify-center overflow-visible bg-[#23170f] py-24"
        style={{ backgroundImage: parchmentTexture, backgroundSize: '230px 230px', backgroundBlendMode: 'multiply' }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e4c89d]/12 mix-blend-soft-light"></div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,_rgba(184,138,96,0.18),_transparent_70%)]"></div>

        <div className="relative z-10 container mx-auto px-6">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-amber-200 mb-8">
              Mối quan hệ biện chứng
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-2xl md:text-3xl font-bold text-amber-300">LLSX</span>
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-4xl text-orange-400"
              >
                ↔
              </motion.div>
              <span className="text-2xl md:text-3xl font-bold text-orange-300">QHSX</span>
            </div>
            <p className="text-xl md:text-2xl text-amber-100/85 max-w-4xl mx-auto leading-relaxed">
              Khám phá mối quan hệ tác động qua lại giữa 
              <span className="text-amber-300 font-bold"> Lực lượng sản xuất</span> và 
              <span className="text-orange-300 font-bold"> Quan hệ sản xuất</span>
            </p>
          </motion.div>

          {/* Interaction Mode Selector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {Object.entries(interactionModes).map(([key, mode]) => (
              <motion.button
                key={key}
                onClick={() => setInteractionMode(key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  interactionMode === key
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg scale-105'
                    : 'bg-stone-800/50 text-amber-200 hover:bg-stone-700/50 border border-amber-600/30'
                }`}
                whileHover={{ scale: interactionMode === key ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-sm md:text-base">{mode.title}</div>
                <div className="text-xs text-amber-200/80">{mode.subtitle}</div>
              </motion.button>
            ))}
          </motion.div>

          {/* Main Interaction Display */}
          <motion.div
            key={interactionMode}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            {/* Evolution Mode - Before/After Comparison */}
            {interactionMode === 'evolution' && (
              <div className="space-y-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-amber-200 mb-4">
                    LLSX phát triển → QHSX phải thay đổi
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Before - Old System */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-stone-800/40 backdrop-blur-sm border border-stone-600/50 rounded-2xl p-6"
                  >
                    <h4 className="text-xl font-bold text-stone-300 mb-6 text-center">TRƯỚC ĐÂY</h4>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={interactionModes.evolution.vehicle.old}
                          alt="Old vehicle"
                          className="w-full h-full object-cover rounded-lg"
                        />
                     
                      </div>
                      
           
                    </div>
                    
                    <div className="text-center mt-4">
                      <span className="text-stone-300 text-sm">Hệ thống cũ - Phù hợp với nhau</span>
                    </div>
                  </motion.div>

                  {/* After - New System Mismatch */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-orange-900/40 backdrop-blur-sm border border-orange-600/50 rounded-2xl p-6"
                  >
                    <h4 className="text-xl font-bold text-orange-300 mb-6 text-center">VẤN ĐỀ XUẤT HIỆN</h4>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={interactionModes.evolution.vehicle.new}
                          alt="New vehicle"
                          className="w-full h-full object-cover rounded-lg"
                        />
               
                      </div>
                      
                    </div>
                    
                    <div className="text-center mt-4">
                      <span className="text-orange-300 text-sm font-bold">⚠ Mâu thuẫn - Cần thay đổi!</span>
                    </div>
                  </motion.div>
                </div>

                {/* Arrow and Solution */}
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl text-amber-400 mb-4"
                  >
                    ⬇
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="bg-amber-900/40 backdrop-blur-sm border border-amber-600/50 rounded-2xl p-6 max-w-2xl mx-auto"
                  >
                    <h4 className="text-xl font-bold text-amber-300 mb-4">GIẢI PHÁP</h4>
                    <div className="relative">
                      <img 
                        src={interactionModes.evolution.road.new}
                        alt="New road"
                        className="w-full h-full object-cover rounded-lg"
                      />
                
                    </div>
                    <p className="text-amber-200 mt-4 text-sm">
                      LLSX mới đòi hỏi QHSX phải thay đổi để phù hợp
                    </p>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Harmony Mode - Foundation Support */}
            {interactionMode === 'harmony' && (
              <div className="space-y-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-amber-300 mb-4">
                    QHSX nâng đỡ LLSX bay cao
                  </h3>
                  <p className="text-lg text-amber-200/80">
                    {interactionModes.harmony.subtitle}
                  </p>
                </div>

                {/* Foundation & Elevated Structure */}
                <div className="relative max-w-4xl mx-auto">
                  
                  {/* Top Level - LLSX được nâng lên */}
                  <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative z-20 mb-8"
                  >
                    <div className="bg-gradient-to-br from-amber-800/60 to-orange-800/60 backdrop-blur-sm border-2 border-amber-500/50 rounded-3xl p-8 shadow-2xl">
                      <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="text-center"
                      >
                        <h4 className="text-2xl font-bold text-amber-200 mb-6">{interactionModes.harmony.technology.title}</h4>
                        
                        <div className="relative group">
                          <img 
                            src={interactionModes.harmony.technology.image}
                            alt="Advanced technology"
                            className="w-full h-64 object-cover rounded-2xl mx-auto shadow-lg"
                          />
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-amber-600/40 to-transparent rounded-2xl"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        
                        <p className="text-amber-100/90 mt-4 text-lg font-medium">
                          {interactionModes.harmony.technology.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Support Pillars */}
                  <div className="absolute left-4 right-4 top-40 bottom-20 z-10">
                    <div className="grid grid-cols-3 h-full gap-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                          className="bg-gradient-to-t from-stone-700 to-stone-600 rounded-t-lg opacity-60"
                          style={{ transformOrigin: 'bottom' }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Foundation Level - QHSX */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20"
                  >
                    <div className="bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-sm border-2 border-stone-600/50 rounded-3xl p-8">
                      <h4 className="text-2xl font-bold text-stone-200 mb-6 text-center">{interactionModes.harmony.foundation.title}</h4>
                      
                      <div className="relative">
                        <img 
                          src={interactionModes.harmony.foundation.image}
                          alt="Strong foundation"
                          className="w-full h-[400px] object-cover rounded-xl"
                        />

                      </div>
                      
                      <p className="text-stone-200/90 mt-4 text-center text-lg">
                        {interactionModes.harmony.foundation.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Success Result */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-center"
                >
          
                </motion.div>
              </div>
            )}

            {/* Conflict Mode - Surrounded & Blocked */}
            {interactionMode === 'conflict' && (
              <div className="space-y-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-orange-300 mb-4">
                    LLSX bị QHSX bao vây và kìm hãm
                  </h3>
                  <p className="text-lg text-orange-200/80">
                    {interactionModes.conflict.subtitle}
                  </p>
                </div>

                {/* Surrounded Layout */}
                <div className="relative max-w-5xl mx-auto">
                  
                  {/* Barrier Top */}
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className="bg-stone-800/70 border-2 border-stone-600/50 rounded-xl p-4 rotate-12 shadow-lg">
                      <span className="text-stone-200 font-bold text-sm">RÀO CẢN</span>
                    </div>
                  </motion.div>

                  {/* Left Barrier */}
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 w-1/3"
                  >
                    <div className="bg-stone-800/60 backdrop-blur-sm border border-stone-600/50 rounded-2xl p-6 -rotate-6">
                      <h5 className="text-lg font-bold text-stone-200 mb-3 text-center">
                        {interactionModes.conflict.barriers[0].title}
                      </h5>
                      <div className="relative">
                        <img 
                          src={interactionModes.conflict.barriers[0].image}
                          alt="Infrastructure barrier"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-red-900/40 rounded-lg flex items-center justify-center">
                          <span className="text-red-200 font-semibold text-sm">CẢN TRỞ</span>
                        </div>
                      </div>
                      <p className="text-stone-300/90 text-xs mt-3 text-center">
                        {interactionModes.conflict.barriers[0].description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Right Barrier */}
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 w-1/3"
                  >
                    <div className="bg-stone-800/60 backdrop-blur-sm border border-stone-600/50 rounded-2xl p-6 rotate-6">
                      <h5 className="text-lg font-bold text-stone-200 mb-3 text-center">
                        {interactionModes.conflict.barriers[1].title}
                      </h5>
                      <div className="relative">
                        <img 
                          src={interactionModes.conflict.barriers[1].image}
                          alt="Policy barrier"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-red-900/40 rounded-lg flex items-center justify-center">
                          <span className="text-red-200 font-semibold text-sm">CỨNG NHẮC</span>
                        </div>
                      </div>
                      <p className="text-stone-300/90 text-xs mt-3 text-center">
                        {interactionModes.conflict.barriers[1].description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Center - Trapped LLSX */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="relative z-40 mx-auto max-w-md pt-20 pb-20"
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, -2, 2, -2, 0],
                        scale: [1, 1.02, 1, 1.02, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                      className="bg-gradient-to-br from-amber-800/70 to-orange-800/70 backdrop-blur-sm border-2 border-amber-500/60 rounded-3xl p-8 shadow-2xl"
                    >
                      <h4 className="text-2xl font-bold text-amber-200 mb-6 text-center">
                        {interactionModes.conflict.center.title}
                      </h4>
                      
                      <div className="relative">
                        <img 
                          src={interactionModes.conflict.center.image}
                          alt="Trapped technology"
                          className="w-full h-48 object-cover rounded-2xl"
                        />
                        
                        {/* Constraint Chains Effect */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl border-2 border-red-500/50"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        {/* Cage bars effect */}
                        <div className="absolute inset-0 flex justify-between items-stretch rounded-2xl overflow-hidden">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                              className="w-1 bg-red-600/60"
                              style={{ transformOrigin: 'bottom' }}
                            />
                          ))}
                        </div>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                          <motion.span 
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-amber-100 font-bold text-lg bg-red-900/70 px-4 py-2 rounded-lg shadow-lg"
                          >
                            BỊ KÌM HÃM!
                          </motion.span>
                        </div>
                      </div>
                      
                      <p className="text-amber-100/90 mt-4 text-center font-medium">
                        {interactionModes.conflict.center.description}
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Bottom Barrier */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className="bg-stone-800/70 border-2 border-stone-600/50 rounded-xl p-4 -rotate-12 shadow-lg">
                      <span className="text-stone-200 font-bold text-sm">CHƯỚNG NGẠI VẬT</span>
                    </div>
                  </motion.div>
                </div>

                {/* Failure Result */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-r from-stone-800/50 to-red-900/50 backdrop-blur-sm border border-red-500/50 rounded-2xl p-8 max-w-lg mx-auto">
                    <motion.div
                      animate={{ 
                        rotate: [0, -15, 15, -15, 0],
                        scale: [1, 1.1, 1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      ⛓️
                    </motion.div>
                    <h4 className="text-2xl font-bold text-red-300 mb-2">THẤT BẠI!</h4>
                    <p className="text-xl text-red-200 font-semibold">
                      {interactionModes.conflict.result}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* DIALECTICAL LAW SECTION: The Eternal Cycle */}
          <div className="mt-32 space-y-20">
            
            {/* Law Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
         
              <p className="text-xl text-amber-100/90 max-w-4xl mx-auto leading-relaxed">
                <span className="text-amber-300 font-semibold">QHSX phù hợp với trình độ phát triển của LLSX</span> - 
                Đây là quy luật bất biến trong sự phát triển của xã hội loài người
              </p>
            </motion.div>

            {/* Circular Flow Diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative max-w-6xl mx-auto"
            >
              <div className="relative w-full h-[600px] flex items-center justify-center">
                
             

                {/* Cycle Steps */}
                {[
                  {
                    step: 1,
                    title: "PHÙ HỢP",
                    subtitle: "Xe & Đường hài hòa",
                    image: image2,
                    color: "green",
                    position: { top: "0%", left: "50%", transform: "translate(-50%, -50%)" },
                    delay: 0.6
                  },
                  {
                    step: 2, 
                    title: "XE PHÁT TRIỂN",
                    subtitle: "LLSX tiến bộ",
                    image: image3,
                    color: "blue",
                    position: { bottom: "30%", right: "10%" },
                    delay: 0.8
                  },
                  {
                    step: 3,
                    title: "MÂU THUẪN",
                    subtitle: "Xe mới, đường cũ",
                    image: image1,
                    color: "orange",
                    position: { bottom: "0", right: "38%" },
                    delay: 1.0
                  },
            
                  {
                    step: 4,
                    title: "PHÙ HỢP MỚI",
                    subtitle: "Hệ thống tiến bộ",
                    image: image4,
                    color: "amber",
                    position: { bottom: "30%", left: "15%" },
                    delay: 1.4
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: item.delay }}
                    className="absolute z-20"
                    style={item.position}
                  >
                    <div className={`bg-gradient-to-br from-${item.color}-900/60 to-${item.color}-800/60 backdrop-blur-sm border-2 border-${item.color}-500/50 rounded-2xl p-4 w-32 shadow-xl`}>
                      <div className="text-center">
                        <div className={`w-8 h-8 bg-${item.color}-500 rounded-full flex items-center justify-center mx-auto mb-2`}>
                          <span className="text-white font-bold text-sm">{item.step}</span>
                        </div>
                        <h5 className={`font-bold text-${item.color}-200 text-xs mb-1`}>{item.title}</h5>
                        <img 
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-12 object-cover rounded mx-auto mb-2"
                        />
                        <p className={`text-${item.color}-200/80 text-xs`}>{item.subtitle}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Connecting Arrows */}
                <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 600 600">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                     refX="0" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                    </marker>
                  </defs>
                  
                  {/* Circular path with arrows */}
                  <motion.path
                    d="M 430 100 Q 700 100 700 235 Q 700 580 400 520 Q 120 480 20 320 Q 100 10 270 80"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="10,5"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 1.8 }}
                  />
                </svg>
              </div>
            </motion.div>

  


          </div>

      
        </div>
      </div>

    </div>
  );
};


export default ProductiveRelations;