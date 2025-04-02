# Deployment Guide for MeX AI Companion Documentation Explorer

This guide provides comprehensive instructions for setting up, deploying, and maintaining the MeX AI Companion Documentation Explorer.

## Local Development Setup

### Prerequisites

- Git
- Web browser
- Basic HTTP server (Python's built-in server, Node.js http-server, etc.)

### Setup Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Hodge2Franklin/MeX-Docs.git
   cd MeX-Docs
   git checkout Rev04
   ```

2. **Local Testing**

   Using Python's built-in HTTP server:
   ```bash
   python3 -m http.server 8000
   ```

   Or using Node.js http-server:
   ```bash
   npm install -g http-server
   http-server -p 8000
   ```

3. **Access the Local Site**

   Open your browser and navigate to:
   ```
   http://localhost:8000/
   ```

## Adding or Updating Documentation

### Documentation File Structure

Documentation files are stored in the `docs/` directory as Markdown (.md) files:

```
docs/
├── overview.md
├── technical_architecture.md
├── user_interaction_features.md
└── ...
```

### Adding New Documentation

1. Create a new Markdown file in the `docs/` directory
2. Update the documentation navigation in `js/documentation.js`:

   ```javascript
   const documentationStructure = [
     {
       category: "Overview",
       items: [
         { title: "Project Overview", path: "docs/overview.md" },
         { title: "Your New Document", path: "docs/your_new_document.md" }
       ]
     },
     // Other categories...
   ];
   ```

3. Test locally to ensure the new document appears and loads correctly

### Updating Existing Documentation

1. Edit the corresponding Markdown file in the `docs/` directory
2. Test locally to ensure the updated content displays correctly

## Deployment Process

### Deployment to Manus Platform

1. **Prepare for Deployment**

   Ensure all files are committed to the repository:
   ```bash
   git add .
   git commit -m "Prepare for deployment: [Description of changes]"
   git push origin Rev04
   ```

2. **Deploy Using Manus Tools**

   ```bash
   # If using Manus CLI
   manus deploy --type static --dir /path/to/MeX-Docs
   
   # If using deployment function in Manus environment
   deploy_apply_deployment(type="static", local_dir="/path/to/MeX-Docs")
   ```

3. **Verify Deployment**

   Access the deployed site at the URL provided by the deployment tool and verify:
   - All pages load correctly
   - Documentation content displays properly
   - Architecture diagram renders correctly
   - Navigation works as expected
   - Search functionality works

### Manual Deployment to Web Hosting

1. **Build Process (if needed)**

   The site is static HTML/CSS/JS and doesn't require a build process.

2. **Upload Files**

   Upload all files to your web hosting service using FTP, SFTP, or the hosting provider's file manager.

3. **Configure Web Server**

   Ensure the web server is configured to:
   - Serve index.html as the default document
   - Set proper MIME types for .css, .js, and .md files
   - Configure CORS if accessing documentation from different domains

## Maintenance and Updates

### Regular Maintenance Tasks

1. **Documentation Updates**

   Regularly review and update documentation files to ensure they remain accurate and current.

2. **Link Verification**

   Periodically check all internal and external links to ensure they're still valid.

3. **Browser Compatibility Testing**

   Test the site in different browsers and devices to ensure consistent functionality.

### Troubleshooting Common Issues

1. **Documentation Not Loading**

   - Check browser console for JavaScript errors
   - Verify the path to the Markdown file is correct
   - Ensure the Markdown file exists and has the correct permissions

2. **Architecture Diagram Not Displaying**

   - Verify SVG support in the browser
   - Check for JavaScript errors in the console
   - Ensure all CSS files are properly loaded

3. **Search Not Working**

   - Check browser console for JavaScript errors
   - Verify that all documentation files are accessible
   - Check for syntax errors in the search implementation

## Backup and Recovery

### Backup Procedures

1. **Repository Backup**

   The primary backup is the Git repository itself. Ensure regular pushes to the remote repository:
   ```bash
   git push origin Rev04
   ```

2. **Manual Backups**

   Periodically create manual backups of the entire project:
   ```bash
   zip -r mex-docs-backup-$(date +%Y%m%d).zip /path/to/MeX-Docs
   ```

### Recovery Procedures

1. **Repository Recovery**

   If the local copy is corrupted or lost, clone from the remote repository:
   ```bash
   git clone https://github.com/Hodge2Franklin/MeX-Docs.git
   git checkout Rev04
   ```

2. **Deployment Recovery**

   If the deployed site is corrupted:
   - Redeploy from the repository
   - Restore from a backup if the repository is also affected

## Version Control and Release Management

### Branching Strategy

- **Rev04**: Main development branch
- Create feature branches for significant changes:
  ```bash
  git checkout -b feature/new-feature-name
  ```

### Release Process

1. **Pre-Release Testing**

   - Test all functionality locally
   - Verify all documentation content
   - Check responsive design on multiple devices

2. **Release Tagging**

   Tag releases for future reference:
   ```bash
   git tag -a v1.0.0 -m "Version 1.0.0 - Initial release"
   git push origin v1.0.0
   ```

3. **Release Notes**

   Update RELEASE_NOTES.md with:
   - Version number and date
   - New features and improvements
   - Bug fixes
   - Known issues

## Security Considerations

1. **Content Security**

   - The site uses robots.txt and meta tags to prevent search engine indexing
   - No sensitive information should be included in the documentation

2. **Access Control**

   - The site doesn't implement authentication
   - Rely on the obscurity of the deployment URL for limited access
   - Consider implementing basic authentication if stricter access control is needed

## Conclusion

This deployment guide provides comprehensive instructions for setting up, deploying, and maintaining the MeX AI Companion Documentation Explorer. By following these procedures, you can ensure the documentation platform remains accessible, up-to-date, and recoverable in case of any issues.
