import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import styles from './AuthForms.module.css';

function RegistrationForm({ onAuthSuccess }) {
  const { error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAuthSuccess(formData);
  };

  return (
    <div className={styles.authFormContainer}>      
      <Form onSubmit={handleSubmit}>
        {error && (
          <Alert variant="danger" className="form-alert">
            {error}
          </Alert>
        )}
        <Form.Group controlId="formUsername" className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!error}
            className={styles.formControl}
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!error}
            className={styles.formControl}
          />
        </Form.Group>
        <Form.Group controlId="formPassword1" className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Password</Form.Label>
          <Form.Control
            type="password"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            isInvalid={!!error}
            className={styles.formControl}
          />
        </Form.Group>
        <Form.Group controlId="formPassword2" className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            isInvalid={!!error}
            className={styles.formControl}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className={styles.buttonPrimary}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default RegistrationForm;
