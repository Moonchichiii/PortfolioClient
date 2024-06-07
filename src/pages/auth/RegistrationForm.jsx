import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

function RegistrationForm({ onAuthSuccess }) {
  const { error } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
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
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="danger" className="form-alert">
          {error}
        </Alert>
      )}
      <Form.Group controlId="formUsername" className="form-group">
        <Form.Label className="form-label">
          Username
        </Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          isInvalid={!!error}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formEmail" className="form-group">
        <Form.Label className="form-label">
          Email
        </Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!error}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formPassword1" className="form-group">
        <Form.Label className="form-label">
          Password
        </Form.Label>
        <Form.Control
          type="password"
          name="password1"
          value={formData.password1}
          onChange={handleChange}
          isInvalid={!!error}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formPassword2" className="form-group">
        <Form.Label className="form-label">
          Confirm Password
        </Form.Label>
        <Form.Control
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          isInvalid={!!error}
          className="form-control"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="button-primary">
        Sign Up
      </Button>
    </Form>
  );
}

export default RegistrationForm;
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

function RegistrationForm({ onAuthSuccess }) {
  const { register, error } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
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
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="danger" className="form-alert">
          {error}
        </Alert>
      )}
      <Form.Group controlId="formUsername" className="form-group">
        <Form.Label className="form-label">
          Username
        </Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          isInvalid={!!error}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formEmail" className="form-group">
        <Form.Label className="form-label">
          Email
        </Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!error}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formPassword1" className="form-group">
        <Form.Label className="form-label">
          Password
        </Form.Label>
        <Form.Control
          type="password"
          name="password1"
          value={formData.password1}
          onChange={handleChange}
          isInvalid={!!error}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formPassword2" className="form-group">
        <Form.Label className="form-label">
          Confirm Password
        </Form.Label>
        <Form.Control
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          isInvalid={!!error}
          className="form-control"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="button-primary">
        Sign Up
      </Button>
    </Form>
  );
}

export default RegistrationForm;
