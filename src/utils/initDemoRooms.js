import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Khởi tạo room demo cho việc test
 */
export const initializeDemoRooms = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  const demoRooms = [
    {
      id: `${today}_demo_room_1_${Date.now()}`,
      name: 'Lớp ML Cơ bản',
      description: 'Room demo cho học viên mới bắt đầu học Marx-Lenin',
      maxPlayers: 30,
      currentPlayers: 0,
      status: 'waiting',
      createdAt: serverTimestamp(),
      date: today,
      createdBy: 'System'
    },
    {
      id: `${today}_demo_room_2_${Date.now() + 1000}`,
      name: 'Ôn thi cuối kỳ',
      description: 'Room ôn tập kiến thức Marx-Lenin cho kỳ thi',
      maxPlayers: 50,
      currentPlayers: 0,
      status: 'waiting', 
      createdAt: serverTimestamp(),
      date: today,
      createdBy: 'System'
    }
  ];

  try {
    for (const room of demoRooms) {
      await setDoc(doc(db, 'quiz-rooms', room.id), room);
      console.log(`✅ Created demo room: ${room.name}`);
    }
    return { success: true, count: demoRooms.length };
  } catch (error) {
    console.error('❌ Error creating demo rooms:', error);
    return { success: false, error };
  }
};

export default initializeDemoRooms;