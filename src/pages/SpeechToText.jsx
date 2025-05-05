import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Form } from 'react-bootstrap';

function SpeechToText() {
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (e) => {
        setTranscript(e.results[0][0].transcript);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
  };

  return (
    <Container className="text-center mt-5">
      <h2>Speech to Text</h2>
      <Form>
        <Form.Group controlId="sttOutput">
          <Form.Label className="visually-hidden">Speech transcript</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Transcript appears here"
            aria-label="Speech transcript"
            value={transcript}
            readOnly
          />
        </Form.Group>
        <Button className="mt-3" onClick={startListening} variant="secondary" aria-label="Start speech recognition">
          🎤 Listen
        </Button>
      </Form>
    </Container>
  );
}

export default SpeechToText;
