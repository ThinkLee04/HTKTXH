import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Component hiển thị bảng xếp hạng với vintage style
 * @param {string} sessionId - ID của session quiz
 * @param {boolean} isFinal - Có phải bảng xếp hạng cuối cùng không
 */
const Leaderboard = ({ sessionId, isFinal = false }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const vintagePaperTexture = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTA1NzQwNC1pbWFnZS1qb2I2MzAtYV8xLmpwZw.jpg')";

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
      <motion.div 
        className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-400 border-t-transparent mx-auto mb-4"></div>
        <div className="text-amber-300">Đang tải bảng xếp hạng...</div>
      </motion.div>
    );
  }

  if (players.length === 0) {
    return (
      <motion.div 
        className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-amber-300/70">Chưa có thí sinh nào tham gia</div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`bg-[#2b2018]/90 backdrop-blur-sm border rounded-2xl p-6 shadow-2xl ${
        isFinal ? 'border-yellow-500/60 bg-gradient-to-br from-yellow-900/20 to-amber-900/20' : 'border-amber-900/30'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h3 
        className={`text-2xl md:text-3xl font-bold text-center mb-6 ${
          isFinal ? 'text-yellow-300' : 'text-amber-100'
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isFinal ? '🏆 Bảng Xếp Hạng Cuối Cùng 🏆' : '📊 Bảng Xếp Hạng'}
      </motion.h3>

      <div className="space-y-3 max-h-[28rem] overflow-y-auto overflow-x-hidden leaderboard-scroll pr-2">
        <AnimatePresence>
          {players.map((player, index) => {
            // Xác định màu cho top 3
            let rankColor = 'bg-amber-50/10 border-amber-700/40';
            let textColor = 'text-amber-200';
            let rankIcon = `${index + 1}`;
            
            if (index === 0 && isFinal) {
              rankColor = 'bg-yellow-600/20 border-yellow-500/60';
              textColor = 'text-yellow-200';
              rankIcon = '🥇';
            } else if (index === 1 && isFinal) {
              rankColor = 'bg-gray-600/20 border-gray-400/60';
              textColor = 'text-gray-200';
              rankIcon = '🥈';
            } else if (index === 2 && isFinal) {
              rankColor = 'bg-orange-600/20 border-orange-500/60';
              textColor = 'text-orange-200';
              rankIcon = '🥉';
            }

            return (
              <motion.div
                key={player.id}
                className={`flex items-center justify-between p-4 border rounded-xl transition-all ${rankColor} ${textColor}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                layout
              >
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className={`text-xl font-bold ${isFinal && index < 3 ? 'text-3xl' : ''}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {rankIcon}
                  </motion.div>
                  <div>
                    <div className={`font-bold text-lg ${
                      index === 0 && isFinal ? 'text-yellow-300' : textColor
                    }`}>
                      {player.name}
                    </div>
                    {isFinal && player.answers && (
                      <div className={`text-sm ${
                        index === 0 ? 'text-yellow-400/80' : 'text-amber-300/70'
                      }`}>
                        Đúng: {player.answers.filter(a => a.isCorrect).length}/{player.answers.length} câu
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <motion.div 
                    className={`text-2xl font-bold ${
                      index === 0 && isFinal ? 'text-yellow-400' : 'text-amber-300'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {player.score || 0}
                  </motion.div>
                  <div className={`text-sm ${
                    index === 0 ? 'text-yellow-400/60' : 'text-amber-400/60'
                  }`}>
                    điểm
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {isFinal && players.length > 0 && (
        <motion.div 
          className="mt-6 p-6 bg-green-900/30 border border-green-600/40 rounded-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <motion.h4 
              className="font-bold text-green-300 mb-3 text-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎉 Chúc mừng {players[0].name}! 🎉
            </motion.h4>
            <p className="text-green-200 text-lg">
              Bạn đã giành chiến thắng với <span className="font-bold text-green-300">{players[0].score}</span> điểm!
            </p>
          </div>
        </motion.div>
      )}

      {!isFinal && (
        <motion.div 
          className="mt-6 text-center text-amber-300/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-center space-x-2 mb-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-amber-400 rounded-full"
                animate={{ 
                  y: [0, -6, 0],
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
          <p>Bảng xếp hạng cập nhật tự động</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Leaderboard;