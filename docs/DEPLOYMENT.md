# Deployment Documentation - MeX AI Companion Documentation Explorer

This document provides detailed instructions for deploying the MeX AI Companion Documentation Explorer website.

## Prerequisites

- Git installed on your system
- Access to the GitHub repository
- Appropriate permissions for deployment

## Deployment Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Hodge2Franklin/MeX-Docs.git
cd MeX-Docs
```

### 2. Prepare Deployment Directory

Create a clean deployment directory:

```bash
mkdir -p ../deploy
cp -r ./* ../deploy/
```

### 3. Verify File Structure

Ensure the deployment directory contains all necessary files:

```bash
ls -la ../deploy
```

The directory should contain:
- index.html
- css/ directory
- js/ directory
- img/ directory
- docs/ directory
- ai_companion/ directory

### 4. Deploy the Website

#### Option 1: Using Manus Deployment Tool

```bash
deploy_apply_deployment --local_dir=/path/to/deploy --type=static
```

#### Option 2: Using Other Static Hosting Services

The documentation explorer can be deployed to any static hosting service, including:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Firebase Hosting

Follow the specific instructions for your chosen hosting service.

### 5. Verify Deployment

After deployment, verify that:

1. The website is accessible at the deployment URL
2. All navigation links work correctly
3. Documentation content displays properly
4. Images and styles are loading correctly

## Troubleshooting

### Common Issues

1. **Missing CSS Styles**
   - Check that all CSS files are included in the deployment
   - Verify paths in HTML files are correct

2. **Broken Links**
   - Ensure all internal links use relative paths
   - Check for hardcoded URLs that may need updating

3. **Missing Images**
   - Verify all image files are included in the deployment
   - Check image paths in HTML and CSS files

4. **JavaScript Errors**
   - Check browser console for JavaScript errors
   - Ensure all JS dependencies are included

## Rollback Procedure

If issues are encountered after deployment:

1. Identify the last stable version in the repository
2. Clone that version:
   ```bash
   git clone -b [stable-branch] https://github.com/Hodge2Franklin/MeX-Docs.git
   ```
3. Follow the deployment steps above with the stable version

## Maintenance

### Updating Documentation Content

1. Edit the relevant Markdown files in the `docs/` directory
2. Commit changes to the repository
3. Redeploy following the steps above

### Adding New Documentation Sections

1. Create new Markdown files in the appropriate directory
2. Update navigation links in HTML files as needed
3. Commit changes and redeploy

## Security Considerations

- The documentation explorer is configured with `robots.txt` to prevent search engine indexing
- No sensitive information should be included in the documentation
- Regular security audits should be performed on the deployed website
