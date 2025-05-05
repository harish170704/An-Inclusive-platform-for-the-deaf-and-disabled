import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import Webcam from 'react-webcam';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import * as fp from 'fingerpose';

import EnglishToSignDisplay from '../components/EnglishToSignDisplay';
import SignToEnglishDisplay from '../components/SignToEnglishDisplay';

// Build the fingerpose estimator
function buildEstimator() {
  const letters = [];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  alphabet.forEach(letter => {
    const desc = new fp.GestureDescription(letter);
    switch (letter) {
      case 'A':
        fp.Finger.all.filter(f => f !== fp.Finger.Thumb)
          .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
        desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
        break;
      // Add cases B–Z similarly...
      default:
        break;
    }
    letters.push(desc);
  });
  return new fp.GestureEstimator(letters);
}

export default function SignLanguageTranslator() {
  // English → Sign
  const [textInput, setTextInput] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTextTranslate = e => {
    e.preventDefault();
    setTranslatedText(textInput);
  };

  // Sign → English
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [gestureDetected, setGestureDetected] = useState('—');

  useEffect(() => {
    handpose.load().then(m => setModel(m));
  }, []);

  const handleCapture = async () => {
    if (!model || !webcamRef.current) return;
    const predictions = await model.estimateHands(webcamRef.current.video);
    if (predictions.length) {
      const est = await buildEstimator().estimate(predictions[0].landmarks, 7.5);
      if (est.gestures.length) {
        const best = est.gestures.reduce((a, b) => (a.score > b.score ? a : b));
        setGestureDetected(best.name);
      } else {
        setGestureDetected('—');
      }
    } else {
      setGestureDetected('—');
    }
  };

  return (
    <Container fluid className="py-4">
      <Row>
        {/* English → Sign */}
        <Col xs={12} md={6} className="mb-4">
          <Card>
            <Card.Body>
              <h4>English → Sign</h4>
              <Form onSubmit={handleTextTranslate}>
                <Form.Group controlId="textToSign">
                  <Form.Control
                    type="text"
                    placeholder="Type text here…"
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" className="mt-3 w-100">Translate</Button>
              </Form>
              <EnglishToSignDisplay text={translatedText} />
            </Card.Body>
          </Card>
        </Col>
        {/* Sign → English */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <h4>Sign → English</h4>
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={{ facingMode: 'user' }}
              />
              <Button
                variant="success"
                className="mt-3 w-100"
                onClick={handleCapture}
                disabled={!model}
              >
                {model ? 'Detect Letter' : 'Loading model…'}
              </Button>
              <SignToEnglishDisplay letter={gestureDetected} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
