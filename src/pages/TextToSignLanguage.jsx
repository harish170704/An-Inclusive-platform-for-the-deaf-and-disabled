import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function TextToSignLanguage() {
  const [textInput, setTextInput] = useState('');
  const navigate = useNavigate();

  // Navigate to the SignLanguageDisplay page, passing the text input
  const handleTextToSign = () => {
    // Navigate with text input as state
    navigate('/SignLanguageDisplay', { state: { textInput } });
  };

  return (
    <Container className="text-center mt-5">
      <h1>Text to Sign Language Converter</h1>
      <p className="lead mb-4">Type a word or sentence, and see the sign language translation.</p>
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Type something..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleTextToSign} variant="primary">Convert to Sign Language</Button>
      </Form>
    </Container>
  );
}

export default TextToSignLanguage;



// import React, { useState } from 'react';
// import { Card, Form, Button, Row, Col, Image } from 'react-bootstrap';

// const signImages = {
//   A: '/signs/A.png', B: '/signs/B.png', C: '/signs/C.png',
//   // Add all letters and their corresponding images
// };

// function TextToSignLanguage() {
//   const [text, setText] = useState('');
//   const [signs, setSigns] = useState([]);

//   const handleConvert = () => {
//     const converted = text.toUpperCase().split('').map(char => {
//       return { char, image: signImages[char] };
//     });
//     setSigns(converted);
//   };

//   return (
//     <Card className="mb-4">
//       <Card.Body>
//         <h4>Text to Sign Language</h4>
//         <Form.Control
//           type="text"
//           placeholder="Enter text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <Button variant="primary" className="mt-3" onClick={handleConvert}>
//           Convert to Sign Language
//         </Button>
        
//         <Row className="mt-3">
//           {signs.map((sign, index) => (
//             <Col key={index} xs={3} className="text-center">
//               {sign.image ? (
//                 <>
//                   <Image src={sign.image} alt={`Sign for ${sign.char}`} fluid />
//                   <p>{sign.char}</p>
//                 </>
//               ) : (
//                 <p>No sign for: {sign.char}</p>
//               )}
//             </Col>
//           ))}
//         </Row>
//       </Card.Body>
//     </Card>
//   );
// }

// export default TextToSignLanguage;