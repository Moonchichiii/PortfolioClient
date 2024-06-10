import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css';

function Header({ onAuthClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.account} onClick={() => onAuthClick('login')}>
        <FontAwesomeIcon icon={faUser} />
        <span className={styles.accountText}>Account</span>
      </div>
    </header>
  );
}

export default Header;
