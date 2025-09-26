import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Utility functions for managing quiz sessions
 */

/**
 * Tìm session hiện tại đang active hoặc session mới nhất trong ngày
 * @returns {Promise<string>} Session ID
 */
export const getCurrentSessionId = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Tìm sessions của ngày hôm nay, sắp xếp theo thời gian tạo (mới nhất trước)
    const sessionsQuery = query(
      collection(db, 'sessions'),
      where('date', '==', today),
      orderBy('createdAt', 'desc'),
      limit(5) // Chỉ lấy 5 session gần nhất
    );
    
    const snapshot = await getDocs(sessionsQuery);
    
    if (snapshot.empty) {
      // Chưa có session nào hôm nay -> tạo session đầu tiên
      return `${today}_1`;
    }
    
    // Tìm session đang active (chưa finished)
    for (const docSnap of snapshot.docs) {
      const sessionData = docSnap.data();
      if (!sessionData.isFinished) {
        console.log('Found active session:', docSnap.id);
        return docSnap.id;
      }
    }
    
    // Tất cả sessions đều đã finished -> tạo session mới
    const latestSessionId = snapshot.docs[0].id;
    const sessionNumber = extractSessionNumber(latestSessionId);
    const newSessionNumber = sessionNumber + 1;
    const newSessionId = `${today}_${newSessionNumber}`;
    
    console.log('Creating new session:', newSessionId);
    return newSessionId;
    
  } catch (error) {
    console.error('Error getting current session:', error);
    // Fallback: tạo session với timestamp
    const today = new Date().toISOString().split('T')[0];
    return `${today}_${Date.now()}`;
  }
};

/**
 * Trích xuất số thứ tự từ session ID
 * @param {string} sessionId - ID của session (format: YYYY-MM-DD_N)
 * @returns {number} Số thứ tự của session
 */
export const extractSessionNumber = (sessionId) => {
  const parts = sessionId.split('_');
  if (parts.length >= 2) {
    const number = parseInt(parts[parts.length - 1]);
    return isNaN(number) ? 1 : number;
  }
  return 1;
};

/**
 * Tạo session ID mới với số thứ tự tăng dần
 * @param {string} date - Ngày (YYYY-MM-DD)
 * @param {number} number - Số thứ tự
 * @returns {string} Session ID mới
 */
export const generateSessionId = (date, number) => {
  return `${date}_${number}`;
};

/**
 * Kiểm tra xem có session nào đang active không
 * @param {string} date - Ngày cần kiểm tra
 * @returns {Promise<string|null>} Session ID đang active hoặc null
 */
export const getActiveSession = async (date) => {
  try {
    const sessionsQuery = query(
      collection(db, 'sessions'),
      where('date', '==', date),
      where('isFinished', '==', false),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    
    const snapshot = await getDocs(sessionsQuery);
    
    if (!snapshot.empty) {
      const activeSession = snapshot.docs[0];
      console.log('Found active session:', activeSession.id);
      return activeSession.id;
    }
    
    return null;
  } catch (error) {
    console.error('Error finding active session:', error);
    return null;
  }
};

/**
 * Lấy danh sách tất cả sessions trong ngày
 * @param {string} date - Ngày (YYYY-MM-DD)
 * @returns {Promise<Array>} Danh sách sessions
 */
export const getSessionsForDate = async (date) => {
  try {
    const sessionsQuery = query(
      collection(db, 'sessions'),
      where('date', '==', date),
      orderBy('createdAt', 'asc')
    );
    
    const snapshot = await getDocs(sessionsQuery);
    const sessions = [];
    
    snapshot.forEach((doc) => {
      sessions.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return sessions;
  } catch (error) {
    console.error('Error getting sessions for date:', error);
    return [];
  }
};