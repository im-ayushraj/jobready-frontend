// src/services/api.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Helper function to get headers
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

// Helper function to make API requests
const makeRequest = async (endpoint, method = 'GET', data = null) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('Making request to:', url);
    
    const options = {
      method,
      headers: getHeaders()
    };

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
      console.log('Request data:', data);
    }

    const response = await fetch(url, options);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Server returned ${response.status}: ${errorText}`);
    }
    
    const responseData = await response.json();
    console.log('Response data:', responseData);
    return responseData;
  } catch (error) {
    console.error('Request failed:', error);
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to the server. Please ensure the backend is running on port 5000.');
    }
    throw error;
  }
};

export const api = {
  // Health check
  async checkHealth() {
    return makeRequest('/health');
  },

  // Generate roadmap
  async generateRoadmap(data) {
    try {
      // Validate input
      if (!data || !data.job_role || data.job_role.trim() === '') {
        throw new Error('Job role is required');
      }

      // Clean up input data
      const cleanedData = {
        job_role: data.job_role.trim(),
        experience_level: data.experience_level || 'entry',
        location: data.location || '',
        industry: data.industry || ''
      };

      const response = await makeRequest('/roadmap/generate', 'POST', cleanedData);
      
      if (!response || !response.roadmap) {
        throw new Error('Invalid response format from server');
      }

      return response;
    } catch (error) {
      console.error('Roadmap generation error:', error);
      throw error;
    }
  },

  // Interview questions
  async getInterviewQuestions(data) {
    return makeRequest('/interview/questions', 'POST', data);
  },

  // Interview feedback
  async getInterviewFeedback(data) {
    return makeRequest('/interview/feedback', 'POST', data);
  },

  // Skills analysis
  async analyzeSkills(data) {
    return makeRequest('/skills/analyze', 'POST', data);
  },

  // Resume tips
  async getResumeTips(data) {
    return makeRequest('/resume/tips', 'POST', data);
  }
}; 