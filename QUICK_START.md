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

**🎯 QUAN TRỌNG: URLs đơn giản hơn bao giờ hết!**

**Giảng viên (Admin):**
- Truy cập: `http://localhost:5173/quiz?admin=true`
- Chọn "Tham gia session hiện tại" hoặc "Tạo quiz mới"
- Nhập tên nhóm → "Tiến vào Admin Panel"
- Click "🚀 Bắt đầu Quiz" khi sẵn sàng
- Sau mỗi 30 giây, click "➡️ Câu tiếp theo"
- Click "🏁 Kết thúc Quiz" ở câu cuối

**Học sinh (Students):**
- Truy cập: `http://localhost:5173/quiz`
- Hệ thống tự động tìm session phù hợp (đang hoạt động hoặc tạo mới)
- Nhập tên → "Tham gia Quiz"
- Chờ giảng viên bắt đầu → trả lời câu hỏi

**✅ Hệ thống Session Thông minh:** 
- 🔄 **Multiple sessions/ngày**: `2025-09-26_1`, `2025-09-26_2`, `2025-09-26_3`...
- 🎯 **Auto-join**: Học sinh tự động join session đang active
- 👨‍🏫 **Admin choice**: Giảng viên chọn join session hiện tại hoặc tạo mới
- 🚀 **Smart detection**: Khi session kết thúc, tự động tăng số thứ tự cho session mới

### 🔍 **Cách test để đảm bảo hoạt động:**

**Scenario 1: Quiz đầu tiên trong ngày**
1. **Tab 1 (Admin)**: `http://localhost:5173/quiz?admin=true`
   - Sẽ hiện "Tạo Quiz Mới (2025-09-26_1)"
   - Click "Tạo Quiz Mới" → Nhập tên → "Bắt đầu Quiz"

2. **Tab 2 (Student)**: `http://localhost:5173/quiz`
   - Tự động join session `2025-09-26_1`
   - Nhập tên → Chờ quiz bắt đầu

**Scenario 2: Quiz thứ 2 trong ngày (sau khi quiz 1 kết thúc)**
1. **Tab 1 (Admin)**: `http://localhost:5173/quiz?admin=true`
   - Sẽ thấy: Session cũ "Đã hoàn thành" + "Tạo Quiz Mới (2025-09-26_2)"
   - Có thể chọn "Tham gia session cũ" (để xem kết quả) hoặc "Tạo mới"

2. **Tab 2 (Student)**: `http://localhost:5173/quiz`
   - Tự động join session mới nhất `2025-09-26_2`

**✅ Kiểm tra thành công:**
- Cả Admin và Student thấy cùng Session ID trong header
- Debug Info (cuối trang) hiển thị session giống nhau
- Khi Admin start, Student tự động chuyển từ "waiting" sang "quiz"

## 📱 URLs quan trọng
- **Trang chủ**: `http://localhost:5173/`
- **Quiz Player**: `http://localhost:5173/quiz`
- **Quiz Admin**: `http://localhost:5173/quiz?admin=true`


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