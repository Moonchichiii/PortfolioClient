import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faUser,
  faBriefcase,
  faEnvelope,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { useCurrentUser } from "../../context/CurrentUserContext";
import LoadingSpinner from "../loadingspinner/LoadingSpinner";
import AuthModal from "../authmodal/AuthModal";
import "../css/components/navbar.module.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <header className="navbar">
      <nav>
        <NavLink to="/" onClick={closeOffCanvas}>
          <FontAwesomeIcon icon={faHome} /> Home
        </NavLink>
        <NavLink to="#about-section" onClick={closeOffCanvas}>
          <FontAwesomeIcon icon={faUser} /> About
        </NavLink>
        <NavLink to="#portfolio" onClick={closeOffCanvas}>
          <FontAwesomeIcon icon={faBriefcase} /> Portfolio
        </NavLink>
        <NavLink to="#contact" onClick={closeOffCanvas}>
          <FontAwesomeIcon icon={faEnvelope} /> Contact
        </NavLink>
      </nav>
      <div>
        {currentUser ? (
          <button className="auth-buttons" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        ) : (
          <>
            <AuthModal initialType="login" />
            <AuthModal initialType="register" />
          </>
        )}
      </div>
      <div className="navbar-toggler" onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          className={isOpen ? "icon-open" : "icon-close"}
        />
      </div>
    </header>
  );
}

export default NavBar;
