import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { axiosMultipart } from '../../api/ApiConfig';
import { setUser } from '../../pages/auth/authSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    avatar: null,
  });

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
    const form = new FormData();
    form.append('bio', formData.bio);
    form.append('location', formData.location);
    if (formData.avatar) {
      form.append('avatar', formData.avatar);
    }
    try {
      const response = await axiosMultipart.put('/profiles/', form);
      dispatch(setUser(response.data));
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Error updating profile';
      console.error('Error updating profile:', errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAvatar">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
