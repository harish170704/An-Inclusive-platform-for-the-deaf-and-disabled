import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4">Accessible Learning Platform</h1>
      <p className="lead mb-5">Empowering children with disabilities through accessible education tools.</p>

      <Row className="justify-content-center mb-4">
        <Col xs={12} md={6} lg={3} className="mb-3">
          <Link to="/sign-language">
            <Button variant="primary" className="w-100">Sign Language Translator</Button>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-3">
          <Link to="/text-to-speech">
            <Button variant="success" className="w-100">Text to Speech</Button>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-3">
          <Link to="/speech-to-text">
            <Button variant="warning" className="w-100">Speech to Text</Button>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-3">
          <Link to="/settings">
            <Button variant="dark" className="w-100">Accessibility Settings</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
