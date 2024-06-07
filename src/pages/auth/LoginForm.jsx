import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

function LoginForm({ onAuthSuccess }) {
  const { error } = useAuth(); // Adjusted here
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
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="danger" className="form-alert">
          {error}
        </Alert>
      )}
      <Form.Group controlId="formIdentifier" className="form-group">
        <Form.Label className="form-label">Username or Email</Form.Label>
        <Form.Control
          type="text"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          isInvalid={!!error}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formPassword" className="form-group">
        <Form.Label className="form-label">Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!error}
          className="form-control"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="button-primary">
        Sign In
      </Button>
    </Form>
  );
}

export default LoginForm;
