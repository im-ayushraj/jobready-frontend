import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const AboutAI = () => {
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
      icon: '🧠',
      title: 'AI-Powered Analysis',
      description: 'Our advanced AI analyzes market trends, job requirements, and industry standards to create personalized career roadmaps.'
    },
    {
      icon: '📈',
      title: 'Data-Driven Insights',
      description: 'Get insights based on real-world data from successful professionals and industry leaders in your chosen field.'
    },
    {
      icon: '🎯',
      title: 'Personalized Roadmaps',
      description: 'Receive customized learning paths and career development strategies tailored to your goals and experience level.'
    },
    {
      icon: '🚀',
      title: 'Continuous Learning',
      description: 'Stay updated with the latest skills and technologies required in your industry with dynamic recommendations.'
    }
  ];

  return (
    <div className={`relative py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-10 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
        <div className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-10 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Powered by Advanced AI
            </h2>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Our AI technology analyzes vast amounts of career data to provide you with personalized guidance and actionable insights.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-6 rounded-xl transition-all duration-200 transform hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-lg'
                    : 'bg-white/90 hover:bg-white backdrop-blur-lg'
                } shadow-lg`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
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
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {[
              { number: '95%', label: 'Accuracy Rate' },
              { number: '50K+', label: 'Career Paths Analyzed' },
              { number: '24/7', label: 'AI Availability' }
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  isDarkMode
                    ? 'bg-gray-800/50 backdrop-blur-lg'
                    : 'bg-white/90 backdrop-blur-lg'
                } shadow-lg`}
              >
                <div className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {stat.number}
                </div>
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
          >
            <button
              className={`px-8 py-3 rounded-lg font-medium text-white 
                transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 
                hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5
                focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                ${isDarkMode ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}`}
            >
              Start Your Career Journey
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutAI; 