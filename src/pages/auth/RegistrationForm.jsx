import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const RegistrationForm = ({ onAuthSuccess }) => {
  const { register, error } = useAuth();
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
    await register(formData);
    onAuthSuccess();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          isInvalid={!!error}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!error}
        />
      </Form.Group>
      <Form.Group controlId="formPassword1">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password1"
          value={formData.password1}
          onChange={handleChange}
          isInvalid={!!error}
        />
      </Form.Group>
      <Form.Group controlId="formPassword2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          isInvalid={!!error}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default RegistrationForm;
