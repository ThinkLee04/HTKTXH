import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const parchmentTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' fill='%23221610'/%3E%3Cg fill='%23f1d4a4' fill-opacity='0.05'%3E%3Cpath d='M0 0h2v2H0zm120 38h2v1h-2zM70 90h1v2h-1zM205 72h2v1h-2zM42 160h2v2h-2zM182 148h1v2h-1zM95 210h2v1H95zM150 186h2v1h-2z'/%3E%3C/g%3E%3C/svg%3E\")";
const fiberTexture = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23d6b485' fill-opacity='0.08'%3E%3Crect width='120' height='1' y='28'/%3E%3Crect width='120' height='1' y='76'/%3E%3Crect width='1' height='120' x='34'/%3E%3Crect width='1' height='120' x='86'/%3E%3C/g%3E%3C/svg%3E\")";

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
    if (percentage >= 80) return 'text-emerald-300';
    if (percentage >= 60) return 'text-amber-300';
    return 'text-rose-400';
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
      <div
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#22170f] p-6"
        style={{ backgroundImage: parchmentTexture, backgroundSize: '220px 220px', backgroundBlendMode: 'multiply' }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e6cba1]/12 mix-blend-soft-light"></div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_-10%,_rgba(190,144,102,0.18),_transparent_68%)]"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md overflow-hidden rounded-[30px] border border-amber-900/40 bg-[#2b1f16]/94 p-8 shadow-[0_26px_42px_rgba(0,0,0,0.45)] backdrop-blur-[1px] md:p-12"
          style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></div>
          <div className="relative">
          <motion.button
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 flex items-center space-x-2 font-serif-main text-amber-200/70 transition-colors hover:text-amber-100"
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
            <h1 className="mb-4 font-serif-heading text-3xl font-semibold tracking-wide text-amber-200">
              Quiz Học thuyết Marx-Lenin
            </h1>
            <p className="font-serif-main text-amber-100/80">
              Thời gian: <span className="font-semibold text-amber-200">{QUIZ_TIME_MINUTES} phút</span>
              <br />
              Số câu hỏi: <span className="font-semibold text-amber-200/90">{questions.length} câu</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="mb-2 block font-serif-heading text-sm font-semibold tracking-[0.2em] text-amber-200">
              Nhập họ tên của bạn:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full rounded-2xl border border-amber-900/30 bg-[#1f1812]/80 p-4 font-serif-main text-amber-100 placeholder:text-amber-300/40 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent"
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
                ? 'border border-amber-900/40 bg-[#2b1f16]/94 text-amber-100 shadow-[0_22px_36px_rgba(0,0,0,0.4)]'
                : 'bg-[#392b22]/40 text-amber-300/40 cursor-not-allowed'
            }`}
            style={studentName.trim() ? { backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' } : undefined}
          >
            Bắt đầu làm bài
          </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Quiz completed screen
  if (quizCompleted) {
    return (
      <div
        className="relative min-h-screen overflow-hidden bg-[#22170f] p-6"
        style={{ backgroundImage: parchmentTexture, backgroundSize: '220px 220px', backgroundBlendMode: 'multiply' }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e6cba1]/12 mix-blend-soft-light"></div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(190,144,102,0.18),_transparent_70%)]"></div>
        <div className="relative z-10 container mx-auto max-w-6xl">
          <motion.button
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 flex items-center space-x-2 font-serif-main text-amber-200/70 transition-colors hover:text-amber-100"
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
              className="relative overflow-hidden rounded-[32px] border border-amber-900/40 bg-[#2b1f16]/94 p-8 shadow-[0_26px_42px_rgba(0,0,0,0.45)] backdrop-blur-[1px]"
              style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></div>
              <div className="relative">
              <h2 className="mb-6 text-center font-serif-heading text-3xl font-semibold tracking-wide text-amber-200">
                Kết quả của bạn
              </h2>
              
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className={`mb-4 font-serif-heading text-6xl font-bold ${getScoreColor(score, questions.length)}`}
                >
                  {score}/{questions.length}
                </motion.div>
                <div className="mb-2 font-serif-heading text-2xl text-amber-100">
                  {studentName}
                </div>
                <div className={`text-xl font-semibold ${getScoreColor(score, questions.length)}`}>
                  {getScoreGrade(score, questions.length)}
                </div>
                <div className="mt-2 font-serif-main text-amber-200/70">
                  Tỉ lệ đúng: {Math.round((score / questions.length) * 100)}%
                </div>
              </div>

              {/* Review answers */}
              <div className="max-h-96 space-y-4 overflow-y-auto">
                <h3 className="mb-4 font-serif-heading text-xl font-semibold text-amber-200">Xem lại đáp án:</h3>
                {questions.map((question, index) => (
                  <div key={index} className="rounded-2xl border border-amber-900/35 bg-[#21160f]/85 p-4" style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}>
                    <p className="mb-2 font-serif-main text-sm text-amber-100/85">
                      <span className="font-semibold text-amber-200">Câu {index + 1}:</span> {question.question}
                    </p>
                    <div className="text-sm">
                      <div className={`${answers[index] === question.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                        Bạn chọn: {question.options[answers[index]] || 'Không trả lời'}
                      </div>
                      {answers[index] !== question.correct && (
                        <div className="text-emerald-400">
                          Đáp án đúng: {question.options[question.correct]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative overflow-hidden rounded-[32px] border border-amber-900/40 bg-[#2b1f16]/94 p-8 shadow-[0_26px_42px_rgba(0,0,0,0.45)] backdrop-blur-[1px]"
              style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></div>
              <div className="relative">
              <h2 className="mb-6 text-center font-serif-heading text-3xl font-semibold tracking-wide text-amber-200">
                Bảng xếp hạng
              </h2>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {leaderboard.length === 0 ? (
                  <p className="text-center font-serif-main text-amber-200/70">Chưa có dữ liệu</p>
                ) : (
                  leaderboard.map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`flex items-center justify-between rounded-2xl border p-4 ${
                        entry.name === studentName 
                          ? 'border-amber-400/40 bg-[#332518]/85 shadow-[0_18px_30px_rgba(0,0,0,0.35)]'
                          : 'border-amber-900/35 bg-[#21160f]/82'
                      }`}
                      style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${
                          index === 0 ? 'bg-amber-300 text-[#241b15]' :
                          index === 1 ? 'bg-amber-200 text-[#241b15]' :
                          index === 2 ? 'bg-amber-500 text-[#241b15]' :
                          'bg-amber-900/40 text-amber-100'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-serif-heading text-amber-100 font-semibold">
                            {entry.name}
                            {entry.name === studentName && (
                              <span className="ml-2 text-amber-300">(Bạn)</span>
                            )}
                          </div>
                          <div className="text-sm font-serif-main text-amber-200/70">
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
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#22170f] p-6"
      style={{ backgroundImage: parchmentTexture, backgroundSize: '220px 220px', backgroundBlendMode: 'multiply' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e6cba1]/12 mix-blend-soft-light"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(190,144,102,0.18),_transparent_70%)]"></div>
      <div className="relative z-10 container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <motion.button
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 font-serif-main text-amber-200/70 transition-colors hover:text-amber-100"
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
            className={`rounded-full border px-6 py-3 font-serif-heading text-base tracking-[0.2em] transition-colors ${
              timeLeft < 300
                ? 'border-rose-500/60 bg-[#2d1c18]/90 text-rose-300'
                : 'border-amber-900/30 bg-[#261e18]/90 text-amber-200'
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
          <div className="mb-2 flex justify-between font-serif-main text-sm tracking-[0.2em] text-amber-200/80">
            <span>Câu {currentQuestion + 1} / {questions.length}</span>
            <span>{studentName}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-amber-900/35">
            <motion.div
              className="h-2 rounded-full bg-amber-300"
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
            className="relative mb-8 overflow-hidden rounded-[32px] border border-amber-900/40 bg-[#2b1f16]/94 p-8 shadow-[0_26px_42px_rgba(0,0,0,0.45)] backdrop-blur-[1px]"
            style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-28 mix-blend-soft-light" style={{ backgroundImage: fiberTexture }}></div>
            <div className="relative">
            <h2 className="mb-8 font-serif-heading text-2xl font-semibold tracking-wide text-amber-100 md:text-3xl">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full rounded-2xl border-2 p-4 text-left transition-all duration-300 ${
                    answers[currentQuestion] === index
                      ? 'border-amber-300 bg-[#3d2a1c]/88 text-amber-100 shadow-[0_20px_32px_rgba(0,0,0,0.4)]'
                      : 'border-amber-900/35 bg-[#1f1812]/78 text-amber-200/82 hover:border-amber-500/40 hover:bg-[#2a2119]/82'
                  }`}
                  style={answers[currentQuestion] === index ? { backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' } : undefined}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-sm font-bold ${
                      answers[currentQuestion] === index
                        ? 'border-amber-300 bg-amber-300 text-[#271c14]'
                        : 'border-amber-700/50 text-amber-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-serif-main text-lg leading-relaxed">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
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
            className={`rounded-full px-6 py-3 font-serif-heading text-sm tracking-[0.3em] transition-all duration-300 ${
              currentQuestion === 0
                ? 'cursor-not-allowed bg-[#392b22]/40 text-amber-300/40'
                : 'border border-amber-900/40 bg-[#2a1e15]/94 text-amber-100 shadow-[0_22px_36px_rgba(0,0,0,0.4)]'
            }`}
            style={currentQuestion === 0 ? undefined : { backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
          >
            Câu trước
          </motion.button>

          {currentQuestion === questions.length - 1 ? (
            <motion.button
              onClick={handleSubmitQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-amber-900/40 bg-[#2b1f16]/94 px-8 py-3 font-serif-heading text-sm tracking-[0.3em] text-amber-100 shadow-[0_22px_36px_rgba(0,0,0,0.4)] transition-all duration-300"
              style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
            >
              Nộp bài
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-amber-900/40 bg-[#2b1f16]/94 px-6 py-3 font-serif-heading text-sm tracking-[0.3em] text-amber-100 shadow-[0_22px_36px_rgba(0,0,0,0.4)] transition-all duration-300"
              style={{ backgroundImage: fiberTexture, backgroundSize: '160px 160px', backgroundBlendMode: 'soft-light' }}
            >
              Câu tiếp
            </motion.button>
          )}
        </div>

        {/* Question navigation dots */}
        <div className="mt-8 flex justify-center space-x-2">
          {questions.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentQuestion
                  ? 'scale-125 bg-amber-300'
                  : answers[index] !== undefined
                  ? 'bg-emerald-300'
                  : 'bg-amber-900/40 hover:bg-amber-700/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;