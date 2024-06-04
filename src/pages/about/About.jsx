import React from 'react';
import styles from './about.module.css';
import NavBar from '../../components/navbar/NavBar';

const About = () => {
  return (
    <section id="about-section" className={styles.about}>
      <NavBar />
      <h2>About Me</h2>
      <p>This is the about section where you can add information about yourself or the site.</p>
    </section>
  );
};

export default About;
