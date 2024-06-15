import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './sidebar.module.css';

function Sidebar({ onAuthClick }) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <div className={styles.hamburger} onClick={handleToggle}>
        <div className={`${styles.bars} ${show ? styles.transform1 : ''}`} id="bar1"></div>
        <div className={`${styles.bars} ${show ? styles.transform2 : ''}`} id="bar2"></div>
        <div className={`${styles.bars} ${show ? styles.transform3 : ''}`} id="bar3"></div>
      </div>
      <div className={styles.sidebar}>
        <nav className={styles.nav}>
          <Link to="home" smooth duration={500} offset={-60} className={styles.navLink}>
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <Link to="about" smooth duration={500} offset={-60} className={styles.navLink}>
            <FontAwesomeIcon icon={faUser} /> About
          </Link>
          <Link to="portfolioSection" smooth duration={500} offset={-60} className={styles.navLink}>
            <FontAwesomeIcon icon={faBriefcase} /> Portfolio
          </Link>
          <Link to="footer" smooth duration={500} offset={-60} className={styles.navLink}>
            <FontAwesomeIcon icon={faEnvelope} /> Contact
          </Link>
          <div className={styles.navLink} onClick={() => onAuthClick('login')}>
            <FontAwesomeIcon icon={faUser} /> Account
          </div>
        </nav>
      </div>
      <Offcanvas show={show} onHide={handleToggle} className={styles.sidebarOffcanvas}>
        <Offcanvas.Body>
          <nav className={styles.nav}>
            <Link to="home" smooth duration={500} offset={-60} className={styles.navLink} onClick={handleToggle}>
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <Link to="about" smooth duration={500} offset={-60} className={styles.navLink} onClick={handleToggle}>
              <FontAwesomeIcon icon={faUser} /> About
            </Link>
            <Link to="portfolioSection" smooth duration={500} offset={-60} className={styles.navLink} onClick={handleToggle}>
              <FontAwesomeIcon icon={faBriefcase} /> Portfolio
            </Link>
            <Link to="footer" smooth duration={500} offset={-60} className={styles.navLink} onClick={handleToggle}>
              <FontAwesomeIcon icon={faEnvelope} /> Contact
            </Link>
            <div className={styles.navLink} onClick={() => { onAuthClick('login'); handleToggle(); }}>
              <FontAwesomeIcon icon={faUser} /> Account
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
