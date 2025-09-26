import React, { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { calculateScore, formatTimeRemaining, getTimeRemaining } from '../utils/score';

/**
 * Component chính để hiển thị câu hỏi và xử lý trả lời
 * @param {object} player - Thông tin người chơi
 * @param {string} sessionId - ID của session quiz
 * @param {function} onQuizComplete - Callback khi quiz hoàn thành
 */
const Quiz = ({ player, sessionId, onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [session, setSession] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [forceShowResult, setForceShowResult] = useState(false);
  const [answerStartTime, setAnswerStartTime] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to session changes
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'sessions', sessionId), (doc) => {
      const sessionData = doc.data();
      if (sessionData) {
        console.log('Session data received:', sessionData);
        setSession(sessionData);
        
        // Nếu quiz đã hoàn thành
        if (sessionData.isFinished) {
          onQuizComplete();
          return;
        }

        // Reset trạng thái cho câu hỏi mới
        if (sessionData.questionStartTime) {
          setAnswerStartTime(sessionData.questionStartTime.toDate());
          setHasAnswered(false);
          setShowResult(false);
          setForceShowResult(false);
          setSelectedAnswer('');
        }
      } else {
        console.log('No session data found');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sessionId, onQuizComplete]);

  // Listen to player data changes để detect admin force end
  useEffect(() => {
    if (player && sessionId) {
      const unsubscribePlayer = onSnapshot(
        doc(db, 'sessions', sessionId, 'players', player.id),
        (doc) => {
          const playerData = doc.data();
          if (playerData && playerData.answers) {
            const currentAnswer = playerData.answers.find(answer => 
              answer.questionIndex === session?.currentQuestionIndex &&
              answer.scoreAwarded === true
            );
            
            // If admin forced scoring, show result immediately
            if (currentAnswer && hasAnswered && !showResult) {
              console.log('Admin forced question end detected');
              setForceShowResult(true);
              setShowResult(true);
            }
          }
        }
      );
      
      return () => unsubscribePlayer();
    }
  }, [player, sessionId, session?.currentQuestionIndex, hasAnswered, showResult]);

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

  // Timer countdown
  useEffect(() => {
    if (!answerStartTime || showResult) return;

    const timer = setInterval(() => {
      const remaining = getTimeRemaining(answerStartTime, 30);
      setTimeRemaining(remaining);

      // Hết thời gian -> hiện kết quả
      if (remaining <= 0) {
        setShowResult(true);
        // Nếu chưa trả lời thì tự động submit câu trả lời trống
        if (!hasAnswered) {
          submitAnswer('', 30);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [answerStartTime, showResult, hasAnswered]);

  // Submit câu trả lời với delayed scoring
  const submitAnswer = async (answer, timeTaken = null) => {
    if (hasAnswered) return;

    const actualTimeTaken = timeTaken || (30 - timeRemaining);
    const isCorrect = answer === currentQuestion.correctAnswer;
    const score = calculateScore(isCorrect, actualTimeTaken);

    try {
      // Lưu câu trả lời trước (chưa cộng điểm)
      const playerRef = doc(db, 'sessions', sessionId, 'players', player.id);
      const answerData = {
        questionIndex: session.currentQuestionIndex,
        answer: answer,
        timeTaken: actualTimeTaken,
        isCorrect: isCorrect,
        score: score,
        answeredAt: new Date(),
        scoreAwarded: false // Flag để theo dõi đã cộng điểm chưa
      };

      await updateDoc(playerRef, {
        answers: arrayUnion(answerData)
        // Không cộng score ngay lập tức
      });

      setHasAnswered(true);
      console.log('Answer submitted (score pending):', { answer, isCorrect, score, timeTaken: actualTimeTaken });

      // Delayed scoring - chờ cho đến hết 30s mới cộng điểm
      const remainingTime = Math.max(0, timeRemaining * 1000); // Convert to milliseconds
      
      setTimeout(async () => {
        try {
          // Lấy player data mới nhất trước khi cộng điểm
          const playerDoc = await getDoc(playerRef);
          const currentPlayerData = playerDoc.data();
          
          if (currentPlayerData) {
            // Cộng điểm vào total score hiện tại
            await updateDoc(playerRef, {
              score: currentPlayerData.score + score
            });
            console.log('Score awarded after 30s delay:', { 
              score, 
              previousTotal: currentPlayerData.score, 
              newTotal: currentPlayerData.score + score 
            });
          }
        } catch (error) {
          console.error('Error awarding delayed score:', error);
        }
      }, remainingTime);
      
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (selectedAnswer && !hasAnswered) {
      submitAnswer(selectedAnswer);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Chờ quiz bắt đầu...</h2>
        <p className="text-gray-600">Nhóm thuyết trình sẽ khởi động quiz sớm thôi!</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Đang chờ câu hỏi...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {/* Header với thông tin câu hỏi và thời gian */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-sm text-gray-600">
            Câu {session.currentQuestionIndex + 1}/{questions.length}
          </span>
          <h2 className="text-lg font-semibold">Chào {player.name}!</h2>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${timeRemaining <= 5 ? 'text-red-600' : 'text-blue-600'}`}>
            {formatTimeRemaining(timeRemaining)}
          </div>
          <div className="text-sm text-gray-600">Điểm: {player.score}</div>
        </div>
      </div>

      {/* Câu hỏi */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {currentQuestion.question}
        </h3>

        {/* Form trả lời hoặc kết quả */}
        {!showResult ? (
          <form onSubmit={handleAnswerSubmit} className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`block p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === option
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                } ${hasAnswered ? 'cursor-not-allowed opacity-60' : ''}`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  disabled={hasAnswered}
                  className="mr-3"
                />
                {option}
              </label>
            ))}

            <button
              type="submit"
              disabled={!selectedAnswer || hasAnswered}
              className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {hasAnswered ? 'Đã trả lời' : 'Gửi đáp án'}
            </button>
          </form>
        ) : (
          /* Hiển thị kết quả */
          <div className="space-y-4">
            <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Đáp án đúng:</h4>
              <p className="text-green-700">{currentQuestion.correctAnswer}</p>
            </div>

            {currentQuestion.explanation && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Giải thích:</h4>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="text-center py-4">
              <p className="text-lg">
                {hasAnswered && player.answers && player.answers.length > session.currentQuestionIndex ? 
                  (player.answers[session.currentQuestionIndex]?.isCorrect ? 
                    `🎉 Chính xác! +${player.answers[session.currentQuestionIndex]?.score} điểm` : 
                    '❌ Sai rồi!'
                  ) : 
                  '⏰ Hết thời gian!'
                }
              </p>
              
              {forceShowResult && (
                <p className="text-sm text-orange-600 mt-2">
                  🚨 Admin đã kết thúc câu hỏi - điểm đã được cập nhật
                </p>
              )}
            </div>

            <div className="text-center text-gray-600">
              {forceShowResult ? 
                'Đang chuyển sang câu tiếp theo...' : 
                'Đang chờ câu hỏi tiếp theo...'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;