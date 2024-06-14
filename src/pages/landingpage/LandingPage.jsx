import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';
import Footer from '../../components/footer/Footer';
import Sidebar from '../../components/sidebar/Sidebar';
import ChatBot from '../../components/chatbot/ChatBot'; 
import styles from './land.module.css';

const Home = React.lazy(() => import('../home/Home'));
const About = React.lazy(() => import('../about/About'));
const Portfolio = React.lazy(() => import('../port/Port'));

const sections = [
  { id: 'home', Component: Home },
  { id: 'about', Component: About },
  { id: 'portfolio', Component: Portfolio },
];

function LandingPage({ onAuthClick }) {
  const [visibleSections, setVisibleSections] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false); 

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
          if (entry.target.id === 'home' && entry.isIntersecting) {
            setTimeout(() => {
              setShowSidebar(true);
              setShowChatBot(true); 
            }, 500);
          }
        });
      },
      { threshold: 0.1 }
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
      {showSidebar && <Sidebar onAuthClick={onAuthClick} />}
      {showChatBot && <ChatBot />} 
      <div className={styles.hero}>
        <motion.h1
          className={styles.heroText}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Portfolio
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Scroll or click to enter
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Link
            className={styles.scrollIndicator}
            to="home"
            smooth
            duration={500}
            offset={-60}
          >
            ▼
          </Link>
        </motion.div>
      </div>
      <div className={styles.parallax} />
      {sections.map(({ id, Component }) => (
        <section key={id} id={id} className={styles.section}>
          {visibleSections.includes(id) && (
            <Suspense fallback={<LoadingSpinner />}>
              <Component />
            </Suspense>
          )}
        </section>
      ))}
      <Footer />
    </div>
  );
}

export default LandingPage;
