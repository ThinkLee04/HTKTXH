# 🔐 Bảo mật thông tin nhạy cảm

## Biến môi trường (.env)

### Cấu hình
Dự án sử dụng biến môi trường để bảo vệ thông tin nhạy cảm như API keys, database URLs, etc.

1. **Sao chép file template:**
   ```bash
   cp .env.example .env
   ```

2. **Cập nhật thông tin trong `.env`:**
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

   # Development Mode
   VITE_DEV_MODE=false

   # Firestore Emulator (cho development)
   VITE_USE_EMULATOR=false
   VITE_EMULATOR_HOST=localhost
   VITE_EMULATOR_PORT=8080
   ```

### Sử dụng trong code

```javascript
// Truy cập biến môi trường trong Vite
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

// Kiểm tra development mode
if (import.meta.env.DEV) {
  console.log('Development mode');
}
```

### Bảo mật

#### ✅ Làm gì:
- Sử dụng prefix `VITE_` cho biến cần thiết ở client-side
- Thêm `.env` vào `.gitignore`
- Tạo `.env.example` làm template
- Không hardcode thông tin nhạy cảm trong source code

#### ❌ Không làm gì:
- Commit file `.env` lên Git
- Chia sẻ API keys công khai
- Để thông tin nhạy cảm trong source code
- Sử dụng production keys cho development

## Files quan trọng

### `.env` 
- Chứa thông tin thực tế
- Không được commit lên Git
- Chỉ sử dụng trên máy local/server

### `.env.example`
- Template cho người khác
- Có thể commit lên Git
- Không chứa thông tin thực tế

### `.gitignore`
```
# Environment files
.env
.env.*
!.env.example
```

## Production Deployment

Khi deploy lên production:

1. **Vercel/Netlify:** Thêm environment variables trong dashboard
2. **Railway/Render:** Cấu hình qua giao diện web
3. **VPS/Server:** Tạo file `.env` trên server

## Firebase Security

### Firestore Rules
Cấu hình rules cho Firestore để bảo vệ dữ liệu:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Quiz data - chỉ đọc
    match /quiz-data/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    // Sessions - có thể đọc ghi
    match /sessions/{sessionId} {
      allow read, write: if true;
      match /players/{playerId} {
        allow read, write: if true;
      }
    }
  }
}
```

### API Key Restrictions
Trong Firebase Console → API Keys:
- Giới hạn API key chỉ cho domain cụ thể
- Không cho phép access từ mọi nơi

## Kiểm tra bảo mật

```bash
# Kiểm tra file .env có được ignore không
git status

# Nếu .env xuất hiện, loại bỏ khỏi Git:
git rm --cached .env
git commit -m "Remove .env from tracking"
```

## Troubleshooting

### Lỗi "Environment variable not found"
1. Kiểm tra file `.env` có tồn tại không
2. Kiểm tra tên biến có prefix `VITE_` không
3. Restart development server sau khi thay đổi `.env`

### Lỗi Firebase connection
1. Kiểm tra tất cả Firebase config variables
2. Kiểm tra Firebase project settings
3. Kiểm tra Firebase rules