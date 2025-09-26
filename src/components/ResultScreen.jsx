import React from 'react';
import { motion } from 'framer-motion';
import Leaderboard from './Leaderboard';

/**
 * Component hiển thị màn hình kết quả với vintage style
 * @param {object} player - Thông tin người chơi
 * @param {string} sessionId - ID của session quiz
 * @param {function} onPlayAgain - Callback khi muốn chơi lại
 */
const ResultScreen = ({ player, sessionId, onPlayAgain }) => {
  const vintagePaperTexture = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTA1NzQwNC1pbWFnZS1qb2I2MzAtYV8xLmpwZw.jpg')";
  
  const handlePlayAgain = () => {
    if (onPlayAgain) {
      onPlayAgain();
    }
  };

  const getPlayerRankMessage = () => {
    // Tính toán phần trăm điểm đạt được (giả sử điểm tối đa cho 10 câu là 10,000)
    const maxPossibleScore = 10000;
    const percentage = Math.round((player.score / maxPossibleScore) * 100);
    
    if (percentage >= 80) {
      return {
        message: "Xuất sắc! 🌟",
        description: "Bạn đã thành thạo lý thuyết Marx-Lenin!",
        color: "text-green-600"
      };
    } else if (percentage >= 60) {
      return {
        message: "Khá tốt! 👍",
        description: "Bạn có hiểu biết tốt về lý thuyết Marx-Lenin",
        color: "text-blue-600"
      };
    } else if (percentage >= 40) {
      return {
        message: "Cần cố gắng thêm 📚",
        description: "Hãy tìm hiểu thêm về lý thuyết Marx-Lenin",
        color: "text-orange-600"
      };
    } else {
      return {
        message: "Cần học thêm nhiều 💪",
        description: "Đừng nản lòng, hãy tiếp tục học tập!",
        color: "text-red-600"
      };
    }
  };

  const rankMessage = getPlayerRankMessage();

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
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header kết quả cá nhân */}
        <motion.div 
          className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-8 mb-8 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-6 font-serif">
                🎯 Hoàn Thành Quiz!
              </h1>
            </motion.div>
            
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-2xl text-amber-200 mb-4">
                Chúc mừng <span className="font-bold text-amber-100">{player.name}</span>!
              </div>
              <motion.div 
                className="text-6xl font-bold text-amber-300 mb-4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              >
                {player.score} điểm
              </motion.div>
              <div className={`text-2xl font-bold mb-2 ${rankMessage.color === 'text-green-600' ? 'text-green-400' : 
                rankMessage.color === 'text-blue-600' ? 'text-blue-400' : 
                rankMessage.color === 'text-orange-600' ? 'text-orange-400' : 'text-red-400'}`}>
                {rankMessage.message}
              </div>
              <div className="text-amber-300/80 text-lg">
                {rankMessage.description}
              </div>
            </motion.div>

            {/* Thống kê chi tiết */}
            {player.answers && (
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div 
                  className="bg-green-900/30 border border-green-600/40 p-6 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-green-300 mb-2">
                    {player.answers.filter(a => a.isCorrect).length}
                  </div>
                  <div className="text-green-200 font-medium">Câu đúng</div>
                </motion.div>
                
                <motion.div 
                  className="bg-red-900/30 border border-red-600/40 p-6 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-red-300 mb-2">
                    {player.answers.filter(a => !a.isCorrect).length}
                  </div>
                  <div className="text-red-200 font-medium">Câu sai</div>
                </motion.div>
                
                <motion.div 
                  className="bg-blue-900/30 border border-blue-600/40 p-6 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-blue-300 mb-2">
                    {Math.round(player.answers.reduce((sum, a) => sum + a.timeTaken, 0) / player.answers.length)}s
                  </div>
                  <div className="text-blue-200 font-medium">Thời gian TB</div>
                </motion.div>
                
                <motion.div 
                  className="bg-purple-900/30 border border-purple-600/40 p-6 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-purple-300 mb-2">
                    {Math.round(player.score / player.answers.filter(a => a.isCorrect).length) || 0}
                  </div>
                  <div className="text-purple-200 font-medium">Điểm TB/câu</div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Bảng xếp hạng cuối cùng */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Leaderboard sessionId={sessionId} isFinal={true} />
        </motion.div>
      </div>
    </div>
  );
};

export default ResultScreen;