# EmotionalStateContext

## Purpose
The EmotionalStateContext is used to return the results of emotional analysis of user input. It is typically sent from Mirror to Synthesis after analyzing the emotional content of user text.

## Flow Direction
- **Source**: Mirror
- **Target**: Synthesis

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
    "responseToContextId",
    "responseType",
    "status",
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
      "enum": ["Mirror"],
      "description": "Component that created this context"
    },
    "targetComponent": {
      "type": "string",
      "enum": ["Synthesis"],
      "description": "Component that should process this context"
    },
    "responseToContextId": {
      "type": "string",
      "format": "uuid",
      "description": "ID of the EmotionalAnalysisRequestContext this is responding to"
    },
    "responseType": {
      "type": "string",
      "enum": ["EmotionalStateResponse"],
      "description": "Type of response being provided"
    },
    "status": {
      "type": "string",
      "enum": ["success", "partial_success", "failure"],
      "description": "Status of the emotional analysis"
    },
    "payload": {
      "type": "object",
      "required": [
        "analysisInput",
        "identifiedEmotion",
        "intensity",
        "confidence"
      ],
      "properties": {
        "analysisInput": {
          "type": "string",
          "description": "The text that was analyzed"
        },
        "identifiedEmotion": {
          "type": "string",
          "description": "Primary emotion identified in the analysis"
        },
        "intensity": {
          "type": "number",
          "minimum": 0,
          "maximum": 1,
          "description": "Intensity of the primary emotion (0-1)"
        },
        "confidence": {
          "type": "number",
          "minimum": 0,
          "maximum": 1,
          "description": "Confidence level in the emotion identification (0-1)"
        },
        "secondaryEmotions": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["emotion", "intensity", "confidence"],
            "properties": {
              "emotion": {
                "type": "string",
                "description": "Secondary emotion identified"
              },
              "intensity": {
                "type": "number",
                "minimum": 0,
                "maximum": 1,
                "description": "Intensity of this secondary emotion (0-1)"
              },
              "confidence": {
                "type": "number",
                "minimum": 0,
                "maximum": 1,
                "description": "Confidence level in this emotion identification (0-1)"
              }
            }
          },
          "description": "Array of secondary emotions identified"
        },
        "suggestedApproaches": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "gentle_inquiry",
              "validation",
              "grounding",
              "reframing",
              "resource_provision",
              "reflection",
              "distraction",
              "emotional_support"
            ]
          },
          "description": "Suggested approaches for responding to this emotional state"
        },
        "analysisNotes": {
          "type": "string",
          "description": "Additional notes or context from the analysis"
        },
        "errorDetails": {
          "type": "object",
          "properties": {
            "errorCode": {
              "type": "string",
              "description": "Error code if analysis encountered issues"
            },
            "errorMessage": {
              "type": "string",
              "description": "Human-readable error message"
            },
            "recoveryStrategy": {
              "type": "string",
              "description": "Suggested strategy to recover from this error"
            }
          },
          "description": "Details about any errors encountered during analysis"
        }
      }
    }
  }
}
```

## Field Descriptions

### Top-Level Fields
- **contextId**: Unique identifier for this specific context instance
- **sessionId**: Identifier for the current user session
- **timestamp**: When this context was created, in ISO 8601 format
- **sourceComponent**: The component that created this context (always "Mirror" for this context type)
- **targetComponent**: The component that should process this context (always "Synthesis" for this context type)
- **responseToContextId**: The ID of the EmotionalAnalysisRequestContext this is responding to
- **responseType**: The type of response being provided (always "EmotionalStateResponse" for this context type)
- **status**: Indicates whether the analysis was successful, partially successful, or failed
- **payload**: Contains the actual data from the analysis

### Payload Fields
- **analysisInput**: The text that was analyzed, echoed back for verification
- **identifiedEmotion**: The primary emotion identified in the analysis
- **intensity**: How strongly the primary emotion is expressed (0-1 scale)
- **confidence**: How confident Mirror is in the emotion identification (0-1 scale)
- **secondaryEmotions**: Array of other emotions detected, each with its own intensity and confidence
- **suggestedApproaches**: Recommended approaches for responding to this emotional state
- **analysisNotes**: Additional context or notes from the analysis process
- **errorDetails**: If status is not "success", contains details about what went wrong

## Example
```json
{
  "contextId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "sessionId": "xyz-789",
  "timestamp": "2025-04-02T11:18:02Z",
  "sourceComponent": "Mirror",
  "targetComponent": "Synthesis",
  "responseToContextId": "550e8400-e29b-41d4-a716-446655440000",
  "responseType": "EmotionalStateResponse",
  "status": "success",
  "payload": {
    "analysisInput": "I feel overwhelmed",
    "identifiedEmotion": "overwhelm",
    "intensity": 0.8,
    "confidence": 0.95,
    "secondaryEmotions": [
      {"emotion": "anxiety", "intensity": 0.4, "confidence": 0.7}
    ],
    "suggestedApproaches": [
      "gentle_inquiry",
      "validation",
      "grounding"
    ]
  }
}
```

## Validation Rules
1. The `responseToContextId` must reference a valid EmotionalAnalysisRequestContext
2. The `timestamp` must be after the timestamp of the referenced request context
3. If `status` is not "success", the `errorDetails` object should be provided
4. The `identifiedEmotion` should be from a recognized emotion taxonomy

## Related Contexts
- **Preceded by**: [EmotionalAnalysisRequestContext](./emotional_analysis_request_context.md) - Synthesis's request for emotional analysis
- **Followed by**: Often leads to [ReflectionPromptContext](./reflection_prompt_context.md) for deeper exploration

## Usage Notes
- The `suggestedApproaches` field is particularly valuable for guiding Synthesis in how to respond
- Secondary emotions provide nuance that can be important for complex emotional states
- The confidence score helps Synthesis determine whether to trust the analysis or seek clarification
- When intensity is high (>0.7), consider prioritizing emotional support before practical solutions
