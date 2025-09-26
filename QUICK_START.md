# 🚀 Hệ thống Quiz Marx-Lenin - Hướng dẫn nhanh

## ✅ Đã hoàn thành
- [x] ✅ Firebase Realtime Quiz System
- [x] ✅ Admin Panel cho nhóm thuyết trình  
- [x] ✅ Player Interface với realtime updates
- [x] ✅ 10 câu hỏi mẫu về Marx-Lenin
- [x] ✅ Leaderboard realtime
- [x] ✅ Tính điểm theo thời gian trả lời
- [x] ✅ Responsive design

## 🎮 Cách sử dụng

### 1. Thiết lập Firebase (1 lần duy nhất)
- Đọc file `FIREBASE_SETUP.md` để cấu hình Firebase
- Thay đổi config trong `src/firebase.js`

### 2. Chạy Quiz cho lớp học

**🎯 QUAN TRỌNG: Tất cả học sinh và giảng viên dùng cùng URLs sau:**

**Giảng viên (Admin):**
- Truy cập: `http://localhost:5173/quiz?admin=true`
- Nhập tên nhóm → "Tiến vào Admin Panel"
- Click "🚀 Bắt đầu Quiz" khi sẵn sàng
- Sau mỗi 30 giây, click "➡️ Câu tiếp theo"
- Click "🏁 Kết thúc Quiz" ở câu cuối

**Học sinh (Students):**
- Truy cập: `http://localhost:5173/quiz`
- Nhập tên → "Tham gia Quiz"
- Chờ giảng viên bắt đầu → trả lời câu hỏi
- Xem kết quả và leaderboard realtime

**✅ Hệ thống tự động kết nối:** 
- Tất cả người dùng cùng ngày sẽ tự động join vào cùng 1 session
- Không cần chia sẻ session ID riêng
- Admin và học sinh dùng URLs khác nhau nhưng cùng session

### 🔍 **Cách test để đảm bảo hoạt động:**

1. **🎯 Phương pháp đúng - Mở 2 tabs:**
   - Tab 1: `http://localhost:5173/quiz?admin=true` (Giảng viên)
   - Tab 2: `http://localhost:5173/quiz` (Học sinh)
   - ✅ **Cả 2 sẽ tự động join cùng session hôm nay**

2. **❌ Sai lầm thường gặp:**
   - Không dùng URLs có session ID khác nhau
   - Không tự tạo session ID riêng
   - Chỉ cần dùng 2 URLs cơ bản ở trên

3. **Luồng test:**
   - Học sinh: Nhập tên → Thấy "Đang chờ quiz bắt đầu..."
   - Giảng viên: Nhập tên nhóm → Click "Bắt đầu Quiz"
   - Học sinh: Tự động chuyển sang màn hình quiz với câu hỏi đầu tiên
   - ✅ **Cả 2 sẽ thấy cùng session ID trong Debug Info**

## 📱 URLs quan trọng
- **Trang chủ**: `http://localhost:5173/`
- **Quiz Player**: `http://localhost:5173/quiz`
- **Quiz Admin**: `http://localhost:5173/quiz?admin=true`
- **AI Usage**: `http://localhost:5173/ai-usage`

## ⚙️ Tùy chỉnh câu hỏi
Sửa file `src/utils/initFirestore.js` → array `sampleQuestions`

## 🔧 Features chính
- ⏰ **30s mỗi câu** - Đếm ngược realtime
- 🏆 **Điểm theo tốc độ** - Trả lời nhanh = điểm cao
- 📊 **Leaderboard realtime** - Cập nhật ngay lập tức
- 👥 **Multi-player** - Không giới hạn số người chơi
- 📱 **Responsive** - Hoạt động trên mobile
- 🔄 **Auto-sync** - Tất cả đều đồng bộ theo admin

## 🐛 Nếu có lỗi
1. Check console (F12) xem error gì
2. Đảm bảo Firebase config đúng
3. Kiểm tra internet connection
4. Refresh trang và thử lại

---
**Ready to use!** 🎉 Hệ thống đã sẵn sàng cho việc giảng dạy!