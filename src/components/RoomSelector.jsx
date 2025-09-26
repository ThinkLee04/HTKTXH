import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  increment 
} from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { joinPlayerToSession } from '../utils/joinSession';

/**
 * Room Selector - Hiển thị danh sách rooms để người chơi tham gia
 */
const RoomSelector = ({ playerName, playerData, onRoomSelect }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // Hybrid approach: filter date in Firestore, status in JavaScript
    const roomsQuery = query(
      collection(db, 'quiz-rooms'),
      where('date', '==', today),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(roomsQuery, (snapshot) => {
      const roomsData = [];
      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        // Filter status in JavaScript để tránh cần index phức tạp
        if (data.status === 'waiting' || data.status === 'active') {
          roomsData.push(data);
        }
      });
      
      setRooms(roomsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleJoinRoom = async (roomId) => {
    if (joining) return;
    
    setJoining(roomId);
    
    try {
      // Join player to session
      const joinedPlayer = await joinPlayerToSession(roomId, {
        name: playerName,
        score: 0,
        answers: []
      });

      // Increment player count in room
      await updateDoc(doc(db, 'quiz-rooms', roomId), {
        currentPlayers: increment(1)
      });

      console.log('✅ Successfully joined room:', roomId);
      
      // Call parent callback with room and player data
      onRoomSelect(roomId, joinedPlayer);
    } catch (error) {
      console.error('Error joining room:', error);
      setJoining(null);
      // TODO: Show error message to user
    }
  };

  const getStatusBadge = (room) => {
    if (room.status === 'waiting') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
          ⏳ Chờ bắt đầu
        </span>
      );
    }
    
    if (room.status === 'active') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
          🟢 Đang diễn ra
        </span>
      );
    }
    
    return null;
  };

  const isRoomFull = (room) => {
    return room.currentPlayers >= room.maxPlayers;
  };

  const canJoinRoom = (room) => {
    return room.status === 'waiting' && !isRoomFull(room);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách rooms...</p>
        </div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Chưa có room nào
          </h2>
          <p className="text-gray-600 mb-6">
            Hiện tại chưa có room nào được tạo hôm nay. <br/>
            Vui lòng chờ admin tạo room hoặc quay lại sau.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            🔄 Làm mới
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Chào mừng <span className="text-blue-600">{playerName}</span>! 👋
        </h2>
        <p className="text-gray-600">
          Chọn một room để tham gia quiz Marx-Lenin
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {room.name}
                </h3>
                {getStatusBadge(room)}
              </div>

              {room.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>
              )}

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Người chơi:</span>
                  <span className={`font-medium ${
                    isRoomFull(room) ? 'text-red-600' : 'text-gray-700'
                  }`}>
                    {room.currentPlayers}/{room.maxPlayers}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isRoomFull(room) ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ 
                      width: `${Math.min((room.currentPlayers / room.maxPlayers) * 100, 100)}%` 
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>🆔 {room.id.split('_').slice(-1)[0]}</span>
                  <span>🕒 {new Date(room.createdAt?.toDate()).toLocaleTimeString()}</span>
                </div>
              </div>

              {canJoinRoom(room) && (
                <button
                  onClick={() => handleJoinRoom(room.id)}
                  disabled={joining === room.id}
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
                >
                  {joining === room.id ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang tham gia...
                    </span>
                  ) : (
                    '🚀 Tham gia ngay'
                  )}
                </button>
              )}

              {room.status === 'active' && (
                <button
                  onClick={() => handleJoinRoom(room.id)}
                  disabled={joining === room.id || isRoomFull(room)}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isRoomFull(room) ? (
                    '👥 Room đã đầy'
                  ) : joining === room.id ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang tham gia...
                    </span>
                  ) : (
                    '⚡ Tham gia (đang diễn ra)'
                  )}
                </button>
              )}

              {!canJoinRoom(room) && room.status === 'waiting' && isRoomFull(room) && (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-2.5 rounded-lg font-medium cursor-not-allowed"
                >
                  👥 Room đã đầy
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          🔄 Làm mới danh sách
        </button>
      </div>
    </div>
  );
};

export default RoomSelector;