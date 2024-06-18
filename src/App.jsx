import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingSpinner from './components/loadingspinner/LoadingSpinner';
import AuthModal from './components/authmodal/AuthModal';
import ProtectedRoute from './routes/ProtectedRoute';
import errorBoundary from './components/common/Error';


const LandingPage = React.lazy(() => import('./pages/landingpage/LandingPage'));
const Dashboard = React.lazy(() => import('./pages/dashboard/DashBoard'));
const Home = React.lazy(() => import('./pages/home/Home'));
const About = React.lazy(() => import('./pages/about/About'));
const Portfolio = React.lazy(() => import('./pages/port/Port'));


function App() {
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
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <LandingPage onAuthClick={handleShowAuthModal} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/home"
            element={
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            }
          />
          <Route
            path="/about"
            element={
              <ErrorBoundary>
                <About />
              </ErrorBoundary>
            }
          />
          <Route
            path="/portfolio"
            element={
              <ErrorBoundary>
                <Portfolio />
              </ErrorBoundary>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <AuthModal
        initialType={authModalType}
        show={showAuthModal}
        handleClose={handleCloseAuthModal}
      />
    </Router>
  );
}

export default App;
