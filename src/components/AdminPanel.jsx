import React, { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, onSnapshot, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import Leaderboard from './Leaderboard';

/**
 * Component quản trị với vintage style
 * @param {string} sessionId - ID của room quiz
 */
const AdminPanel = ({ sessionId }) => {
  const [room, setRoom] = useState(null);
  const [session, setSession] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isStarting, setIsStarting] = useState(false);
  const [isProgressing, setIsProgressing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [hideQuestion, setHideQuestion] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);

  const vintagePaperTexture = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTA1NzQwNC1pbWFnZS1qb2I2MzAtYV8xLmpwZw.jpg')";

  // Listen to room changes
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'quiz-rooms', sessionId), (doc) => {
      if (doc.exists()) {
        setRoom(doc.data());
      }
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Listen to session changes (quiz data)
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'sessions', sessionId), (doc) => {
      if (doc.exists()) {
        const sessionData = doc.data();
        setSession(sessionData);
      }
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Handle question changes with smooth transition
  useEffect(() => {
    if (session && session.currentQuestionIndex !== undefined) {
      if (currentQuestionIndex !== -1 && session.currentQuestionIndex !== currentQuestionIndex) {
        // Question changed - hide current question first
        setHideQuestion(true);
        setShowAnswers(false);
        
        // Show new question after delay
        setTimeout(() => {
          setCurrentQuestionIndex(session.currentQuestionIndex);
          setTimeLeft(25);
          setCanProceed(false);
          setHideQuestion(false);
        }, 500);
      } else if (currentQuestionIndex === -1) {
        // First question - no transition needed
        setCurrentQuestionIndex(session.currentQuestionIndex);
        setTimeLeft(25);
        setCanProceed(false);
        setShowAnswers(false);
      }
    }
  }, [session?.currentQuestionIndex, currentQuestionIndex]);

  // Countdown timer effect
  useEffect(() => {
    if (session && !session.isFinished && timeLeft > 0 && !hideQuestion) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setCanProceed(true); // Enable proceed button
            setShowAnswers(true); // Show answers when timer reaches 0
          } else if (newTime === 5) {
            setShowAnswers(true); // Show answers at 5 seconds remaining
          }
          return Math.max(0, newTime);
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [session, timeLeft, hideQuestion]);

  // Load questions from Firestore
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questionsDoc = await getDoc(doc(db, 'quiz-data', 'questions'));
        if (questionsDoc.exists()) {
          setQuestions(questionsDoc.data().questions || []);
        } else {
          // Fallback to sample questions if not found
          console.warn('Questions not found in Firestore, using sample questions');
          setQuestions(sampleQuestions);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
        setQuestions(sampleQuestions); // Fallback
      }
    };

    // Sample questions as fallback
    const sampleQuestions = [
      {
        id: 1,
        question: "Theo Marx, giai cấp nào là lực lượng cách mạng chủ yếu trong xã hội tư bản?",
        options: ["Giai cấp nông dân", "Giai cấp công nhân", "Giai cấp trí thức", "Tiểu tư sản"],
        correctAnswer: "Giai cấp công nhân",
        explanation: "Marx cho rằng giai cấp công nhân là lực lượng cách mạng chủ yếu vì họ không có tư liệu sản xuất và bị bóc lột bởi giai cấp tư bản."
      },
      {
        id: 2,
        question: "Giá trị thặng dư là gì trong lý thuyết kinh tế Marx?",
        options: ["Lợi nhuận của nhà tư bản", "Giá trị do công nhân tạo ra nhưng không được trả công", "Thuế mà nhà nước thu", "Chi phí sản xuất"],
        correctAnswer: "Giá trị do công nhân tạo ra nhưng không được trả công",
        explanation: "Giá trị thặng dư là phần giá trị do công nhân tạo ra vượt quá giá trị sức lao động của họ, được nhà tư bản chiếm đoạt."
      }
    ];

    loadQuestions();
  }, []);

  const handleAdminJoin = (e) => {
    e.preventDefault();
    if (adminName.trim()) {
      setShowNameInput(false);
    }
  };

  const startQuiz = async () => {
    if (!session) {
      setIsStarting(true);
      try {
        console.log('Starting quiz with roomId:', sessionId);
        console.log('Questions available:', questions.length);
        
        // Tạo session mới với thông tin room
        const today = new Date().toISOString().split('T')[0];
        await setDoc(doc(db, 'sessions', sessionId), {
          currentQuestionIndex: 0,
          questionStartTime: serverTimestamp(),
          isFinished: false,
          totalQuestions: questions.length,
          createdBy: 'Admin',
          createdAt: serverTimestamp(),
          date: today, // Thêm field date để query
          roomId: sessionId // Link back to room
        });

        // Update room status
        await updateDoc(doc(db, 'quiz-rooms', sessionId), {
          status: 'active',
          startedAt: serverTimestamp()
        });

        console.log('✅ Quiz started successfully!');
      } catch (error) {
        console.error('❌ Error starting quiz:', error);
      } finally {
        setIsStarting(false);
      }
    } else {
      console.log('Quiz already started');
    }
  };

  const nextQuestion = async () => {
    if (!session) return;

    setIsProgressing(true);
    try {
      const nextIndex = session.currentQuestionIndex + 1;
      
      if (nextIndex >= questions.length) {
        // Kết thúc quiz
        await updateDoc(doc(db, 'sessions', sessionId), {
          isFinished: true,
          finishedAt: serverTimestamp()
        });

        // Update room status
        await updateDoc(doc(db, 'quiz-rooms', sessionId), {
          status: 'finished',
          finishedAt: serverTimestamp()
        });

        console.log('Quiz finished!');
      } else {
        // Chuyển câu hỏi tiếp theo
        await updateDoc(doc(db, 'sessions', sessionId), {
          currentQuestionIndex: nextIndex,
          questionStartTime: serverTimestamp()
        });
        console.log('Next question:', nextIndex);
      }
    } catch (error) {
      console.error('Error progressing quiz:', error);
    } finally {
      setIsProgressing(false);
    }
  };

  const resetQuiz = async () => {
    try {
      await updateDoc(doc(db, 'sessions', sessionId), {
        currentQuestionIndex: 0,
        questionStartTime: serverTimestamp(),
        isFinished: false
      });

      // Reset room status
      await updateDoc(doc(db, 'quiz-rooms', sessionId), {
        status: 'waiting'
      });

      console.log('Quiz reset!');
    } catch (error) {
      console.error('Error resetting quiz:', error);
    }
  };

  return (
    <div 
      className="min-h-screen py-8 px-6 bg-[#231812]"
      style={{ 
        backgroundImage: vintagePaperTexture, 
        backgroundBlendMode: "multiply",
        backgroundColor: "#180b03f5" 
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4 font-serif">
            🎯 Bảng Điều Khiển Quiz
          </h2>
          <p className="text-amber-300/80 text-lg">Phòng: <span className="font-mono text-amber-200">{sessionId}</span></p>
        </motion.div>

        {/* Main Layout: 2 columns */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content - Controls and Question */}
          <div className="xl:col-span-2 space-y-8">

        {/* Room và trạng thái hiện tại */}
        <motion.div 
          className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-bold mb-4 text-amber-200 text-xl">�️ Thông tin phòng:</h3>
              <div className="text-amber-100 space-y-3">
                <div className="flex justify-between">
                  <span>Tên phòng:</span>
                  <span className="font-semibold text-amber-200">{room?.name || 'Đang tải...'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Người tham gia:</span>
                  <span className="font-semibold text-amber-300">{room?.currentPlayers || 0}/{room?.maxPlayers || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trạng thái phòng:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    room?.status === 'waiting' ? 'bg-yellow-600/80 text-yellow-100' :
                    room?.status === 'active' ? 'bg-green-600/80 text-green-100' :
                    'bg-gray-600/80 text-gray-100'
                  }`}>
                    {room?.status?.toUpperCase() || 'ĐANG TẢI'}
                  </span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-bold mb-4 text-amber-200 text-xl">🎯 Trạng thái Quiz:</h3>
              {!session ? (
                <div className="text-orange-300 text-lg font-semibold">⏳ Chưa bắt đầu - Sẵn sàng khởi động</div>
              ) : session.isFinished ? (
                <div className="text-green-300 text-lg font-semibold">✅ Quiz đã hoàn thành</div>
              ) : (
                <div className="space-y-4">
                  <div className="text-blue-300 text-lg font-semibold">
                    🔄 Đang diễn ra - Câu {session.currentQuestionIndex + 1}/{questions.length}
                  </div>
                  {/* Timer Display */}
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className={`text-3xl font-bold ${
                        timeLeft > 10 ? 'text-green-400' : 
                        timeLeft > 5 ? 'text-yellow-400' : 'text-red-400'
                      }`}
                      animate={timeLeft <= 5 ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
                    >
                      ⏱️ {timeLeft}s
                    </motion.div>
                    <div className="flex-1">
                      <div className="w-full bg-amber-900/40 rounded-full h-3">
                        <motion.div 
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            timeLeft > 10 ? 'bg-green-500' : 
                            timeLeft > 5 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(timeLeft / 25) * 100}%` }}
                          animate={{ opacity: timeLeft <= 5 ? [1, 0.5, 1] : 1 }}
                          transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-amber-300/80">
                    {canProceed ? 
                      '✅ Có thể chuyển câu tiếp theo' : 
                      '⏳ Đợi hết 25 giây để có thể chuyển câu'
                    }
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Câu hỏi hiện tại */}
        <AnimatePresence mode="wait">
          {session && !session.isFinished && !hideQuestion && (
            <motion.div 
              className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-bold text-amber-200 mb-4 text-2xl">
                📖 Câu {session.currentQuestionIndex + 1}: 
              </h3>
              <p className="text-amber-100 mb-6 text-xl leading-relaxed">
                {questions[session.currentQuestionIndex]?.question}
              </p>
              
              {/* Hiển thị các options */}
              <div className="mb-6">
                <h4 className="font-semibold text-amber-200 mb-4 text-lg">Các lựa chọn:</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {questions[session.currentQuestionIndex]?.options?.map((option, index) => (
                    <motion.div 
                      key={index} 
                      className={`p-4 rounded-xl border transition-all ${
                        showAnswers && option === questions[session.currentQuestionIndex]?.correctAnswer
                          ? 'bg-green-900/40 border-green-500/60 text-green-200 shadow-lg'
                          : 'bg-amber-50/10 border-amber-700/40 text-amber-200 hover:bg-amber-50/15'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="font-bold text-amber-300">{String.fromCharCode(65 + index)}.</span> {option}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Hiển thị đáp án đúng */}
              {showAnswers && (
                <motion.div 
                  className="bg-green-900/30 border border-green-600/40 p-4 rounded-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-green-200">
                    <strong>🎯 Đáp án đúng:</strong>
                    <span className="ml-2 font-bold text-green-300">
                      {questions[session.currentQuestionIndex]?.correctAnswer}
                    </span>
                    {questions[session.currentQuestionIndex]?.explanation && (
                      <div className="mt-3 text-green-300/80">
                        <strong>💡 Giải thích:</strong> {questions[session.currentQuestionIndex]?.explanation}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Loading state during question transition */}
          {session && !session.isFinished && hideQuestion && (
            <motion.div 
              className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-400 border-t-transparent mr-4"></div>
                <span className="text-amber-300 text-xl">Đang chuyển câu hỏi...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nút điều khiển */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {!session ? (
            <motion.button
              onClick={startQuiz}
              disabled={isStarting || questions.length === 0}
              className="w-full py-4 px-6 bg-green-600 text-white font-bold text-xl rounded-xl hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              whileHover={!isStarting && questions.length > 0 ? { scale: 1.02 } : {}}
              whileTap={!isStarting && questions.length > 0 ? { scale: 0.98 } : {}}
            >
              {isStarting ? '🔄 Đang khởi động...' : '🚀 Bắt đầu Quiz'}
            </motion.button>
          ) : session.isFinished ? (
            <motion.button
              onClick={resetQuiz}
              className="w-full py-4 px-6 bg-blue-600 text-white font-bold text-xl rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🔄 Khởi động lại Quiz
            </motion.button>
          ) : (
            <motion.button
              onClick={nextQuestion}
              disabled={isProgressing || !canProceed}
              className="w-full py-4 px-6 bg-amber-600 text-white font-bold text-xl rounded-xl hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              whileHover={!isProgressing && canProceed ? { scale: 1.02 } : {}}
              whileTap={!isProgressing && canProceed ? { scale: 0.98 } : {}}
            >
              {isProgressing ? '🔄 Đang chuyển...' : 
               !canProceed ? `⏳ Đợi ${timeLeft}s` :
               (session.currentQuestionIndex >= questions.length - 1 ? '🏁 Kết thúc Quiz' : '➡️ Câu tiếp theo')}
            </motion.button>
          )}
        </motion.div>

        {/* Thông tin quiz */}
        <motion.div 
          className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="font-bold mb-4 text-amber-200 text-xl">📋 Thông tin Quiz:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-amber-100">
            <ul className="space-y-2">
              <li>• <span className="font-semibold text-amber-200">Tổng số câu hỏi:</span> {questions.length}</li>
              <li>• <span className="font-semibold text-amber-200">Thời gian mỗi câu:</span> 20 giây cho người chơi</li>
              <li>• <span className="font-semibold text-amber-200">Timer admin:</span> 25 giây trước khi chuyển câu</li>
            </ul>
            <ul className="space-y-2">
              <li>• <span className="font-semibold text-amber-200">Hệ thống tính điểm:</span> Căn cứ vào thời gian trả lời</li>
              <li>• <span className="font-semibold text-amber-200">Session ID:</span> <span className="font-mono text-amber-300">{sessionId}</span></li>
            </ul>
          </div>
        </motion.div>
          </div>

          {/* Leaderboard Sidebar */}
          <div className="xl:col-span-1">
            <motion.div
              className="sticky top-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-amber-200 mb-4 font-serif">🏆 Bảng Xếp Hạng</h3>
                <Leaderboard 
                  sessionId={sessionId}
                  isFinal={session?.isFinished || false}
                  isAdminView={true}
                />
              </div>

              {/* Room Stats */}
              <motion.div
                className="mt-6 bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <h3 className="text-lg font-bold text-amber-200 mb-3">📊 Thống Kê</h3>
                <div className="space-y-3 text-amber-100 text-sm">
                  <div className="flex justify-between">
                    <span>Người chơi:</span>
                    <span className="font-semibold text-amber-300">{room?.currentPlayers || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiến độ:</span>
                    <span className="font-semibold text-amber-300">
                      {session ? `${Math.max(0, session.currentQuestionIndex + 1)}/${questions.length}` : '0/10'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trạng thái:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      !session ? 'bg-gray-600/80 text-gray-200' :
                      session.isFinished ? 'bg-green-600/80 text-green-200' :
                      'bg-blue-600/80 text-blue-200'
                    }`}>
                      {!session ? 'Chờ' : session.isFinished ? 'Hoàn thành' : 'Đang diễn ra'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;