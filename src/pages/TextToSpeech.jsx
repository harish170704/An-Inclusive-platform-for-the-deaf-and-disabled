import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function TextToSpeech() {
  const [text, setText] = useState('');

  const handleSpeak = () => {
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    window.speechSynthesis.speak(utter);
  };

  return (
    <Container className="text-center mt-5">
      <h2>Text to Speech</h2>
      <Form>
        <Form.Group controlId="ttsInput">
          <Form.Label className="visually-hidden">Text to speak</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text"
            aria-label="Text to speak"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" onClick={handleSpeak} variant="primary" aria-label="Speak text">
          🔊 Speak
        </Button>
      </Form>
    </Container>
  );
}

export default TextToSpeech;
