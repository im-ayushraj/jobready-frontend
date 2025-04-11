import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { api } from '../services/api';
import { motion } from 'framer-motion';

const Hero = ({ onRoadmapGenerated }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    job_role: '',
    experience_level: 'entry',
    location: '',
    industry: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking');
  const [healthCheckResult, setHealthCheckResult] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [lastCheckTime, setLastCheckTime] = useState(0);
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  // Check server health on component mount and periodically
  useEffect(() => {
    let timeoutId;
    
    const checkHealth = async () => {
      // Prevent checks if we've reached max attempts
      if (connectionAttempts >= 3) {
        return;
      }

      // Ensure minimum 5 second gap between checks
      const now = Date.now();
      if (now - lastCheckTime < 5000) {
        return;
      }
      
      try {
        setLastCheckTime(now);
        setConnectionAttempts(prev => prev + 1);
        const result = await api.checkHealth();
        console.log('Health check result:', result);
        
        setHealthCheckResult(result);
        setServerStatus(result.status === 'healthy' ? 'healthy' : 'unhealthy');
        
        if (result.status === 'healthy') {
          setError(null);
          setConnectionAttempts(0);
        } else {
          setError('Server is not healthy');
        }
      } catch (err) {
        console.error('Health check error:', err);
        setServerStatus('unhealthy');
        setHealthCheckResult({
          status: 'unhealthy',
          message: err.message
        });
      }
    };

    // Initial check with a slight delay
    timeoutId = setTimeout(checkHealth, 1000);
    
    // Only set up interval if server is unhealthy and we haven't reached max attempts
    let intervalId;
    if (serverStatus === 'unhealthy' && connectionAttempts < 3) {
      intervalId = setInterval(checkHealth, 10000); // Check every 10 seconds
    }

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [serverStatus, connectionAttempts, lastCheckTime]);

  const checkServerHealth = async () => {
    // Prevent checks if we've reached max attempts
    if (connectionAttempts >= 3) {
      return false;
    }

    // Ensure minimum 5 second gap between manual checks
    const now = Date.now();
    if (now - lastCheckTime < 5000) {
      return false;
    }
    
    try {
      setLastCheckTime(now);
      setConnectionAttempts(prev => prev + 1);
      const result = await api.checkHealth();
      console.log('Manual health check result:', result);
      
      setServerStatus(result.status === 'healthy' ? 'healthy' : 'unhealthy');
      setHealthCheckResult(result);
      
      if (result.status === 'healthy') {
        setError(null);
        setConnectionAttempts(0);
      }
      return result.status === 'healthy';
    } catch (error) {
      console.error('Manual health check failed:', error);
      setServerStatus('unhealthy');
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleRetry = async () => {
    if (loading) return;
    
    setRetryCount(prev => prev + 1);
    setError(null);
    setLoading(true);
    
    try {
      const isHealthy = await checkServerHealth();
      if (isHealthy && retryCount < 3) {
        await handleSubmit(new Event('submit'));
      } else if (retryCount >= 3) {
        setError('Maximum retry attempts reached. Please try again later.');
      } else {
        setError('Server is still not responding. Please try again later.');
      }
    } catch (err) {
      console.error('Retry failed:', err);
      setError('Unable to connect to the server. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form data
      if (!formData.job_role || formData.job_role.trim() === '') {
        throw new Error('Job role is required');
      }

      // Prepare data for API
      const submitData = {
        job_role: formData.job_role.trim(),
        experience_level: formData.experience_level || 'entry',
        location: formData.location || '',
        industry: formData.industry || ''
      };

      console.log('Submitting data:', submitData);

      // Generate roadmap
      const response = await api.generateRoadmap(submitData);
      
      if (response && response.roadmap) {
        onRoadmapGenerated(response);
        setRetryCount(0); // Reset retry count on success
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Roadmap generation failed:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead/Manager' },
  ];

  // Server status message component
  const ServerStatusMessage = () => {
    if (serverStatus === 'checking') {
      return 'Checking backend server connection...';
    } else if (connectionAttempts >= 6) {
      return 'Unable to establish a stable connection. Please verify:';
    }
    return healthCheckResult?.message || 'Verifying backend server status:';
  };

  // Helper component for server status details
  const ServerStatusDetails = () => {
    if (!healthCheckResult) return null;

    let details = [];
    switch (healthCheckResult.error) {
      case 'PORT_NOT_IN_USE':
        details = [
          'Navigate to the backend directory: cd backend',
          'Install dependencies: npm install',
          'Start the server: npm start',
          'Check if port 5000 is free to use',
          'Look for any error messages in the terminal'
        ];
        break;
      case 'CONNECTION_FAILED':
        details = [
          'Verify the backend server is running on port 5000',
          'Check if npm start completed successfully',
          'Look for error messages in the server terminal',
          'Ensure no firewall is blocking the connection'
        ];
        break;
      case 'UNHEALTHY_STATUS':
      case 'UNHEALTHY_SERVER':
        details = [
          'Check the backend terminal for error messages',
          'Verify all environment variables are set correctly',
          'Ensure the database is connected (if required)',
          'Try restarting the backend server'
        ];
        break;
      default:
        if (!healthCheckResult.healthy) {
          details = [
            'Make sure the backend server is running',
            'Check for any error messages in the terminal',
            'Verify the server started without errors',
            'Try restarting both frontend and backend'
          ];
        }
    }

    return (
      <ul className="text-sm opacity-90 mt-2 space-y-1 list-disc list-inside">
        {details.map((detail, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-3 h-3 mt-1 mr-2">•</span>
            <span className="flex-1">{detail}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-48 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 animate-blob ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
        <div className={`absolute -bottom-48 left-1/2 w-96 h-96 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000 ${
          isDarkMode ? 'bg-indigo-600' : 'bg-indigo-400'
        }`} />
      </div>

      {/* Enhanced Server Status Indicator */}
      {serverStatus !== 'healthy' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-md ${
            isDarkMode
              ? 'bg-red-900/70 text-red-200'
              : 'bg-red-50 text-red-600'
          }`}
        >
          <div className="flex items-start space-x-3">
            <svg className="h-5 w-5 animate-pulse mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="font-medium"><ServerStatusMessage /></p>
              <ServerStatusDetails />
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm opacity-75">
                  {connectionAttempts > 0 && connectionAttempts < 6
                    ? `Attempt ${connectionAttempts} of 6`
                    : connectionAttempts >= 6
                    ? 'Maximum attempts reached'
                    : 'Checking connection...'}
                </p>
                {serverStatus === 'unhealthy' && connectionAttempts < 6 && (
                  <button
                    onClick={() => checkServerHealth()}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isDarkMode
                        ? 'bg-red-800 hover:bg-red-700'
                        : 'bg-red-100 hover:bg-red-200'
                    }`}
                  >
                    Retry Connection
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Your AI Career Guide to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Professional Success
              </span>
            </h1>
            <p className={`max-w-2xl mx-auto text-lg sm:text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get personalized career roadmaps, interview preparation, and skill development plans tailored to your goals.
            </p>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`max-w-3xl mx-auto p-6 rounded-2xl shadow-xl ${
                isDarkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/90 backdrop-blur-lg'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Job Role Input */}
                  <div className="col-span-full sm:col-span-2">
                    <input
                      type="text"
                      name="job_role"
                      value={formData.job_role}
                      onChange={handleInputChange}
                      placeholder="What's your dream job role? (e.g., Frontend Developer)"
                      className={`w-full px-4 py-3 rounded-lg text-base transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500'
                          : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-blue-500'
                      } border focus:ring-2 focus:ring-blue-500/20 outline-none`}
                    />
                  </div>

                  {/* Experience Level Select */}
                  <div>
                    <select
                      name="experience_level"
                      value={formData.experience_level}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg text-base transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                          : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500'
                      } border focus:ring-2 focus:ring-blue-500/20 outline-none`}
                    >
                      {experienceLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location Input */}
                  <div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Location (optional)"
                      className={`w-full px-4 py-3 rounded-lg text-base transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500'
                          : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-blue-500'
                      } border focus:ring-2 focus:ring-blue-500/20 outline-none`}
                    />
                  </div>

                  {/* Industry Input */}
                  <div>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      placeholder="Industry (optional)"
                      className={`w-full px-4 py-3 rounded-lg text-base transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500'
                          : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-blue-500'
                      } border focus:ring-2 focus:ring-blue-500/20 outline-none`}
                    />
                  </div>
                </div>

                {/* Error Message with Retry Button */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      isDarkMode
                        ? 'bg-red-900/50 text-red-200'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                      </div>
                      {(error.includes('server') || error.includes('connect')) && retryCount < 3 && (
                        <button
                          type="button"
                          onClick={handleRetry}
                          disabled={loading}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                            isDarkMode
                              ? 'bg-red-800 hover:bg-red-700 text-red-200 disabled:bg-red-900'
                              : 'bg-red-100 hover:bg-red-200 text-red-700 disabled:bg-red-50'
                          } disabled:cursor-not-allowed`}
                        >
                          {loading ? 'Retrying...' : 'Retry'}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto px-8 py-3 rounded-lg font-medium text-white 
                    transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 
                    hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-purple-500 
                    focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
                    ${loading ? 'opacity-75 cursor-not-allowed' : 'transform hover:-translate-y-0.5'}`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Roadmap...
                    </div>
                  ) : (
                    'Generate Career Roadmap'
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  icon: '🎯',
                  title: 'Personalized Roadmap',
                  description: 'Get a customized career path based on your goals and experience level'
                },
                {
                  icon: '💡',
                  title: 'Skill Analysis',
                  description: 'Identify key skills needed for your dream role and how to acquire them'
                },
                {
                  icon: '🚀',
                  title: 'Interview Prep',
                  description: 'Access targeted interview questions and preparation strategies'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-gray-800/50 hover:bg-gray-800/70'
                      : 'bg-white/80 hover:bg-white'
                  }`}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 