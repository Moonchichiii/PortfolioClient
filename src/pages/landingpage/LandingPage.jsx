import React, { useEffect, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import styles from './LandingPage.module.css';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';

const About = React.lazy(() => import('../about/About'));
const Portfolio = React.lazy(() => import('../portfolio/PortFolio'));
const Contact = React.lazy(() => import('../contact/Contact'));

const sections = [
  { id: 'about', Component: About },
  { id: 'portfolio', Component: Portfolio },
  { id: 'contact', Component: Contact },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        navigate('/home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prevSections) => [
              ...prevSections,
              entry.target.id,
            ]);
          }
        });
      },
      { threshold: 0.1 },
    );

    sections.forEach(({ id }) => {
      const sectionElement = document.getElementById(id);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    return () => {
      sections.forEach(({ id }) => {
        const sectionElement = document.getElementById(id);
        if (sectionElement) {
          observer.unobserve(sectionElement);
        }
      });
    };
  }, []);

  return (
    <div className={styles.landingPage}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome to My Portfolio</h1>
        <p className={styles.subtitle}>Scroll or click to enter</p>
        <Link
          className={styles.scrollIndicator}
          to="about"
          smooth={true}
          duration={500}
        >
          ▼
        </Link>
      </div>
      <div className={styles.parallax}></div>
      {sections.map(({ id, Component }) => (
        <section key={id} id={id} className={styles.section}>
          {visibleSections.includes(id) && (
            <Suspense fallback={<LoadingSpinner />}>
              <Component />
            </Suspense>
          )}
        </section>
      ))}
    </div>
  );
};

export default LandingPage;
