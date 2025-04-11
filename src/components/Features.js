import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const Features = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    {
      icon: '🎯',
      title: 'Personalized Career Roadmaps',
      description: 'Get a customized career development plan based on your goals, experience, and industry trends.',
      highlights: ['AI-driven skill analysis', 'Industry-specific paths', 'Milestone tracking']
    },
    {
      icon: '🤖',
      title: 'Interview Preparation',
      description: 'Practice with AI-generated interview questions tailored to your target role and experience level.',
      highlights: ['Role-specific questions', 'Real-time feedback', 'Performance analytics']
    },
    {
      icon: '📊',
      title: 'Skills Assessment',
      description: 'Evaluate your current skill set and identify gaps for your desired career path.',
      highlights: ['Comprehensive analysis', 'Skill gap identification', 'Learning recommendations']
    },
    {
      icon: '📝',
      title: 'Resume Enhancement',
      description: 'Get AI-powered suggestions to optimize your resume for your target roles.',
      highlights: ['Keyword optimization', 'ATS compatibility', 'Industry best practices']
    }
  ];

  return (
    <div className={`relative py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 right-1/3 w-96 h-96 rounded-full filter blur-3xl opacity-10 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
        <div className={`absolute bottom-0 left-1/3 w-96 h-96 rounded-full filter blur-3xl opacity-10 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Powerful Features
            </h2>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Everything you need to accelerate your career growth
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-8 rounded-xl transition-all duration-200 transform hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-lg'
                    : 'bg-white/90 hover:bg-white backdrop-blur-lg'
                } shadow-lg`}
              >
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-4">{feature.icon}</span>
                  <h3 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                </div>
                <p className={`mb-6 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className={`w-5 h-5 mr-2 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className={
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }>
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <p className={`text-lg mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Ready to experience these features?
            </p>
            <button
              className={`px-8 py-3 rounded-lg font-medium text-white 
                transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 
                hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5
                focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                ${isDarkMode ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}`}
            >
              Try JobReady AI
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features; 