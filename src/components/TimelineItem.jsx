// src/components/TimelineItem.jsx
import { motion } from "framer-motion";

// Bỏ các prop animation, chỉ nhận `variants`
export const TimelineItem = ({ item, variants }) => {
  return (
    // Thay `initial`, `whileInView` bằng `variants`
    <motion.div className="w-full pl-32 pr-8" variants={variants}>
      <div 
        className="absolute top-1/4 w-[35vw] rounded-xl border border-amber-400/20 bg-stone-900/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-md"
      >
        <h3 className="text-2xl font-bold mb-2 text-amber-400">
          {item.title}
        </h3>
        <p className="text-md font-light italic text-amber-100/70 mb-4">
          {item.period}
        </p>
        <p className="text-stone-200 leading-relaxed">
          {item.desc}
        </p>
        <div
          className="absolute top-2/3 -translate-y-1/2 w-4 h-4 transform rotate-45 left-[-8.5px] border-b border-r border-amber-400/20 bg-stone-900/70"
        ></div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;