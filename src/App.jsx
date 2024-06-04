import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CurrentUserProvider } from './context/CurrentUserContext';
import { ProfileDataProvider } from './context/ProfileDataContext';
import LoadingSpinner from './components/loadingspinner/LoadingSpinner';
import NavBar from './components/navbar/NavBar';

const LandingPage = React.lazy(() => import("./pages/landingpage/LandingPage"));
const Home = React.lazy(() => import("./pages/home/Home"));
const About = React.lazy(() => import("./pages/about/About"));
const Contact = React.lazy(() => import("./pages/contact/Contact"));
const Portfolio = React.lazy(() => import("./pages/portfolio/PortFolio"));
const LoginForm = React.lazy(() => import("./pages/auth/LoginForm"));
const RegisterForm = React.lazy(() => import("./pages/auth/RegistrationForm"));

const App = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <CurrentUserProvider>
      <ProfileDataProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            {showNavBar && <NavBar />}
            <Routes>
              <Route 
                path="/" 
                element={<LandingPage onScrollToHome={() => setShowNavBar(true)} />} 
              />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </Suspense>
        </Router>
      </ProfileDataProvider>
    </CurrentUserProvider>
  );
};

export default App;
