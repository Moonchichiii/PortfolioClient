import React, { useState, useEffect, Suspense } from "react";
import { Button, Modal } from "react-bootstrap";
import LoadingSpinner from "../loadingspinner/LoadingSpinner";
import styles from "./AuthModal.module.css";
import { useNavigate } from 'react-router-dom';

const LoginForm = React.lazy(() => import("../../pages/auth/LoginForm"));
const RegistrationForm = React.lazy(() =>
  import("../../pages/auth/RegistrationForm")
);

function AuthModal({ initialType = "login", show, handleClose }) {
  const [formType, setFormType] = useState(initialType);
  const navigate = useNavigate();

  const switchForm = () => {
    setFormType(formType === "login" ? "register" : "login");
  };

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    if (window.gapi) {
      window.gapi.load('auth2', function() {
        window.gapi.auth2.init({
          client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com'
        }).then(() => {
          window.gapi.signin2.render('google-login-button', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
          });
        });
      });
    }
  }, [show]);

  const onSuccess = (googleUser) => {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  };

  const onFailure = (error) => {
    console.log(error);
  };


  const handleAuthSuccess = () => {
    setTimeout(() => {
      handleClose();
      navigate('/dashboard');
    }, 1000);
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
          {formType === "login" ? "Sign In" : "Sign Up"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Suspense fallback={<LoadingSpinner />}>
          {formType === "login" ? <LoginForm onAuthSuccess={handleAuthSuccess} /> : <RegistrationForm onAuthSuccess={handleAuthSuccess} />}
        </Suspense>
        <div className={styles.socialLogin}>
          <div className="fb-login-button"
               data-width="150"
               data-size="large"
               data-button-type="login_with"
               data-layout="default"
               data-auto-logout-link="false"
               data-use-continue-as="false">
          </div>
          <div id="google-login-button" className={styles.socialButton}></div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-center">
          <div className={`${styles.authSwitch} mt-3`}>
            {formType === "login" ? (
              <span>
                Don't have an account?{" "}
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
                Already have an account?{" "}
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
