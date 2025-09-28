import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Script khởi tạo dữ liệu mẫu cho Firestore
 * Chạy một lần để tạo collection questions với dữ liệu mẫu
 */

const sampleQuestions = [
  {
    id: 1,
    question: "Hoạt động nào được coi là cơ sở của sự tồn tại và phát triển của xã hội?",
    options: ["Sản xuất tinh thần", "Sản xuất ra bản thân con người", "Sản xuất vật chất", "Sản xuất tư liệu lao động"],
    correctAnswer: "Sản xuất vật chất",
    explanation: "Trong các loại hình sản xuất, sản xuất vật chất là cơ sở của sự tồn tại và phát triển của xã hội. Sản xuất vật chất là quá trình con người sử dụng công cụ lao động tác động vào tự nhiên để tạo ra của cải vật chất nhằm thỏa mãn nhu cầu tồn tại và phát triển của con người.",
    category: "Cơ sở sản xuất xã hội"
  },
  {
    id: 2,
    question: "Theo quan điểm của Triết học Mác-Lênin, Lực lượng sản xuất (LLSX) biểu thị mối quan hệ nào trong quá trình sản xuất?",
    options: [
      "Mối quan hệ giữa con người với con người trong quá trình sản xuất vật chất", 
      "Mối quan hệ giữa các giai cấp trong xã hội", 
      "Mối quan hệ giữa Cơ sở hạ tầng và Kiến trúc thượng tầng", 
      "Mối quan hệ giữa con người với tự nhiên trong quá trình sản xuất"
    ],
    correctAnswer: "Mối quan hệ giữa con người với tự nhiên trong quá trình sản xuất",
    explanation: "Lực lượng sản xuất biểu thị mối quan hệ giữa con người với tự nhiên trong quá trình sản xuất, biểu hiện năng lực chinh phục tự nhiên của con người. LLSX bao gồm Người lao động (NLĐ) và Tư liệu sản xuất (TLSX).",
    category: "Lực lượng sản xuất"
  },
  {
    id: 3,
    question: "Quan hệ sản xuất (QHSX) bao gồm những loại quan hệ cơ bản nào cấu thành?",
    options: [
      "Quan hệ sở hữu tư liệu sản xuất, người lao động và công cụ lao động", 
      "Quan hệ sở hữu, quan hệ tổ chức/quản lý và quan hệ phân phối sản phẩm xã hội", 
      "Quan hệ giữa LLSX và KTTT", 
      "Quan hệ giữa thể chất và trình độ của người lao động"
    ],
    correctAnswer: "Quan hệ sở hữu, quan hệ tổ chức/quản lý và quan hệ phân phối sản phẩm xã hội",
    explanation: "Quan hệ sản xuất bao gồm: Quan hệ sở hữu, Quan hệ tổ chức, quản lý, và Quan hệ phân phối sản phẩm XH (quan hệ phân phối). Quan hệ sản xuất chỉ quan hệ giữa con người với con người trong quá trình sản xuất vật chất.",
    category: "Quan hệ sản xuất"
  },
  {
    id: 4,
    question: "Trong mối quan hệ biện chứng giữa Lực lượng sản xuất (LLSX) và Quan hệ sản xuất (QHSX), yếu tố nào giữ vai trò quyết định?",
    options: [
      "Quan hệ sản xuất quyết định LLSX", 
      "Lực lượng sản xuất quyết định QHSX", 
      "Cả hai cùng quyết định lẫn nhau với vai trò ngang nhau", 
      "Phương thức sản xuất quyết định cả hai yếu tố"
    ],
    correctAnswer: "Lực lượng sản xuất quyết định QHSX",
    explanation: "Lực lượng sản xuất và quan hệ sản xuất là hai mặt của một phương thức sản xuất, tác động biện chứng, trong đó lực lượng sản xuất quyết định quan hệ sản xuất. LLSX quyết định QHSX vì LLSX là nội dung của quá trình sản xuất, có tính năng động, cách mạng và thường xuyên phát triển.",
    category: "Phương thức sản xuất"
  },
  {
    id: 5,
    question: "Theo Triết học Mác-Lênin, yếu tố nào dưới đây trở thành nguyên nhân mọi biến đổi trong Lực lượng sản xuất (LLSX) khi nó trở thành lực lượng sản xuất trực tiếp?",
    options: [
      "Tính năng động của công cụ lao động", 
      "Kỹ năng, phẩm chất của người lao động", 
      "Khoa học và công nghệ (phát minh, sáng chế, công nghệ)", 
      "Đối tượng lao động và tư liệu lao động"
    ],
    correctAnswer: "Khoa học và công nghệ (phát minh, sáng chế, công nghệ)",
    explanation: "Khi Khoa học trở thành lực lượng sản xuất trực tiếp, việc sản xuất của cải đặc biệt, hàng hoá đặc biệt (phát minh, sáng chế, công nghệ) trở thành nguyên nhân mọi biến đổi trong LLSX.",
    category: "Khoa học và công nghệ"
  },
  {
    id: 6,
    question: "Khái niệm Cơ sở hạ tầng (CSHT) là toàn bộ những quan hệ sản xuất hợp thành cơ cấu kinh tế của xã hội. Cơ sở hạ tầng bao gồm những thành phần nào?",
    options: [
      "Các thiết chế xã hội như nhà nước, pháp luật, tôn giáo", 
      "QHSX tàn dư, QHSX thống trị, QHSX mầm mống", 
      "Lực lượng sản xuất, Quan hệ sản xuất và Kiến trúc thượng tầng", 
      "Tư tưởng xã hội và quan hệ nội tại của thượng tầng"
    ],
    correctAnswer: "QHSX tàn dư, QHSX thống trị, QHSX mầm mống",
    explanation: "Cơ sở hạ tầng là toàn bộ những quan hệ sản xuất hợp thành cơ cấu kinh tế của xã hội. CSHT bao gồm: QHSX tàn dư, QHSX thống trị, QHSX mầm mống.",
    category: "Cơ sở hạ tầng"
  },
  {
    id: 7,
    question: "Kiến trúc thượng tầng (KTTT) của xã hội bao gồm những yếu tố nào?",
    options: [
      "Chỉ bao gồm các thiết chế như nhà nước và pháp luật", 
      "Chỉ bao gồm các quan hệ sản xuất", 
      "Toàn bộ những tư tưởng xã hội với những thiết chế xã hội tương ứng cùng những quan hệ nội tại của thượng tầng hình thành trên một cơ sở hạ tầng nhất định", 
      "Lực lượng sản xuất và phương thức sản xuất"
    ],
    correctAnswer: "Toàn bộ những tư tưởng xã hội với những thiết chế xã hội tương ứng cùng những quan hệ nội tại của thượng tầng hình thành trên một cơ sở hạ tầng nhất định",
    explanation: "Kiến trúc thượng tầng của xã hội là toàn bộ những tư tưởng xã hội với những thiết chế xã hội tương ứng cùng những quan hệ nội tại của thượng tầng hình thành trên một cơ sở hạ tầng nhất định. KTTT bao gồm quan điểm chính trị, pháp luật, triết học, đạo đức, tôn giáo và thiết chế tương ứng như nhà nước.",
    category: "Kiến trúc thượng tầng"
  },
  {
    id: 8,
    question: "Trong quy luật biện chứng giữa Cơ sở hạ tầng (CSHT) và Kiến trúc thượng tầng (KTTT), vai trò lớn nhất thuộc về yếu tố nào và vì sao?",
    options: [
      "KTTT có vai trò lớn nhất do tính độc lập tương đối của nó", 
      "QHSX tàn dư có vai trò lớn nhất trong việc hình thành KTTT", 
      "CSHT có vai trò quyết định, xét đến cùng là quan hệ vật chất quyết định quan hệ tinh thần", 
      "KTTT chính trị có vai trò lớn nhất do phản ánh trực tiếp kinh tế"
    ],
    correctAnswer: "CSHT có vai trò quyết định, xét đến cùng là quan hệ vật chất quyết định quan hệ tinh thần ",
    explanation: "Trong quy luật này, Cơ sở hạ tầng quyết định kiến trúc thượng tầng. CSHT quyết định sự ra đời, cơ cấu, vận động và tính chất của KTTT. Nguyên nhân là từ quan hệ vật chất quyết định quan hệ tinh thần.",
    category: "Quy luật CSHT - KTTT"
  },
  {
    id: 9,
    question: "Khi Quan hệ sản xuất (QHSX) tác động trở lại đối với Lực lượng sản xuất (LLSX), sự tác động này diễn ra theo mấy chiều hướng?",
    options: [
      "Chỉ có chiều hướng thúc đẩy sự phát triển của LLSX", 
      "Chỉ có chiều hướng kìm hãm sự phát triển của LLSX", 
      "Thúc đẩy hoặc kìm hãm sự phát triển của LLSX", 
      "Không tác động trực tiếp mà chỉ thông qua Cơ sở hạ tầng"
    ],
    correctAnswer: "Thúc đẩy hoặc kìm hãm sự phát triển của LLSX",
    explanation: "Sự tác động trở lại của QHSX đối với LLSX diễn ra hai chiều hướng: Thúc đẩy hoặc kìm hãm sự phát triển của lực lượng sản xuất.",
    category: "Tác động biện chứng"
  },
  {
    id: 10,
    question: "Mác đã khẳng định sự phát triển của các Hình thái kinh tế - xã hội là quá trình mang tính chất gì?",
    options: [
      "Lịch sử - ý chí", 
      "Chủ quan - xã hội", 
      "Lô gíc - lịch sử", 
      "Lịch sử - tự nhiên"
    ],
    correctAnswer: "Lịch sử - tự nhiên",
    explanation: "Mác viết: \"Sự phát triển của các HTKTXH là một quá trình lịch sử - tự nhiên\". Điều này có nghĩa là sự phát triển xã hội vận động theo những quy luật khách quan, xét đến cùng là sự phát triển của LLSX.",
    category: "Hình thái kinh tế - xã hội"
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