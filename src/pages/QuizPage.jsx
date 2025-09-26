import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSnapshot, doc, collection, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import NameAndRoomSelector from '../components/NameAndRoomSelector';
import Quiz from '../components/Quiz';
import ResultScreen from '../components/ResultScreen';
import Leaderboard from '../components/Leaderboard';
import AdminPanel from '../components/AdminPanel';
import WaitingRoom from '../components/WaitingRoom';
import { initializeQuestionsData } from '../utils/initFirestore';

/**
 * Main Quiz Page với vintage style - điều phối toàn bộ luồng quiz
 */
const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const vintagePaperTexture = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTA1NzQwNC1pbWFnZS1qb2I2MzAtYV8xLmpwZw.jpg')";
  
  // State management
  const [gameState, setGameState] = useState('name-room-input'); // 'name-room-input', 'waiting', 'quiz', 'result'
  const [player, setPlayer] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [session, setSession] = useState(null); // Add session data state
  const [sessionLoading, setSessionLoading] = useState(true);
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
          // Player flow: sẽ dùng NameAndRoomSelector
          setSessionLoading(false);
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
    if (sessionId) {
      const unsubscribe = onSnapshot(doc(db, 'sessions', sessionId), (doc) => {
        const sessionData = doc.data();
        console.log('QuizPage - Session update:', sessionData);
        
        if (sessionData) {
          setSession(sessionData); // Update session state
          
          // Logic chuyển state cho player
          if (!isAdmin && gameState === 'waiting' && player) {
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
        }
      });

      return () => unsubscribe();
    }
  }, [gameState, player, sessionId, isAdmin]);

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

  // Handle player joined from NameAndRoomSelector
  const handlePlayerJoined = (playerData, roomId) => {
    console.log('Player joined:', playerData, 'Room:', roomId);
    setPlayer(playerData);
    setSessionId(roomId);
    setGameState('waiting');
  };

  // Handle quiz complete
  const handleQuizComplete = () => {
    setGameState('result');
  };

  // Handle play again
  const handlePlayAgain = () => {
    setPlayer(null);
    setSessionId(null);
    setGameState('name-room-input');
  };

  // Handle back to home
  const handleBackToHome = () => {
    navigate('/');
  };

  if (!dataInitialized || sessionLoading) {
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
          <p className="text-amber-300 text-lg">
            {!dataInitialized ? 'Đang khởi tạo dữ liệu quiz...' : 'Đang tìm session phù hợp...'}
          </p>
        </motion.div>
      </div>
    );
  }

  // Admin panel
  if (isAdmin) {
    return (
      <div>
        {/* AdminPanel component đã có background riêng */}
        <AdminPanel sessionId={sessionId} />
        
        {/* Floating back button */}
        <motion.button
          onClick={handleBackToHome}
          className="fixed top-6 left-6 z-50 bg-amber-600/90 backdrop-blur-sm text-amber-50 px-4 py-2 rounded-xl font-semibold hover:bg-amber-500 transition-all shadow-lg border border-amber-500/50"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Về trang chủ
        </motion.button>
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
        {/* Header với room info */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4 font-serif">
            Học thuyết kinh tế xã hội
          </h1>
          <p className="text-amber-300/80 text-lg mb-4">Marx-Lenin</p>
          
          {sessionId && (
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-amber-600/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-amber-500/40">
                <span className="text-amber-200 font-medium">
                  🏛️ Phòng: <code className="bg-amber-500/20 px-2 py-1 rounded font-mono text-amber-300">{sessionId}</code>
                </span>
              </div>
            </motion.div>
          )}
          
          <motion.button
            onClick={handleBackToHome}
            className="mt-2 px-6 py-2 bg-amber-600/80 backdrop-blur-sm text-amber-50 font-semibold rounded-xl hover:bg-amber-500 transition-all border border-amber-500/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Về trang chủ
          </motion.button>
        </motion.div>

        {/* Main content based on game state */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main quiz area */}
          <div className="lg:col-span-2">
            {gameState === 'name-room-input' && (
              <NameAndRoomSelector 
                onPlayerJoined={handlePlayerJoined}
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
            {(gameState === 'quiz' || gameState === 'waiting') && sessionId && (
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
                  <li>• Mỗi câu hỏi có 20 giây</li>
                  <li>• Trả lời nhanh để được điểm cao</li>
                  <li>• Xem leaderboard realtime</li>
                  <li>• Quiz có 10 câu hỏi về Marx-Lenin</li>
                </ul>
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