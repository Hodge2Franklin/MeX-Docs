# MeAI Prototype Deployment Instructions

## Overview

This document provides instructions for deploying the MeAI prototype to various environments. The prototype is a static web application that can be deployed to any web server or hosting service that supports static websites.

## Local Deployment

### Prerequisites
- Node.js (v16+)
- npm or npx

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Hodge2Franklin/MeX-Docs.git
   ```

2. Navigate to the repository:
   ```bash
   cd MeX-Docs
   ```

3. Checkout the meai-prototype branch:
   ```bash
   git checkout meai-prototype
   ```

4. Navigate to the prototype directory:
   ```bash
   cd meai-prototype
   ```

5. Start a local development server:
   ```bash
   npx http-server -p 8080
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## GitHub Pages Deployment

GitHub Pages provides free hosting for static websites directly from a GitHub repository.

### Prerequisites
- GitHub account
- Repository admin access

### Steps

1. Ensure you're on the meai-prototype branch:
   ```bash
   git checkout meai-prototype
   ```

2. Create a new branch specifically for GitHub Pages:
   ```bash
   git checkout -b gh-pages
   ```

3. If needed, update the base URL in any absolute paths:
   ```bash
   # Example: If deploying to a subdirectory
   # Update paths in HTML files if necessary
   ```

4. Commit any changes:
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   ```

5. Push the branch to GitHub:
   ```bash
   git push origin gh-pages
   ```

6. On GitHub, go to the repository settings:
   - Navigate to "Settings" > "Pages"
   - Under "Source", select the "gh-pages" branch
   - Click "Save"

7. Wait for GitHub to build and deploy your site (usually takes a minute)

8. Your site will be available at:
   ```
   https://[username].github.io/MeX-Docs/meai-prototype/
   ```

## Netlify Deployment

Netlify offers free hosting for static websites with additional features like form handling and serverless functions.

### Prerequisites
- Netlify account
- GitHub repository access

### Steps

1. Log in to Netlify (netlify.com)

2. Click "New site from Git"

3. Select GitHub as your Git provider and authenticate

4. Select the MeX-Docs repository

5. Configure the deployment:
   - Branch: meai-prototype
   - Build command: (leave blank for static site)
   - Publish directory: meai-prototype

6. Click "Deploy site"

7. Wait for the deployment to complete

8. Your site will be available at the Netlify URL provided (e.g., random-name.netlify.app)

9. (Optional) Configure a custom domain in the Netlify settings

## Vercel Deployment

Vercel is another platform that offers free hosting for static websites and frontend applications.

### Prerequisites
- Vercel account
- GitHub repository access

### Steps

1. Log in to Vercel (vercel.com)

2. Click "Import Project"

3. Select "Import Git Repository" and provide the repository URL

4. Configure the deployment:
   - Framework Preset: Other
   - Root Directory: meai-prototype
   - Build Command: (leave blank for static site)
   - Output Directory: .

5. Click "Deploy"

6. Wait for the deployment to complete

7. Your site will be available at the Vercel URL provided

8. (Optional) Configure a custom domain in the Vercel settings

## Custom Web Server Deployment

For deployment to a custom web server (Apache, Nginx, etc.).

### Prerequisites
- Access to a web server
- FTP or SSH access

### Steps

1. Build the project locally (if needed)

2. Copy all files from the meai-prototype directory to your web server's public directory:
   ```bash
   # Using scp (SSH)
   scp -r meai-prototype/* user@server:/path/to/public_html/

   # Or using FTP client
   # Upload all files from meai-prototype/ to your server
   ```

3. Ensure proper file permissions:
   ```bash
   chmod -R 755 /path/to/public_html/
   ```

4. Configure your web server if needed:
   - For Apache, ensure .htaccess is properly set up
   - For Nginx, configure the server block appropriately

5. Access your website through your domain

## Troubleshooting

### Common Issues

1. **Missing resources**: Ensure all paths to CSS, JavaScript, and image files are correct. Use relative paths when possible.

2. **CORS errors**: If loading resources from different domains, ensure CORS headers are properly set.

3. **404 errors**: Check that all files were properly uploaded and that the server is configured to serve the correct directory.

4. **JavaScript errors**: Check the browser console for any JavaScript errors that might prevent the application from functioning properly.

### Solutions

1. For path issues, update file paths to be relative to the deployment root:
   ```html
   <!-- Instead of -->
   <link rel="stylesheet" href="/css/styles.css">
   
   <!-- Use -->
   <link rel="stylesheet" href="css/styles.css">
   ```

2. For CORS issues, either host all resources on the same domain or configure your server to send the appropriate CORS headers.

3. For 404 errors, verify file permissions and server configuration.

4. For JavaScript errors, check browser compatibility and ensure all required files are properly loaded.

## Conclusion

The MeAI prototype is a static web application that can be deployed to any web server or hosting service that supports static websites. The deployment process is straightforward and requires minimal configuration.

For any issues or questions regarding deployment, please contact the repository maintainer.
