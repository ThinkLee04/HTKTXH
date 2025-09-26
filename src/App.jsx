import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AiUsagePage from './pages/AiUsagePage';
import QuizPage from './pages/QuizPage';
import AdminPage from './pages/AdminPage';
import AdminPageSimple from './pages/AdminPageSimple';
import TestAdminPage from './pages/TestAdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/ai-usage" element={<AiUsagePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-simple" element={<AdminPageSimple />} />
          <Route path="/admin-test" element={<TestAdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
