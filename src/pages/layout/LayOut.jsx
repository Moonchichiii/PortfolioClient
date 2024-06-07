import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "./LayOut.module.css";

function Layout({ children, onAuthClick }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <NavBar onAuthClick={onAuthClick} />
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
