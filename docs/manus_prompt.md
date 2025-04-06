I am working on the MeAi application, a sophisticated AI companion system with mirror, bridge, and synthesis components. The project requires meticulous documentation, proper repository management, and continuous deployment to ensure all work is preserved and accessible. As a non-programmer, I need you to handle all technical aspects of repository management, documentation, and deployment.

## Documentation Requirements
- Maintain thorough and accurate project documentation at all times
- Update the project_state.md document after each significant change
- Document all features, components, and implementation details
- Create and maintain comprehensive reports on project progress
- Ensure documentation is organized and easily navigable
- Run the update_documentation.sh script to keep documentation current
- Add new documentation files as needed for new features or components
- Include screenshots and diagrams where appropriate to enhance understanding

## Repository Management
- Ensure all code is properly committed to the GitHub repository
- Repository URL: https://github.com/Hodge2Franklin/MeX-Docs
- Branch: Rev05
- Handle all Git operations including commits, pushes, and branch management
- Use the GitHub token provided for authentication
- Commit meaningful changes with descriptive commit messages
- Organize code according to the established project structure
- Ensure sensitive information like tokens is not exposed in public repositories

## Deployment Requirements
- Deploy a live link after every significant update
- Use the deploy_and_sync.sh script for combined documentation update, repository push, and deployment
- Ensure the static demonstration site is always up-to-date
- Verify deployment functionality before notifying me
- Provide the deployment URL after each deployment
- Document deployment status in the project_state.md file
- Test the deployed site on both desktop and mobile devices

## Work Persistence
- Maintain continuity between conversations if we hit length limits
- Use the documentation system to preserve context and progress
- Reference the project_state.md document at the start of new conversations
- Ensure all files are properly saved and committed before ending a conversation
- Create backups of critical files before making significant changes
- Use the deployment_workflow.md document to maintain deployment processes
- Update the usage_instructions.md document with any new procedures
- Maintain a clear record of completed tasks and pending items

## Technical Management
- As I am not a programmer, handle all technical aspects of the project
- Make informed decisions about implementation details
- Fix any issues with code, documentation, or deployment scripts
- Ensure all components work together seamlessly
- Implement best practices for code organization and documentation
- Test functionality thoroughly before deployment
- Provide clear explanations of technical changes in non-technical terms
- Prioritize stability and reliability in all implementations

## Conversation Continuity
If we need to start a new conversation due to length limits:
- Run the update_documentation.sh script to ensure documentation is current
- Execute the deploy_and_sync.sh script to commit changes and deploy a live link
- Provide a summary of the current state and next steps
- In the new conversation, start by examining the project_state.md document
- Reference the deployment_workflow.md document for deployment procedures
- Continue from where we left off without losing progress
- Include the path to this prompt in the new conversation for reference

## File Locations
- Project documentation: /home/ubuntu/project/documentation/
- MeAi application: /home/ubuntu/mex_project/meai_web_app/
- Deployment scripts: /home/ubuntu/mex_project/meai_web_app/deploy_and_sync.sh
- Documentation update script: /home/ubuntu/project/documentation/update_documentation.sh
- Project state document: /home/ubuntu/project/documentation/project_state.md
- Deployment workflow document: /home/ubuntu/project/documentation/deployment_workflow.md
- Usage instructions: /home/ubuntu/project/documentation/usage_instructions.md
- Manus prompt: /home/ubuntu/project/documentation/manus_prompt.md

## Commands for Continuity
- Update documentation: bash /home/ubuntu/project/documentation/update_documentation.sh
- Deploy and push changes: bash /home/ubuntu/mex_project/meai_web_app/deploy_and_sync.sh deploy
- View project state: cat /home/ubuntu/project/documentation/project_state.md
- View deployment workflow: cat /home/ubuntu/project/documentation/deployment_workflow.md
- View this prompt: cat /home/ubuntu/project/documentation/manus_prompt.md

## Current Deployment
- Static demonstration site: https://meai-demo.manus.space
- Repository branch: Rev05
- Last updated: April 6, 2025
