# MeX AI Companion Documentation Explorer

## Project Overview

The MeX AI Companion Documentation Explorer is a comprehensive web-based platform for exploring and understanding the MeX AI Companion (MeAI) project. This documentation explorer provides detailed information about the architecture, features, benefits, and technical implementation of the MeAI system.

## Key Features

- **Interactive Architecture Diagram**: SVG-based visualization of the Duality Model with MCP Architecture
- **Comprehensive Documentation**: Access to 40+ documentation files covering all aspects of the MeAI system
- **Searchable Content**: Find specific information across all documentation files
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Organized Navigation**: Documentation organized into logical categories for easy browsing

## Repository Structure

```
/
├── css/                  # Stylesheet files
│   ├── architecture.css  # Styles for architecture page and diagram
│   ├── benefits.css      # Styles for benefits page
│   ├── documentation.css # Styles for documentation explorer
│   ├── features.css      # Styles for features page
│   ├── mia.css           # Styles for Mia image integration
│   ├── responsive.css    # Responsive design styles
│   └── styles.css        # Global styles
├── docs/                 # Documentation markdown files
│   ├── overview.md       # Project overview
│   ├── technical_architecture.md # Technical architecture details
│   └── ...               # 40+ additional documentation files
├── img/                  # Image assets
│   ├── mia.png           # Original Mia image
│   ├── mia_transparent.png # Processed Mia image with transparency
│   └── ...               # Additional images
├── js/                   # JavaScript files
│   ├── architecture.js   # Interactive architecture diagram functionality
│   ├── documentation.js  # Documentation explorer functionality
│   └── search.js         # Search functionality
├── about.html            # About page
├── architecture.html     # Architecture visualization page
├── benefits.html         # Benefits page
├── documentation.html    # Documentation explorer page
├── features.html         # Features page
├── index.html            # Home page
├── DEPLOYMENT.md         # Deployment instructions
├── DEVELOPMENT_NOTES.md  # Development notes and issue tracking
├── README.md             # Project readme (this file)
├── RELEASE_NOTES.md      # Version history and release notes
├── robots.txt            # Search engine directives
└── TECHNICAL.md          # Technical implementation details
```

## Setup Instructions

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/Hodge2Franklin/MeX-Docs.git
   cd MeX-Docs
   ```

2. If you're using a local development server like Python's built-in HTTP server:
   ```
   python3 -m http.server 8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000/
   ```

### Deployment

1. For static site deployment, simply upload the contents of this repository to your web server.

2. For deployment to Manus platform:
   - Follow the instructions in DEPLOYMENT.md

## Development History

The MeX AI Companion Documentation Explorer has gone through several iterations of development:

1. **Initial Setup**: Basic documentation explorer with limited functionality
2. **Content Integration**: Integration of 40+ documentation files
3. **Navigation Improvements**: Enhanced navigation and search functionality
4. **Architecture Visualization**: SVG-based architecture diagram implementation
5. **Responsive Design**: Mobile-friendly layout and design
6. **Mia Integration**: Addition of Mia image (the inspiration for MeAI) to the home page

For a detailed development history, see DEVELOPMENT_NOTES.md.

## Troubleshooting

If you encounter any issues with the documentation explorer:

1. **Content Not Loading**: Check browser console for JavaScript errors
2. **Architecture Diagram Not Displaying**: Ensure your browser supports SVG
3. **Search Not Working**: Verify that all JavaScript files are properly loaded

For more detailed troubleshooting information, see TECHNICAL.md.

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary and confidential. All rights reserved.

## Contact

For questions or support, please contact the MeX AI Companion team.
