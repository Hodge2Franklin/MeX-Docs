# MeX AI Companion Documentation Website

## Overview

This interactive website provides comprehensive documentation for the MeX AI Companion project, a relational AI system that prioritizes meaningful connection, presence, and depth over task completion or information retrieval.

The website offers an engaging, user-friendly interface for exploring all aspects of the MeX AI Companion, including its technical architecture, user interaction design, ethical framework, and implementation approach.

## Key Features

### Interactive Exploration

- **Interactive Diagrams**: Visualize complex concepts like the Duality Model architecture, component flow, ethical framework, and user journey through interactive D3.js diagrams
- **Cross-Referenced Content**: Navigate seamlessly between related concepts with contextual links and "See Also" sections
- **Comprehensive Search**: Find specific information quickly with full-text search across all documentation

### Technical Architecture Documentation

- **Duality Model**: Explore the Mirror and Bridge components that form the core of MeX's architecture
- **Supporting Systems**: Learn about the Memory System, RitualEngine, Voice & Breath Systems, and Ethics Engine
- **Data Architecture**: Understand how MeX balances personalization with privacy

### User Interaction Design

- **Core Interfaces**: Discover the Journal, Memory, Breath, and Rituals interfaces
- **Multimodal Communication**: Learn about haptic patterns, light communication, and voice interaction
- **Ritual Interactions**: Explore how structured interaction patterns create meaning and rhythm

### Ethical Framework

- **Core Principles**: Understand the ethical foundation of Sacred Support, User Sovereignty, Truth-Seeking with Care, Privacy by Design, and Ethical Intelligence
- **Implementation Mechanisms**: See how ethical principles are implemented through concrete mechanisms
- **Ethical Guardrails**: Learn about the safeguards that ensure ethical operation

## Getting Started

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/Hodge2Franklin/MeX-Docs.git
   cd MeX-Docs/mex_website
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Navigation Guide

- **Home**: Start here for an overview of the MeX AI Companion project
- **Architecture**: Explore the technical architecture and components
- **User Interaction**: Learn about the user experience design and interfaces
- **Ethics**: Understand the ethical framework guiding the project
- **Analysis**: Read comprehensive analysis of the project's approach and implementation

## Development

This website is built with:
- **Node.js** and **Express** for the server
- **EJS** for templating
- **D3.js** for interactive visualizations
- **Bootstrap** for responsive design

For detailed development documentation, see [REPOSITORY_DOCUMENTATION.md](./REPOSITORY_DOCUMENTATION.md).

## Deployment

The website can be deployed to any Node.js hosting platform:

1. Build the production version:
   ```
   npm run build
   ```

2. Deploy to your hosting platform of choice

## Repository Structure

```
mex_website/
├── app.js                 # Main application file
├── package.json           # Node.js dependencies
├── README.md              # This file
├── REPOSITORY_DOCUMENTATION.md # Detailed repository documentation
├── public/                # Static assets (CSS, JS, images)
├── views/                 # EJS templates
├── routes/                # Express routes
├── utils/                 # Utility functions
└── data/                  # JSON data for the website
```

## Contributing

To contribute to this documentation website:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the terms specified in the MeX AI Companion project documentation.

## Contact

For questions or support regarding this documentation website, please contact the MeX project team.
