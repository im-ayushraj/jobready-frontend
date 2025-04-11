// src/App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/job_suggestion', {
        role,
        company,
      });
      setResult(res.data);
    } catch (error) {
      console.error("Error fetching job suggestion:", error);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Job Ready AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Job Role (e.g. Data Scientist)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ margin: 10, padding: 10, width: 300 }}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Preferred Company (e.g. Google)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ margin: 10, padding: 10, width: 300 }}
        />
        <br />
        <button type="submit" style={{ padding: 10, marginTop: 10 }}>
          Get Job Plan
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h2>🔍 Your Job Plan</h2>
          <p><strong>Matched Title:</strong> {result.title}</p>
          <p><strong>Company:</strong> {result.company}</p>
          <p><strong>Skills Needed:</strong> {result.skills}</p>
          <p><strong>Preparation Strategy:</strong> {result.strategy}</p>
          <p><strong>📄 Resume:</strong> <a href={result.resume_link} target="_blank">Download</a></p>
        </div>
      )}
    </div>
  );
}

export default App;
