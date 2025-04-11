import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const Testimonials = () => {
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

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Solutions Inc.',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      quote: 'JobReady AI helped me transition from a junior to senior role by providing a clear roadmap and identifying key skills I needed to develop.'
    },
    {
      name: 'Michael Chen',
      role: 'Data Scientist',
      company: 'Analytics Co.',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      quote: 'The personalized career guidance was exactly what I needed. The AI-generated roadmap was spot-on with industry requirements.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      company: 'Innovation Labs',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      quote: 'I was amazed by how accurate the skill recommendations were. It helped me focus my learning and land my dream job.'
    }
  ];

  return (
    <div className={`relative py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-10 ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-10 ${
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
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Success Stories
            </h2>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Hear from professionals who transformed their careers with JobReady AI
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-6 rounded-xl transition-all duration-200 transform hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-lg'
                    : 'bg-white/90 hover:bg-white backdrop-blur-lg'
                } shadow-lg`}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonial.name}
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <blockquote>
                  <p className={`text-lg italic ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    "{testimonial.quote}"
                  </p>
                </blockquote>
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
              Ready to start your success story?
            </p>
            <button
              className={`px-8 py-3 rounded-lg font-medium text-white 
                transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 
                hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5
                focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                ${isDarkMode ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}`}
            >
              Get Your Career Roadmap
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials; 