import React from 'react';
import Leaderboard from './Leaderboard';

/**
 * Component hiển thị màn hình kết quả cuối quiz
 * @param {object} player - Thông tin người chơi
 * @param {string} sessionId - ID của session quiz
 * @param {function} onPlayAgain - Callback khi muốn chơi lại
 */
const ResultScreen = ({ player, sessionId, onPlayAgain }) => {
  
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header kết quả cá nhân */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🎯 Quiz Hoàn Thành!
            </h1>
            
            <div className="mb-6">
              <div className="text-xl text-gray-700 mb-2">
                Chào <span className="font-semibold">{player.name}</span>!
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {player.score} điểm
              </div>
              <div className={`text-lg font-semibold ${rankMessage.color}`}>
                {rankMessage.message}
              </div>
              <div className="text-gray-600 mt-2">
                {rankMessage.description}
              </div>
            </div>

            {/* Thống kê chi tiết */}
            {player.answers && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">
                    {player.answers.filter(a => a.isCorrect).length}
                  </div>
                  <div className="text-sm text-green-700">Câu đúng</div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">
                    {player.answers.filter(a => !a.isCorrect).length}
                  </div>
                  <div className="text-sm text-red-700">Câu sai</div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(player.answers.reduce((sum, a) => sum + a.timeTaken, 0) / player.answers.length)}s
                  </div>
                  <div className="text-sm text-blue-700">Thời gian TB</div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(player.score / player.answers.filter(a => a.isCorrect).length) || 0}
                  </div>
                  <div className="text-sm text-purple-700">Điểm TB/câu</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bảng xếp hạng cuối cùng */}
        <Leaderboard sessionId={sessionId} isFinal={true} />
      </div>
    </div>
  );
};

export default ResultScreen;