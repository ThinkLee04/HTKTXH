import React, { useState, useEffect } from 'react';
import { getSessionsForDate, getActiveSession, generateSessionId } from '../utils/sessionManager';

/**
 * Component cho phép admin chọn session hoặc tạo session mới
 * @param {function} onSessionSelected - Callback khi session được chọn
 */
const SessionSelector = ({ onSessionSelected }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState('join'); // 'join' hoặc 'create'
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    loadTodaySessions();
  }, []);

  const loadTodaySessions = async () => {
    try {
      const todaySessions = await getSessionsForDate(today);
      setSessions(todaySessions);
      
      // Tự động chọn "join" nếu có session active
      const activeSession = todaySessions.find(s => !s.isFinished);
      if (activeSession) {
        setSelectedAction('join');
      } else {
        setSelectedAction('create');
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinActiveSession = () => {
    const activeSession = sessions.find(s => !s.isFinished);
    if (activeSession) {
      onSessionSelected(activeSession.id, 'join');
    }
  };

  const handleCreateNewSession = () => {
    // Tìm số thứ tự cao nhất và tạo session mới
    let maxNumber = 0;
    sessions.forEach(session => {
      const parts = session.id.split('_');
      if (parts.length >= 2) {
        const num = parseInt(parts[parts.length - 1]);
        if (!isNaN(num) && num > maxNumber) {
          maxNumber = num;
        }
      }
    });
    
    const newSessionId = generateSessionId(today, maxNumber + 1);
    onSessionSelected(newSessionId, 'create');
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-gray-600">Đang tải sessions...</p>
      </div>
    );
  }

  const activeSessions = sessions.filter(s => !s.isFinished);
  const completedSessions = sessions.filter(s => s.isFinished);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        🎯 Chọn Session Quiz
      </h2>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">📅 Hôm nay ({today})</h3>
        <div className="text-sm text-blue-700">
          <div>Tổng sessions: {sessions.length}</div>
          <div>Đang hoạt động: {activeSessions.length}</div>
          <div>Đã hoàn thành: {completedSessions.length}</div>
        </div>
      </div>

      {/* Active Sessions */}
      {activeSessions.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-green-800 mb-3">🟢 Sessions đang hoạt động</h3>
          <div className="space-y-2">
            {activeSessions.map(session => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div>
                  <div className="font-medium text-green-800">{session.id}</div>
                  <div className="text-sm text-green-600">
                    Bởi: {session.createdBy} | Câu: {session.currentQuestionIndex + 1}/{session.totalQuestions}
                  </div>
                </div>
                <button
                  onClick={() => onSessionSelected(session.id, 'join')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Tham gia
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Sessions */}
      {completedSessions.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">✅ Sessions đã hoàn thành</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {completedSessions.map(session => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div>
                  <div className="font-medium text-gray-700">{session.id}</div>
                  <div className="text-sm text-gray-500">
                    Bởi: {session.createdBy} | Hoàn thành lúc: {
                      session.finishedAt ? 
                      new Date(session.finishedAt.toDate()).toLocaleTimeString() : 
                      'N/A'
                    }
                  </div>
                </div>
                <span className="text-gray-500 text-sm">Đã kết thúc</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create New Session */}
      <div className="border-t pt-6">
        <div className="text-center">
          <h3 className="font-semibold text-gray-800 mb-4">Tạo session mới</h3>
          <button
            onClick={handleCreateNewSession}
            className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            🚀 Tạo Quiz Mới ({today}_{sessions.length + 1})
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Session mới sẽ được tạo với ID: {today}_{sessions.length + 1}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      {activeSessions.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Lời khuyên</h4>
          <p className="text-sm text-yellow-700">
            Nếu có session đang hoạt động, bạn nên tham gia thay vì tạo mới để tránh confusion cho học sinh.
          </p>
        </div>
      )}
    </div>
  );
};

export default SessionSelector;