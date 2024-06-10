import React, { Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import LoadingSpinner from './components/loadingspinner/LoadingSpinner';
import Layout from './layout/LayOut';
import AuthModal from './components/authmodal/AuthModal';
import ProtectedRoute from './routes/ProtectedRoute';
import ErrorBoundary from './components/Common/ErrorBoundary';

const LandingPage = React.lazy(() => import('./pages/landingpage/LandingPage'));
const Dashboard = React.lazy(() => import('./pages/dashboard/DashBoard'));

function Wrapper({ children, onAuthClick }) {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  return isLandingPage ? (
    children
  ) : (
    <Layout onAuthClick={onAuthClick}>{children}</Layout>
  );
}

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
        <Wrapper onAuthClick={handleShowAuthModal}>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <LandingPage />
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
        </Wrapper>
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
