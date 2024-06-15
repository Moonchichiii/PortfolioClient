import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { axiosMultipart } from '../../api/ApiConfig';
import { setUser } from '../auth/authSlice';
import styles from './settings.module.css';

function Settings() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    avatar: null,
    username: '',
    currentPassword: '',
    newPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        bio: user.bio || '',
        location: user.location || '',
        avatar: user.avatar || null,
        username: user.username || '',
        currentPassword: '',
        newPassword: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError('');
    const form = new FormData();
    form.append('bio', formData.bio);
    form.append('location', formData.location);
    form.append('username', formData.username);
    if (formData.avatar) {
      form.append('avatar', formData.avatar);
    }
    if (formData.currentPassword && formData.newPassword) {
      form.append('current_password', formData.currentPassword);
      form.append('password', formData.newPassword);
    }
    try {
      const response = await axiosMultipart.put('profiles/me/', form);
      dispatch(setUser(response.data));
    } catch (error) {
      if (error.response && error.response.data) {
        setFieldErrors(error.response.data);
      } else {
        setGeneralError('An error occurred while updating the profile.');
      }
    }
  };

  return (
    <Container className={styles.settings}>
      <div className={styles.formContainer}>
        <h2>Settings</h2>
        <Form onSubmit={handleSubmit}>
          {generalError && <Alert variant="danger">{generalError}</Alert>}
          <Form.Group controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              isInvalid={!!fieldErrors.bio}
            />
            <Form.Control.Feedback type="invalid">
              {fieldErrors.bio}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              isInvalid={!!fieldErrors.location}
            />
            <Form.Control.Feedback type="invalid">
              {fieldErrors.location}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formAvatar">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              name="avatar"
              onChange={handleFileChange}
              isInvalid={!!fieldErrors.avatar}
            />
            <Form.Control.Feedback type="invalid">
              {fieldErrors.avatar}
            </Form.Control.Feedback>
          </Form.Group>
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
            Save Changes
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Settings;
