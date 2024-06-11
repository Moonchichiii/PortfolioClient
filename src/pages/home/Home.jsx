import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './home.module.css';

function Home() {
  const [showIntroText, setShowIntroText] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowIntroText(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector(`.${styles.introSection}`);
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <section className={styles.heroSection}>
          <div className={styles.textBox}>
            <h1 className={styles.title}>Welcome to My Portfolio</h1>
            <p className={styles.subtitle}>Showcasing my work and projects</p>
            <NavLink to="/portfolio" className={`${styles.button} button-primary`}>
              View Projects
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
