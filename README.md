# Marx-Lenin Economic Theory Learning App

Một ứng dụng web học thuật hiện đại để học về học thuyết kinh tế - xã hội theo chủ nghĩa Mác - Lênin, được xây dựng bằng React.js với TailwindCSS và Framer Motion.

## ✨ Tính năng chính

### 📚 Nội dung học tập
- **Intro**: Câu hỏi mở đầu với hiệu ứng typewriter
- **Timeline**: 6 hình thái kinh tế - xã hội với scroll storytelling
- **Kiến trúc thượng tầng & Cơ sở hạ tầng**: Layout 3 cột với animation tương tác
- **Lực lượng sản xuất & Quan hệ sản xuất**: Minh họa bằng gear animations
- **Ví dụ thực tế**: 4 ứng dụng của học thuyết trong đời sống

### 🧠 Quiz tương tác
- 10 câu hỏi trắc nghiệm về học thuyết Marx-Lenin
- Countdown timer 15 phút
- Leaderboard lưu trữ kết quả trong localStorage
- Xem lại đáp án sau khi hoàn thành

### 🤖 Hướng dẫn AI Usage
- Nguyên tắc sử dụng AI trong học tập
- Liêm chính học thuật
- 4 nguyên tắc vàng khi sử dụng AI

## 🛠️ Công nghệ sử dụng

- **React.js 18**: Framework chính với functional components và hooks
- **Vite**: Build tool hiện đại
- **TailwindCSS**: Styling framework với custom animations
- **Framer Motion**: Animation library cho các hiệu ứng mượt mà
- **React Router**: Navigation giữa các trang

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 16+ 
- npm hoặc yarn

### Cài đặt
```bash
# Clone dự án hoặc tải về workspace
cd HTKTXH

# Cài đặt dependencies
npm install

# Cấu hình biến môi trường
cp .env.example .env
# Cập nhật thông tin Firebase trong file .env

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

⚠️ **Quan trọng:** Bạn cần cấu hình Firebase trước khi chạy ứng dụng. Xem hướng dẫn chi tiết trong `FIREBASE_SETUP.md`

Ứng dụng sẽ chạy tại `http://localhost:5173`

## 📁 Cấu trúc dự án

```
src/
├── components/
│   ├── Intro.jsx                    # Trang giới thiệu
│   ├── Timeline.jsx                 # Timeline các hình thái KT-XH
│   ├── SuperstructureInfrastructure.jsx  # Kiến trúc thượng tầng & Cơ sở hạ tầng
│   ├── ProductiveRelations.jsx      # Lực lượng SX & Quan hệ SX
│   ├── RealWorldExamples.jsx        # Ví dụ thực tế
│   └── FooterNav.jsx               # Navigation footer
├── pages/
│   ├── MainPage.jsx                # Trang chính

│   └── QuizPage.jsx               # Trang quiz
├── App.jsx                        # Router setup
├── App.css                        # Custom styles
├── index.css                      # Global styles với TailwindCSS
└── main.jsx                       # Entry point
```

## 🎯 Tính năng nổi bật

### Animations và UX
- **Smooth scrolling**: Cuộn mượt mà giữa các section
- **Fade-in effects**: Hiệu ứng hiện từ từ khi scroll
- **Slide animations**: Animation trượt từ trái/phải
- **Typewriter effect**: Hiệu ứng đánh máy cho text
- **Gear animations**: Bánh răng quay cho phần sản xuất
- **Responsive design**: Tương thích mobile và desktop

### Quiz System
- **Local Storage**: Lưu trữ leaderboard không cần backend
- **Real-time countdown**: Đồng hồ đếm ngược thời gian thực
- **Progress tracking**: Theo dõi tiến độ làm bài
- **Review mode**: Xem lại câu trả lời sau khi hoàn thành
- **Scoring system**: Tính điểm và xếp hạng tự động

### Educational Content
- **6 hình thái kinh tế - xã hội**: Từ cộng sản nguyên thủy đến cộng sản chủ nghĩa
- **Mối quan hệ cơ sở - thượng tầng**: Minh họa tương tác qua lại
- **Quan hệ sản xuất**: Giải thích mâu thuẫn và thống nhất
- **Ứng dụng thực tiễn**: Liên hệ với Việt Nam và thế giới hiện đại

## 🎨 Thiết kế và Animations

### Color Scheme
- **Primary**: Gradient xanh dương đến tím
- **Secondary**: Vàng cam cho highlights
- **Background**: Dark theme với gradients
- **Accent colors**: Cyan, green, purple cho các section khác nhau

### Animation Types
- **Entry animations**: fadeIn, slideIn từ các hướng
- **Hover effects**: Scale, translate, color transitions
- **Scroll-triggered**: Animations khi element vào viewport
- **Loading animations**: Gear rotations, pulse effects
- **Navigation transitions**: Smooth page transitions

## 📱 Responsive Design

- **Desktop**: Full experience với layout 3 cột
- **Tablet**: Layout điều chỉnh phù hợp
- **Mobile**: Stack layout, timeline thu gọn
- **Touch-friendly**: Buttons và interactions phù hợp mobile

## 🔧 Customization

### Thêm câu hỏi mới
Chỉnh sửa mảng `questions` trong `src/pages/QuizPage.jsx`:

```javascript
const questions = [
  {
    question: "Câu hỏi của bạn?",
    options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
    correct: 0 // Index của đáp án đúng (0-3)
  }
];
```

### Thay đổi thời gian quiz
Chỉnh sửa `QUIZ_TIME_MINUTES` trong `QuizPage.jsx`

### Tùy chỉnh animation
Chỉnh sửa `tailwind.config.js` để thêm keyframes mới

## 📖 Tài liệu tham khảo

- [React Documentation](https://react.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 🤝 Đóng góp

Dự án được tạo ra với mục đích học tập. Mọi đóng góp để cải thiện nội dung giáo dục và trải nghiệm người dùng đều được hoan nghênh.

## 📄 License

MIT License - Tự do sử dụng cho mục đích giáo dục và phi lợi nhuận.

---

**Lưu ý**: Đây là ứng dụng học tập, nội dung mang tính chất tham khảo. Người học nên kết hợp với các tài liệu chính thống khác để có hiểu biết đầy đủ về học thuyết Marx-Lenin.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
