import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc, 
  increment 
} from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { joinPlayerToSession } from '../utils/joinSession';

/**
 * Combined Name Input + Room Selector
 */
const NameAndRoomSelector = ({ onPlayerJoined }) => {
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');

  // Load available rooms
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    const roomsQuery = query(
      collection(db, 'quiz-rooms'),
      where('date', '==', today)
    );

    const unsubscribe = onSnapshot(roomsQuery, (snapshot) => {
      const roomsData = [];
      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        // Filter available rooms
        if (data.status === 'waiting' || data.status === 'active') {
          roomsData.push(data);
        }
      });
      
      // Sort by creation time
      roomsData.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || new Date(0);
        const bTime = b.createdAt?.toDate?.() || new Date(0);
        return bTime - aTime;
      });
      
      setRooms(roomsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleJoinQuiz = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Vui lòng nhập tên của bạn');
      return;
    }
    
    if (!selectedRoom) {
      setError('Vui lòng chọn một room để tham gia');
      return;
    }

    setJoining(true);
    setError('');

    try {
      // Join player to selected room
      const joinedPlayer = await joinPlayerToSession(selectedRoom.id, {
        name: name.trim(),
        score: 0,
        answers: []
      });

      // Increment player count in room
      await updateDoc(doc(db, 'quiz-rooms', selectedRoom.id), {
        currentPlayers: increment(1)
      });

      console.log('✅ Successfully joined room:', selectedRoom.id);
      
      // Call parent callback
      onPlayerJoined(joinedPlayer, selectedRoom.id);
    } catch (error) {
      console.error('Error joining quiz:', error);
      setError('Có lỗi xảy ra khi tham gia quiz. Vui lòng thử lại.');
    } finally {
      setJoining(false);
    }
  };

  const getRoomStatusBadge = (room) => {
    if (room.status === 'waiting') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
          ⏳ Chờ bắt đầu
        </span>
      );
    }
    
    if (room.status === 'active') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
          🟢 Đang diễn ra
        </span>
      );
    }
    
    return null;
  };

  const isRoomFull = (room) => {
    return room.currentPlayers >= room.maxPlayers;
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        🎯 Tham gia Quiz Marx-Lenin
      </h2>

      <form onSubmit={handleJoinQuiz} className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
            Tên của bạn *
          </label>
          <input
            type="text"
            id="playerName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nhập tên của bạn..."
            maxLength={50}
          />
        </div>

        {/* Room Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Chọn room để tham gia *
          </label>
          
          {rooms.length === 0 ? (
            <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
              <p>Chưa có room nào khả dụng. Vui lòng chờ admin tạo room.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {rooms.map((room) => (
                <motion.div
                  key={room.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedRoom?.id === room.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${isRoomFull(room) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !isRoomFull(room) && setSelectedRoom(room)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{room.name}</h3>
                    {getRoomStatusBadge(room)}
                  </div>
                  
                  {room.description && (
                    <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      👥 {room.currentPlayers}/{room.maxPlayers} người chơi
                    </span>
                    <span className="text-gray-400 text-xs">
                      🕒 {new Date(room.createdAt?.toDate()).toLocaleTimeString()}
                    </span>
                  </div>

                  {isRoomFull(room) && (
                    <div className="mt-2 text-red-600 text-sm font-medium">
                      Room đã đầy
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!name.trim() || !selectedRoom || joining || isRoomFull(selectedRoom)}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {joining ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Đang tham gia...
            </span>
          ) : (
            '🚀 Tham gia Quiz'
          )}
        </button>
      </form>
    </div>
  );
};

export default NameAndRoomSelector;