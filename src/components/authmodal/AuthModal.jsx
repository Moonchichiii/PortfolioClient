import React, { useState, Suspense } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import styles from './authmodal.module.css';

const LoginForm = React.lazy(() => import('../../pages/auth/LoginForm'));
const RegistrationForm = React.lazy(() => import('../../pages/auth/RegistrationForm'));

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
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName={styles.modal}
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          {formType === 'login' ? 'Sign In' : 'Sign Up'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Suspense fallback={<LoadingSpinner />}>
          {formType === 'login' ? (
            <LoginForm onAuthSuccess={handleLogin} />
          ) : (
            <RegistrationForm onAuthSuccess={handleRegister} />
          )}
        </Suspense>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <div className="d-flex flex-column align-items-center w-100">
          <div className={styles.socialLogin}>
            {/* <Button variant="outline-primary">Sign in with Google</Button> */}
            {/* <Button variant="outline-primary">Sign in with Facebook</Button> */}
          </div>
          <div className={styles.authSwitch}>
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
