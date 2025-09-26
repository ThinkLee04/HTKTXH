import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Component hiển thị bảng xếp hạng realtime
 * @param {string} sessionId - ID của session quiz
 * @param {boolean} isFinal - Có phải bảng xếp hạng cuối cùng không
 */
const Leaderboard = ({ sessionId, isFinal = false }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query players theo điểm số giảm dần
    const playersQuery = query(
      collection(db, 'sessions', sessionId, 'players'),
      orderBy('score', 'desc')
    );

    const unsubscribe = onSnapshot(playersQuery, (snapshot) => {
      const playersData = [];
      snapshot.forEach((doc) => {
        playersData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setPlayers(playersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-lg shadow text-center">
        <div>Đang tải bảng xếp hạng...</div>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-lg shadow text-center">
        <div className="text-gray-600">Chưa có người chơi nào</div>
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg ${isFinal ? 'border-4 border-yellow-400' : ''}`}>
      <h3 className={`text-xl font-bold text-center mb-4 ${isFinal ? 'text-yellow-600' : 'text-gray-800'}`}>
        {isFinal ? '🏆 Bảng Xếp Hạng Cuối Cùng 🏆' : '📊 Bảng Xếp Hạng'}
      </h3>

      <div className="space-y-2">
        {players.map((player, index) => {
          // Xác định màu cho top 3
          let rankColor = 'bg-gray-50 border-gray-200';
          let rankIcon = `${index + 1}`;
          
          if (index === 0 && isFinal) {
            rankColor = 'bg-yellow-100 border-yellow-400';
            rankIcon = '🥇';
          } else if (index === 1 && isFinal) {
            rankColor = 'bg-gray-100 border-gray-400';
            rankIcon = '🥈';
          } else if (index === 2 && isFinal) {
            rankColor = 'bg-orange-100 border-orange-400';
            rankIcon = '🥉';
          }

          return (
            <div
              key={player.id}
              className={`flex items-center justify-between p-4 border-2 rounded-lg transition-colors ${rankColor}`}
            >
              <div className="flex items-center space-x-4">
                <div className={`text-lg font-bold ${isFinal && index < 3 ? 'text-2xl' : ''}`}>
                  {rankIcon}
                </div>
                <div>
                  <div className={`font-semibold ${index === 0 && isFinal ? 'text-lg text-yellow-700' : 'text-gray-800'}`}>
                    {player.name}
                  </div>
                  {isFinal && player.answers && (
                    <div className="text-sm text-gray-600">
                      Trả lời đúng: {player.answers.filter(a => a.isCorrect).length}/{player.answers.length} câu
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className={`text-xl font-bold ${index === 0 && isFinal ? 'text-yellow-600' : 'text-blue-600'}`}>
                  {player.score || 0}
                </div>
                <div className="text-sm text-gray-500">điểm</div>
              </div>
            </div>
          );
        })}
      </div>

      {isFinal && players.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-center">
            <h4 className="font-semibold text-green-800 mb-2">
              🎉 Chúc mừng {players[0].name}! 🎉
            </h4>
            <p className="text-green-700">
              Bạn đã giành chiến thắng với {players[0].score} điểm!
            </p>
          </div>
        </div>
      )}

      {!isFinal && (
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Bảng xếp hạng sẽ cập nhật tự động</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;