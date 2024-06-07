import React, { useState, Suspense } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';

import useAuth from '../../hooks/useAuth';

import styles from './authmodal.module.css';

const LoginForm = React.lazy(() => import('../../pages/auth/LoginForm'));
const RegistrationForm = React.lazy(
  () => import('../../pages/auth/RegistrationForm'),
);

function AuthModal({ initialType = 'login', show, handleClose }) {
  const [formType, setFormType] = useState(initialType);
  const { login, register } = useAuth();

  const switchForm = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  const handleLogin = (identifier, password) => {
    login(identifier, password, handleClose);
  };

  const handleRegister = (userData) => {
    register(userData, handleClose);
  };

  return (
    <Modal
      className={styles.modal}
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {formType === 'login' ? 'Sign In' : 'Sign Up'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Suspense fallback={<LoadingSpinner />}>
          {formType === 'login' ? (
            <LoginForm onAuthSuccess={handleLogin} />
          ) : (
            <RegistrationForm onAuthSuccess={handleRegister} />
          )}
        </Suspense>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-center">
          <div className={`${styles.authSwitch} mt-3`}>
            {formType === 'login' ? (
              <span>
                Don&apos;t have an account?{' '}
                <Button
                  variant="link"
                  onClick={switchForm}
                  className={styles.authSwitchButton}
                >
                  Sign up
                </Button>
              </span>
            ) : (
              <span>
                Don&apos;t have an account?{' '}
                <Button
                  variant="link"
                  onClick={switchForm}
                  className={styles.authSwitchButton}
                >
                  Sign in
                </Button>
              </span>
            )}
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default AuthModal;
