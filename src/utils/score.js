// Utility functions for score calculation

/**
 * Tính điểm dựa trên thời gian trả lời
 * @param {boolean} isCorrect - Đáp án có đúng không
 * @param {number} timeTaken - Thời gian đã trả lời (seconds)
 * @param {number} baseScore - Điểm cơ bản (default: 1000)
 * @param {number} penalty - Phạt theo thời gian (default: 10 điểm/giây)
 * @param {number} minScore - Điểm tối thiểu (default: 100)
 * @returns {number} Điểm số cuối cùng
 */
export const calculateScore = (
  isCorrect, 
  timeTaken, 
  baseScore = 1000, 
  penalty = 10, 
  minScore = 100
) => {
  if (!isCorrect) return 0;
  
  // Điểm = baseScore - (timeTaken * penalty), nhưng không nhỏ hơn minScore
  const score = Math.max(baseScore - (timeTaken * penalty), minScore);
  return Math.round(score);
};

/**
 * Format thời gian còn lại
 * @param {number} seconds - Số giây còn lại
 * @returns {string} Thời gian format MM:SS
 */
export const formatTimeRemaining = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Tính thời gian còn lại từ timestamp
 * @param {Date} startTime - Thời gian bắt đầu câu hỏi
 * @param {number} duration - Thời lượng câu hỏi (seconds)
 * @returns {number} Số giây còn lại
 */
export const getTimeRemaining = (startTime, duration = 20) => { // Changed from 30 to 20
  const now = new Date();
  const elapsed = Math.floor((now - startTime) / 1000);
  return Math.max(duration - elapsed, 0);
};