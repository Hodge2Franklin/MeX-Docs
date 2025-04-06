# Reference Guide for MeX Project Documentation

This guide explains how to reference the project documentation in future conversations to maintain continuity between sessions.

## Overview

The MeX project documentation system is designed to maintain a comprehensive record of the project state, ensuring that no context is lost between conversation threads. The system consists of:

1. **Project State Document** (`/home/ubuntu/mex_project/documentation/project_state.md`): A comprehensive overview of the current project state, including repository structure, component status, and next steps.

2. **Update Script** (`/home/ubuntu/mex_project/documentation/update_docs.sh`): An executable script that automatically updates the project state document with the latest information.

3. **Reference Guide** (this document): Instructions on how to reference the documentation in future conversations.

## How to Reference the Documentation

When starting a new conversation about the MeX project, include the following statement in your initial message:

```
Please refer to the project documentation at /home/ubuntu/mex_project/documentation/project_state.md for the current state of the MeX project.
```

This statement will direct attention to the project state document, which contains all the necessary context about the project, including:

- Project overview and repository structure
- Status of key documents
- MeAi web application structure and components
- Testing and deployment status
- Next steps for the project

## Keeping Documentation Updated

To ensure the documentation remains current:

1. Run the update script before starting a new conversation:
   ```
   /home/ubuntu/mex_project/documentation/update_docs.sh
   ```

2. The script will automatically update the project state document with the latest information about both the MeX-Docs repository and the MeAi web application.

3. After making significant changes to the project, run the update script again to capture those changes in the documentation.

## Best Practices

- **Regular Updates**: Run the update script after completing major tasks or making significant changes to the project.
- **Explicit References**: Always explicitly reference the project state document in new conversations.
- **Specific Questions**: When asking about specific aspects of the project, mention which section of the documentation you're referring to.
- **Documentation First**: Before asking questions about the project, review the project state document to see if the information is already available.

## Example Reference

Here's an example of how to reference the documentation in a new conversation:

```
I'd like to continue working on the MeAi web application. Please refer to the project documentation at /home/ubuntu/mex_project/documentation/project_state.md for the current state of the MeX project. Specifically, I'm interested in enhancing the Ethics Engine component.
```

This approach ensures that all relevant context is available from the start of the conversation, maintaining continuity and efficiency in the development process.

## Troubleshooting

If you encounter issues with the documentation system:

1. Verify that the update script is executable:
   ```
   chmod +x /home/ubuntu/mex_project/documentation/update_docs.sh
   ```

2. Check for any error messages when running the update script.

3. If the project structure changes significantly, you may need to modify the update script to reflect those changes.

## Conclusion

By consistently referencing the project documentation in new conversations, you ensure that no context is lost between sessions, allowing for more efficient and effective collaboration on the MeX project.
