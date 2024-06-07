import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <h3>About Me</h3>
            <p>
              I am a passionate web developer specializing in creating beautiful
              and functional websites.
            </p>
          </div>
          <div className={styles.footerColumn}>
            <h3>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/portfolio">Portfolio</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Follow Me</h3>
            <div className={styles.socialIcons}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://github.com/Moonchichiii"
                target="_blank"
                rel="noopener noreferrer"
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