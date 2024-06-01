import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../Auth/LoginPage';
import RegisterPage from '../Auth/RegisterPage';
import '../style/Header.css';

function Header({ loggedIn, onLogout, setLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const closeModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <header className="header">
      <button className="menu-button" onClick={toggleMenu}>Menu</button>
      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {loggedIn ? (
            <>
              <li onClick={closeMenu}>
                <Link to="/profile">My Profile</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to="/publication">Список статей</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to="/library">My Library</Link>
              </li>
              <li onClick={closeMenu}>
                <Link to="/notifications">Notifications</Link>
              </li>
              <li onClick={onLogout}>
                <button>Logout</button>
              </li>
            </>
          ) : (
            <div className="auth-buttons">
              <button onClick={handleLoginClick}>Войти</button>
              <button onClick={handleRegisterClick}>Зарегистрироваться</button>
            </div>
          )}
        </ul>
      </nav>

      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <LoginPage setLoggedIn={setLoggedIn} closeModal={closeModal} />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <RegisterPage />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
