import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const ResultSection = ({ roadmapData }) => {
  const { isDarkMode } = useContext(ThemeContext);

  if (!roadmapData || !roadmapData.roadmap) {
    return null;
  }

  const { roadmap } = roadmapData;

  // Debug logging to check incoming data
  console.log('Raw Roadmap Data:', roadmapData);
  console.log('Roadmap Object:', roadmap);

  // Function to remove asterisks and clean text
  const cleanText = (text) => {
    if (!text) return '';
    return text.replace(/\*/g, '').trim();
  };

  // Process array data with proper checks
  const processArray = (arr, defaultValue) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) {
      return [defaultValue];
    }
    return arr.map(cleanText).filter(item => item.length > 0);
  };

  // Process timeline data
  const processTimeline = (timeline) => {
    if (!timeline || typeof timeline !== 'object' || Object.keys(timeline).length === 0) {
      return {
        'Initial Phase': '1-3 months',
        'Intermediate Phase': '3-6 months',
        'Advanced Phase': '6-12 months'
      };
    }
    return timeline;
  };

  // Process projects data
  const processProjects = (projects) => {
    if (!projects || !Array.isArray(projects) || projects.length === 0) {
      return [{
        title: 'Basic Project',
        description: 'Start with a fundamental project to build your skills',
        features: ['Core functionality', 'Basic user interface', 'Data management'],
        technologies: ['Essential tools', 'Fundamental frameworks']
      }];
    }
    return projects.map(project => ({
      title: cleanText(project.title || 'Untitled Project'),
      description: cleanText(project.description || 'Project description not available'),
      features: processArray(project.features, 'Feature details to be added'),
      technologies: processArray(project.technologies, 'Technologies to be determined')
    }));
  };

  // Process skills data
  const processSkills = (skills) => {
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return ['Technical skills', 'Soft skills', 'Industry-specific knowledge'];
    }
    return skills.map(cleanText).filter(item => item.length > 0);
  };

  // Process learning path data
  const processLearningPath = (path) => {
    if (!path || !Array.isArray(path) || path.length === 0) {
      return [
        'Learn fundamental concepts',
        'Practice core skills',
        'Work on real projects',
        'Build portfolio',
        'Prepare for interviews'
      ];
    }
    return path.map(cleanText).filter(item => item.length > 0);
  };

  // Process interview prep data
  const processInterviewPrep = (prep) => {
    if (!prep || !Array.isArray(prep) || prep.length === 0) {
      return [
        'Review technical concepts',
        'Practice coding problems',
        'Prepare for behavioral questions',
        'Research company culture',
        'Mock interviews'
      ];
    }
    return prep.map(cleanText).filter(item => item.length > 0);
  };

  // Process industry outlook data
  const processIndustryOutlook = (outlook) => {
    if (!outlook) {
      return [
        'Industry growth rate and trends',
        'Key market drivers',
        'Future opportunities',
        'Challenges and risks'
      ];
    }
    
    // Split the text into sentences and limit to 4 key points
    const sentences = outlook.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const limitedSentences = sentences.slice(0, 4);
    
    // Clean and limit each sentence to 20 words
    return limitedSentences.map(sentence => {
      const words = cleanText(sentence).split(/\s+/);
      return words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
    });
  };

  const sections = {
    overview: cleanText(roadmap?.overview || 'Career path overview will be generated based on your selection.'),
    career_path: processArray(roadmap?.career_path, 'Career progression steps will be shown here.'),
    industry_outlook: processIndustryOutlook(roadmap?.industry_outlook),
    key_companies: processArray(roadmap?.key_companies, 'Key companies in this field will be listed.'),
    skills: processSkills(roadmap?.skills),
    learning_path: processLearningPath(roadmap?.learning_path),
    timeline: processTimeline(roadmap?.timeline),
    projects: processProjects(roadmap?.projects),
    interview_prep: processInterviewPrep(roadmap?.interview_prep)
  };

  // Debug logging for processed data
  console.log('Processed Sections:', sections);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className={`relative py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Career Roadmap
            </h2>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={itemVariants}
            className={`rounded-xl shadow-lg ${
              isDarkMode 
                ? 'bg-gray-800' 
                : 'bg-white'
            }`}
          >
            {/* Overview Section */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Overview
                </h3>
                <div className={`
                  p-4 
                  rounded-lg 
                  ${isDarkMode 
                    ? 'bg-gray-700/50' 
                    : 'bg-gray-50'
                  }
                `}>
                  <p className={`text-lg ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {sections.overview}
                  </p>
                </div>
              </div>
            </div>

            {/* Career Path Section */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Career Path
                </h3>
                <div className={`
                  p-4 
                  rounded-lg 
                  ${isDarkMode 
                    ? 'bg-gray-700/50' 
                    : 'bg-gray-50'
                  }
                `}>
                  <div className="space-y-6">
                    {sections.career_path.map((level, index) => {
                      const levelTitles = [
                        "Entry Level",
                        "Mid Level",
                        "Senior Level",
                        "Leadership Level"
                      ];
                      const levelDescriptions = [
                        "Entry level positions and responsibilities",
                        "Mid-level career progression",
                        "Senior level opportunities",
                        "Leadership and specialization paths"
                      ];
                      
                      return (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className={`
                            p-4
                            rounded-lg
                            border-l-4
                            ${isDarkMode 
                              ? 'border-blue-400 bg-gray-700/30' 
                              : 'border-blue-500 bg-white'
                            }
                            shadow-sm
                            hover:shadow-md
                            transition-shadow duration-200
                          `}
                        >
                          <div className="flex items-start">
                            <div className={`
                              w-8 h-8
                              rounded-full
                              flex items-center justify-center
                              mr-4
                              flex-shrink-0
                              ${isDarkMode 
                                ? 'bg-blue-400 text-white' 
                                : 'bg-blue-500 text-white'
                              }
                            `}>
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className={`
                                text-xl font-semibold mb-2
                                ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}
                              `}>
                                {levelTitles[index]}
                              </h4>
                              <p className={`
                                text-base mb-2
                                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                              `}>
                                {levelDescriptions[index]}
                              </p>
                              <p className={`
                                text-lg
                                ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
                              `}>
                                {level}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Industry Outlook */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Industry Outlook
                </h3>
                <div className={`
                  p-4 
                  rounded-lg 
                  ${isDarkMode 
                    ? 'bg-gray-700/50' 
                    : 'bg-gray-50'
                  }
                `}>
                  <ul className="space-y-3">
                    {sections.industry_outlook.map((point, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className={`flex items-start ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        <span className={`
                          w-2 h-2
                          rounded-full
                          mt-2
                          mr-3
                          flex-shrink-0
                          ${isDarkMode 
                            ? 'bg-blue-400' 
                            : 'bg-blue-500'
                          }
                        `} />
                        <span className="text-lg">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Companies */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Key Companies
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sections.key_companies.map((company, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`
                        p-4
                        rounded-lg
                        text-center
                        ${isDarkMode 
                          ? 'bg-gray-700 text-blue-400' 
                          : 'bg-gray-50 text-blue-600'
                        }
                      `}
                    >
                      {company}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Required */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Required Skills
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sections.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`
                        p-4
                        rounded-lg
                        text-center
                        ${isDarkMode 
                          ? 'bg-gray-700 text-blue-400' 
                          : 'bg-gray-50 text-blue-600'
                        }
                      `}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Path */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Learning Path
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sections.learning_path.map((step, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`
                        p-4
                        rounded-lg
                        flex items-center
                        ${isDarkMode 
                          ? 'bg-gray-700' 
                          : 'bg-gray-50'
                        }
                      `}
                    >
                      <span className={`
                        w-8 h-8
                        rounded-full 
                        flex items-center justify-center 
                        mr-4
                        text-sm font-bold
                        ${isDarkMode 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-blue-600 text-white'
                        }
                      `}>
                        {index + 1}
                      </span>
                      <span className={`text-lg ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Timeline
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(sections.timeline).map(([phase, duration], index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`
                        p-4
                        rounded-lg
                        flex items-center justify-between
                        ${isDarkMode 
                          ? 'bg-gray-700' 
                          : 'bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <span className={`
                          w-8 h-8
                          rounded-full 
                          flex items-center justify-center 
                          mr-4
                          text-sm font-bold
                          ${isDarkMode 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-blue-600 text-white'
                          }
                        `}>
                          {index + 1}
                        </span>
                        <span className={`text-lg font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {phase}
                        </span>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        isDarkMode 
                          ? 'bg-gray-600 text-gray-300' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {duration}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Recommended Projects
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sections.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`
                        p-6
                        rounded-lg
                        ${isDarkMode 
                          ? 'bg-gray-700' 
                          : 'bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center mb-4">
                        <span className={`
                          w-8 h-8
                          rounded-full 
                          flex items-center justify-center 
                          mr-3
                          text-sm font-bold
                          ${isDarkMode 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-blue-600 text-white'
                          }
                        `}>
                          {index + 1}
                        </span>
                        <h4 className={`text-xl font-bold ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {project.title}
                        </h4>
                      </div>
                      <p className={`text-lg mb-4 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {project.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {project.features && project.features.length > 0 && (
                          <div>
                            <h5 className={`text-lg font-semibold mb-2 ${
                              isDarkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>
                              Features
                            </h5>
                            <div className="space-y-2">
                              {project.features.map((feature, index) => (
                                <div key={index} className={`text-base ${
                                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {project.technologies && project.technologies.length > 0 && (
                          <div>
                            <h5 className={`text-lg font-semibold mb-2 ${
                              isDarkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>
                              Technologies
                            </h5>
                            <div className="space-y-2">
                              {project.technologies.map((tech, index) => (
                                <div key={index} className={`text-base ${
                                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  {tech}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interview Preparation */}
            <div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Interview Preparation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sections.interview_prep.map((tip, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`
                        p-4
                        rounded-lg
                        flex items-start
                        ${isDarkMode 
                          ? 'bg-gray-700' 
                          : 'bg-gray-50'
                        }
                      `}
                    >
                      <span className={`
                        w-8 h-8
                        rounded-full 
                        flex items-center justify-center 
                        mr-4
                        text-sm font-bold
                        flex-shrink-0
                        ${isDarkMode 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-blue-600 text-white'
                        }
                      `}>
                        {index + 1}
                      </span>
                      <span className={`text-lg ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {tip}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultSection; 