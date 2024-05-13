// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style/Header.css'; // Импорт стилей
import './style/PublicationList.css'
import './style/FilterPanel.css'
import './style/PublicationDetails.css'
import './style/UserProfilePage.css';
import LoginPage from './Auth/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import MyLibraryPage from './pages/MyLibraryPage';
import NotificationsPage from './pages/NotificationsPage';
import PublicationListPage from './pages/PublicationListPage'; // Импорт компонента PublicationListPage
import AuthorProfilePage from './pages/AuthorProfilePage';
import PublicationDetails from './components/PublicationDetails'
import Header from './components/Header'; // Импорт компонента Header
import JournalPublicationsPage from './pages/JournalPublicationsPage'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Header loggedIn={loggedIn} onLogout={handleLogout} /> {/* Используем компонент Header */}
        <Routes>
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/library" element={<MyLibraryPage />} />
          <Route path="/notifications" element={<NotificationsPage/>} />
          <Route path="/author/:authorId" element={<AuthorProfilePage />} /> {/* Этот маршрут должен быть изменен на PublicationListPage */}
          <Route path="/publication" element={<PublicationListPage/>}/> {/* Это правильный маршрут для PublicationListPage */}
          <Route path="/publication/:publicationId" element={<PublicationDetails />} />
          <Route path="/journal/:journalId" element={<JournalPublicationsPage />} />
          <Route path="/" element={loggedIn ? <h2>Welcome to the App!</h2> : <LoginPage onLogin={handleLogin} />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
