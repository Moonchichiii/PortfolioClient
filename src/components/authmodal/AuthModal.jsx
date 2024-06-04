import React, { useState, Suspense } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import styles from './AuthModal.module.css';


const LoginForm = React.lazy(() => import('../../pages/auth/LoginForm'));
const RegisterForm = React.lazy(() => import('../../pages/auth/RegistrationForm'));

function AuthModal({ initialType = 'login', show, handleClose }) {
  const [formType, setFormType] = useState(initialType);

  const switchForm = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{formType === 'login' ? 'Sign In' : 'Sign Up'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Suspense fallback={<LoadingSpinner />}>
          {formType === 'login' ? <LoginForm /> : <RegisterForm />}
        </Suspense>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-center">
          <div className={styles.authSwitch + " mt-3"}>
            {formType === 'login' ? (
              <span>
                Don't have an account?{' '}
                <Button variant="link" onClick={switchForm} className={styles.authSwitchButton}>
                  Sign up
                </Button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <Button variant="link" onClick={switchForm} className={styles.authSwitchButton}>
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
