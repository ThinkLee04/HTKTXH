import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Script khởi tạo dữ liệu mẫu cho Firestore
 * Chạy một lần để tạo collection questions với dữ liệu mẫu
 */

const sampleQuestions = [
  {
    id: 1,
    question: "Theo Marx, giai cấp nào là lực lượng cách mạng chủ yếu trong xã hội tư bản?",
    options: ["Giai cấp nông dân", "Giai cấp công nhân", "Giai cấp trí thức", "Tiểu tư sản"],
    correctAnswer: "Giai cấp công nhân",
    explanation: "Marx cho rằng giai cấp công nhân là lực lượng cách mạng chủ yếu vì họ không có tư liệu sản xuất và bị bóc lột bởi giai cấp tư bản.",
    category: "Giai cấp và đấu tranh giai cấp"
  },
  {
    id: 2,
    question: "Giá trị thặng dư là gì trong lý thuyết kinh tế Marx?",
    options: [
      "Lợi nhuận của nhà tư bản", 
      "Giá trị do công nhân tạo ra nhưng không được trả công", 
      "Thuế mà nhà nước thu", 
      "Chi phí sản xuất"
    ],
    correctAnswer: "Giá trị do công nhân tạo ra nhưng không được trả công",
    explanation: "Giá trị thặng dư là phần giá trị do công nhân tạo ra vượt quá giá trị sức lao động của họ, được nhà tư bản chiếm đoạt.",
    category: "Kinh tế chính trị Marx"
  },
  {
    id: 3,
    question: "Theo Lenin, chủ nghĩa đế quốc là giai đoạn nào của chủ nghĩa tư bản?",
    options: [
      "Giai đoạn đầu", 
      "Giai đoạn phát triển", 
      "Giai đoạn cao nhất và cuối cùng", 
      "Giai đoạn chuyển đổi"
    ],
    correctAnswer: "Giai đoạn cao nhất và cuối cùng",
    explanation: "Lenin định nghĩa chủ nghĩa đế quốc là giai đoạn cao nhất và cuối cùng của chủ nghĩa tư bản, với sự thống trị của tư bản tài chính.",
    category: "Lý thuyết Lenin"
  },
  {
    id: 4,
    question: "Cơ sở hạ tầng kinh tế bao gồm những yếu tố nào?",
    options: [
      "Lực lượng sản xuất và quan hệ sản xuất", 
      "Chính trị và pháp luật", 
      "Tôn giáo và đạo đức", 
      "Văn hóa và giáo dục"
    ],
    correctAnswer: "Lực lượng sản xuất và quan hệ sản xuất",
    explanation: "Cơ sở hạ tầng kinh tế gồm lực lượng sản xuất (con người và tư liệu sản xuất) và quan hệ sản xuất (quan hệ giữa các giai cấp trong sản xuất).",
    category: "Cơ sở và kiến trúc thượng tầng"
  },
  {
    id: 5,
    question: "Sự phát triển của lực lượng sản xuất và quan hệ sản xuất theo quy luật gì?",
    options: [
      "Quy luật cung cầu", 
      "Quy luật tương ứng giữa quan hệ sản xuất và tính chất của lực lượng sản xuất", 
      "Quy luật giá trị", 
      "Quy luật phân phối"
    ],
    correctAnswer: "Quy luật tương ứng giữa quan hệ sản xuất và tính chất của lực lượng sản xuất",
    explanation: "Đây là quy luật khách quan chi phối sự vận động và phát triển của phương thức sản xuất.",
    category: "Quy luật kinh tế"
  },
  {
    id: 6,
    question: "Theo Marx, cách mạng xã hội xảy ra khi nào?",
    options: [
      "Khi nhân dân đói khổ", 
      "Khi quan hệ sản xuất cũ trở thành xiềng xích cản trở sự phát triển của lực lượng sản xuất", 
      "Khi có lãnh tụ cách mạng", 
      "Khi nước ngoài can thiệp"
    ],
    correctAnswer: "Khi quan hệ sản xuất cũ trở thành xiềng xích cản trở sự phát triển của lực lượng sản xuất",
    explanation: "Cách mạng xã hội là kết quả tất yếu của mâu thuẫn không thể dung hòa giữa lực lượng sản xuất và quan hệ sản xuất.",
    category: "Cách mạng xã hội"
  },
  {
    id: 7,
    question: "Hình thái kinh tế - xã hội nào NOT được Marx xác định trong lịch sử loài người?",
    options: [
      "Cộng sản nguyên thủy", 
      "Chế độ phong kiến", 
      "Chế độ thực dân", 
      "Chủ nghĩa tư bản"
    ],
    correctAnswer: "Chế độ thực dân",
    explanation: "Marx xác định 5 hình thái: cộng sản nguyên thủy, chế độ nô lệ, chế độ phong kiến, chủ nghĩa tư bản và chủ nghĩa cộng sản. Chế độ thực dân không phải là hình thái riêng biệt.",
    category: "Hình thái kinh tế - xã hội"
  },
  {
    id: 8,
    question: "Đặc điểm cơ bản của chế độ sản xuất nô lệ là gì?",
    options: [
      "Nô lệ là tài sản của chủ nô", 
      "Nô lệ được trả lương", 
      "Nô lệ có quyền sở hữu tư liệu sản xuất", 
      "Nô lệ tự do lao động"
    ],
    correctAnswer: "Nô lệ là tài sản của chủ nô",
    explanation: "Trong chế độ nô lệ, nô lệ bị coi như tài sản của chủ nô, không có quyền tự do cá nhân và bị bóc lột hoàn toàn sức lao động.",
    category: "Hình thái kinh tế - xã hội"
  },
  {
    id: 9,
    question: "Kiến trúc thượng tầng xã hội bao gồm những gì?",
    options: [
      "Chỉ có chính trị và pháp luật", 
      "Các quan hệ chính trị, pháp luật, tôn giáo, đạo đức, nghệ thuật, triết học", 
      "Chỉ có tôn giáo và đạo đức", 
      "Chỉ có kinh tế và chính trị"
    ],
    correctAnswer: "Các quan hệ chính trị, pháp luật, tôn giáo, đạo đức, nghệ thuật, triết học",
    explanation: "Kiến trúc thượng tầng bao gồm tất cả các quan hệ xã hội, tư tưởng và thể chế không thuộc về cơ sở kinh tế.",
    category: "Cơ sở và kiến trúc thượng tầng"
  },
  {
    id: 10,
    question: "Nhà nước trong quan niệm Marx-Lenin có bản chất gì?",
    options: [
      "Là tổ chức của toàn xã hội", 
      "Là máy móc bạo lực của giai cấp thống trị", 
      "Là tổ chức từ thiện", 
      "Là tổ chức kinh tế"
    ],
    correctAnswer: "Là máy móc bạo lực của giai cấp thống trị",
    explanation: "Marx và Lenin khẳng định nhà nước có bản chất giai cấp, là công cụ để giai cấp thống trị duy trì quyền lực và đàn áp giai cấp bị trị.",
    category: "Nhà nước và pháp quyền"
  }
];

/**
 * Khởi tạo dữ liệu questions vào Firestore
 */
export const initializeQuestionsData = async () => {
  try {
    console.log('🔄 Đang khởi tạo dữ liệu câu hỏi...');
    
    // Tạo document questions trong collection quiz-data
    await setDoc(doc(db, 'quiz-data', 'questions'), {
      questions: sampleQuestions,
      totalQuestions: sampleQuestions.length,
      lastUpdated: new Date(),
      version: '1.0'
    });

    console.log('✅ Khởi tạo dữ liệu thành công!');
    console.log(`📚 Đã tạo ${sampleQuestions.length} câu hỏi mẫu`);
    
    return { success: true, message: 'Dữ liệu đã được khởi tạo thành công!' };
    
  } catch (error) {
    console.error('❌ Lỗi khởi tạo dữ liệu:', error);
    return { success: false, error: error.message };
  }
};

// Export questions để sử dụng ở nơi khác nếu cần
export { sampleQuestions };