import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/navbar/NavBar';
import Footer from '../components/footer/Footer';
import styles from './layout.module.css';

function Layout({ children, onAuthClick }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className={styles.layout}>
      {!isAuthenticated && (
        <header className={styles.header}>
          <NavBar onAuthClick={onAuthClick} />
        </header>
      )}
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
