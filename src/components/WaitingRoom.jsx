import React, { useState, useEffect } from 'react';
import { onSnapshot, doc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

/**
 * Component màn hình chờ với vintage style
 * @param {string} sessionId - ID của session quiz
 * @param {object} player - Thông tin người chơi
 */
const WaitingRoom = ({ sessionId, player }) => {
  const [session, setSession] = useState(null);
  const [connectedPlayers, setConnectedPlayers] = useState([]);

  // Listen to session status
  useEffect(() => {
    const unsubscribeSession = onSnapshot(doc(db, 'sessions', sessionId), (doc) => {
      if (doc.exists()) {
        setSession(doc.data());
      }
    });

    return () => unsubscribeSession();
  }, [sessionId]);

  // Listen to connected players
  useEffect(() => {
    const unsubscribePlayers = onSnapshot(
      collection(db, 'sessions', sessionId, 'players'),
      (snapshot) => {
        const players = [];
        snapshot.forEach((doc) => {
          players.push({ id: doc.id, ...doc.data() });
        });
        setConnectedPlayers(players);
      }
    );

    return () => unsubscribePlayers();
  }, [sessionId]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{ 
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-3xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            className="mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-8xl mb-4">⏳</div>
          </motion.div>
          <motion.h2 
            className="text-4xl font-bold text-amber-100 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Chờ khởi động Quiz
          </motion.h2>
          <motion.p 
            className="text-amber-300/80 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Chào <span className="font-bold text-amber-200">{player?.name}</span>! 
            Chúng tôi đang chuẩn bị quiz về Marx-Lenin cho bạn.
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Session Info */}
          <motion.div 
            className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-amber-200 mb-4 flex items-center text-xl">
              📋 Thông tin phiên thi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-amber-100">
              <div className="flex justify-between">
                <span>Phòng:</span>
                <span className="font-mono text-amber-300 text-sm">{sessionId}</span>
              </div>
              <div className="flex justify-between">
                <span>Người tham gia:</span>
                <span className="font-bold text-amber-200">{connectedPlayers.length}</span>
              </div>
              <div className="flex justify-between md:col-span-2">
                <span>Trạng thái:</span>
                <span className={`font-bold ${session?.isFinished ? 'text-green-400' : 'text-yellow-400'}`}>
                  {session ? (session.isFinished ? '✅ Đã kết thúc' : '⏳ Chờ bắt đầu') : '🔄 Đang kết nối...'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Connected Players */}
          {connectedPlayers.length > 0 && (
            <motion.div 
              className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-bold text-amber-200 mb-4 flex items-center text-xl">
                👥 Thí sinh đã tham gia ({connectedPlayers.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {connectedPlayers.map((p, index) => (
                  <motion.div
                    key={p.id}
                    className={`flex items-center space-x-3 p-3 rounded-xl ${
                      p.id === player?.id 
                        ? 'bg-amber-600/20 border border-amber-500/40' 
                        : 'bg-amber-50/5 border border-amber-700/20'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      p.id === player?.id ? 'bg-amber-400 animate-pulse' : 'bg-green-400'
                    }`}></div>
                    <span className={`font-medium ${
                      p.id === player?.id ? 'text-amber-200' : 'text-amber-300/80'
                    }`}>
                      {p.name} {p.id === player?.id && '(Bạn)'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quiz Preview */}
          <motion.div 
            className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-bold text-amber-200 mb-4 flex items-center text-xl">
              🎯 Nội dung quiz
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-amber-100">
              <div className="flex items-center space-x-3 p-3 bg-amber-50/5 rounded-xl">
                <span className="text-3xl">📚</span>
                <span>10 câu lý thuyết Marx-Lenin</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-amber-50/5 rounded-xl">
                <span className="text-3xl">⏰</span>
                <span>20 giây mỗi câu hỏi</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-amber-50/5 rounded-xl">
                <span className="text-3xl">🏆</span>
                <span>Càng nhanh càng điểm cao</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-amber-50/5 rounded-xl">
                <span className="text-3xl">📊</span>
                <span>Xếp hạng thời gian thực</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Loading Animation */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-center space-x-2 mb-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-amber-400 rounded-full"
                animate={{ 
                  y: [0, -10, 0],
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
          <p className="text-amber-300/70 text-lg">
            Đang chờ giáo viên khởi động quiz...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WaitingRoom;