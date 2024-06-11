import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './sidebar.module.css';

function Sidebar({ onAuthClick }) {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.nav}>
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
        <div className={styles.navLink} onClick={() => onAuthClick('login')}>
          <FontAwesomeIcon icon={faUser} /> Account
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
