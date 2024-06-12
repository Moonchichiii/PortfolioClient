import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { axiosMultipart } from '../../api/ApiConfig';
import { setUser } from '../auth/authSlice';
import styles from './profile.module.css';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    avatar: null,
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        bio: user.bio || '',
        location: user.location || '',
        avatar: user.avatar || null,
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
    if (formData.avatar) {
      form.append('avatar', formData.avatar);
    }
    try {
      const response = await axiosMultipart.put('profiles/', form);
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
    <Container className={styles.profile}>
      <div className={styles.formContainer}>
        <h2>Profile</h2>
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
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Profile;
