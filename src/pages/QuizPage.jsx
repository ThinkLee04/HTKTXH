import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const navigate = useNavigate();
  
  // Quiz configuration
  const QUIZ_TIME_MINUTES = 15;
  const QUIZ_TIME_SECONDS = QUIZ_TIME_MINUTES * 60;

  // Quiz questions
  const questions = [
    {
      question: "Theo Marx, cái gì quyết định kiến trúc thượng tầng của xã hội?",
      options: [
        "Ý thức xã hội",
        "Cơ sở hạ tầng kinh tế",
        "Hệ thống chính trị",
        "Truyền thống văn hóa"
      ],
      correct: 1
    },
    {
      question: "Lực lượng sản xuất bao gồm những yếu tố nào?",
      options: [
        "Chỉ có con người lao động",
        "Chỉ có công cụ lao động",
        "Con người lao động và công cụ lao động",
        "Quan hệ sở hữu tư liệu sản xuất"
      ],
      correct: 2
    },
    {
      question: "Mâu thuẫn cơ bản của chủ nghĩa tư bản là gì?",
      options: [
        "Giữa giai cấp tư sản và giai cấp vô sản",
        "Giữa tính chất xã hội của sản xuất và tính chất tư nhân của chiếm hữu",
        "Giữa cung và cầu trên thị trường",
        "Giữa lao động chân tay và lao động trí óc"
      ],
      correct: 1
    },
    {
      question: "Theo Lenin, chủ nghĩa đế quốc là gì?",
      options: [
        "Giai đoạn thấp nhất của chủ nghĩa tư bản",
        "Giai đoạn cao nhất và cuối cùng của chủ nghĩa tư bản",
        "Một hình thái kinh tế - xã hội riêng biệt",
        "Chính sách đối ngoại của các nước lớn"
      ],
      correct: 1
    },
    {
      question: "Đặc điểm nào sau đây KHÔNG phải của xã hội cộng sản nguyên thủy?",
      options: [
        "Không có giai cấp",
        "Sản xuất tập thể",
        "Có tư hữu về tư liệu sản xuất",
        "Phân phối theo lao động"
      ],
      correct: 2
    },
    {
      question: "Vai trò của nhà nước trong xã hội chủ nghĩa là gì?",
      options: [
        "Biến mất hoàn toàn",
        "Chỉ có chức năng quản lý kinh tế",
        "Công cụ của giai cấp công nhân để xây dựng xã hội mới",
        "Trung lập giữa các giai cấp"
      ],
      correct: 2
    },
    {
      question: "Quy luật giá trị trong kinh tế thị trường hoạt động như thế nào?",
      options: [
        "Giá cả được nhà nước quy định",
        "Hàng hóa trao đổi theo lao động xã hội cần thiết",
        "Giá cả phụ thuộc vào ý muốn của người bán",
        "Không có quy luật nào chi phối"
      ],
      correct: 1
    },
    {
      question: "Đặc điểm của hình thái kinh tế - xã hội phong kiến là gì?",
      options: [
        "Quan hệ chủ nô - nô lệ",
        "Quan hệ lãnh chúa - nông nô dựa trên ruộng đất",
        "Quan hệ tư bản - công nhân",
        "Không có quan hệ giai cấp"
      ],
      correct: 1
    },
    {
      question: "Theo Marx, cách mạng xã hội xảy ra khi nào?",
      options: [
        "Khi nhân dân muốn thay đổi",
        "Khi lực lượng sản xuất phát triển không phù hợp với quan hệ sản xuất cũ",
        "Khi có sự can thiệp từ bên ngoài",
        "Khi kinh tế khủng hoảng"
      ],
      correct: 1
    },
    {
      question: "Ý nghĩa của học thuyết Marx-Lenin đối với Việt Nam hiện nay là gì?",
      options: [
        "Chỉ có ý nghĩa lịch sử",
        "Hoàn toàn lỗi thời",
        "Cơ sở lý luận cho việc xây dựng chủ nghĩa xã hội",
        "Chỉ áp dụng trong kinh tế"
      ],
      correct: 2
    }
  ];

  // State management
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_SECONDS);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  // Load leaderboard from localStorage
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('marx-lenin-quiz-leaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizCompleted, quizStarted]);

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    if (studentName.trim()) {
      setShowNameInput(false);
      setQuizStarted(true);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex
    });
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correctAnswers++;
      }
    });

    const finalScore = correctAnswers;
    setScore(finalScore);
    setQuizCompleted(true);

    // Save to leaderboard
    const newEntry = {
      name: studentName,
      score: finalScore,
      totalQuestions: questions.length,
      timestamp: new Date().toISOString()
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 20); // Keep only top 20

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('marx-lenin-quiz-leaderboard', JSON.stringify(updatedLeaderboard));
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGrade = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'Xuất sắc';
    if (percentage >= 80) return 'Giỏi';
    if (percentage >= 70) return 'Khá';
    if (percentage >= 60) return 'Trung bình';
    return 'Yếu';
  };

  // Name input screen
  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-md w-full border border-white/20 shadow-2xl"
        >
          <motion.button
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Quay lại</span>
          </motion.button>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Quiz Học thuyết Marx-Lenin
            </h1>
            <p className="text-gray-300">
              Thời gian: <span className="text-yellow-400 font-semibold">{QUIZ_TIME_MINUTES} phút</span>
              <br />
              Số câu hỏi: <span className="text-cyan-400 font-semibold">{questions.length} câu</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-white font-semibold mb-2">
              Nhập họ tên của bạn:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
            />
          </motion.div>

          <motion.button
            onClick={handleStartQuiz}
            disabled={!studentName.trim()}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: studentName.trim() ? 1.05 : 1 }}
            whileTap={{ scale: studentName.trim() ? 0.95 : 1 }}
            className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              studentName.trim()
                ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white shadow-lg'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Bắt đầu làm bài
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Quiz completed screen
  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-6">
        <div className="container mx-auto max-w-6xl">
          <motion.button
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Quay lại trang chính</span>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Score */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Kết quả của bạn
              </h2>
              
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className={`text-6xl font-bold mb-4 ${getScoreColor(score, questions.length)}`}
                >
                  {score}/{questions.length}
                </motion.div>
                <div className="text-2xl text-white mb-2">
                  {studentName}
                </div>
                <div className={`text-xl font-semibold ${getScoreColor(score, questions.length)}`}>
                  {getScoreGrade(score, questions.length)}
                </div>
                <div className="text-gray-400 mt-2">
                  Tỉ lệ đúng: {Math.round((score / questions.length) * 100)}%
                </div>
              </div>

              {/* Review answers */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <h3 className="text-xl font-semibold text-white mb-4">Xem lại đáp án:</h3>
                {questions.map((question, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-white text-sm mb-2">
                      <span className="font-semibold">Câu {index + 1}:</span> {question.question}
                    </p>
                    <div className="text-sm">
                      <div className={`${answers[index] === question.correct ? 'text-green-400' : 'text-red-400'}`}>
                        Bạn chọn: {question.options[answers[index]] || 'Không trả lời'}
                      </div>
                      {answers[index] !== question.correct && (
                        <div className="text-green-400">
                          Đáp án đúng: {question.options[question.correct]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Bảng xếp hạng
              </h2>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {leaderboard.length === 0 ? (
                  <p className="text-gray-400 text-center">Chưa có dữ liệu</p>
                ) : (
                  leaderboard.map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        entry.name === studentName 
                          ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-2 border-blue-400' 
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-white/20 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-white font-semibold">
                            {entry.name}
                            {entry.name === studentName && (
                              <span className="text-cyan-400 ml-2">(Bạn)</span>
                            )}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {new Date(entry.timestamp).toLocaleDateString('vi-VN')}
                          </div>
                        </div>
                      </div>
                      <div className={`text-xl font-bold ${getScoreColor(entry.score, entry.totalQuestions)}`}>
                        {entry.score}/{entry.totalQuestions}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Thoát</span>
          </motion.button>

          {/* Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-white/20 backdrop-blur-md rounded-xl px-6 py-3 border ${
              timeLeft < 300 ? 'border-red-400 text-red-400' : 'border-white/30 text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold text-xl">{formatTime(timeLeft)}</span>
            </div>
          </motion.div>
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between text-white mb-2">
            <span>Câu {currentQuestion + 1} / {questions.length}</span>
            <span>{studentName}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                    answers[currentQuestion] === index
                      ? 'bg-gradient-to-r from-cyan-600/50 to-blue-600/50 border-cyan-400 text-white shadow-lg'
                      : 'bg-white/5 border-white/20 text-gray-300 hover:border-white/40 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                      answers[currentQuestion] === index
                        ? 'border-cyan-400 bg-cyan-400 text-white'
                        : 'border-gray-400'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <motion.button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            whileHover={{ scale: currentQuestion > 0 ? 1.05 : 1 }}
            whileTap={{ scale: currentQuestion > 0 ? 0.95 : 1 }}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              currentQuestion === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg'
            }`}
          >
            Câu trước
          </motion.button>

          {currentQuestion === questions.length - 1 ? (
            <motion.button
              onClick={handleSubmitQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all duration-300"
            >
              Nộp bài
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
            >
              Câu tiếp
            </motion.button>
          )}
        </div>

        {/* Question navigation dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {questions.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentQuestion
                  ? 'bg-cyan-400 scale-125'
                  : answers[index] !== undefined
                  ? 'bg-green-400'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;