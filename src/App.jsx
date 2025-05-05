import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import SignLanguageTranslator from "./pages/SignLanguageTranslator";
import TextToSpeech from "./pages/TextToSpeech";
import SpeechToText from "./pages/SpeechToText";
import Settings from "./pages/Settings";
import Footer from "./components/Footer";
import TextToSignLanguage from "./pages/TextToSignLanguage";
import SignLanguageDisplay from "./pages/SignLanguageDisplay";
import SignToEnglish from './pages/SignToEnglish';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <NavigationBar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-language" element={<SignLanguageTranslator />} />
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/speech-to-text" element={<SpeechToText />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/text-to-sign" element={<TextToSignLanguage />} />
            <Route path="/sign-language-display" element={<SignLanguageDisplay />} />
            <Route path="/sign-to-english" element={<SignToEnglish />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
