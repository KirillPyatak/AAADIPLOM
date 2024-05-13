// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Импорт Link для навигации

function Header({ loggedIn, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <button className="menu-button" onClick={toggleMenu}>Menu</button>
      {loggedIn && (
        <nav className={`menu ${menuOpen ? 'open' : ''}`}>
          <ul>
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
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
