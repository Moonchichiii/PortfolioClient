import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CurrentUserProvider } from './context/CurrentUserContext';
import { ProfileDataProvider } from './context/ProfileDataContext';
import LoadingSpinner from './components/loadingspinner/LoadingSpinner';
import NavBar from './components/navbar/NavBar';
import AuthModal from './components/authmodal/AuthModal';

const LandingPage = React.lazy(() => import("./pages/landingpage/LandingPage"));
const Home = React.lazy(() => import("./pages/home/Home"));
const About = React.lazy(() => import("./pages/about/About"));
const Contact = React.lazy(() => import("./pages/contact/Contact"));
const Portfolio = React.lazy(() => import("./pages/portfolio/PortFolio"));

const App = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState('login');

  const handleShowAuthModal = (type) => {
    setAuthModalType(type);
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <CurrentUserProvider>
      <ProfileDataProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            {showNavBar && <NavBar onAuthClick={handleShowAuthModal} />}
            <Routes>
              <Route 
                path="/" 
                element={<LandingPage onScrollToHome={() => setShowNavBar(true)} />} 
              />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </Suspense>
          <AuthModal 
            initialType={authModalType} 
            show={showAuthModal} 
            handleClose={handleCloseAuthModal} 
          />
        </Router>
      </ProfileDataProvider>
    </CurrentUserProvider>
  );
};

export default App;

