import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './landingpage.module.css';

const LandingPage = ({ onScrollToHome }) => {
  const navigate = useNavigate();

  const scrollToHome = () => {
    navigate('/home');
    onScrollToHome();
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.hero}>
        <h1>Welcome to My Portfolio</h1>
        <p>Showcasing My Work</p>
        <div className={styles.scrollIndicator} onClick={scrollToHome}>▼</div>
      </div>
    </div>
  );
};

export default LandingPage;
