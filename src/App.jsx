import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoadingSpinner from './components/loadingspinner/LoadingSpinner';
import Layout from './pages/layout/LayOut';
import AuthModal from './components/authmodal/AuthModal';
import ProtectedRoute from './routes/ProtectedRoute';
import ErrorBoundary from './components/Common/ErrorBoundary';

const LandingPage = React.lazy(() => import('./pages/landingpage/LandingPage'));
const Home = React.lazy(() => import('./pages/home/Home'));
const About = React.lazy(() => import('./pages/about/About'));
const Contact = React.lazy(() => import('./pages/contact/Contact'));
const Portfolio = React.lazy(() => import('./pages/portfolio/PortFolio'));
const Dashboard = React.lazy(() => import('./pages/dashboard/DashBoard'));

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState('login');

  const handleShowAuthModal = (type) => {
    setAuthModalType(type);
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const Wrapper = ({ children }) => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';
    return isLandingPage ? children : <Layout onAuthClick={handleShowAuthModal}>{children}</Layout>;
  };

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Wrapper>
          <Routes>
            <Route path="/" element={<ErrorBoundary><LandingPage /></ErrorBoundary>} />
            <Route path="/home" element={<ErrorBoundary><Home /></ErrorBoundary>} />
            <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
            <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
            <Route path="/portfolio" element={<ErrorBoundary><Portfolio /></ErrorBoundary>} />
            <Route path="/dashboard/*" element={<ProtectedRoute><ErrorBoundary><Dashboard /></ErrorBoundary></ProtectedRoute>} />
          </Routes>
        </Wrapper>
      </Suspense>
      <AuthModal
        initialType={authModalType}
        show={showAuthModal}
        handleClose={handleCloseAuthModal}
      />
    </Router>
  );
};

export default App;