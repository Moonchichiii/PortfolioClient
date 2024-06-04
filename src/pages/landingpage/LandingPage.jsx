import React from 'react';
import '../../css/pages/landingpage.module.css';

const LandingPage = () => {
  const scrollToAbout = () => {
    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      <div className="hero">
        <h1>Welcome to My Portfolio</h1>
        <p>Showcasing My Work</p>
        <div className="scroll-indicator" onClick={scrollToAbout}>▼</div>
      </div>
    </div>
  );
};

export default LandingPage;
