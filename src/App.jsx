import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CurrentUserProvider } from './context/CurrentUserContext';
import { ProfileDataProvider } from './context/ProfileDataContext';
import LoadingSpinner from './components/loadingspinner/LoadingSpinner';
import NavBar from './components/navbar/NavBar';

const LandingPage = React.lazy(() => import("./pages/landingpage/LandingPage"));
const About = React.lazy(() => import("./pages/about/About"));
const LoginForm = React.lazy(() => import("./pages/auth/LoginForm"));
const RegisterForm = React.lazy(() => import("./pages/auth/RegistrationForm"));

const App = () => {
  return (
    <CurrentUserProvider>
      <ProfileDataProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
            <NavBar />
          </Suspense>
        </Router>
      </ProfileDataProvider>
    </CurrentUserProvider>
  );
};

export default App;
