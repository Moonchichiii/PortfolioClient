import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.contact}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Contact Me</h2>
        <div className="row">
          <div className="col-md-6">
            <form className={styles.contactForm}>
              <div className="form-group">
                <label htmlFor="formName">Name</label>
                <input
                  type="text"
                  id="formName"
                  className="form-control"
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="formEmail">Email</label>
                <input
                  type="email"
                  id="formEmail"
                  className="form-control"
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="formMessage">Message</label>
                <textarea
                  id="formMessage"
                  className="form-control"
                  rows="5"
                  placeholder="Your Message"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <div className={styles.contactInfo}>
              <p>Or follow me on social media for more updates...</p>
              <div className={styles.socialIcons}>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
