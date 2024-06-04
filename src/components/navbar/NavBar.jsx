import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBriefcase,
  faEnvelope,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { useCurrentUser } from "../../context/CurrentUserContext";
import LoadingSpinner from "../loadingspinner/LoadingSpinner";
import AuthModal from "../authmodal/AuthModal";
import styles from "./navbar.module.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [authType, setAuthType] = useState('login');
  const { currentUser, isLoading } = useCurrentUser();
  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    toggleMenu();
    logout();
  };

  const closeOffCanvas = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleAuthClick = (type) => {
    setAuthType(type);
    setModalShow(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <header className={styles.navbar}>
      <nav className={isOpen ? styles.navbarLinksOpen : styles.navbarLinks} onClick={closeOffCanvas}>
        <a href="#about-section" className={styles.navLink}>
          <FontAwesomeIcon icon={faUser} /> About
        </a>
        <NavLink to="/portfolio" className={styles.navLink}>
          <FontAwesomeIcon icon={faBriefcase} /> Portfolio
        </NavLink>
        <a href="#contact" className={styles.navLink}>
          <FontAwesomeIcon icon={faEnvelope} /> Contact
        </a>
      </nav>
      <div className={styles.authSection}>
        {currentUser ? (
          <button className={styles.authButtons} onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        ) : (
          <>
            <button className={styles.authButtons} onClick={() => handleAuthClick('login')}>
              Sign In
            </button>
            <button className={styles.authButtons} onClick={() => handleAuthClick('register')}>
              Sign Up
            </button>
          </>
        )}
      </div>
      <input type="checkbox" id="checkbox" className={styles.checkbox} onChange={toggleMenu} />
      <label htmlFor="checkbox" className={styles.toggle}>
        <div className={styles.bars} id={styles.bar1}></div>
        <div className={styles.bars} id={styles.bar2}></div>
        <div className={styles.bars} id={styles.bar3}></div>
      </label>
      <AuthModal show={modalShow} handleClose={() => setModalShow(false)} initialType={authType} />
    </header>
  );
}

export default NavBar;
