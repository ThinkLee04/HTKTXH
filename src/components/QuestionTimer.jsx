import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Question Timer Component với auto next
 */
const QuestionTimer = ({ 
  duration = 30, 
  isActive = true, 
  onTimeUp, 
  onNextQuestion,
  questionIndex,
  totalQuestions,
  canNext = false 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  // Reset timer khi question thay đổi
  useEffect(() => {
    if (isActive) {
      console.log('QuestionTimer: Resetting for question', questionIndex);
      setTimeLeft(duration);
      setIsRunning(true);
    } else {
      console.log('QuestionTimer: Inactive, stopping timer');
      setIsRunning(false);
    }
  }, [questionIndex, duration, isActive]);

  // Countdown logic
  useEffect(() => {
    if (!isRunning || !isActive) return;

    if (timeLeft <= 0) {
      console.log('QuestionTimer: Time up! Setting up auto-next...');
      setIsRunning(false);
      onTimeUp && onTimeUp();
      
      // Auto next question sau 2 giây
      const autoNextTimer = setTimeout(() => {
        console.log('QuestionTimer: Executing auto-next question');
        if (canNext && onNextQuestion) {
          onNextQuestion();
        }
      }, 2000);

      return () => {
        console.log('QuestionTimer: Cleaning up auto-next timer');
        clearTimeout(autoNextTimer);
      };
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 5 && newTime > 0) {
          console.log(`QuestionTimer: ${newTime} seconds remaining`);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isRunning, isActive, onTimeUp, onNextQuestion, canNext]);

  const getTimerColor = () => {
    const percentage = (timeLeft / duration) * 100;
    if (percentage > 50) return 'text-green-600 border-green-500';
    if (percentage > 20) return 'text-yellow-600 border-yellow-500';
    return 'text-red-600 border-red-500';
  };

  const getProgressColor = () => {
    const percentage = (timeLeft / duration) * 100;
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!isActive) {
    return (
      <div className="text-center p-4 bg-gray-100 rounded-lg">
        <div className="text-gray-600">⏸️ Timer dừng</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200"
    >
      {/* Question Progress */}
      <div className="text-center mb-4">
        <div className="text-sm text-gray-600 mb-2">
          Câu hỏi {questionIndex + 1} / {totalQuestions}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center">
        <div className={`text-6xl font-bold mb-2 ${getTimerColor()}`}>
          {timeLeft}
        </div>
        
        {/* Circular Progress */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={getProgressColor().replace('bg-', 'text-')}
              style={{
                strokeDasharray: `${2 * Math.PI * 45}`,
                strokeDashoffset: `${2 * Math.PI * 45 * (1 - timeLeft / duration)}`
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-700">
              {Math.round((timeLeft / duration) * 100)}%
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {timeLeft > 0 ? (
            <span>⏱️ Thời gian còn lại</span>
          ) : (
            <span className="text-red-600 font-semibold">
              ⏰ Hết giờ! {canNext ? 'Chuyển câu sau 2s...' : 'Chờ admin...'}
            </span>
          )}
        </div>

        {/* Manual Next Button (for admin) */}
        {timeLeft === 0 && canNext && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onNextQuestion && onNextQuestion()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ➡️ Câu tiếp theo ngay
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default QuestionTimer;