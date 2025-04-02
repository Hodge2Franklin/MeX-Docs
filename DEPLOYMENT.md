# Deployment Guide - MeX AI Companion Documentation Explorer

This document provides detailed instructions for deploying the MeX AI Companion Documentation Explorer to various environments.

## Prerequisites

- Web server with static file hosting capabilities
- Git (for obtaining the source code)
- Basic knowledge of web server configuration

## Deployment Options

### 1. Standard Web Server Deployment

#### Step 1: Obtain the Source Code
```bash
git clone -b Rev04 https://github.com/Hodge2Franklin/MeX-Docs.git
cd MeX-Docs
```

#### Step 2: Configure Web Server
Configure your web server to serve the files from the cloned directory. The specific configuration depends on your web server:

**Apache**:
- Ensure the DocumentRoot points to the cloned directory
- Make sure .htaccess files are enabled if you need URL rewriting

**Nginx**:
- Configure the server block to point to the cloned directory
- Example configuration:
```
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/MeX-Docs;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

#### Step 3: Verify Deployment
- Access your domain in a web browser
- Verify that the documentation explorer loads correctly
- Test navigation and search functionality
- Check mobile responsiveness

### 2. GitHub Pages Deployment

#### Step 1: Fork the Repository
- Fork the repository to your GitHub account
- Ensure you're using the Rev04 branch

#### Step 2: Enable GitHub Pages
- Go to repository Settings
- Navigate to Pages section
- Select the Rev04 branch as the source
- Save the configuration

#### Step 3: Access the Deployed Site
- GitHub will provide a URL for your deployed site
- Typically in the format: https://username.github.io/MeX-Docs/

### 3. Static Site Hosting Services

The documentation explorer can be deployed to various static site hosting services:

#### Netlify
1. Connect your GitHub repository to Netlify
2. Configure the build settings (not required as this is a pre-built static site)
3. Deploy the site

#### Vercel
1. Import your GitHub repository to Vercel
2. Configure as a static site project
3. Deploy the site

## Post-Deployment Tasks

After deploying the documentation explorer, perform these tasks:

1. **Test All Functionality**:
   - Verify all documentation sections load correctly
   - Test search functionality
   - Check responsive design on various devices

2. **Update DNS Records** (if using a custom domain):
   - Point your domain to the hosting service
   - Configure SSL certificates if needed

3. **Monitor Performance**:
   - Check page load times
   - Verify all assets are loading correctly

## Troubleshooting

### Common Issues

1. **Missing Content**:
   - Ensure all documentation files are in the `docs/` directory
   - Check file paths in the JavaScript file mapping

2. **Styling Issues**:
   - Verify all CSS files are properly loaded
   - Check for console errors related to missing resources

3. **Search Not Working**:
   - Ensure JavaScript is enabled in the browser
   - Check console for JavaScript errors
   - Verify the search.js file is being loaded

## Maintenance

To update the deployed documentation explorer:

1. Make changes to the repository
2. Push changes to the Rev04 branch
3. If using a CI/CD pipeline, the site will update automatically
4. Otherwise, redeploy manually following the steps above

---

For additional support or questions, please contact the repository maintainer.
