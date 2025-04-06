# MeAi Project Usage Instructions

## Overview

This document provides instructions for working with the MeAi project, including documentation management, deployment, and maintaining continuity between conversations.

## Documentation Management

### Viewing Project State

To view the current state of the project:

```bash
cat /home/ubuntu/project/documentation/project_state.md
```

### Updating Documentation

To update all documentation files:

```bash
bash /home/ubuntu/project/documentation/update_documentation.sh
```

### Viewing Deployment Workflow

To view the deployment workflow:

```bash
cat /home/ubuntu/project/documentation/deployment_workflow.md
```

### Viewing Manus Prompt

To view the Manus prompt:

```bash
cat /home/ubuntu/project/documentation/manus_prompt.md
```

## Deployment

### Deploying the Application

To deploy the application and push changes to GitHub:

```bash
bash /home/ubuntu/mex_project/meai_web_app/deploy_and_sync.sh deploy
```

### Checking Deployment Status

To check the status of the deployment:

```bash
bash /home/ubuntu/mex_project/meai_web_app/deploy_and_sync.sh status
```

## Maintaining Continuity

### Starting a New Conversation

When starting a new conversation, include this statement in your initial message:

```
Please refer to the project documentation at /home/ubuntu/project/documentation/project_state.md for the current state of the MeX project.
```

### Before Ending a Conversation

Before ending a conversation:

1. Update documentation:
   ```bash
   bash /home/ubuntu/project/documentation/update_documentation.sh
   ```

2. Deploy and push changes:
   ```bash
   bash /home/ubuntu/mex_project/meai_web_app/deploy_and_sync.sh deploy
   ```

## File Locations

- Project documentation: /home/ubuntu/project/documentation/
- MeAi application: /home/ubuntu/mex_project/meai_web_app/
- Deployment scripts: /home/ubuntu/mex_project/meai_web_app/deploy_and_sync.sh
- Documentation update script: /home/ubuntu/project/documentation/update_documentation.sh
- Project state document: /home/ubuntu/project/documentation/project_state.md
- Deployment workflow document: /home/ubuntu/project/documentation/deployment_workflow.md
- Usage instructions: /home/ubuntu/project/documentation/usage_instructions.md
- Manus prompt: /home/ubuntu/project/documentation/manus_prompt.md

## Last Updated
2025-04-06 06:07:30
