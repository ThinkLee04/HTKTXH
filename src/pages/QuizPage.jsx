import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSnapshot, doc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import NameInput from '../components/NameInput';
import Quiz from '../components/Quiz';
import ResultScreen from '../components/ResultScreen';
import Leaderboard from '../components/Leaderboard';
import AdminPanel from '../components/AdminPanel';
import WaitingRoom from '../components/WaitingRoom';
import { initializeQuestionsData } from '../utils/initFirestore';

/**
 * Main Quiz Page - điều phối toàn bộ luồng quiz
 */
const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [gameState, setGameState] = useState('name-input'); // 'name-input', 'waiting', 'quiz', 'result'
  const [player, setPlayer] = useState(null);
  const [sessionId] = useState(() => {
    // Lấy session ID từ URL params hoặc dùng session mặc định cho ngày hôm nay
    const urlParams = new URLSearchParams(location.search);
    const customSession = urlParams.get('session');
    if (customSession) {
      return customSession;
    }
    
    // Tạo session ID mặc định dựa trên ngày (tất cả người cùng ngày sẽ cùng session)
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return `daily-quiz-${today}`;
  });
  const [isAdmin] = useState(() => {
    // Check nếu là admin (từ URL params)
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('admin') === 'true';
  });
  const [dataInitialized, setDataInitialized] = useState(false);

  // Listen to session changes để chuyển state tự động
  useEffect(() => {
    if (gameState === 'waiting' && player) {
      const unsubscribe = onSnapshot(doc(db, 'sessions', sessionId), (doc) => {
        const sessionData = doc.data();
        console.log('QuizPage - Session update:', sessionData);
        
        if (sessionData) {
          // Nếu quiz đã bắt đầu, chuyển sang quiz state
          if (!sessionData.isFinished && sessionData.currentQuestionIndex >= 0) {
            console.log('Quiz started, switching to quiz state');
            setGameState('quiz');
          }
          // Nếu quiz đã kết thúc
          else if (sessionData.isFinished) {
            console.log('Quiz finished, switching to result state');
            setGameState('result');
          }
        }
      });

      return () => unsubscribe();
    }
  }, [gameState, player, sessionId]);

  // Listen to player updates để cập nhật score realtime
  useEffect(() => {
    if (player && (gameState === 'quiz' || gameState === 'result')) {
      const unsubscribePlayer = onSnapshot(
        doc(db, 'sessions', sessionId, 'players', player.id), 
        (doc) => {
          if (doc.exists()) {
            const updatedPlayer = { id: doc.id, ...doc.data() };
            console.log('Player updated:', updatedPlayer);
            setPlayer(updatedPlayer);
          }
        }
      );

      return () => unsubscribePlayer();
    }
  }, [player?.id, sessionId, gameState]);

  // Initialize Firestore data khi component mount
  useEffect(() => {
    const initData = async () => {
      try {
        const result = await initializeQuestionsData();
        if (result.success) {
          console.log('📚 Dữ liệu quiz đã sẵn sàng');
        }
      } catch (error) {
        console.error('Lỗi khởi tạo dữ liệu:', error);
      }
      setDataInitialized(true);
    };

    initData();
  }, []);

  // Handle player joined
  const handlePlayerJoined = (playerData) => {
    setPlayer(playerData);
    setGameState('waiting'); // Chờ admin start quiz
  };

  // Handle quiz complete
  const handleQuizComplete = () => {
    setGameState('result');
  };

  // Handle play again
  const handlePlayAgain = () => {
    setPlayer(null);
    setGameState('name-input');
  };

  // Handle back to home
  const handleBackToHome = () => {
    navigate('/');
  };

  if (!dataInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang khởi tạo dữ liệu quiz...</p>
        </div>
      </div>
    );
  }

  // Admin panel
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back button */}
          <button
            onClick={handleBackToHome}
            className="mb-4 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Về trang chủ
          </button>

          <AdminPanel sessionId={sessionId} />
          
          {/* Mini leaderboard for admin */}
          <div className="mt-8">
            <Leaderboard sessionId={sessionId} isFinal={false} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header với session info */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Quiz Lý Thuyết Marx-Lenin 🏛️
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <div className="bg-green-100 px-4 py-2 rounded-lg border border-green-300">
              <span className="text-sm font-medium text-green-700">
                📅 Session: <code className="bg-green-200 px-2 py-1 rounded text-xs">{sessionId}</code>
              </span>
            </div>
            {isAdmin && (
              <div className="bg-blue-100 px-4 py-2 rounded-lg border border-blue-300">
                <span className="text-sm font-medium text-blue-700">
                  👨‍🏫 Admin Mode
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleBackToHome}
            className="mt-2 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Về trang chủ
          </button>
        </div>

        {/* Main content based on game state */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main quiz area */}
          <div className="lg:col-span-2">
            {gameState === 'name-input' && (
              <NameInput 
                onPlayerJoined={handlePlayerJoined}
                sessionId={sessionId}
              />
            )}

            {gameState === 'waiting' && player && (
              <WaitingRoom 
                sessionId={sessionId}
                player={player}
              />
            )}

            {gameState === 'quiz' && player && (
              <Quiz 
                player={player}
                sessionId={sessionId}
                onQuizComplete={handleQuizComplete}
              />
            )}

            {gameState === 'result' && player && (
              <ResultScreen 
                player={player}
                sessionId={sessionId}
                onPlayAgain={handlePlayAgain}
              />
            )}
          </div>

          {/* Leaderboard sidebar */}
          <div className="lg:col-span-1">
            {(gameState === 'quiz' || gameState === 'result' || gameState === 'waiting') && (
              <div className="sticky top-4">
                <Leaderboard 
                  sessionId={sessionId}
                  isFinal={gameState === 'result'}
                />
              </div>
            )}

            {gameState === 'name-input' && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  📖 Hướng dẫn
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Nhập tên để tham gia quiz</li>
                  <li>• Mỗi câu hỏi có 30 giây</li>
                  <li>• Trả lời nhanh để được điểm cao</li>
                  <li>• Xem leaderboard realtime</li>
                  <li>• Quiz có 10 câu hỏi về Marx-Lenin</li>
                </ul>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">
                    🎯 Session hôm nay
                  </h4>
                  <div className="text-sm text-green-700">
                    <div><strong>Session ID:</strong></div>
                    <code className="bg-green-100 p-1 rounded text-xs">{sessionId}</code>
                    <p className="mt-2 text-xs">
                      ✅ Tất cả học sinh sẽ tự động join vào session này
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    🎯 Dành cho giảng viên
                  </h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Để điều khiển quiz, truy cập:
                  </p>
                  <a
                    href={`/quiz?admin=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Admin Panel
                  </a>
                  <p className="text-xs text-blue-600 mt-2">
                    💡 Admin tự động join session hôm nay
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Debug info (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">🔧 Debug Info</h4>
            <div className="text-sm text-yellow-700 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Game State:</strong> {gameState}
              </div>
              <div>
                <strong>Session ID:</strong> <span className="font-mono text-xs">{sessionId}</span>
              </div>
              <div>
                <strong>Player:</strong> {player ? `${player.name} (Score: ${player.score})` : 'None'}
              </div>
              <div>
                <strong>Admin Mode:</strong> {isAdmin ? 'Yes' : 'No'}
              </div>
              <div className="col-span-full">
                <strong>Session Info:</strong> 
                <br />
                <div className="bg-yellow-100 p-2 rounded text-xs mt-1">
                  <div><strong>Current Session:</strong> {sessionId}</div>
                  <div><strong>Player URL:</strong> {window.location.origin}/quiz</div>
                  <div><strong>Admin URL:</strong> {window.location.origin}/quiz?admin=true</div>
                  <div className="text-red-600 mt-1">
                    ⚠️ Admin và Player phải dùng cùng session URL để kết nối!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;