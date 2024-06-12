import React from 'react';
import styles from './about.module.css';

function About() {
  return (
    <section id="about-section" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h2 className={styles.subTitle}>Technical Skills</h2>
            <ul className={styles.skillList}>
              <li>HTML5, CSS3, JavaScript, React</li>
              <li>Python, Django for server-side programming</li>
              <li>Git for version control, VS Code for development, Chrome DevTools for debugging</li>
            </ul>
            <h2 className={styles.subTitle}>Professional Experience</h2>
            <ul className={styles.experienceList}>
              <li>Web Developer, Self-Employed (October 2023 - Present)</li>
            </ul>
          </div>
          <div className={styles.col}>
            <h2 className={styles.subTitle}>Education</h2>
            <ul className={styles.educationList}>              
              <li>Certification in Full Stack Web Development</li>
            </ul>
            <h2 className={styles.subTitle}>Projects</h2>
            <ul className={styles.projectList}>
              <li>Responsive Portfolio Website</li>
              <li>Full Stack E-commerce Application</li>
              <li>Interactive Data Visualization Dashboard</li>
            </ul>
          </div>
        </div>
        <div className={`${styles.row} ${styles.mt4}`}>
          <div className={styles.col}>
            <div className={`${styles.skillCard} ${styles.skillCardHtml}`}>
              <h3>HTML</h3>
              <p>Experienced in building semantic and accessible web pages.</p>
            </div>
          </div>
          <div className={styles.col}>
            <div className={`${styles.skillCard} ${styles.skillCardCss}`}>
              <h3>CSS</h3>
              <p>Skilled in creating responsive layouts and modern designs.</p>
            </div>
          </div>
          <div className={styles.col}>
            <div className={`${styles.skillCard} ${styles.skillCardJs}`}>
              <h3>JavaScript</h3>
              <p>Proficient in adding interactivity and functionality to websites.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
