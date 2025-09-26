import { motion } from "framer-motion";

export const TimelineItem = ({ item }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="w-full pl-32 pr-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={itemVariants}
    >
      <div 
        className="absolute top-1/4 w-[35vw] rounded-md border border-amber-800/60 bg-[#3a352f]/75 p-8 shadow-2xl shadow-black/50 backdrop-blur-sm"
      >
        {/* [CẢI TIẾN] Dùng font Source Serif Pro cho tiêu đề, rõ ràng và trang trọng */}
        <h3 className="text-3xl font-bold mb-2 text-amber-300">
          {item.title}
        </h3>
        <p className="text-lg font-light italic text-amber-200/70 mb-4">
          {item.period}
        </p>
        {/* [CẢI TIẾN] Tăng kích thước chữ và khoảng cách dòng để dễ đọc hơn từ xa */}
        <p className="text-lg text-stone-200 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
};

export default TimelineItem;