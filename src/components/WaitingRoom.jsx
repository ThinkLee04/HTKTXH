import React, { useState, useEffect } from 'react';
import { onSnapshot, doc, collection } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Component màn hình chờ khi quiz chưa bắt đầu
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
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <div className="animate-pulse text-6xl">⏳</div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Đang chờ quiz bắt đầu...
        </h2>
        <p className="text-gray-600">
          Chào <span className="font-semibold text-blue-600">{player?.name}</span>! 
          Nhóm thuyết trình sẽ khởi động quiz sớm thôi.
        </p>
      </div>

      {/* Session info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Thông tin phiên quiz
        </h3>
        <div className="space-y-2 text-blue-700">
          <div className="flex justify-between">
            <span>Session ID:</span>
            <span className="font-mono text-sm">{sessionId}</span>
          </div>
          <div className="flex justify-between">
            <span>Số người tham gia:</span>
            <span className="font-semibold">{connectedPlayers.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Trạng thái:</span>
            <span className={`font-semibold ${session?.isFinished ? 'text-green-600' : 'text-orange-600'}`}>
              {session ? (session.isFinished ? 'Đã kết thúc' : 'Chưa bắt đầu') : 'Đang kết nối...'}
            </span>
          </div>
        </div>
      </div>

      {/* Connected players */}
      {connectedPlayers.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Người chơi đã kết nối ({connectedPlayers.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {connectedPlayers.map((p, index) => (
              <div
                key={p.id}
                className={`flex items-center space-x-2 p-3 rounded-lg ${
                  p.id === player?.id 
                    ? 'bg-blue-100 border border-blue-300' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${
                  p.id === player?.id ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <span className={`text-sm font-medium ${
                  p.id === player?.id ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {p.name} {p.id === player?.id && '(Bạn)'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Sẽ có gì trong quiz?
        </h3>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📚</span>
            <span>10 câu hỏi về lý thuyết Marx-Lenin</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">⏰</span>
            <span>30 giây cho mỗi câu hỏi</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏆</span>
            <span>Điểm cao hơn khi trả lời nhanh và chính xác</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📊</span>
            <span>Bảng xếp hạng realtime</span>
          </div>
        </div>
      </div>

      {/* Loading animation */}
      <div className="mt-8 text-center">
        <div className="flex justify-center space-x-2 mb-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          Đang chờ nhóm thuyết trình khởi động quiz...
        </p>
      </div>
    </div>
  );
};

export default WaitingRoom;