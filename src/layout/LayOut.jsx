import React from 'react';
import { useLocation } from 'react-router-dom';
// import Header from '../components/header/Header';
// import Footer from '../components/footer/Footer';
// import Sidebar from '../components/sidebar/Sidebar';
import styles from './layout.module.css';

function Layout({ children, onAuthClick }) {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className={styles.layout}>
      {/* {!isLandingPage && <Header onAuthClick={onAuthClick} />} */}
      {/* {!isLandingPage && <Sidebar />} */}
      {/* <main className={styles.mainContent}>{children}</main> */}
      {/* {!isLandingPage && <Footer />} */}
    </div>
  );
}

export default Layout;
