// src/components/Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Accessible Education</h5>
            <p>Empowering learning for everyone, everywhere.</p>
          </Col>
          <Col md={3}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/translator" className="text-white text-decoration-none">Translator</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Contact</h6>
            <p>Email: support@inclusiveedu.org</p>
            <p>Phone: +91-1234567890</p>
          </Col>
        </Row>
        <hr className="bg-white"/>
        <p className="text-center mb-0">&copy; 2025 Accessible Education. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
