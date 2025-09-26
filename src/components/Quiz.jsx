import React, { useState, useEffect, useCallback } from 'react';
import { doc, updateDoc, arrayUnion, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { calculateScore, formatTimeRemaining, getTimeRemaining } from '../utils/score';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Component chính quiz với vintage style
 * @param {object} player - Thông tin người chơi
 * @param {string} sessionId - ID của session quiz
 * @param {function} onQuizComplete - Callback khi quiz hoàn thành
 */
const Quiz = ({ player, sessionId, onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [session, setSession] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answerStartTime, setAnswerStartTime] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vintage paper texture for consistent styling
  const vintagePaperTexture = `
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, #f5f1eb 0%, #e8dcc0 100%)
  `;

  // Listen to session changes với debouncing để tránh re-render nhiều
  useEffect(() => {
    let unsubscribe;
    const debounceTimer = setTimeout(() => {
      unsubscribe = onSnapshot(doc(db, 'sessions', sessionId), (doc) => {
        const sessionData = doc.data();
        if (sessionData) {
          console.log('Session data received:', sessionData);
          setSession(sessionData);
          
          // Nếu quiz đã hoàn thành
          if (sessionData.isFinished) {
            onQuizComplete();
            return;
          }

          // Reset trạng thái cho câu hỏi mới - chỉ khi thực sự có thay đổi
          if (sessionData.questionStartTime && 
              (!answerStartTime || sessionData.questionStartTime.toDate().getTime() !== answerStartTime.getTime())) {
            setAnswerStartTime(sessionData.questionStartTime.toDate());
            setHasAnswered(false);
            setShowResult(false);
            setSelectedAnswer('');
          }
        } else {
          console.log('No session data found');
        }
        setLoading(false);
      });
    }, 100); // Debounce 100ms

    return () => {
      clearTimeout(debounceTimer);
      if (unsubscribe) unsubscribe();
    };
  }, [sessionId, onQuizComplete]);

  // Load câu hỏi hiện tại khi session hoặc questions thay đổi
  useEffect(() => {
    if (session && questions.length > 0 && session.currentQuestionIndex !== undefined) {
      console.log('Loading question index:', session.currentQuestionIndex);
      loadCurrentQuestion(session.currentQuestionIndex);
    }
  }, [session, questions]);

  // Load questions từ Firestore
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questionsDoc = await getDoc(doc(db, 'quiz-data', 'questions'));
        if (questionsDoc.exists()) {
          setQuestions(questionsDoc.data().questions || []);
        } else {
          console.warn('No questions document found');
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    loadQuestions();
  }, []);

  // Load câu hỏi hiện tại
  const loadCurrentQuestion = (questionIndex) => {
    console.log('loadCurrentQuestion called with:', { questionIndex, questionsLength: questions.length });
    if (questions.length > 0 && questionIndex < questions.length && questionIndex >= 0) {
      const question = questions[questionIndex];
      console.log('Setting current question:', question);
      setCurrentQuestion(question);
    } else {
      console.warn('Cannot load question:', { questionIndex, questionsLength: questions.length });
    }
  };

  // Timer countdown - chỉ update thời gian, không hiện kết quả
  useEffect(() => {
    if (!answerStartTime) return;

    const timer = setInterval(() => {
      const remaining = getTimeRemaining(answerStartTime, 20);
      
      setTimeRemaining(prevTime => {
        if (prevTime === remaining) return prevTime;
        return remaining;
      });

      // Khi hết thời gian, xử lý submit nếu chưa trả lời và hiện kết quả
      if (remaining <= 0) {
        clearInterval(timer);
        if (!hasAnswered) {
          // Người chưa trả lời -> submit trống và hiện kết quả
          submitAnswerAndShowResult('', 20);
        } else {
          // Người đã trả lời trước đó -> cộng điểm và hiện kết quả
          awardScoreAndShowResult();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [answerStartTime, hasAnswered]);

  // Submit câu trả lời - chỉ lưu vào database, không hiện kết quả
  const submitAnswer = useCallback(async (answer, timeTaken = null) => {
    if (hasAnswered) return;

    const actualTimeTaken = timeTaken || (20 - timeRemaining);
    const isCorrect = answer === currentQuestion.correctAnswer;
    const score = calculateScore(isCorrect, actualTimeTaken);

    try {
      const playerRef = doc(db, 'sessions', sessionId, 'players', player.id);
      const answerData = {
        questionIndex: session.currentQuestionIndex,
        answer: answer,
        timeTaken: actualTimeTaken,
        isCorrect: isCorrect,
        score: score,
        answeredAt: new Date(),
      };

      await updateDoc(playerRef, {
        answers: arrayUnion(answerData)
      });

      console.log('Answer submitted (waiting for time up):', { answer, isCorrect, score, timeTaken: actualTimeTaken });
      
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  }, [hasAnswered, timeRemaining, currentQuestion, session, sessionId, player.id]);

  // Submit và hiện kết quả cùng lúc (chỉ gọi khi hết thời gian)
  const submitAnswerAndShowResult = useCallback(async (answer, timeTaken = null) => {
    if (hasAnswered && showResult) return;

    const actualTimeTaken = timeTaken || (20 - timeRemaining);
    const isCorrect = answer === currentQuestion.correctAnswer;
    const score = calculateScore(isCorrect, actualTimeTaken);

    try {
      // Nếu chưa submit thì submit
      if (!hasAnswered) {
        setHasAnswered(true);
        
        const playerRef = doc(db, 'sessions', sessionId, 'players', player.id);
        const answerData = {
          questionIndex: session.currentQuestionIndex,
          answer: answer,
          timeTaken: actualTimeTaken,
          isCorrect: isCorrect,
          score: score,
          answeredAt: new Date(),
        };

        await updateDoc(playerRef, {
          answers: arrayUnion(answerData)
        });

        // Cộng điểm ngay lập tức
        const playerDoc = await getDoc(playerRef);
        const currentPlayerData = playerDoc.data();
        
        if (currentPlayerData) {
          await updateDoc(playerRef, {
            score: currentPlayerData.score + score
          });
        }

        console.log('Answer submitted and score awarded:', { answer, isCorrect, score, timeTaken: actualTimeTaken });
      }
      
      // Hiện kết quả
      setShowResult(true);
      
    } catch (error) {
      console.error('Error submitting answer and showing result:', error);
    }
  }, [hasAnswered, showResult, timeRemaining, currentQuestion, session, sessionId, player.id]);

  // Cộng điểm và hiện kết quả cho người đã submit trước đó
  const awardScoreAndShowResult = useCallback(async () => {
    if (showResult) return;

    try {
      const playerRef = doc(db, 'sessions', sessionId, 'players', player.id);
      const playerDoc = await getDoc(playerRef);
      const playerData = playerDoc.data();
      
      if (playerData && playerData.answers) {
        const lastAnswer = playerData.answers[playerData.answers.length - 1];
        if (lastAnswer && lastAnswer.questionIndex === session.currentQuestionIndex) {
          // Cộng điểm
          await updateDoc(playerRef, {
            score: playerData.score + lastAnswer.score
          });
          
          console.log('Score awarded for previous answer:', { 
            score: lastAnswer.score, 
            previousTotal: playerData.score, 
            newTotal: playerData.score + lastAnswer.score 
          });
        }
      }
      
      // Hiện kết quả
      setShowResult(true);
      
    } catch (error) {
      console.error('Error awarding score and showing result:', error);
    }
  }, [showResult, sessionId, player.id, session]);

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (selectedAnswer && !hasAnswered) {
      setHasAnswered(true); // Đánh dấu đã trả lời
      submitAnswer(selectedAnswer); // Chỉ submit, KHÔNG hiện kết quả
      
      // KHÔNG gọi setShowResult(true) ở đây
      // Kết quả sẽ chỉ hiện khi hết thời gian trong useEffect timer
    }
  };

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center bg-[#231812]"
        style={{ 
          backgroundImage: vintagePaperTexture, 
          backgroundBlendMode: "multiply",
          backgroundColor: "#180b03f5" 
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light"></div>
        <motion.div 
          className="relative z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-amber-300 text-lg">Đang tải câu hỏi...</p>
        </motion.div>
      </div>
    );
  }

  if (!session) {
    return (
      <div 
        className="flex items-center justify-center bg-[#231812]"
        style={{ 
          backgroundImage: vintagePaperTexture, 
          backgroundBlendMode: "multiply",
          backgroundColor: "#180b03f5" 
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light"></div>
        <motion.div 
          className="relative z-10 bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-amber-100 mb-4">Chờ quiz bắt đầu...</h2>
          <p className="text-amber-300/80">Giáo viên sẽ khởi động quiz sớm thôi!</p>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div 
        className="flex items-center justify-center bg-[#231812]"
        style={{ 
          backgroundImage: vintagePaperTexture, 
          backgroundBlendMode: "multiply",
          backgroundColor: "#180b03f5" 
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light"></div>
        <motion.div 
          className="relative z-10 bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-amber-100 mb-4">Đang chờ câu hỏi...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center justify-center p-6 bg-[#231812]"
      style={{ 
        backgroundImage: vintagePaperTexture, 
        backgroundBlendMode: "multiply",
        backgroundColor: "#180b03f5" 
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Header với thông tin câu hỏi và thời gian */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-8 bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <span className="text-amber-400/80 text-sm font-medium">
              Câu {session.currentQuestionIndex + 1}/{questions.length}
            </span>
            <h2 className="text-2xl font-bold text-amber-100">Chào {player.name}!</h2>
          </div>
          <div className="text-center md:text-right">
            <motion.div 
              className={`text-4xl font-bold mb-2 ${timeRemaining <= 5 ? 'text-red-400' : 'text-amber-300'}`}
              animate={timeRemaining <= 5 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: timeRemaining <= 5 ? Infinity : 0 }}
            >
              {formatTimeRemaining(timeRemaining)}
            </motion.div>
            <div className="text-amber-200 font-medium">
              💰 Điểm: <span className="text-amber-400 font-bold">{player.score}</span>
            </div>
          </div>
        </motion.div>

        {/* Câu hỏi chính */}
        <motion.div 
          className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-8 text-amber-100 text-center leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {currentQuestion.question}
          </motion.h3>

          {/* Form trả lời, trạng thái chờ, hoặc kết quả */}
          <AnimatePresence mode="wait">
            {!showResult ? (
              <>
                {!hasAnswered ? (
                  /* Form trả lời câu hỏi */
                  <motion.form 
                    onSubmit={handleAnswerSubmit} 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <motion.label
                        key={index}
                        className={`block p-4 border rounded-xl cursor-pointer transition-all text-lg ${
                          selectedAnswer === option
                            ? 'bg-amber-600/20 border-amber-400 text-amber-100 shadow-lg'
                            : 'bg-amber-50/10 border-amber-700/40 text-amber-200 hover:bg-amber-50/15 hover:border-amber-500/60'
                        } hover:scale-[1.02]`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={selectedAnswer === option}
                          onChange={(e) => setSelectedAnswer(e.target.value)}
                          className="mr-4 scale-125 text-amber-500"
                        />
                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                      </motion.label>
                    ))}

                    <motion.button
                      type="submit"
                      disabled={!selectedAnswer}
                      className="w-full py-4 px-6 bg-amber-600 text-amber-50 font-bold text-xl rounded-xl hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      whileHover={selectedAnswer ? { scale: 1.02 } : {}}
                      whileTap={selectedAnswer ? { scale: 0.98 } : {}}
                    >
                      🚀 Gửi đáp án
                    </motion.button>
                  </motion.form>
                ) : (
                  /* Trạng thái đã submit - đang chờ hết thời gian */
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div
                      className="text-6xl mb-6"
                      animate={{ 
                        // rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity }
                      }}
                    >
                      ⏳
                    </motion.div>
                    <h3 className="text-2xl font-bold text-amber-100 mb-4">Đã gửi đáp án!</h3>
                    <p className="text-amber-300/80 text-lg mb-6">
                      Đang chờ hết thời gian để xem kết quả và được cộng điểm...
                    </p>
                    <div className="bg-amber-900/30 border border-amber-600/40 rounded-xl p-4 inline-block">
                      <p className="text-amber-200">
                        Đáp án bạn chọn: <span className="font-bold text-amber-100">{selectedAnswer}</span>
                      </p>
                    </div>
                    <div className="mt-4 text-amber-300/60">
                      <p>Thời gian còn lại: <span className="font-bold">{timeRemaining}s</span></p>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              /* Hiển thị kết quả */
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.div 
                  className="p-6 bg-green-900/30 border border-green-600/40 rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="font-bold text-green-300 mb-3 text-xl">✅ Đáp án đúng:</h4>
                  <p className="text-green-200 text-lg font-medium">{currentQuestion.correctAnswer}</p>
                </motion.div>

                {currentQuestion.explanation && (
                  <motion.div 
                    className="p-6 bg-blue-900/30 border border-blue-600/40 rounded-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="font-bold text-blue-300 mb-3 text-xl">💡 Giải thích:</h4>
                    <p className="text-blue-200 leading-relaxed">{currentQuestion.explanation}</p>
                  </motion.div>
                )}

                <motion.div 
                  className="text-center py-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-2xl mb-4">
                    {hasAnswered && player.answers && player.answers.length > session.currentQuestionIndex ? 
                      (player.answers[session.currentQuestionIndex]?.isCorrect ? 
                        `🎉 Chính xác! +${player.answers[session.currentQuestionIndex]?.score} điểm` : 
                        '❌ Sai rồi!'
                      ) : 
                      '⏰ Hết thời gian!'
                    }
                  </p>
                </motion.div>

                <motion.div 
                  className="text-center text-amber-300/70 p-4 bg-amber-900/20 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex justify-center space-x-2 mb-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-amber-400 rounded-full"
                        animate={{ 
                          y: [0, -8, 0],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          delay: i * 0.2 
                        }}
                      />
                    ))}
                  </div>
                  Đang chờ câu hỏi tiếp theo...
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Quiz;