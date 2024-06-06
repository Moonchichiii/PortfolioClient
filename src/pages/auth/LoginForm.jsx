import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const LoginForm = ({ onAuthSuccess }) => {
  const { login, error } = useAuth();
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
    await login(formData.identifier, formData.password);
    onAuthSuccess();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formIdentifier">
        <Form.Label>Username or Email</Form.Label>
        <Form.Control
          type="text"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          isInvalid={!!error}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!error}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
