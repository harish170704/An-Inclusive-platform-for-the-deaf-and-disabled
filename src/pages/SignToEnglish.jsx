// src/pages/SignToEnglish.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Webcam from 'react-webcam';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import * as fp from 'fingerpose';

// Display component
function SignToEnglishDisplay({ letter }) {
  return (
    <Card className="mt-3">
      <Card.Body>
        <h5>Detected Letter</h5>
        <p aria-live="polite" style={{ fontSize: '2rem', margin: 0 }}>
          {letter || '—'}
        </p>
      </Card.Body>
    </Card>
  );
}

export default function SignToEnglish() {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detectedLetter, setDetectedLetter] = useState('');

  // Load Handpose
  useEffect(() => {
    handpose.load().then(m => setModel(m));
  }, []);

  // Build estimator with A–Z
  const buildEstimator = () => {
    const letters = [];
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
      const desc = new fp.GestureDescription(letter);

      switch (letter) {
        case 'A':
          desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
          [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'B':
          [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]
            .forEach(f => {
              desc.addCurl(f, fp.FingerCurl.NoCurl, 1.0);
              desc.addDirection(f, fp.FingerDirection.VerticalUp, 0.75);
            });
          desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
          break;

        case 'C':
          // all fingers half-curl to form “C”
          fp.Finger.all.forEach(f => desc.addCurl(f, fp.FingerCurl.HalfCurl, 1.0));
          break;

        case 'D':
          desc.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
          [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'E':
          fp.Finger.all.forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'F':
          desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
          desc.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
          [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'G':
          desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
          desc.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
          [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'H':
          [fp.Finger.Index, fp.Finger.Middle].forEach(f => {
            desc.addCurl(f, fp.FingerCurl.NoCurl, 1.0);
            desc.addDirection(f, fp.FingerDirection.HorizontalRight, 0.75);
          });
          [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'I':
          desc.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
          [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'J':
          // treat J same as I (dynamic stroke ignored)
          desc.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
          [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'K':
          [fp.Finger.Index, fp.Finger.Middle].forEach(f => desc.addCurl(f, fp.FingerCurl.NoCurl, 1.0));
          desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
          [fp.Finger.Ring, fp.Finger.Pinky].forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'L':
          desc.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
          desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
          [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'M':
          // thumb under three fingers
          [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
          desc.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
          break;

        case 'N':
          // thumb under two fingers
          [fp.Finger.Index, fp.Finger.Middle].forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'O':
          fp.Finger.all.forEach(f => desc.addCurl(f, fp.FingerCurl.NoCurl, 1.0));
          break;

        case 'P':
          // like K but downward
          [fp.Finger.Index, fp.Finger.Middle].forEach(f => desc.addCurl(f, fp.FingerCurl.NoCurl, 1.0));
          desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
          break;

        case 'Q':
          // like G but downward
          desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
          desc.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
          break;

        case 'R':
          // index & middle crossed (approx as both no curl)
          [fp.Finger.Index, fp.Finger.Middle].forEach(f => desc.addCurl(f, fp.FingerCurl.NoCurl, 1.0));
          break;

        case 'S':
          fp.Finger.all.forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'T':
          desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
          desc.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
          break;

        case 'U':
          [fp.Finger.Index, fp.Finger.Middle].forEach(f => desc.addCurl(f, fp.FingerCurl.NoCurl, 1.0));
          break;

        case 'V':
          [fp.Finger.Index, fp.Finger.Middle].forEach(f => desc.addCurl(f, fp.FingerCurl.NoCurl, 1.0));
          break;

        case 'W':
          [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.NoCurl, 1.0));
          break;

        case 'X':
          desc.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
          [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky, fp.Finger.Thumb]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;

        case 'Y':
          desc.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
          desc.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
          break;

        case 'Z':
          // index no curl (dynamic), others full
          desc.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
          [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky, fp.Finger.Thumb]
            .forEach(f => desc.addCurl(f, fp.FingerCurl.FullCurl, 1.0));
          break;
      }

      letters.push(desc);
    });
    return new fp.GestureEstimator(letters);
  };

  const estimator = buildEstimator();

  const handleDetect = async () => {
    if (!model || !webcamRef.current) return;
    const predictions = await model.estimateHands(webcamRef.current.video);
    if (predictions.length) {
      const est = await estimator.estimate(predictions[0].landmarks, 7.5);
      if (est.gestures.length) {
        const best = est.gestures.reduce((p, c) => (p.score > c.score ? p : c));
        setDetectedLetter(best.name);
      } else setDetectedLetter('—');
    } else setDetectedLetter('—');
  };

  return (
    <Container className="text-center mt-5">
      <h1>Sign → English (ASL Fingerspelling)</h1>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <Card className="p-3">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={{ facingMode: 'user' }}
            />
            <Button
              variant="success"
              className="mt-3"
              onClick={handleDetect}
              disabled={!model}
            >
              {model ? 'Detect Letter' : 'Loading model...'}
            </Button>
            <SignToEnglishDisplay letter={detectedLetter} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
