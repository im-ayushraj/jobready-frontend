// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ResultSection from './components/ResultSection';
import AboutAI from './components/AboutAI';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  const [roadmapData, setRoadmapData] = useState(null);

  const handleRoadmapGenerated = (data) => {
    setRoadmapData(data);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero onRoadmapGenerated={handleRoadmapGenerated} />
                    {roadmapData && <ResultSection roadmapData={roadmapData} />}
                    <AboutAI />
                    <Testimonials />
                  </>
                }
              />
              <Route path="/features" element={<div>Features Page</div>} />
              <Route path="/roadmap" element={<div>Roadmap Generator Page</div>} />
              <Route path="/about" element={<div>About Page</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
