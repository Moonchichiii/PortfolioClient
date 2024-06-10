import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Sidebar from '../components/sidebar/Sidebar';
import styles from './layout.module.css';

function Layout({ children, onAuthClick }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className={styles.layout}>
      <Header onAuthClick={onAuthClick} />
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
