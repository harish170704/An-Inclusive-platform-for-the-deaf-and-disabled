import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function SignLanguageDisplay() {
  const { state } = useLocation();
  const textInput = (state?.textInput || '').toUpperCase();

  const signMap = {
    A: 'public/sign/A.png', B: '/sign/B.png', C: '/sign/C.png',
    D: '/sign/D.png', E: '/sign/E.png', F: '/sign/F.png',
    G: '/sign/G.png', H: '/sign/H.png', I: '/sign/I.png',
    J: '/sign/J.png', K: '/sign/K.png', L: '/sign/L.png',
    M: '/sign/M.png', N: '/sign/N.png', O: '/sign/O.png',
    P: '/sign/P.png', Q: '/sign/Q.png', R: '/sign/R.png',
    S: '/sign/S.png', T: '/sign/T.png', U: '/sign/U.png',
    V: '/sign/V.png', W: '/sign/W.png', X: '/sign/X.png',
    Y: '/sign/Y.png', Z: '/sign/Z.png',
  };

  // headerImage will be the image for the first character (if valid)
  const headerImage = signMap[textInput.charAt(0)];

  // build the grid columns for every letter
  const cols = textInput.split('').map((c,i) => {
    const src = signMap[c];
    if (!src) return null;
    return (
      <Col key={i} xs={6} sm={4} md={3} lg={2} className="mb-3">
        <Card role="img" aria-label={`Sign for ${c}`}>
          <Card.Img src={src} alt={`Sign language for ${c}`} className="img-fluid"/>
        </Card>
      </Col>
    );
  });

  return (
    <Container className="text-center mt-5">
      <h2 className="d-flex align-items-center justify-content-center">
        Sign Language for “{textInput}”
        {headerImage && (
          <img
            src={headerImage}
            alt={`Sign for ${textInput.charAt(0)}`}
            className="img-fluid ms-3"
            style={{ maxWidth: '50px', height: 'auto' }}
          />
        )}
      </h2>

      <Row className="justify-content-center mt-4">
        {cols.filter(Boolean).length > 0
          ? cols
          : <p aria-live="polite">Type A–Z in the input and click “Convert” to see the signs.</p>
        }
      </Row>
    </Container>
  );
}
