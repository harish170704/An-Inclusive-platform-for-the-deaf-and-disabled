import React from 'react';
import { Card } from 'react-bootstrap';

export default function SignToEnglishDisplay({ letter }) {
  return (
    <Card className="mt-3">
      <Card.Body>
        <h5>Detected Letter</h5>
        <p aria-live="polite" style={{ fontSize: '2rem' }}>
          {letter || '—'}
        </p>
      </Card.Body>
    </Card>
  );
}
