# JobReady AI

JobReady AI is a modern web application that leverages AI to provide personalized career guidance and roadmap generation. It helps users navigate their professional journey by offering detailed career paths, skill requirements, and actionable steps to achieve their career goals.

## Features

### Core Features
- **Personalized Career Roadmap Generation**
  - Customized based on job role, experience level, and location
  - Detailed step-by-step career progression
  - Industry-specific insights and recommendations

- **Comprehensive Career Analysis**
  - Industry outlook and trends
  - Key companies in the field
  - Required skills and competencies
  - Learning path recommendations

- **Project Recommendations**
  - Practical project ideas for skill development
  - Technology stack suggestions
  - Feature requirements and implementation guidance

- **Interview Preparation**
  - Technical interview tips
  - Behavioral interview guidance
  - Portfolio building recommendations
  - Salary negotiation strategies

### Technical Features
- **Real-time Health Monitoring**
  - Server health check endpoint
  - Automatic retry mechanism
  - Connection status indicators

- **Responsive Design**
  - Mobile-first approach
  - Dark/Light mode support
  - Accessible UI components

- **Interactive UI**
  - Animated transitions
  - Dynamic content loading
  - Real-time form validation

## Technologies Used

### Frontend
- **React.js** - Core UI framework
- **Tailwind CSS** - Styling and responsive design
- **Framer Motion** - Animations and transitions
- **React Router** - Navigation and routing
- **Context API** - State management

### Backend
- **Flask** - Python web framework
- **RESTful API** - JSON-based communication
- **CORS** - Cross-origin resource sharing
- **Environment Variables** - Configuration management

## Project Structure

```
jobready-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Hero.js         # Main form component
│   │   ├── ResultSection.js # Roadmap display
│   │   ├── Navbar.js       # Navigation
│   │   ├── Footer.js       # Footer
│   │   ├── AboutAI.js      # AI information
│   │   └── Testimonials.js # User testimonials
│   ├── context/            # Context providers
│   │   ├── ThemeContext.js # Dark/Light mode
│   │   └── RoadmapContext.js # Roadmap data
│   ├── services/           # API services
│   │   └── api.js          # API integration
│   ├── App.js              # Main application
│   └── index.js            # Entry point
├── package.json            # Dependencies
└── README.md               # Documentation
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/jobready-ai.git
   cd jobready-ai/jobready-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory:
   ```plaintext
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

### Environment Variables
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_ENV`: Environment (development/production)

## API Integration

### Health Check
```javascript
GET /api/health
Response: { status: "healthy" }
```

### Roadmap Generation
```javascript
POST /api/generate-roadmap
Request: {
  job_role: string,
  experience_level: string,
  location: string,
  industry: string
}
Response: {
  roadmap: {
    overview: string,
    career_path: string[],
    industry_outlook: string[],
    key_companies: string[],
    skills: string[],
    learning_path: string[],
    timeline: { phase: string, duration: string }[],
    projects: {
      title: string,
      description: string,
      features: string[],
      technologies: string[]
    }[],
    interview_prep: string[]
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their invaluable tools and libraries
