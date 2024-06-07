import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Alert,
} from 'react-bootstrap';
import { axiosInstance, axiosMultipart } from '../../api/ApiConfig';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get('portfolio/');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      const response = await axiosMultipart.post('portfolio/', formData);
      setProjects((prevProjects) => [...prevProjects, response.data]);
      handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        setFieldErrors(error.response.data);
      } else {
        setGeneralError('An error occurred while adding the project.');
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Projects</h2>
          <Button variant="primary" onClick={handleShow}>
            Add Project
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {generalError && <Alert variant="danger">{generalError}</Alert>}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                isInvalid={!!fieldErrors.title}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!fieldErrors.description}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Projects;
