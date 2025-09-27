# 🔥 Firebase Quiz System Setup Guide

## Tổng quan
Hệ thống quiz realtime sử dụng Firebase Firestore để đồng bộ dữ liệu giữa người chơi và admin trong thời gian thực.

## 📋 Cách thiết lập Firebase

### 1. Tạo Firebase Project
1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" và làm theo hướng dẫn
3. Tạo Firestore database (chọn production mode hoặc test mode)

### 2. Cấu hình Firebase
1. Vào Project Settings → General → Your apps
2. Click biểu tượng Web (</>) để tạo Firebase Web App
3. **Cấu hình biến môi trường:**

   a. Sao chép file template:
   ```bash
   cp .env.example .env
   ```

   b. Cập nhật thông tin Firebase trong file `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-actual-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-actual-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

   ⚠️ **Quan trọng:** File `.env` chứa thông tin nhạy cảm và đã được thêm vào `.gitignore`. Không commit file này lên Git!

### 3. Firestore Security Rules
Trong Firebase Console → Firestore Database → Rules, dùng rules này cho development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Quiz data - read only
    match /quiz-data/{document} {
      allow read: if true;
      allow write: if false; // Chỉ init qua code
    }
    
    // Quiz sessions - ai cũng có thể đọc và ghi
    match /sessions/{sessionId} {
      allow read, write: if true;
      
      // Players subcollection
      match /players/{playerId} {
        allow read, write: if true;
      }
    }
  }
}
```

## 🎮 Cách sử dụng hệ thống

### Cho người chơi:
1. Truy cập `/quiz` 
2. Nhập tên để join quiz
3. Chờ admin start quiz
4. Trả lời câu hỏi trong 30 giây
5. Xem kết quả và leaderboard

### Cho admin (nhóm thuyết trình):
1. Truy cập `/quiz?admin=true` hoặc click link "Admin Panel" 
2. Nhập tên nhóm
3. Click "Bắt đầu Quiz" để start
4. Click "Câu tiếp theo" sau mỗi câu hỏi (sau 30s)
5. Click "Kết thúc Quiz" ở câu cuối

## 📊 Cấu trúc dữ liệu Firestore

### Collection: `quiz-data`
```
quiz-data/
  questions/
    - questions: Array<Question>
    - totalQuestions: number
    - lastUpdated: timestamp
    - version: string
```

### Collection: `sessions`
```
sessions/
  {sessionId}/
    - currentQuestionIndex: number
    - questionStartTime: timestamp  
    - isFinished: boolean
    - totalQuestions: number
    - createdBy: string
    - createdAt: timestamp
    
    players/ (subcollection)
      {playerId}/
        - name: string
        - score: number
        - answers: Array<Answer>
        - joinedAt: timestamp
```

### Cấu trúc Answer object:
```javascript
{
  questionIndex: number,
  answer: string,
  timeTaken: number, // seconds
  isCorrect: boolean,
  score: number,
  answeredAt: timestamp
}
```

## ⚡ Real-time Features

1. **Leaderboard Updates**: Tự động cập nhật khi có người trả lời
2. **Question Sync**: Tất cả clients tự động nhận câu hỏi mới
3. **Timer Sync**: Đồng hồ đếm ngược dựa trên server timestamp
4. **Result Display**: Hiển thị kết quả đồng thời cho tất cả

## 🔧 Tùy chỉnh

### Thay đổi câu hỏi:
Sửa file `src/utils/initFirestore.js` → array `sampleQuestions`

### Thay đổi thời gian:
- Trong `Quiz.jsx`: thay đổi `duration = 30` 
- Trong `score.js`: điều chỉnh công thức tính điểm

### Thay đổi điểm số:
Sửa hàm `calculateScore` trong `src/utils/score.js`

## 🚀 Chạy ứng dụng

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Truy cập:
# - Người chơi: http://localhost:5173/quiz
# - Admin: http://localhost:5173/quiz?admin=true
```

## 🐛 Troubleshooting

### Lỗi Firebase connection:
- Kiểm tra internet connection
- Verify Firebase config trong `firebase.js`
- Check Firestore rules

### Dữ liệu không sync:
- Mở Developer Tools → Console xem error
- Kiểm tra Firestore rules
- Refresh trang và thử lại

### Quiz không bắt đầu:
- Admin phải click "Bắt đầu Quiz" trước
- Kiểm tra session ID có giống nhau không

## 📱 Demo URLs

Để test system:
1. Mở 2 tabs:
   - Tab 1: `http://localhost:5173/quiz?admin=true` (Admin)
   - Tab 2: `http://localhost:5173/quiz` (Player)
2. Start quiz từ admin tab
3. Join từ player tab và chơi!

---

**Lưu ý**: Đây là version demo, production cần thêm authentication và security rules chi tiết hơn.