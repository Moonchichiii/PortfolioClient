import React from 'react';
import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import styles from './LayOut.module.css';

const Layout = ({ children, onAuthClick }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <NavBar onAuthClick={onAuthClick} />
      </header>
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
