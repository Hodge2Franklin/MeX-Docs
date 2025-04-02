# Repository Documentation

This document provides a comprehensive overview of the MeX AI Companion Documentation Website repository structure, components, and maintenance procedures.

## Repository Structure

```
mex_website/
├── app.js                 # Main application file
├── package.json           # Node.js dependencies
├── README.md              # Project overview and setup instructions
├── public/                # Static assets
│   ├── css/               # Stylesheets
│   │   └── styles.css     # Main stylesheet
│   ├── js/                # Client-side JavaScript
│   │   ├── cross-references.js      # Cross-referencing functionality
│   │   ├── interactive-components.js # Interactive UI components
│   │   ├── interactive-diagrams.js  # D3.js visualizations
│   │   ├── optimize.js    # Performance optimizations
│   │   ├── search.js      # Search functionality
│   │   └── visualizations.js # Data visualization code
│   └── images/            # Images and icons
├── views/                 # EJS templates
│   ├── layout.ejs         # Main layout template
│   ├── index.ejs          # Homepage
│   ├── architecture/      # Technical architecture pages
│   │   └── overview.ejs   # Architecture overview
│   ├── user-interaction/  # User interaction design pages
│   │   └── overview.ejs   # User interaction overview
│   ├── ethics/            # Ethical framework pages
│   │   └── overview.ejs   # Ethics overview
│   └── analysis/          # Analysis and implementation pages
│       └── comprehensive.ejs # Comprehensive analysis
├── routes/                # Express routes
├── utils/                 # Utility functions
│   └── markdown-converter.js # Markdown to HTML conversion
├── data/                  # JSON data for the website
└── test_results/          # Testing logs and results
```

## Component Documentation

### Server Components

#### app.js
The main application file that initializes the Express server, sets up middleware, and defines routes. It uses Express.js as the web framework and EJS with express-ejs-layouts for templating.

Key features:
- Express server configuration
- Middleware setup (static files, body parser, etc.)
- Route definitions
- Error handling

#### routes/
Contains route handlers for different sections of the website. Each route file is responsible for rendering the appropriate views and passing the necessary data.

### Client-Side Components

#### public/js/interactive-components.js
Implements interactive UI components such as tabs, collapsible sections, and tooltips. These components enhance the user experience by allowing dynamic interaction with the documentation content.

#### public/js/cross-references.js
Provides cross-referencing functionality between different sections of the documentation. This includes inline references with tooltips, related content sections, and "See Also" sections based on content tags.

#### public/js/interactive-diagrams.js
Contains D3.js visualizations for key concepts in the MeX AI Companion project:
- Duality Model Diagram
- Component Flow Diagram
- Ethical Framework Diagram
- User Journey Diagram

#### public/js/search.js
Implements the search functionality for the website, including indexing content, providing search suggestions, and highlighting search terms in results.

#### public/js/optimize.js
Contains performance optimizations for the website, including:
- Lazy loading for images
- Deferred loading of non-critical JavaScript
- Debouncing for search input
- DOM element caching
- D3.js visualization optimization for mobile devices
- Preloading of critical pages
- CSS delivery optimization

### View Templates

#### views/layout.ejs
The main layout template that defines the overall structure of the website, including the header, navigation, footer, and common scripts.

#### views/index.ejs
The homepage of the website, providing an overview of the MeX AI Companion project and navigation to key sections.

#### views/architecture/overview.ejs
Provides an overview of the technical architecture of the MeX AI Companion, including the Duality Model, Mirror and Bridge components, and supporting systems.

#### views/user-interaction/overview.ejs
Describes the user interaction design principles and interfaces of the MeX AI Companion, including the Journal, Memory, Breath, and Rituals interfaces.

#### views/ethics/overview.ejs
Outlines the ethical framework guiding the MeX AI Companion project, including core principles, implementation mechanisms, and ethical guardrails.

#### views/analysis/comprehensive.ejs
Presents a comprehensive analysis of the MeX AI Companion project, including its distinctive approach, technical architecture, user interaction design, and ethical framework.

## Maintenance Procedures

### Adding New Content

To add new documentation pages:

1. Create a new EJS template in the appropriate directory under `/views`
2. Add the page to the navigation system in `views/layout.ejs`
3. Create any necessary routes in the routes directory
4. Update cross-references in `public/js/cross-references.js`

### Updating Interactive Diagrams

To modify the interactive diagrams:

1. Edit the diagram data structures in `/public/js/interactive-diagrams.js`
2. Adjust the visualization parameters as needed
3. Test the changes in the browser

### Dependency Management

The project uses npm for dependency management. To update dependencies:

1. Run `npm outdated` to see which packages need updating
2. Run `npm update` to update packages to their latest compatible versions
3. For major version updates, check the package documentation for breaking changes
4. Test thoroughly after updating dependencies

### Deployment

The website can be deployed to any Node.js hosting platform:

1. Build the production version:
   ```
   npm run build
   ```

2. Deploy to your hosting platform of choice

3. Verify that all features work correctly in the production environment

### Backup Procedures

Regular backups of the repository should be maintained:

1. Push all changes to the GitHub repository
2. Create periodic releases with version tags
3. Document significant changes in release notes
4. Maintain a local backup of the repository

## Troubleshooting

### Common Issues

#### Server Won't Start
- Check that all dependencies are installed (`npm install`)
- Verify that the port is not in use by another application
- Check for syntax errors in the JavaScript files

#### Interactive Diagrams Not Displaying
- Ensure D3.js is properly loaded
- Check browser console for JavaScript errors
- Verify that the diagram data structures are correctly formatted

#### Search Not Working
- Check that the search index is being properly built
- Verify that the search input is correctly connected to the search function
- Check browser console for JavaScript errors

## Contact Information

For questions or support regarding this documentation website, please contact the MeX project team.
