import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Join player vào một room/session cụ thể
 * @param {string} sessionId - Room ID để join
 * @param {object} playerData - Thông tin player {name, score, answers}
 * @returns {object} - Player data với ID từ Firestore
 */
export const joinPlayerToSession = async (sessionId, playerData) => {
  try {
    console.log('Joining player to session:', sessionId, playerData);
    
    // Tạo player document trong subcollection players của session
    const playersRef = collection(db, 'sessions', sessionId, 'players');
    const playerDoc = await addDoc(playersRef, {
      name: playerData.name,
      score: playerData.score || 0,
      answers: playerData.answers || [],
      joinedAt: serverTimestamp()
    });

    console.log('✅ Player joined successfully with ID:', playerDoc.id);
    
    return {
      id: playerDoc.id,
      name: playerData.name,
      score: playerData.score || 0,
      answers: playerData.answers || []
    };
    
  } catch (error) {
    console.error('❌ Error joining player to session:', error);
    throw error;
  }
};

export default joinPlayerToSession;