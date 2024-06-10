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
      <div className="container">
        <h1 className={styles.title}>Welcome to My Portfolio</h1>
        <p className={styles.subtitle}>Showcasing my work and projects</p>
        <NavLink to="/portfolio" className={`${styles.button} button-primary`}>
          View Projects
        </NavLink>
        <section className={styles.introSection}>
          <h2 className={styles.introTitle}>About Me</h2>
          {showIntroText && (
            <>
              <p className={styles.introText}>
                I am a passionate web developer specializing in creating beautiful
                and functional websites. My journey in web development started with
                a love for design and an enthusiasm for coding. I enjoy bringing
                ideas to life on the web, creating seamless user experiences and
                visually appealing designs.
              </p>
              <p className={styles.introText}>
                With a unique combination of experience in both the culinary sector
                and web development, I have recently redirected my career towards
                frontend development. Through self-learning and practical
                application, I have acquired substantial knowledge in HTML, CSS,
                JavaScript, and an introduction to Python and Django for server-side
                programming. My previous experience has taught me the importance of
                attention to detail and independence, qualities that I now apply in
                web development to create engaging and functional websites.
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
