// src/components/EnglishToSignDisplay.jsx
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const signMap = {
  A: '/sign/A.png', B: '/sign/B.png', C: '/sign/C.png',
  D: '/sign/D.png', E: '/sign/E.png', F: '/sign/F.png',
  G: '/sign/G.png', H: '/sign/H.png', I: '/sign/I.png',
  J: '/sign/J.png', K: '/sign/K.png', L: '/sign/L.png',
  M: '/sign/M.png', N: '/sign/N.png', O: '/sign/O.png',
  P: '/sign/P.png', Q: '/sign/Q.png', R: '/sign/R.png',
  S: '/sign/S.png', T: '/sign/T.png', U: '/sign/U.png',
  V: '/sign/V.png', W: '/sign/W.png', X: '/sign/X.png',
  Y: '/sign/Y.png', Z: '/sign/Z.png',
};

export default function EnglishToSignDisplay({ text }) {
  const letters = (text || '').toUpperCase().split('');
  const images = letters
    .map((c, i) => signMap[c] && (
      <Col key={i} xs={6} sm={4} md={3} lg={2} className="mb-3">
        <Card role="img" aria-label={`Sign for ${c}`}>
          <Card.Img src={signMap[c]} alt={`Sign for ${c}`} className="img-fluid" />
        </Card>
      </Col>
    ))
    .filter(Boolean);

  if (images.length === 0) {
    return <p aria-live="polite">Enter A–Z above and click “Translate” to see sign images.</p>;
  }

  return <Row className="justify-content-center mt-3">{images}</Row>;
}
