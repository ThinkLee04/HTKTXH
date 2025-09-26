import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
  deleteDoc 
} from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeDemoRooms } from '../utils/initDemoRooms';

/**
 * Admin Page với vintage style - Quản lý rooms/sessions
 */
const AdminPage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    description: '',
    maxPlayers: 50
  });
  const [loading, setLoading] = useState(true);
  const [creatingDemo, setCreatingDemo] = useState(false);
  const [totalPlayers, setTotalPlayers] = useState(0);

  const vintagePaperTexture = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTA1NzQwNC1pbWFnZS1qb2I2MzAtYV8xLmpwZw.jpg')";

  // Listen to rooms changes
  useEffect(() => {
    // Thử cả hai collection: quiz-rooms và rooms
    const fetchRooms = async () => {
      try {
        // Thử quiz-rooms trước
        let roomsQuery = query(
          collection(db, 'quiz-rooms'),
          orderBy('createdAt', 'desc')
        );

        let unsubscribe = onSnapshot(roomsQuery, (snapshot) => {
          const roomsData = [];
          snapshot.forEach((doc) => {
            roomsData.push({
              id: doc.id,
              ...doc.data()
            });
          });
          
          if (roomsData.length > 0) {
            setRooms(roomsData);
            const totalPlayers = roomsData.reduce((sum, room) => sum + (room.currentPlayers || 0), 0);
            setTotalPlayers(totalPlayers);
            setLoading(false);
            return;
          }

          // Nếu không có data trong quiz-rooms, thử collection rooms
          const roomsQuery2 = query(
            collection(db, 'rooms'),
            orderBy('createdAt', 'desc')
          );

          const unsubscribe2 = onSnapshot(roomsQuery2, (snapshot2) => {
            const roomsData2 = [];
            snapshot2.forEach((doc) => {
              roomsData2.push({
                id: doc.id,
                ...doc.data()
              });
            });
            
            setRooms(roomsData2);
            const totalPlayers = roomsData2.reduce((sum, room) => sum + (room.currentPlayers || 0), 0);
            setTotalPlayers(totalPlayers);
            setLoading(false);
          });

          return () => unsubscribe2();
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    
    if (!newRoom.name.trim()) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const roomId = `${today}_${newRoom.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
      
      await setDoc(doc(db, 'quiz-rooms', roomId), {
        name: newRoom.name.trim(),
        description: newRoom.description.trim(),
        maxPlayers: newRoom.maxPlayers,
        currentPlayers: 0,
        status: 'waiting', // 'waiting', 'active', 'finished'
        createdAt: serverTimestamp(),
        date: today,
        createdBy: 'Admin'
      });

      // Reset form
      setNewRoom({ name: '', description: '', maxPlayers: 50 });
      setShowCreateForm(false);
      
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleStartRoom = async (roomId) => {
    try {
      await updateDoc(doc(db, 'quiz-rooms', roomId), {
        status: 'active',
        startedAt: serverTimestamp()
      });

      // Chuyển đến quiz control
      navigate(`/quiz?admin=true&session=${roomId}`);
    } catch (error) {
      console.error('Error starting room:', error);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Bạn có chắc muốn xóa room này?')) {
      try {
        await deleteDoc(doc(db, 'quiz-rooms', roomId));
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
  };

  const handleDeleteAllRooms = async () => {
    if (window.confirm('Bạn có chắc muốn xóa TẤT CẢ rooms? Hành động này không thể hoàn tác!')) {
      try {
        // Xóa tất cả rooms
        const deletePromises = rooms.map(room => deleteDoc(doc(db, 'quiz-rooms', room.id)));
        await Promise.all(deletePromises);
        console.log('✅ Deleted all rooms');
      } catch (error) {
        console.error('Error deleting all rooms:', error);
      }
    }
  };

  const handleCreateDemoRooms = async () => {
    setCreatingDemo(true);
    try {
      const result = await initializeDemoRooms();
      if (result.success) {
        console.log(`✅ Created ${result.count} demo rooms`);
      }
    } catch (error) {
      console.error('Error creating demo rooms:', error);
    } finally {
      setCreatingDemo(false);
    }
  };

  const handleJoinRoom = (roomId) => {
    navigate(`/quiz?admin=true&session=${roomId}`);
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return 'Không rõ';
    return timestamp.toDate().toLocaleString('vi-VN');
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-[#231812]"
        style={{ 
          backgroundImage: vintagePaperTexture, 
          backgroundBlendMode: "multiply",
          backgroundColor: "#180b03f5" 
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#e5caa2]/8 mix-blend-soft-light"></div>
        <motion.div 
          className="relative z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-amber-300 text-lg">Đang tải dữ liệu...</p>
        </motion.div>
      </div>
    );
  }

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
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-2">🎯 Admin Panel</h1>
            <p className="text-amber-300/80 text-lg">Quản lý Quiz Rooms - Marx-Lenin</p>
          </div>
          <motion.div 
            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-lg"
            >
              ➕ Tạo Room Mới
            </button>
            {rooms.length === 0 && (
              <button
                onClick={handleCreateDemoRooms}
                disabled={creatingDemo}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-500 transition-all shadow-lg disabled:opacity-50"
              >
                {creatingDemo ? '⏳ Đang tạo...' : '🎯 Tạo Demo Rooms'}
              </button>
            )}
            <button
              onClick={handleDeleteAllRooms}
              disabled={loading || rooms.length === 0}
              className="bg-red-600/80 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-500/90 transition-all shadow-lg backdrop-blur-sm disabled:opacity-50"
            >
              🗑️ Xóa Tất Cả
            </button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-amber-100/90 to-amber-200/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-300/30">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-amber-400/80">
                <span className="text-2xl">🏛️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-amber-800">Tổng Rooms</p>
                <p className="text-3xl font-bold text-amber-900">{rooms.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-100/90 to-green-200/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-300/30">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-green-400/80">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-800">Rooms Hoạt Động</p>
                <p className="text-3xl font-bold text-green-900">{rooms.filter(r => r.status === 'active').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100/90 to-blue-200/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-300/30">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-blue-400/80">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-800">Tổng Người Chơi</p>
                <p className="text-3xl font-bold text-blue-900">{totalPlayers}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Create Room Form */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateForm(false)}
            >
              <motion.div 
                className="bg-gradient-to-br from-amber-100/95 to-amber-200/90 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-2xl border border-amber-300/50"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-amber-900 mb-6">📝 Tạo Room Mới</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">Tên Room</label>
                    <input
                      type="text"
                      value={newRoom.name}
                      onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                      className="w-full p-3 border border-amber-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/80 text-amber-900 placeholder-amber-600/60"
                      placeholder="Nhập tên room..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">Mô tả</label>
                    <input
                      type="text"
                      value={newRoom.description}
                      onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                      className="w-full p-3 border border-amber-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/80 text-amber-900 placeholder-amber-600/60"
                      placeholder="Mô tả room (tùy chọn)..."
                    />
                  </div>

                  <div>
                    <label className="block text-amber-800 font-semibold mb-2">Số người chơi tối đa</label>
                    <input
                      type="number"
                      value={newRoom.maxPlayers}
                      onChange={(e) => setNewRoom({...newRoom, maxPlayers: parseInt(e.target.value)})}
                      min="1"
                      max="100"
                      className="w-full p-3 border border-amber-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/80 text-amber-900"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleCreateRoom}
                    disabled={!newRoom.name.trim() || loading}
                    className="flex-1 bg-green-600/90 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-500/95 transition-all shadow-lg disabled:opacity-50"
                  >
                    ✅ Tạo Room
                  </button>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-600/80 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-500/90 transition-all shadow-lg backdrop-blur-sm"
                  >
                    ❌ Hủy
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rooms Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              className="bg-gradient-to-br from-amber-50/95 to-amber-100/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/50 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-amber-900">{room.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    room.status === 'active' 
                      ? 'bg-green-200/80 text-green-800' 
                      : room.status === 'completed' || room.status === 'finished'
                      ? 'bg-blue-200/80 text-blue-800'
                      : 'bg-gray-200/80 text-gray-800'
                  }`}>
                    {room.status === 'active' ? '🟢 Hoạt động' : 
                     room.status === 'completed' || room.status === 'finished' ? '🔵 Hoàn thành' : '⚪ Chờ'}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700">👥 Người chơi:</span>
                    <span className="font-semibold text-amber-900">{room.currentPlayers || 0}/{room.maxPlayers || '∞'}</span>
                  </div>
                  {room.description && (
                    <div className="flex items-center justify-between">
                      <span className="text-amber-700">📝 Mô tả:</span>
                      <span className="font-semibold text-amber-900 text-sm truncate max-w-32" title={room.description}>
                        {room.description}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700">🕒 Tạo lúc:</span>
                    <span className="font-semibold text-amber-900 text-sm">
                      {formatDateTime(room.createdAt)}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleJoinRoom(room.id)}
                    className="flex-1 bg-blue-600/90 text-white py-2 px-3 rounded-xl text-sm font-semibold hover:bg-blue-500/95 transition-all shadow-md"
                  >
                    🎯 Quản lý
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room.id)}
                    disabled={loading}
                    className="bg-red-600/80 text-white py-2 px-3 rounded-xl text-sm font-semibold hover:bg-red-500/90 transition-all shadow-md backdrop-blur-sm disabled:opacity-50"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {rooms.length === 0 && !loading && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-gradient-to-br from-amber-100/90 to-amber-200/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto shadow-xl border border-amber-300/30">
              <span className="text-6xl mb-4 block">🏛️</span>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">Chưa có Room nào</h3>
              <p className="text-amber-700 mb-6">Tạo room đầu tiên để bắt đầu quiz Marx-Lenin!</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600/90 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500/95 transition-all shadow-lg"
              >
                ➕ Tạo Room Đầu Tiên
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
