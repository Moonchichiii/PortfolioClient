import React from 'react';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <h3>Mats Gonthier Gustafsson</h3>
            <p>
              France, Toulouse 31000 
            </p>
          </div>
          <div className={styles.footerColumn}>
            <h3>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="home" smooth={true} duration={500} offset={-60}>Home</Link>
              </li>
              <li>
                <Link to="about" smooth={true} duration={500} offset={-60}>About</Link>
              </li>
              <li>
                <Link to="portfolioSection" smooth={true} duration={500} offset={-60}>Portfolio</Link>
              </li>
              <li>
                <Link to="contact" smooth={true} duration={500} offset={-60}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Contact Me</h3>
            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  className={styles.formControl}
                  id="name"                  
                  name="name"
                  aria-required="true"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  className={styles.formControl}
                  id="email"
                  name="email"
                  aria-required="true"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Your Message</label>
                <textarea
                  className={styles.formControl}
                  id="message"
                  rows="3"
                  placeholder="Your Message"
                  name="message"
                  aria-required="true"
                  required
                />
              </div>
              <button type="submit" className={styles.btn}>
                Send Message
              </button>
            </form>
          </div>
          <div className={styles.footerColumn}>
            <h3>Follow Me</h3>
            <div className={styles.socialIcons}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://github.com/Moonchichiii"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2024 My Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;