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
 * Combined Name Input + Room Selector with Vintage Style
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
      <div 
        className="flex items-center justify-center p-6"
        style={{ 
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light"></div>
        <motion.div 
          className="relative z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-amber-300">Đang tải danh sách phòng...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center justify-center p-6 "
      style={{ 
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2 
            className="text-4xl font-bold text-amber-100 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            🎯 Tham gia Quiz
          </motion.h2>
          <motion.p 
            className="text-amber-300/80 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Marx-Lenin
          </motion.p>
        </div>

        {/* Main Form */}
        <motion.form 
          onSubmit={handleJoinQuiz} 
          className="bg-[#2b2018]/90 backdrop-blur-sm border border-amber-900/30 rounded-2xl p-8 shadow-2xl space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Name Input */}
          <div>
            <label htmlFor="playerName" className="block text-amber-200 font-semibold mb-3 text-lg">
              📝 Tên của bạn *
            </label>
            <input
              type="text"
              id="playerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-amber-50/10 border border-amber-700/40 rounded-xl text-amber-100 placeholder-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
              placeholder="Nhập tên của bạn..."
              maxLength={50}
            />
          </div>

          {/* Room Selection */}
          <div>
            <label className="block text-amber-200 font-semibold mb-3 text-lg">
              🏛️ Chọn phòng tham gia *
            </label>
            
            {rooms.length === 0 ? (
              <div className="p-6 bg-amber-900/20 border border-amber-700/40 rounded-xl text-center text-amber-300/80">
                <p className="text-lg mb-2">📭</p>
                <p>Chưa có phòng nào khả dụng</p>
                <p className="text-sm mt-1 text-amber-400/60">Vui lòng chờ admin tạo phòng</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {rooms.map((room) => (
                  <motion.div
                    key={room.id}
                    whileHover={!isRoomFull(room) ? { scale: 1.02 } : {}}
                    whileTap={!isRoomFull(room) ? { scale: 0.98 } : {}}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedRoom?.id === room.id 
                        ? 'border-amber-400 bg-amber-400/10 shadow-lg' 
                        : isRoomFull(room)
                        ? 'border-red-600/40 bg-red-900/20 cursor-not-allowed opacity-50'
                        : 'border-amber-700/40 bg-amber-50/5 hover:border-amber-500/60 hover:bg-amber-50/10'
                    }`}
                    onClick={() => !isRoomFull(room) && setSelectedRoom(room)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-amber-100 text-lg">{room.name}</h3>
                      {room.status === 'active' && (
                        <span className="inline-block bg-green-600/80 text-white text-xs px-2 py-1 rounded-full">
                          🟢 Đang diễn ra
                        </span>
                      )}
                      {room.status === 'waiting' && (
                        <span className="inline-block bg-yellow-600/80 text-white text-xs px-2 py-1 rounded-full">
                          ⏳ Chờ bắt đầu
                        </span>
                      )}
                    </div>
                    
                    {room.description && (
                      <p className="text-sm text-amber-300/70 mb-2">{room.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-amber-300/80">
                        👥 {room.currentPlayers}/{room.maxPlayers}
                      </span>
                      <span className="text-amber-400/60 text-xs">
                        🕒 {new Date(room.createdAt?.toDate()).toLocaleTimeString('vi-VN')}
                      </span>
                    </div>

                    {isRoomFull(room) && (
                      <div className="mt-2 text-red-400 text-sm font-medium">
                        ⚠️ Phòng đã đầy
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              className="p-4 bg-red-900/30 border border-red-600/40 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-red-400 text-sm">⚠️ {error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!name.trim() || !selectedRoom || joining || isRoomFull(selectedRoom)}
            className="w-full py-4 px-6 bg-amber-600 text-amber-50 font-bold text-lg rounded-xl hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            whileHover={!joining && !(!name.trim() || !selectedRoom || isRoomFull(selectedRoom)) ? { scale: 1.02 } : {}}
            whileTap={!joining && !(!name.trim() || !selectedRoom || isRoomFull(selectedRoom)) ? { scale: 0.98 } : {}}
          >
            {joining ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-200 border-t-transparent mr-2"></div>
                Đang tham gia...
              </span>
            ) : (
              '🚀 Tham gia Quiz'
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default NameAndRoomSelector;