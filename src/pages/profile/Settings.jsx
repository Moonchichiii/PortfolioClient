import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { axiosMultipart } from '../../api/ApiConfig';

const Settings = () => {
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
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
    try {
      const response = await axiosMultipart.put('/api/auth/user/', {
        username: formData.username,
        password: formData.newPassword,
        current_password: formData.currentPassword,
      });
      console.log('Settings updated', response.data);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Settings</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Settings
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
