import React, { useState } from 'react';
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Component cho phép người dùng nhập tên để tham gia quiz
 * @param {function} onPlayerJoined - Callback khi player đã join thành công
 * @param {string} sessionId - ID của session quiz
 */
const NameInput = ({ onPlayerJoined, sessionId }) => {
  const [name, setName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleJoinQuiz = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Vui lòng nhập tên của bạn');
      return;
    }

    setIsJoining(true);
    setError('');

    try {
      // Tạo player document trong subcollection players của session
      const playersRef = collection(db, 'sessions', sessionId, 'players');
      const playerDoc = await addDoc(playersRef, {
        name: name.trim(),
        score: 0,
        answers: [],
        joinedAt: serverTimestamp()
      });

      console.log('Player joined with ID:', playerDoc.id);
      
      // Gọi callback với thông tin player
      onPlayerJoined({
        id: playerDoc.id,
        name: name.trim(),
        score: 0,
        answers: []
      });

    } catch (error) {
      console.error('Error joining quiz:', error);
      setError('Có lỗi xảy ra khi tham gia quiz. Vui lòng thử lại.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Tham gia Quiz Marx-Lenin
      </h2>
      
      <form onSubmit={handleJoinQuiz} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nhập tên của bạn:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tên của bạn..."
            maxLength={50}
            disabled={isJoining}
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isJoining || !name.trim()}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isJoining ? 'Đang tham gia...' : 'Tham gia Quiz'}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Quiz sẽ bắt đầu khi nhóm thuyết trình sẵn sàng</p>
      </div>
    </div>
  );
};

export default NameInput;