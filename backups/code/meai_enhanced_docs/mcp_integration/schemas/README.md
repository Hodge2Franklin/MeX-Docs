# MCP Context Schemas

This directory contains formal definitions of all Model Context Protocol (MCP) context types used in MeAi. Each schema includes a detailed JSON structure and examples of how the context is used in practice.

## Overview

MeAi implements several specialized MCP context types to facilitate its unique architecture and enable sophisticated sequential thinking and context maintenance. These schemas define the structure and content of the contexts exchanged between components.

## Schema Documentation Format

Each schema document follows a consistent format:

1. **Purpose**: Description of what the context is used for
2. **Flow Direction**: Which components send and receive this context
3. **Schema Definition**: Formal JSON schema definition
4. **Field Descriptions**: Detailed explanation of each field
5. **Example**: Complete example of the context in use
6. **Validation Rules**: Any specific validation requirements
7. **Related Contexts**: Other contexts that typically precede or follow

## Available Schemas

- [EmotionalAnalysisRequestContext](./emotional_analysis_request_context.md)
- [EmotionalStateContext](./emotional_state_context.md)
- [ReflectionPromptContext](./reflection_prompt_context.md)
- [ReflectionResponseContext](./reflection_response_context.md)
- [MemoryQueryContext](./memory_query_context.md)
- [MemoryContext](./memory_context.md)
- [ResourceRequestContext](./resource_request_context.md)
- [ResourceResponseContext](./resource_response_context.md)
- [ResourceDetailRequestContext](./resource_detail_request_context.md)
- [ResourceDetailResponseContext](./resource_detail_response_context.md)
- [SessionStateContext](./session_state_context.md)

## Implementation Notes

- All MCP contexts must conform to their defined schemas
- Validation occurs at component boundaries
- Schema violations are logged and handled gracefully
- Components must handle malformed or unexpected contexts
- Error responses follow standardized formats

## Usage in Use Cases

For examples of how these contexts are used in practice, see the [detailed use cases](../../use_cases/detailed/), particularly [UC-001: User Expresses Overwhelm](../../use_cases/detailed/uc_001_overwhelm.md) which demonstrates the flow of multiple context types.
