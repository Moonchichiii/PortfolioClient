import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LayOut.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav>
          <NavLink to="/" className={styles.navLink}>Home</NavLink>
          <NavLink to="/projects" className={styles.navLink}>Projects</NavLink>
          <NavLink to="/contact" className={styles.navLink}>Contact</NavLink>
        </nav>
      </header>
      <main className={styles.mainContent}>
        {children}
      </main>
      <footer className={styles.footer}>
        © 2024 My Portfolio
      </footer>
    </div>
  );
};

export default Layout;
