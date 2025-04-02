# EmotionalAnalysisRequestContext

## Purpose
The EmotionalAnalysisRequestContext is used to request emotional analysis of user input. It is typically sent from Synthesis to Mirror when the system needs to understand the emotional state of the user based on their text input.

## Flow Direction
- **Source**: Synthesis
- **Target**: Mirror

## Schema Definition
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "contextId",
    "sessionId",
    "timestamp",
    "sourceComponent",
    "targetComponent",
    "requestType",
    "payload"
  ],
  "properties": {
    "contextId": {
      "type": "string",
      "format": "uuid",
      "description": "Unique identifier for this context instance"
    },
    "sessionId": {
      "type": "string",
      "description": "Identifier for the current user session"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "ISO 8601 timestamp when this context was created"
    },
    "sourceComponent": {
      "type": "string",
      "enum": ["Synthesis"],
      "description": "Component that created this context"
    },
    "targetComponent": {
      "type": "string",
      "enum": ["Mirror"],
      "description": "Component that should process this context"
    },
    "requestType": {
      "type": "string",
      "enum": ["EmotionalAnalysisRequest"],
      "description": "Type of request being made"
    },
    "payload": {
      "type": "object",
      "required": [
        "textInput",
        "userId"
      ],
      "properties": {
        "textInput": {
          "type": "string",
          "description": "User text to analyze for emotional content"
        },
        "scope": {
          "type": "string",
          "enum": [
            "current_immediate_state",
            "underlying_pattern",
            "historical_comparison"
          ],
          "default": "current_immediate_state",
          "description": "Scope of the emotional analysis"
        },
        "userId": {
          "type": "string",
          "description": "Identifier for the user"
        },
        "previousEmotionalStates": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "emotion": {
                "type": "string",
                "description": "Previously identified emotion"
              },
              "timestamp": {
                "type": "string",
                "format": "date-time",
                "description": "When this emotion was identified"
              },
              "intensity": {
                "type": "number",
                "minimum": 0,
                "maximum": 1,
                "description": "Intensity of the emotion (0-1)"
              }
            }
          },
          "description": "Optional array of previous emotional states for comparison"
        }
      }
    }
  }
}
```

## Field Descriptions

### Top-Level Fields
- **contextId**: Unique identifier for this specific context instance, used for tracking and reference
- **sessionId**: Identifier for the current user session, used to group related contexts
- **timestamp**: When this context was created, in ISO 8601 format
- **sourceComponent**: The component that created this context (always "Synthesis" for this context type)
- **targetComponent**: The component that should process this context (always "Mirror" for this context type)
- **requestType**: The type of request being made (always "EmotionalAnalysisRequest" for this context type)
- **payload**: Contains the actual data for the request

### Payload Fields
- **textInput**: The user's text that should be analyzed for emotional content
- **scope**: Defines the scope of analysis:
  - `current_immediate_state`: Analyze the immediate emotional state (default)
  - `underlying_pattern`: Look for deeper emotional patterns
  - `historical_comparison`: Compare with historical emotional states
- **userId**: Identifier for the user, used to access user-specific models or history
- **previousEmotionalStates**: Optional array of previous emotional states for comparison or context

## Example
```json
{
  "contextId": "550e8400-e29b-41d4-a716-446655440000",
  "sessionId": "xyz-789",
  "timestamp": "2025-04-02T11:18:01Z",
  "sourceComponent": "Synthesis",
  "targetComponent": "Mirror",
  "requestType": "EmotionalAnalysisRequest",
  "payload": {
    "textInput": "I feel overwhelmed",
    "scope": "current_immediate_state",
    "userId": "user-123"
  }
}
```

## Validation Rules
1. The `textInput` field must not be empty
2. The `timestamp` must be a valid ISO 8601 date-time string
3. The `contextId` should be a valid UUID
4. If `previousEmotionalStates` is provided, each entry must have at least the `emotion` field

## Related Contexts
- **Followed by**: [EmotionalStateContext](./emotional_state_context.md) - Mirror's response with emotional analysis results
- **Preceded by**: Typically follows user input processing in Synthesis

## Usage Notes
- This context is typically one of the first in an interaction sequence
- The `scope` field helps Mirror determine the depth and type of analysis to perform
- For real-time interactions, keep the `textInput` focused on recent user statements
- For deeper analysis, include `previousEmotionalStates` to provide context
