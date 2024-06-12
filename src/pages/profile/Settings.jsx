import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { axiosMultipart } from '../../api/ApiConfig';
import styles from './profile.module.css';

function Settings() {
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError('');
    try {
      await axiosMultipart.put('auth/user/', {
        username: formData.username,
        password: formData.newPassword,
        current_password: formData.currentPassword,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setFieldErrors(error.response.data);
      } else {
        setGeneralError('An error occurred while updating settings.');
      }
    }
  };

  return (
    <Container className={styles.settings}>
      <div className={styles.formContainer}>
        <h2>Settings</h2>
        <Form onSubmit={handleSubmit}>
          {generalError && <Alert variant="danger">{generalError}</Alert>}
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!fieldErrors.username}
            />
            <Form.Control.Feedback type="invalid">
              {fieldErrors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formCurrentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              isInvalid={!!fieldErrors.current_password}
            />
            <Form.Control.Feedback type="invalid">
              {fieldErrors.current_password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              isInvalid={!!fieldErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {fieldErrors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Settings
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Settings;
