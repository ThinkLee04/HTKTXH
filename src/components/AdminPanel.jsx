import React, { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, onSnapshot, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Component quản trị cho room-based quiz system
 * @param {string} sessionId - ID của room quiz (tương đương roomId)
 */
const AdminPanel = ({ sessionId }) => {
  const [room, setRoom] = useState(null);
  const [session, setSession] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isStarting, setIsStarting] = useState(false);
  const [isProgressing, setIsProgressing] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);

  // Listen to room changes
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'quiz-rooms', sessionId), (doc) => {
      if (doc.exists()) {
        setRoom(doc.data());
      }
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Listen to session changes (quiz data)
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'sessions', sessionId), (doc) => {
      if (doc.exists()) {
        setSession(doc.data());
      }
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Load questions from Firestore
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questionsDoc = await getDoc(doc(db, 'quiz-data', 'questions'));
        if (questionsDoc.exists()) {
          setQuestions(questionsDoc.data().questions || []);
        } else {
          // Fallback to sample questions if not found
          console.warn('Questions not found in Firestore, using sample questions');
          setQuestions(sampleQuestions);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
        setQuestions(sampleQuestions); // Fallback
      }
    };

    // Sample questions as fallback
    const sampleQuestions = [
      {
        id: 1,
        question: "Theo Marx, giai cấp nào là lực lượng cách mạng chủ yếu trong xã hội tư bản?",
        options: ["Giai cấp nông dân", "Giai cấp công nhân", "Giai cấp trí thức", "Tiểu tư sản"],
        correctAnswer: "Giai cấp công nhân",
        explanation: "Marx cho rằng giai cấp công nhân là lực lượng cách mạng chủ yếu vì họ không có tư liệu sản xuất và bị bóc lột bởi giai cấp tư bản."
      },
      {
        id: 2,
        question: "Giá trị thặng dư là gì trong lý thuyết kinh tế Marx?",
        options: ["Lợi nhuận của nhà tư bản", "Giá trị do công nhân tạo ra nhưng không được trả công", "Thuế mà nhà nước thu", "Chi phí sản xuất"],
        correctAnswer: "Giá trị do công nhân tạo ra nhưng không được trả công",
        explanation: "Giá trị thặng dư là phần giá trị do công nhân tạo ra vượt quá giá trị sức lao động của họ, được nhà tư bản chiếm đoạt."
      }
    ];

    loadQuestions();
  }, []);

  const handleAdminJoin = (e) => {
    e.preventDefault();
    if (adminName.trim()) {
      setShowNameInput(false);
    }
  };

  const startQuiz = async () => {
    if (!session) {
      setIsStarting(true);
      try {
        console.log('Starting quiz with roomId:', sessionId);
        console.log('Questions available:', questions.length);
        
        // Tạo session mới với thông tin room
        const today = new Date().toISOString().split('T')[0];
        await setDoc(doc(db, 'sessions', sessionId), {
          currentQuestionIndex: 0,
          questionStartTime: serverTimestamp(),
          isFinished: false,
          totalQuestions: questions.length,
          createdBy: adminName,
          createdAt: serverTimestamp(),
          date: today, // Thêm field date để query
          roomId: sessionId // Link back to room
        });

        // Update room status
        await updateDoc(doc(db, 'quiz-rooms', sessionId), {
          status: 'active',
          startedAt: serverTimestamp()
        });

        console.log('✅ Quiz started successfully!');
      } catch (error) {
        console.error('❌ Error starting quiz:', error);
      } finally {
        setIsStarting(false);
      }
    } else {
      console.log('Quiz already started');
    }
  };

  const nextQuestion = async () => {
    if (!session) return;

    setIsProgressing(true);
    try {
      const nextIndex = session.currentQuestionIndex + 1;
      
      if (nextIndex >= questions.length) {
        // Kết thúc quiz
        await updateDoc(doc(db, 'sessions', sessionId), {
          isFinished: true,
          finishedAt: serverTimestamp()
        });

        // Update room status
        await updateDoc(doc(db, 'quiz-rooms', sessionId), {
          status: 'finished',
          finishedAt: serverTimestamp()
        });

        console.log('Quiz finished!');
      } else {
        // Chuyển câu hỏi tiếp theo
        await updateDoc(doc(db, 'sessions', sessionId), {
          currentQuestionIndex: nextIndex,
          questionStartTime: serverTimestamp()
        });
        console.log('Next question:', nextIndex);
      }
    } catch (error) {
      console.error('Error progressing quiz:', error);
    } finally {
      setIsProgressing(false);
    }
  };

  const resetQuiz = async () => {
    try {
      await updateDoc(doc(db, 'sessions', sessionId), {
        currentQuestionIndex: 0,
        questionStartTime: serverTimestamp(),
        isFinished: false
      });

      // Reset room status
      await updateDoc(doc(db, 'quiz-rooms', sessionId), {
        status: 'waiting'
      });

      console.log('Quiz reset!');
    } catch (error) {
      console.error('Error resetting quiz:', error);
    }
  };

  if (showNameInput) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🎯 Admin Panel - Quiz Marx-Lenin
        </h2>
        
        <form onSubmit={handleAdminJoin} className="space-y-4">
          <div>
            <label htmlFor="adminName" className="block text-sm font-medium text-gray-700 mb-2">
              Tên nhóm thuyết trình:
            </label>
            <input
              type="text"
              id="adminName"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhóm 1, Nhóm A, v.v..."
              maxLength={50}
            />
          </div>

          <button
            type="submit"
            disabled={!adminName.trim()}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Tiến vào Admin Panel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🎯 Quiz Control Panel
        </h2>
        <p className="text-gray-600">Điều khiển bởi: {adminName}</p>
      </div>

      {/* Room và trạng thái hiện tại */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">🏠 Room Info:</h3>
            <div className="text-sm space-y-1">
              <div><strong>Name:</strong> {room?.name || 'Loading...'}</div>
              <div><strong>Players:</strong> {room?.currentPlayers || 0}/{room?.maxPlayers || 0}</div>
              <div><strong>Status:</strong> 
                <span className={`ml-1 px-2 py-1 rounded text-xs font-medium ${
                  room?.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                  room?.status === 'active' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {room?.status?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🎯 Quiz Status:</h3>
            {!session ? (
              <div className="text-orange-600">⏳ Chưa bắt đầu - Sẵn sàng để khởi động</div>
            ) : session.isFinished ? (
              <div className="text-green-600">✅ Quiz đã hoàn thành</div>
            ) : (
              <div className="text-blue-600">
                🔄 Đang diễn ra - Câu {session.currentQuestionIndex + 1}/{questions.length}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Câu hỏi hiện tại */}
      {session && !session.isFinished && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">
            Câu {session.currentQuestionIndex + 1}: 
          </h3>
          <p className="text-blue-700 mb-3">
            {questions[session.currentQuestionIndex]?.question}
          </p>
          <div className="text-sm">
            <strong className="text-green-700">Đáp án đúng:</strong>
            <span className="ml-2 text-green-600">
              {questions[session.currentQuestionIndex]?.correctAnswer}
            </span>
          </div>
        </div>
      )}

      {/* Nút điều khiển */}
      <div className="space-y-4">
        {!session ? (
          <button
            onClick={startQuiz}
            disabled={isStarting || questions.length === 0}
            className="w-full py-3 px-4 bg-green-600 text-white font-medium text-lg rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isStarting ? '🔄 Đang khởi động...' : '🚀 Bắt đầu Quiz'}
          </button>
        ) : session.isFinished ? (
          <button
            onClick={resetQuiz}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            🔄 Khởi động lại Quiz
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            disabled={isProgressing}
            className="w-full py-3 px-4 bg-orange-600 text-white font-medium text-lg rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProgressing ? '🔄 Đang chuyển...' : 
             (session.currentQuestionIndex >= questions.length - 1 ? '🏁 Kết thúc Quiz' : '➡️ Câu tiếp theo')}
          </button>
        )}
      </div>

      {/* Thông tin quiz */}
      <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">📋 Thông tin Quiz:</h4>
        <ul className="space-y-1">
          <li>• Tổng số câu hỏi: {questions.length}</li>
          <li>• Thời gian mỗi câu: 30 giây</li>
          <li>• Hệ thống tính điểm: Căn cứ vào thời gian trả lời</li>
          <li>• Session ID: {sessionId}</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;