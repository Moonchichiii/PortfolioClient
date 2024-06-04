import React, { useState, Suspense } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import '../css/components/authmodal.module.css';

const LoginForm = React.lazy(() => import('../../pages/auth/LoginForm'));
const RegisterForm = React.lazy(() => import('../../pages/auth/RegistrationForm'));

function AuthModal({ initialType = 'login' }) {
  const [show, setShow] = useState(false);
  const [formType, setFormType] = useState(initialType);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const switchForm = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {formType === 'login' ? 'Sign In' : 'Sign Up'}
      </Button>

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
            <div className="auth-switch mt-3">
              {formType === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <Button variant="link" onClick={switchForm}>
                    Sign up
                  </Button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <Button variant="link" onClick={switchForm}>
                    Sign in
                  </Button>
                </span>
              )}
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AuthModal;
