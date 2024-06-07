import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faBriefcase,
  faEnvelope,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import styles from './navbar.module.css';

function NavBar({ onAuthClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    toggleMenu();
    logout();
  };

  useEffect(() => {
    setIsOpen(false);
    document.getElementById('burger').checked = false;
  }, [location]);

  return (
    <header className={styles.navbar}>
      <nav
        className={`${isOpen ? styles.navbarLinksOpen : styles.navbarLinks} ${isOpen && styles.show}`}
      >
        <NavLink to="/home" className={styles.navLink} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faHome} /> Home
        </NavLink>
        <NavLink to="/about" className={styles.navLink} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faUser} /> About
        </NavLink>
        <NavLink
          to="/portfolio"
          className={styles.navLink}
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faBriefcase} /> Portfolio
        </NavLink>
        <NavLink to="/contact" className={styles.navLink} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faEnvelope} /> Contact
        </NavLink>

        <div className={`${styles.authSection} ${styles.offcanvasAuth}`}>
          {isAuthenticated ? (
            <button
              type="button"
              className={styles.authButtons}
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          ) : (
            <button
              className={styles.authButtons}
              onClick={() => onAuthClick('login')}
            >
              Account
            </button>
          )}
        </div>
      </nav>

      <div className={`${styles.authSection} ${styles.desktopAuth}`}>
        {isAuthenticated ? (
          <button
            type="button"
            className={styles.authButtons}
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        ) : (
          <button
            className={styles.authButtons}
            onClick={() => onAuthClick('login')}
          >
            Account
          </button>
        )}
      </div>
      <label className={styles.burger} htmlFor="burger">
        <input
          type="checkbox"
          id="burger"
          className={styles.checkbox}
          onChange={toggleMenu}
        />
        <span />
        <span />
        <span />
      </label>
    </header>
  );
}

export default NavBar;
