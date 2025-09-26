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
import { motion } from 'framer-motion';
import { initializeDemoRooms } from '../utils/initDemoRooms';

/**
 * Admin Page - Quản lý rooms/sessions
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

  // Listen to rooms changes
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // Optimized query with composite index
    const roomsQuery = query(
      collection(db, 'quiz-rooms'),
      where('date', '==', today),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(roomsQuery, (snapshot) => {
      const roomsData = [];
      snapshot.forEach((doc) => {
        roomsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setRooms(roomsData);
      setLoading(false);
    });

    return () => unsubscribe();
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'active': return 'bg-green-100 text-green-800 border-green-300';
      case 'finished': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'waiting': return '⏳';
      case 'active': return '🟢';
      case 'finished': return '✅';
      default: return '❓';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🎯 Admin Panel</h1>
            <p className="text-gray-600 mt-2">Quản lý Quiz Rooms - Marx-Lenin Theory</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ➕ Tạo Room Mới
            </button>
            {rooms.length === 0 && (
              <button
                onClick={handleCreateDemoRooms}
                disabled={creatingDemo}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400"
              >
                {creatingDemo ? '⏳ Đang tạo...' : '🎯 Tạo Demo Rooms'}
              </button>
            )}
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              🏠 Về Trang Chủ
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{rooms.length}</div>
            <div className="text-sm text-gray-600">Tổng Rooms</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-yellow-600">
              {rooms.filter(r => r.status === 'waiting').length}
            </div>
            <div className="text-sm text-gray-600">Đang Chờ</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {rooms.filter(r => r.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Đang Hoạt Động</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-600">
              {rooms.filter(r => r.status === 'finished').length}
            </div>
            <div className="text-sm text-gray-600">Đã Kết Thúc</div>
          </div>
        </div>

        {/* Create Room Form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Tạo Room Mới</h2>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên Room *
                  </label>
                  <input
                    type="text"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="VD: Lớp ML01, Nhóm A, Ôn thi cuối kỳ..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số người tối đa
                  </label>
                  <input
                    type="number"
                    value={newRoom.maxPlayers}
                    onChange={(e) => setNewRoom({ ...newRoom, maxPlayers: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="5"
                    max="200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Mô tả ngắn về quiz này..."
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Tạo Room
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Rooms List */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Danh Sách Rooms Hôm Nay</h2>
          </div>
          
          {rooms.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Chưa có room nào</h3>
              <p>Tạo room đầu tiên để bắt đầu quiz!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {rooms.map((room) => (
                <div key={room.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {room.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(room.status)}`}>
                          {getStatusIcon(room.status)} {room.status.toUpperCase()}
                        </span>
                      </div>
                      
                      {room.description && (
                        <p className="text-gray-600 mb-2">{room.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>👥 {room.currentPlayers}/{room.maxPlayers}</span>
                        <span>🆔 {room.id}</span>
                        <span>🕒 {new Date(room.createdAt?.toDate()).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {room.status === 'waiting' && (
                        <>
                          <button
                            onClick={() => handleStartRoom(room.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                          >
                            🚀 Bắt Đầu
                          </button>
                          <button
                            onClick={() => handleDeleteRoom(room.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                          >
                            🗑️
                          </button>
                        </>
                      )}
                      
                      {room.status === 'active' && (
                        <button
                          onClick={() => navigate(`/quiz?admin=true&session=${room.id}`)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          🎮 Điều Khiển
                        </button>
                      )}
                      
                      {room.status === 'finished' && (
                        <button
                          onClick={() => navigate(`/quiz?admin=true&session=${room.id}`)}
                          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                          📊 Xem Kết Quả
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;