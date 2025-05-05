import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function Translator() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleTranslate = () => {
    // You can add logic for translation here (e.g., use AI, a predefined dictionary, etc.)
    setTranslatedText(inputText); // For now, we're just showing the same text
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">Sign Language Translator</h2>
          <Form>
            <Form.Group controlId="formInputText">
              <Form.Label>Enter Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text to translate"
                value={inputText}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleTranslate} className="mt-3">
              Translate
            </Button>
          </Form>
          {translatedText && (
            <div className="mt-4">
              <h4>Translated to Sign Language:</h4>
              <p>{translatedText}</p> {/* Here, you can implement a Sign Language animation or video */}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Translator;
