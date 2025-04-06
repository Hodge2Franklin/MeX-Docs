# MeAi Web Application Deployment Workflow

## Overview

This document outlines the workflow for deploying the MeAi web application and ensuring all changes are synchronized with the GitHub repository. The deployment process has been automated through the `deploy_and_sync.sh` script, which handles both GitHub synchronization and deployment to the Manus platform.

## Deployment Process

### 1. Automated Deployment

The simplest way to deploy the MeAi web application is to use the automated deployment script:

```bash
cd /home/ubuntu/mex_project/meai_web_app
./deploy_and_sync.sh deploy
```

This command will:
- Commit all changes to the local Git repository
- Push changes to GitHub (if credentials are available)
- Build and start the Docker containers
- Expose the application to the internet via the Manus platform
- Update project documentation with the live link

### 2. GitHub Synchronization Only

If you only want to synchronize changes with GitHub without deploying:

```bash
./deploy_and_sync.sh sync
```

### 3. Checking Deployment Status

To check the status of the current deployment:

```bash
./deploy_and_sync.sh status
```

This will show:
- The current deployment URL
- Whether the application is currently running

## Conversation Continuity

To ensure continuity between conversations:

1. Before ending a conversation, run:
   ```bash
   bash /home/ubuntu/project/documentation/update_documentation.sh
   ```

2. Then deploy and push changes:
   ```bash
   bash /home/ubuntu/mex_project/meai_web_app/deploy_and_sync.sh deploy
   ```

3. In the new conversation, reference:
   ```
   Please refer to the project documentation at /home/ubuntu/project/documentation/project_state.md for the current state of the MeX project.
   ```

## Troubleshooting

### GitHub Authentication Issues

If you encounter GitHub authentication issues:

1. Ensure you have the correct credentials
2. Consider setting up the GITHUB_TOKEN environment variable:
   ```bash
   export GITHUB_TOKEN=your_github_token
   ```
3. If authentication fails, the script will still proceed with local deployment

### Docker Issues

If Docker commands fail:

1. Ensure Docker and Docker Compose are installed
2. Check Docker service status: `systemctl status docker`
3. Verify Docker Compose installation: `docker-compose --version`

## Last Updated
2025-04-06 06:07:30
