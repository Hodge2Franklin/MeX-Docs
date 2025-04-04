# API Contracts Specification

## Overview

This document defines the comprehensive API contracts for all MeAi components. It provides detailed specifications for the interfaces between components, including request/response formats, error handling, authentication requirements, and rate limiting. These contracts ensure consistent communication and enable independent development of components.

## API Design Principles

All MeAi APIs adhere to the following design principles:

1. **REST-based**: Resource-oriented design with appropriate HTTP methods
2. **JSON-first**: JSON as primary data exchange format
3. **Versioned**: All APIs include version in path (e.g., `/v1/resource`)
4. **Self-documenting**: OpenAPI/Swagger documentation for all endpoints
5. **Consistent error handling**: Standardized error responses across all APIs
6. **Idempotent operations**: Safe to retry without side effects
7. **Pagination**: Consistent pagination for list endpoints
8. **HATEOAS**: Hypermedia links for resource discovery
9. **Rate limiting**: Consistent rate limiting headers

## Common API Patterns

### Authentication

All APIs require authentication using JWT tokens:

```
Authorization: Bearer {token}
```

### Error Response Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "specific_field",
      "reason": "Specific reason for error"
    },
    "requestId": "unique-request-id",
    "documentation": "https://docs.meai.com/errors/ERROR_CODE"
  }
}
```

### Pagination

```json
{
  "data": [...],
  "pagination": {
    "totalItems": 100,
    "itemsPerPage": 20,
    "currentPage": 1,
    "totalPages": 5,
    "links": {
      "self": "/v1/resources?page=1&limit=20",
      "next": "/v1/resources?page=2&limit=20",
      "prev": null,
      "first": "/v1/resources?page=1&limit=20",
      "last": "/v1/resources?page=5&limit=20"
    }
  }
}
```

### Rate Limiting Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1617192000
```

## Component API Specifications

### Synthesis API

The Synthesis API serves as the central orchestration layer for MeAi, coordinating interactions between Mirror, Bridge, and Memory System components.

#### Session Management

##### Create Session

- **Endpoint**: `POST /v1/sessions`
- **Description**: Creates a new user session
- **Request Body**:
  ```json
  {
    "userId": "user-123",
    "deviceInfo": {
      "type": "mobile",
      "os": "iOS",
      "osVersion": "16.5",
      "appVersion": "1.2.3"
    },
    "initialContext": {
      "referrer": "direct",
      "entryPoint": "home_screen"
    }
  }
  ```
- **Response Body** (201 Created):
  ```json
  {
    "sessionId": "session-456",
    "userId": "user-123",
    "createdAt": "2025-04-02T11:30:00Z",
    "expiresAt": "2025-04-02T12:30:00Z",
    "status": "active",
    "links": {
      "self": "/v1/sessions/session-456",
      "user": "/v1/users/user-123",
      "interactions": "/v1/sessions/session-456/interactions"
    }
  }
  ```
- **Error Codes**:
  - `INVALID_USER_ID`: User ID does not exist
  - `SESSION_LIMIT_EXCEEDED`: User has too many active sessions
  - `INVALID_DEVICE_INFO`: Device information is malformed

##### Get Session

- **Endpoint**: `GET /v1/sessions/{sessionId}`
- **Description**: Retrieves session information
- **Response Body** (200 OK):
  ```json
  {
    "sessionId": "session-456",
    "userId": "user-123",
    "createdAt": "2025-04-02T11:30:00Z",
    "expiresAt": "2025-04-02T12:30:00Z",
    "status": "active",
    "lastInteractionAt": "2025-04-02T11:35:00Z",
    "interactionCount": 3,
    "currentEmotionalState": {
      "primaryEmotion": "calm",
      "intensity": 0.7,
      "lastUpdated": "2025-04-02T11:35:00Z"
    },
    "links": {
      "self": "/v1/sessions/session-456",
      "user": "/v1/users/user-123",
      "interactions": "/v1/sessions/session-456/interactions"
    }
  }
  ```
- **Error Codes**:
  - `SESSION_NOT_FOUND`: Session does not exist
  - `SESSION_EXPIRED`: Session has expired

#### User Input Processing

##### Process User Input

- **Endpoint**: `POST /v1/sessions/{sessionId}/interactions`
- **Description**: Processes user input and orchestrates response generation
- **Request Body**:
  ```json
  {
    "input": {
      "type": "text",
      "content": "I feel overwhelmed and unsure what to do"
    },
    "context": {
      "location": "home",
      "timeOfDay": "evening",
      "previousInteractionId": "interaction-789"
    }
  }
  ```
- **Response Body** (202 Accepted):
  ```json
  {
    "interactionId": "interaction-790",
    "status": "processing",
    "estimatedCompletionTime": "2025-04-02T11:30:05Z",
    "links": {
      "self": "/v1/sessions/session-456/interactions/interaction-790",
      "status": "/v1/sessions/session-456/interactions/interaction-790/status"
    }
  }
  ```
- **Error Codes**:
  - `SESSION_NOT_FOUND`: Session does not exist
  - `SESSION_EXPIRED`: Session has expired
  - `INVALID_INPUT`: Input is malformed or empty
  - `RATE_LIMITED`: Too many requests in time period

##### Get Interaction Status

- **Endpoint**: `GET /v1/sessions/{sessionId}/interactions/{interactionId}/status`
- **Description**: Checks the status of an interaction
- **Response Body** (200 OK):
  ```json
  {
    "interactionId": "interaction-790",
    "status": "completed",
    "processingSteps": [
      {
        "step": "emotional_analysis",
        "status": "completed",
        "startedAt": "2025-04-02T11:30:01Z",
        "completedAt": "2025-04-02T11:30:02Z"
      },
      {
        "step": "memory_retrieval",
        "status": "completed",
        "startedAt": "2025-04-02T11:30:02Z",
        "completedAt": "2025-04-02T11:30:03Z"
      },
      {
        "step": "response_generation",
        "status": "completed",
        "startedAt": "2025-04-02T11:30:03Z",
        "completedAt": "2025-04-02T11:30:04Z"
      }
    ],
    "links": {
      "self": "/v1/sessions/session-456/interactions/interaction-790/status",
      "interaction": "/v1/sessions/session-456/interactions/interaction-790",
      "response": "/v1/sessions/session-456/interactions/interaction-790/response"
    }
  }
  ```
- **Error Codes**:
  - `INTERACTION_NOT_FOUND`: Interaction does not exist
  - `SESSION_NOT_FOUND`: Session does not exist

##### Get Interaction Response

- **Endpoint**: `GET /v1/sessions/{sessionId}/interactions/{interactionId}/response`
- **Description**: Retrieves the response for a completed interaction
- **Response Body** (200 OK):
  ```json
  {
    "interactionId": "interaction-790",
    "response": {
      "type": "composite",
      "components": [
        {
          "type": "text",
          "content": "I can hear that you're feeling overwhelmed right now. Can you name one specific thing that's contributing to this feeling of overwhelm?",
          "tone": "gentle_inquiry",
          "purpose": "identify_specific_triggers"
        },
        {
          "type": "haptic",
          "pattern": "listening",
          "intensity": 0.6,
          "duration": 2000
        }
      ]
    },
    "emotionalAnalysis": {
      "identifiedEmotion": "overwhelm",
      "intensity": 0.8,
      "confidence": 0.95
    },
    "suggestedFollowUp": {
      "type": "reflection",
      "content": "It sounds like you're experiencing a lot right now."
    },
    "links": {
      "self": "/v1/sessions/session-456/interactions/interaction-790/response",
      "interaction": "/v1/sessions/session-456/interactions/interaction-790",
      "session": "/v1/sessions/session-456"
    }
  }
  ```
- **Error Codes**:
  - `INTERACTION_NOT_FOUND`: Interaction does not exist
  - `RESPONSE_NOT_READY`: Interaction is still processing
  - `SESSION_NOT_FOUND`: Session does not exist

### Mirror API

The Mirror API handles emotional analysis, reflection, and internal state processing.

#### Emotional Analysis

##### Analyze Emotion

- **Endpoint**: `POST /v1/mirror/emotional-analysis`
- **Description**: Analyzes text for emotional content
- **Request Body**:
  ```json
  {
    "sessionId": "session-456",
    "text": "I feel overwhelmed",
    "scope": "current_immediate_state",
    "userId": "user-123",
    "previousEmotionalStates": [
      {
        "emotion": "anxious",
        "timestamp": "2025-04-02T11:20:00Z",
        "intensity": 0.6
      }
    ]
  }
  ```
- **Response Body** (200 OK):
  ```json
  {
    "analysisId": "analysis-123",
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
    ],
    "processingTime": 120
  }
  ```
- **Error Codes**:
  - `INVALID_TEXT`: Text is empty or too long
  - `UNSUPPORTED_LANGUAGE`: Language not supported
  - `ANALYSIS_FAILED`: Analysis could not be completed

#### Reflection Generation

##### Generate Reflection Prompt

- **Endpoint**: `POST /v1/mirror/reflection-prompts`
- **Description**: Generates a reflection prompt based on emotional state
- **Request Body**:
  ```json
  {
    "sessionId": "session-456",
    "emotionalState": {
      "primaryEmotion": "overwhelm",
      "intensity": 0.8
    },
    "promptPurpose": "identify_specific_triggers",
    "promptTone": "gentle_inquiry",
    "userContext": {
      "currentStatement": "I feel overwhelmed and unsure what to do"
    }
  }
  ```
- **Response Body** (200 OK):
  ```json
  {
    "promptId": "prompt-456",
    "reflectionPrompt": "I can hear that you're feeling overwhelmed right now. Can you name one specific thing that's contributing to this feeling of overwhelm?",
    "promptPurpose": "identify_specific_triggers",
    "promptTone": "gentle_inquiry",
    "expectedResponseTypes": ["specific_trigger", "general_area", "resistance"],
    "followUpSuggestions": [
      {
        "responseType": "specific_trigger",
        "followUp": "That's helpful to know. How long has {trigger} been contributing to your overwhelm?"
      },
      {
        "responseType": "resistance",
        "followUp": "It's okay if you're not ready to identify specific triggers. Would it help to take a moment to breathe together?"
      }
    ]
  }
  ```
- **Error Codes**:
  - `INVALID_EMOTIONAL_STATE`: Emotional state is invalid
  - `UNSUPPORTED_PURPOSE`: Prompt purpose not supported
  - `GENERATION_FAILED`: Prompt generation failed

### Memory System API

The Memory System API manages the storage and retrieval of user memories, patterns, and significant events.

#### Memory Query

##### Query Memories

- **Endpoint**: `POST /v1/memory/query`
- **Description**: Queries the memory system for relevant memories
- **Request Body**:
  ```json
  {
    "sessionId": "session-456",
    "userId": "user-123",
    "queryType": "contextual",
    "primaryEntities": ["work", "deadlines", "projects"],
    "relatedEmotions": ["overwhelm", "anxiety"],
    "timeframe": "recent_and_patterns",
    "currentContext": {
      "userStatement": "Work deadlines. I have three projects due this week and I don't know where to start.",
      "identifiedEmotion": "overwhelm"
    },
    "maxResults": 3
  }
  ```
- **Response Body** (200 OK):
  ```json
  {
    "queryId": "query-789",
    "memories": [
      {
        "type": "Echo",
        "id": "echo-123",
        "pattern": "work_deadline_overwhelm",
        "frequency": "recurring_monthly",
        "lastOccurrence": "2025-03-05T14:22:00Z",
        "description": "Pattern of feeling overwhelmed when facing multiple work deadlines",
        "confidence": 0.92,
        "relatedMemories": ["marker-456", "marker-789"]
      },
      {
        "type": "Marker",
        "id": "marker-456",
        "timestamp": "2025-03-05T14:30:00Z",
        "description": "User successfully applied chunking technique to break down work projects",
        "emotionalImpact": "positive",
        "relatedEntities": ["work", "chunking_technique"],
        "importance": 0.85
      },
      {
        "type": "Marker",
        "id": "marker-789",
        "timestamp": "2025-02-10T09:15:00Z",
        "description": "User mentioned difficulty prioritizing tasks when multiple deadlines approach",
        "emotionalImpact": "negative",
        "relatedEntities": ["work", "prioritization", "deadlines"],
        "importance": 0.78
      }
    ],
    "analysisInsights": "User has a recurring pattern of work-related overwhelm, but has previously benefited from chunking techniques. Prioritization appears to be a specific challenge area.",
    "queryPerformance": {
      "processingTime": 85,
      "nodesExplored": 127,
      "relevanceThreshold": 0.7
    }
  }
  ```
- **Error Codes**:
  - `USER_NOT_FOUND`: User does not exist
  - `INVALID_QUERY`: Query parameters are invalid
  - `MEMORY_ACCESS_DENIED`: Access to memories denied

#### Memory Storage

##### Store Memory

- **Endpoint**: `POST /v1/memory/store`
- **Description**: Stores a new memory or updates an existing one
- **Request Body**:
  ```json
  {
    "sessionId": "session-456",
    "userId": "user-123",
    "memoryType": "Marker",
    "content": {
      "description": "User applied chunking technique to break down current work projects",
      "emotionalImpact": "positive",
      "relatedEntities": ["work", "chunking_technique", "current_projects"],
      "importance": 0.85,
      "source": "user_interaction",
      "interactionId": "interaction-790"
    },
    "relationships": [
      {
        "targetMemoryId": "marker-456",
        "relationshipType": "reinforces",
        "strength": 0.9
      },
      {
        "targetMemoryId": "echo-123",
        "relationshipType": "instance_of",
        "strength": 0.8
      }
    ]
  }
  ```
- **Response Body** (201 Created):
  ```json
  {
    "memoryId": "marker-901",
    "userId": "user-123",
    "createdAt": "2025-04-02T11:40:00Z",
    "status": "stored",
    "patternAnalysis": {
      "contributesToPatterns": ["work_deadline_overwhelm"],
      "patternStrengthChange": 0.05,
      "newPatternsSuggested": []
    },
    "links": {
      "self": "/v1/memory/marker-901",
      "relatedMemories": "/v1/memory/marker-901/related"
    }
  }
  ```
- **Error Codes**:
  - `USER_NOT_FOUND`: User does not exist
  - `INVALID_MEMORY_TYPE`: Memory type is invalid
  - `INVALID_RELATIONSHIP`: Relationship target does not exist
  - `STORAGE_FAILED`: Memory could not be stored

### Bridge API

The Bridge API connects users to external resources and applies TruthFilter verification.

#### Resource Retrieval

##### Find Resources

- **Endpoint**: `POST /v1/bridge/resources/search`
- **Description**: Searches for relevant resources based on user context
- **Request Body**:
  ```json
  {
    "sessionId": "session-456",
    "resourceType": "technique",
    "primaryTopic": "task_management",
    "specificFocus": "breaking_down_multiple_projects",
    "userContext": {
      "currentTrigger": "multiple work deadlines",
      "emotionalState": "overwhelm",
      "relevantHistory": "previously benefited from chunking technique"
    },
    "resourceConstraints": {
      "complexity": "low_to_medium",
      "timeRequired": "immediate_application",
      "preferredFormats": ["step_by_step", "framework"]
    },
    "maxResults": 3
  }
  ```
- **Response Body** (200 OK):
  ```json
  {
    "searchId": "search-123",
    "resources": [
      {
        "resourceId": "res-456",
        "title": "The Chunking Method for Multiple Projects",
        "type": "technique",
        "summary": "A practical approach to breaking down multiple projects into manageable chunks",
        "relevanceScore": 0.92,
        "truthFilterScore": 0.95,
        "format": "step_by_step",
        "applicationTime": "5-10 minutes",
        "hasDetailedContent": true,
        "tags": ["productivity", "project_management", "overwhelm", "chunking"]
      },
      {
        "resourceId": "res-789",
        "title": "Priority Matrix for Deadline Management",
        "type": "framework",
        "summary": "A framework for prioritizing tasks across multiple projects with approaching deadlines",
        "relevanceScore": 0.87,
        "truthFilterScore": 0.91,
        "format": "framework",
        "applicationTime": "10-15 minutes",
        "hasDetailedContent": true,
        "tags": ["productivity", "prioritization", "deadlines", "matrix"]
      }
    ],
    "recommendationRationale": "These resources directly address the user's current challenge with multiple work deadlines. The Chunking Method builds on their previous positive experience with chunking techniques and provides immediate, practical steps they can apply.",
    "searchPerformance": {
      "processingTime": 150,
      "resourcesEvaluated": 42,
      "truthFilterApplied": true
    }
  }
  ```
- **Error Codes**:
  - `INVALID_RESOURCE_TYPE`: Resource type is invalid
  - `INVALID_TOPIC`: Topic is invalid or not supported
  - `SEARCH_FAILED`: Search could not be completed

##### Get Resource Details

- **Endpoint**: `GET /v1/bridge/resources/{resourceId}`
- **Description**: Retrieves detailed information about a specific resource
- **Request Parameters**:
  - `sessionId`: Current session ID
  - `userContext`: JSON string with user context information
  - `detailLevel`: Level of detail to return (basic, standard, comprehensive)
- **Response Body** (200 OK):
  ```json
  {
    "resourceId": "res-456",
    "title": "The Chunking Method for Multiple Projects",
    "type": "technique",
    "content": {
      "introduction": "When facing multiple projects with approaching deadlines, the Chunking Method helps break the work into manageable pieces while ensuring progress across all projects.",
      "steps": [
        {
          "step": 1,
          "title": "List All Projects",
          "description": "Write down all three projects with their deadlines.",
          "example": "Project A (due Friday), Project B (due Thursday), Project C (due Wednesday)"
        },
        {
          "step": 2,
          "title": "Break Each Project Into 3-5 Chunks",
          "description": "Divide each project into 3-5 major components or tasks.",
          "example": "Project A: Research, Draft, Graphics, Review, Submit"
        },
        {
          "step": 3,
          "title": "Estimate Time for Each Chunk",
          "description": "Assign a time estimate to each chunk (in hours or minutes).",
          "example": "Research (2h), Draft (3h), Graphics (1h), Review (1h), Submit (30m)"
        },
        {
          "step": 4,
          "title": "Prioritize by Deadline and Dependencies",
          "description": "Arrange chunks based on deadlines and any dependencies between tasks.",
          "example": "Start with Project C's initial chunks due to earlier deadline"
        },
        {
          "step": 5,
          "title": "Schedule Specific Chunks",
          "description": "Assign specific chunks to time blocks in your calendar.",
          "example": "Today: Project C Research (9-11am), Project B Research (1-3pm)"
        },
        {
          "step": 6,
          "title": "Focus on One Chunk at a Time",
          "description": "Work on only one chunk during its allocated time block.",
          "example": "During 9-11am, focus exclusively on Project C Research"
        }
      ],
      "adaptationForCurrentSituation": "With three projects due this week, start by spending 15 minutes breaking each project into chunks. Then prioritize based on which project is due first or which has dependencies. Schedule chunks across the available days, ensuring you make progress on all three projects each day."
    },
    "sourceQuality": {
      "evidenceBased": true,
      "expertReviewed": true,
      "recencyOfInformation": "current",
      "truthFilterAssessment": "high_quality"
    },
    "relatedResources": [
      {
        "resourceId": "res-789",
        "title": "Priority Matrix for Deadline Management",
        "relationshipType": "complementary"
      },
      {
        "resourceId": "res-123",
        "title": "Time Blocking for Focus",
        "relationshipType": "follow_up"
      }
    ]
  }
  ```
- **Error Codes**:
  - `RESOURCE_NOT_FOUND`: Resource does not exist
  - `INVALID_DETAIL_LEVEL`: Detail level is invalid
  - `RETRIEVAL_FAILED`: Resource details could not be retrieved

## API Implementation Guidelines

### Rate Limiting

| API | Authenticated Rate Limit | Unauthenticated Rate Limit |
|-----|--------------------------|----------------------------|
| Synthesis API | 60 requests/minute | 10 requests/minute |
| Mirror API | 30 requests/minute | 5 requests/minute |
| Memory System API | 50 requests/minute | Not available |
| Bridge API | 40 requests/minute | 5 requests/minute |

### Caching Strategy

| Endpoint | Cache Duration | Invalidation Trigger |
|----------|----------------|----------------------|
| GET /v1/sessions/{sessionId} | 30 seconds | Session update |
| GET /v1/sessions/{sessionId}/interactions/{interactionId}/response | 5 minutes | New interaction |
| GET /v1/bridge/resources/{resourceId} | 24 hours | Resource update |

### Versioning Strategy

1. **URL Path Versioning**: `/v1/resource`
2. **Major Version Changes**: Breaking changes require new version
3. **Minor Version Changes**: Non-breaking additions use same version
4. **Deprecation Policy**: 6-month deprecation period with warning headers

### Security Requirements

1. **Authentication**: OAuth 2.0 with JWT
2. **Authorization**: Role-based access control
3. **TLS**: TLS 1.3 required for all communications
4. **API Keys**: Required for all requests
5. **CORS**: Restricted to approved domains
6. **Content Security Policy**: Implemented for all responses

## API Testing Requirements

1. **Unit Tests**: 100% coverage of all endpoints
2. **Integration Tests**: All component interactions tested
3. **Performance Tests**: Response time under load
4. **Security Tests**: Penetration testing and vulnerability scanning
5. **Chaos Testing**: Resilience under component failure

## Monitoring and Observability

1. **Health Endpoints**: `/health` and `/metrics` for each API
2. **Logging**: Structured JSON logs with correlation IDs
3. **Tracing**: OpenTelemetry integration for distributed tracing
4. **Metrics**: Request count, latency, error rate by endpoint

## Conclusion

These API contracts provide a comprehensive specification for all MeAi component interfaces. By adhering to these contracts, development teams can work independently while ensuring seamless integration. The contracts are designed to support MeAi's vision of providing sacred support through a sophisticated relational AI system, with particular attention to performance, security, and ethical considerations.

Development teams should implement these APIs exactly as specified to ensure compatibility across the system. Any proposed changes to these contracts must go through a formal review process to assess impact on other components.
