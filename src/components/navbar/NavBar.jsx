import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
import styles from './NavBar.module.css';

const NavBar = ({ onAuthClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    toggleMenu();
    logout();
  };

  return (
    <header className={styles.navbar}>
      <nav className={isOpen ? styles.navbarLinksOpen : styles.navbarLinks}>
        <NavLink to="/home" className={styles.navLink}>
          <FontAwesomeIcon icon={faHome} /> Home
        </NavLink>
        <NavLink to="/about" className={styles.navLink}>
          <FontAwesomeIcon icon={faUser} /> About
        </NavLink>
        <NavLink to="/portfolio" className={styles.navLink}>
          <FontAwesomeIcon icon={faBriefcase} /> Portfolio
        </NavLink>
        <NavLink to="/contact" className={styles.navLink}>
          <FontAwesomeIcon icon={faEnvelope} /> Contact
        </NavLink>
      </nav>
      <div className={styles.authSection}>
        {isAuthenticated ? (
          <button className={styles.authButtons} onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        ) : (
          <>
            <button className={styles.authButtons} onClick={() => onAuthClick('login')}>
              Sign In
            </button>
            <button className={styles.authButtons} onClick={() => onAuthClick('register')}>
              Sign Up
            </button>
          </>
        )}
      </div>
      <input type="checkbox" id="checkbox" className={styles.checkbox} onChange={toggleMenu} />
      <label htmlFor="checkbox" className={styles.toggle}>
        <div className={styles.bars} id={styles.bar1}></div>
        <div className={styles.bars} id={styles.bar2}></div>
        <div className={styles.bars} id={styles.bar3}></div>
      </label>
    </header>
  );
};

export default NavBar;
