# MeX AI Companion Documentation Explorer

This repository contains the MeX AI Companion Documentation Explorer, a comprehensive web-based documentation system for the MeX AI Companion project. The explorer provides an interactive interface for browsing, searching, and reading all project documentation.

## Features

- **Comprehensive Documentation**: Access to all MeX AI Companion documentation files
- **Organized Navigation**: Documentation organized into logical categories
- **Search Functionality**: Full-text search across all documentation
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark mode based on system preferences

## Repository Structure

```
mex-docs/
├── css/                  # Stylesheet files
│   ├── styles.css        # Main styles
│   ├── documentation.css # Documentation-specific styles
│   └── responsive.css    # Responsive design styles
├── docs/                 # Documentation markdown files
│   ├── overview.md
│   ├── duality_model_architecture.md
│   └── ... (40+ documentation files)
├── js/                   # JavaScript files
│   ├── documentation.js  # Documentation navigation and file mapping
│   └── search.js         # Search functionality
├── img/                  # Image assets
├── index.html            # Main landing page
├── documentation.html    # Documentation explorer interface
└── architecture.html     # Architecture visualization page
```

## Installation and Setup

1. Clone the repository:
   ```
   git clone -b Rev04 https://github.com/Hodge2Franklin/MeX-Docs.git
   ```

2. No build process is required as this is a static website.

3. Open `index.html` in a web browser to view the site locally.

## Deployment

The documentation explorer can be deployed to any static web hosting service:

1. Copy all files to your web server
2. Ensure the server is configured to serve static files
3. Access the site through your domain

## Development

To modify or extend the documentation explorer:

1. Update documentation files in the `docs/` directory
2. Add new documentation sections by:
   - Adding the markdown file to `docs/`
   - Adding the file mapping in `js/documentation.js`
   - Adding the navigation link in `documentation.html`
   - Adding the corresponding section in `documentation.html`

## Documentation Content

The documentation is organized into the following categories:

- **Overview and User Guide**: General information and user instructions
- **Architecture**: Duality Model, Memory System, Voice & Breath, etc.
- **Technical Documentation**: Technical specifications and implementation details
- **Planning & Implementation**: Roadmaps, plans, and blueprints
- **Ethics & Validation**: Ethical framework and validation reports
- **Use Cases & Reports**: Specific use cases and project reports
- **Documentation**: Meta-documentation about the documentation system

## License

Copyright © 2025 MeX AI. All rights reserved.

## Contact

For questions or support, please contact the repository maintainer.
