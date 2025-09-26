import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { TimelineItem } from "./TimelineItem";

// Dữ liệu không thay đổi
const timelineData = [
    {
      title: "Cộng sản nguyên thủy",
      period: "Trước Công nguyên",
      desc: "Xã hội không có giai cấp, mọi người cùng lao động và hưởng thành quả.",
      imageUrl: "https://lichsu.org/wp-content/uploads/2023/11/van-hoa-nguyen-thuy-o-viet-nam.jpg"
    },
    {
      title: "Chiếm hữu nô lệ",
      period: "Từ thiên niên kỷ 4 TCN - Thế kỷ 5 SCN",
      desc: "Giai cấp chủ nô nắm quyền sở hữu tư liệu sản xuất và cả người nô lệ.",
      imageUrl: "https://cdn.accgroup.vn/wp-content/uploads/2022/09/chiem-huu-no-le-la-gi.jpg"
    },
    {
      title: "Phong kiến",
      period: "Thế kỷ 5 - Thế kỷ 15",
      desc: "Giai cấp địa chủ bóc lột nông dân thông qua địa tô và các hình thức tô thuế, lao dịch.",
      imageUrl: "https://truongtotnhat.vn/wp-content/uploads/2025/09/vua-bao-dai-doc-chieu-thoai-vi-cham-dut-che-do-phong-kien-viet-nam.jpg"
    },
    {
      title: "Tư bản chủ nghĩa",
      period: "Thế kỷ 16 - hiện tại",
      desc: "Giai cấp tư sản bóc lột giá trị thặng dư từ lao động của giai cấp công nhân.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Lord_Clive_meeting_with_Mir_Jafar_after_the_Battle_of_Plassey.jpg/1280px-Lord_Clive_meeting_with_Mir_Jafar_after_the_Battle_of_Plassey.jpg"
    },
    {
      title: "Xã hội chủ nghĩa",
      period: "Thế kỷ 20 - hiện tại",
      desc: "Giai cấp công nhân và nhân dân lao động làm chủ, xóa bỏ chế độ tư hữu về tư liệu sản xuất.",
      imageUrl: "https://phaptri.vn/upload_images/images/2023/09/23/mac-lenin-05.png"
    }
];

// Mốc tròn được tinh chỉnh lại cho phù hợp hơn
const TimelineMarker = () => (
  <motion.div
    className="absolute top-1/3 -translate-x-1/2 -translate-y-1/2 z-30"
    style={{ left: "calc(2rem + 0.8rem)" }}
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
  >
    <div className="w-12 h-12 rounded-full bg-[#2a2722] flex items-center justify-center ring-8 ring-black/30">
      <div className="w-5 h-5 rounded-full bg-amber-700 border-2 border-amber-500"></div>
    </div>
  </motion.div>
);

const getMaskClass = (index, total) => {
  if (index === 0) {
    return "[mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]";
  }
  if (index === total - 1) {
    return "[mask-image:linear-gradient(to_bottom,transparent_0%,black_15%)]";
  }
  return "[mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]";
};

const Timeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    // Nền chính màu nâu sẫm
    <div ref={ref} className="relative bg-[#2a2722]">
      <div className="absolute inset-0 z-0">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`relative h-screen w-full sticky top-0 bg-cover bg-center ${getMaskClass(index, timelineData.length)}`}
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            {/* Lớp phủ màu nâu ấm tạo hiệu ứng sepia */}
            <div className="absolute inset-0 bg-[#2a2722]/70"></div>
          </div>
        ))}
      </div>

      {/* Trục timeline với màu sắc cổ điển hơn */}
      <div className="absolute top-0 left-16 w-3 h-full z-10">
        <div className="w-full h-full bg-black/30"></div>
        {/* Thanh tiến trình màu đồng cũ */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-700 to-amber-900 origin-top"
          style={{ scaleY }}
        />
      </div>

      <div className="relative z-30">
        {timelineData.map((item, index) => (
          <section key={index} className="relative h-screen flex">
            <TimelineMarker />
            {/* Truyền `item` vào như cũ */}
            <TimelineItem item={item} />
          </section>
        ))}
      </div>
    </div>
  );
};

export default Timeline;