import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import styles from './AuthForms.module.css';

function LoginForm({ onAuthSuccess }) {
  const { error } = useAuth(); 
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
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
    await onAuthSuccess(formData.identifier, formData.password);
  };

  return (
    <div className={styles.authFormContainer}>      
      <Form onSubmit={handleSubmit}>
        {error && (
          <Alert variant="danger" className="form-alert">
            {error}
          </Alert>
        )}
        <Form.Group controlId="formIdentifier" className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Username or Email</Form.Label>
          <Form.Control
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            isInvalid={!!error}
            className={styles.formControl}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!error}
            className={styles.formControl}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className={styles.buttonPrimary}>
          Sign In
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
