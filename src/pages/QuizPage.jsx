import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSnapshot, doc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import NameInput from '../components/NameInput';
import Quiz from '../components/Quiz';
import ResultScreen from '../components/ResultScreen';
import Leaderboard from '../components/Leaderboard';
import AdminPanel from '../components/AdminPanel';
import RoomSelector from '../components/RoomSelector';
import WaitingRoom from '../components/WaitingRoom';
import { initializeQuestionsData } from '../utils/initFirestore';
import { getCurrentSessionId } from '../utils/sessionManager';

/**
 * Main Quiz Page - điều phối toàn bộ luồng quiz
 */
const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [gameState, setGameState] = useState('name-input'); // 'name-input', 'room-select', 'waiting', 'quiz', 'result'
  const [player, setPlayer] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [showRoomSelector, setShowRoomSelector] = useState(false);
  const [isAdmin] = useState(() => {
    // Check nếu là admin (từ URL params)
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('admin') === 'true';
  });
  const [dataInitialized, setDataInitialized] = useState(false);

  // Khởi tạo session ID
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const customSession = urlParams.get('session');
        
        if (customSession) {
          // Sử dụng session ID từ URL nếu có (admin case)
          setSessionId(customSession);
          console.log('Using custom session from URL:', customSession);
        } else if (isAdmin) {
          // Admin không có room selector, redirect về admin page
          navigate('/admin');
          return;
        } else {
          // Player cần chọn room
          setShowRoomSelector(true);
        }
      } catch (error) {
        console.error('Error initializing session:', error);
      } finally {
        setSessionLoading(false);
      }
    };

    initializeSession();
  }, [location.search, isAdmin, navigate]);

  // Handle room selection from RoomSelector
  const handleRoomSelected = (selectedRoomId, joinedPlayerData) => {
    console.log('Room selected:', selectedRoomId, 'Player:', joinedPlayerData);
    setSessionId(selectedRoomId);
    
    // Update player data với ID từ Firestore
    if (joinedPlayerData) {
      setPlayer(joinedPlayerData);
    }
    
    setShowRoomSelector(false);
    setGameState('waiting');
  };

  // Listen to session changes để chuyển state tự động
  useEffect(() => {
    if (gameState === 'waiting' && player && sessionId) {
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
    if (player && sessionId && (gameState === 'quiz' || gameState === 'result')) {
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
    if (!isAdmin && !sessionId) {
      // Player chưa chọn room
      setGameState('room-select');
    } else {
      // Player đã có session hoặc là admin
      setGameState('waiting');
    }
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

  if (!dataInitialized || sessionLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {!dataInitialized ? 'Đang khởi tạo dữ liệu quiz...' : 'Đang tìm session phù hợp...'}
          </p>
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

          {/* Header với session info */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Quiz Lý Thuyết Marx-Lenin 🏛️
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <div className="bg-green-100 px-4 py-2 rounded-lg border border-green-300">
                <span className="text-sm font-medium text-green-700">
                  📅 Room: <code className="bg-green-200 px-2 py-1 rounded text-xs">{sessionId}</code>
                </span>
              </div>
              <div className="bg-blue-100 px-4 py-2 rounded-lg border border-blue-300">
                <span className="text-sm font-medium text-blue-700">
                  👨‍🏫 Admin Mode
                </span>
              </div>
            </div>
          </div>

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
        {/* Header với room info */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Quiz Lý Thuyết Marx-Lenin 🏛️
          </h1>
          {sessionId && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <div className="bg-green-100 px-4 py-2 rounded-lg border border-green-300">
                <span className="text-sm font-medium text-green-700">
                  📅 Room: <code className="bg-green-200 px-2 py-1 rounded text-xs">{sessionId}</code>
                </span>
              </div>
            </div>
          )}
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

            {gameState === 'room-select' && player && (
              <RoomSelector 
                playerName={player.name}
                playerData={player}
                onRoomSelect={handleRoomSelected}
              />
            )}

            {gameState === 'waiting' && player && sessionId && (
              <WaitingRoom 
                sessionId={sessionId}
                player={player}
              />
            )}

            {gameState === 'quiz' && player && sessionId && (
              <Quiz 
                player={player}
                sessionId={sessionId}
                onQuizComplete={handleQuizComplete}
              />
            )}

            {gameState === 'result' && player && sessionId && (
              <ResultScreen 
                player={player}
                sessionId={sessionId}
                onPlayAgain={handlePlayAgain}
              />
            )}
          </div>

          {/* Leaderboard sidebar */}
          <div className="lg:col-span-1">
            {(gameState === 'quiz' || gameState === 'result' || gameState === 'waiting') && sessionId && (
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
                  <li>• Chọn room phù hợp</li>
                  <li>• Mỗi câu hỏi có 30 giây</li>
                  <li>• Trả lời nhanh để được điểm cao</li>
                  <li>• Xem leaderboard realtime</li>
                  <li>• Quiz có 10 câu hỏi về Marx-Lenin</li>
                </ul>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    🎯 Hệ thống Room Mới
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Admin tạo rooms từ trang quản lý</li>
                    <li>• Player chọn room để tham gia</li>
                    <li>• Mỗi room có giới hạn người tham gia</li>
                    <li>• Real-time updates cho tất cả thành viên</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    🎯 Dành cho giảng viên
                  </h4>
                  <p className="text-sm text-orange-700 mb-3">
                    Truy cập Admin Panel để quản lý rooms:
                  </p>
                  <p className="text-xs text-orange-600 mt-2">
                    💡 Nhập mật khẩu "987" ở footer để truy cập admin
                  </p>
                </div>
              </div>
            )}

            {gameState === 'room-select' && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  🎯 Chọn Room
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Chọn room phù hợp để tham gia</li>
                  <li>• Room "Chờ bắt đầu": Có thể tham gia ngay</li>
                  <li>• Room "Đang diễn ra": Có thể tham gia giữa chừng</li>
                  <li>• Room "Đã kết thúc": Không thể tham gia</li>
                </ul>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-700">
                    ✅ Tên của bạn: <strong>{player?.name}</strong>
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
                <strong>Room ID:</strong> <span className="font-mono text-xs">{sessionId || 'Not selected'}</span>
              </div>
              <div>
                <strong>Player:</strong> {player ? `${player.name} (Score: ${player.score})` : 'None'}
              </div>
              <div>
                <strong>Admin Mode:</strong> {isAdmin ? 'Yes' : 'No'}
              </div>
              <div className="col-span-full">
                <strong>Room Info:</strong> 
                <br />
                <div className="bg-yellow-100 p-2 rounded text-xs mt-1">
                  <div><strong>Current Room:</strong> {sessionId || 'None'}</div>
                  <div><strong>Player URL:</strong> {window.location.origin}/quiz</div>
                  <div><strong>Admin Panel:</strong> {window.location.origin}/admin</div>
                  <div className="text-green-600 mt-1">
                    ✅ New Room-based System Active!
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