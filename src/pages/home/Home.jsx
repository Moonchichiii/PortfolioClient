import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to My Portfolio</h1>
      <p className={styles.subtitle}>Showcasing my work and projects</p>
      <NavLink to="/projects" className={styles.button}>
        View Projects
      </NavLink>
    </div>
  );
};

export default Home;
