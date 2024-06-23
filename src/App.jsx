import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingSpinner from './components/loadingspinner/LoadingSpinner';
import AuthModal from './components/authmodal/AuthModal';
import ProtectedRoute from './routes/ProtectedRoute';
import ErrorBoundaryWithNavigate from './components/commons/ErrorBoundary';

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
              <ErrorBoundaryWithNavigate>
                <LandingPage onAuthClick={handleShowAuthModal} />
              </ErrorBoundaryWithNavigate>
            }
          />
          <Route
            path="/home"
            element={
              <ErrorBoundaryWithNavigate>
                <Home />
              </ErrorBoundaryWithNavigate>
            }
          />
          <Route
            path="/about"
            element={
              <ErrorBoundaryWithNavigate>
                <About />
              </ErrorBoundaryWithNavigate>
            }
          />
          <Route
            path="/portfolio"
            element={
              <ErrorBoundaryWithNavigate>
                <Portfolio />
              </ErrorBoundaryWithNavigate>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <ErrorBoundaryWithNavigate>
                  <Dashboard />
                </ErrorBoundaryWithNavigate>
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
