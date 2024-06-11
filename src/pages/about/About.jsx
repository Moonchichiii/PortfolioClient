import React from 'react';
import styles from './about.module.css';

function About() {
  return (
    <section id="about-section" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.row}>
          <div className={styles.col}>
            <p className={styles.introText}>
              I am a passionate web developer with a keen eye for design and an enthusiasm for coding. My journey in web development began with a love for creating beautiful and functional websites. I take pride in bringing ideas to life on the web, ensuring seamless user experiences and visually appealing designs.
            </p>
            <p className={styles.introText}>
              Through self-learning and practical application, I have honed my skills in HTML, CSS, JavaScript, and an introduction to Python and Django for server-side programming. My background in the culinary sector has instilled in me a meticulous attention to detail and a strong work ethic.
            </p>
          </div>
          <div className={styles.col}>
            <h3 className={styles.subTitle}>Technical Skills</h3>
            <ul className={styles.skillList}>
              <li>HTML5, CSS3, JavaScript, React</li>
              <li>Python, Django for server-side programming</li>
              <li>Git for version control, VS Code for development, Chrome DevTools for debugging</li>
            </ul>
            <h3 className={styles.subTitle}>Professional Experience</h3>
            <ul className={styles.experienceList}>
              <li>Web Developer, Self-Employed (October 2023 - Present)</li>
            </ul>
          </div>
        </div>
        <div className={`${styles.row} ${styles.mt4}`}>
          <div className={styles.col}>
            <div className={styles.skillCard}>
              <h3>HTML</h3>
              <p>Experienced in building semantic and accessible web pages.</p>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.skillCard}>
              <h3>CSS</h3>
              <p>Skilled in creating responsive layouts and modern designs.</p>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.skillCard}>
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
