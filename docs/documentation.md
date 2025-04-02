# AI Companion Implementation Documentation

## Overview
This document provides comprehensive documentation for the AI Companion implementation with Duality Model architecture. The system consists of several core components that work together to create a relational AI experience focused on emotional understanding, memory creation, adaptive communication, and guided rituals.

## System Architecture

### Core Components
1. **Mirror Component** - Understands the user emotionally through journaling, emotional analysis, and pattern recognition
2. **Memory Marker System** - Creates and manages memory markers, echoes, and storylines
3. **Voice Engine** - Provides adaptive communication with different tones and communication modes
4. **Breath System** - Offers breath patterns for emotional regulation and ritual integration
5. **Ritual Engine** - Delivers personalized ritual experiences based on user context

### Technology Stack
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **NLP Processing**: Natural.js and Sentiment.js for emotional analysis
- **Frontend**: HTML, CSS, JavaScript (vanilla)

## Component Documentation

### Mirror Component

#### Emotional Analysis Engine
The `EnhancedEmotionalAnalysisEngine` provides sophisticated emotional analysis capabilities:
- Emotion detection (joy, sadness, fear, anger, surprise, neutral)
- Intensity detection (low, medium, high)
- Confidence scoring
- Contextual clue analysis
- Emotional trend analysis

**Key Methods:**
- `analyzeText(text)` - Analyzes text to detect emotions
- `analyzeEmotionalTrends(entries)` - Analyzes emotional changes over time

#### Journal Analysis Service
The `EnhancedJournalAnalysisService` integrates emotional analysis with other Mirror services:
- Processes journal entries
- Detects needs based on emotional analysis
- Identifies patterns
- Generates reflections
- Creates memory markers for significant entries

**Key Methods:**
- `analyzeJournalEntry(text, userId, previousEntries)` - Comprehensive analysis of journal entries
- `generateInsights(userId)` - Generates insights based on multiple journal entries

### Memory Marker System

#### Enhanced Memory Marker System
The `EnhancedMemoryMarkerSystem` manages different types of memory markers:
- **Markers** - Significant moments
- **Echoes** - Recurring patterns
- **Storylines** - Narrative threads

It also provides Memory Vault functionality and MemoryTimeline visualization.

**Key Methods:**
- `createMarker(markerData)` - Creates a basic memory marker
- `createEcho(echoData)` - Creates an Echo (recurring pattern) marker
- `createStoryline(storylineData)` - Creates a Storyline (narrative thread) marker
- `toggleVaultStatus(id, vaultStatus)` - Moves markers to/from the Memory Vault
- `generateMemoryTimeline(userId, options)` - Generates a timeline visualization

### Voice Engine

#### Voice Tone System
The `VoiceToneSystem` provides different voice tones for communication:
- **Nurturing** - Warm, supportive tone emphasizing validation and care
- **Curious** - Exploratory, inquisitive tone emphasizing discovery and possibilities

**Key Methods:**
- `selectTone(context)` - Selects appropriate tone based on context
- `generateResponse(type, context, tone)` - Generates response based on type and context
- `generateResponseSequence(context)` - Generates a complete response sequence

#### Adaptive Communication System
The `AdaptiveCommunicationSystem` builds on the Voice Tone System to provide:
- Different communication modes (validation, reflection, exploration, guidance, support)
- Context-specific templates
- Ritual-specific responses

**Key Methods:**
- `generateResponse(context, mode)` - Generates a response based on context and mode
- `generateRitualScript(ritualType)` - Generates a complete ritual script

### Breath System

#### Breath System
The `BreathSystem` provides breath patterns for different emotional states:
- **Calming** - Reduces anxiety and stress
- **Energizing** - Increases alertness and vitality
- **Balancing** - Promotes centeredness and presence
- **Grounding** - Enhances stability and presence

**Key Methods:**
- `selectPattern(context)` - Selects appropriate breath pattern based on context
- `generateBreathSequence(context, patternName)` - Generates a breath sequence
- `generateGuidedBreathSession(context, patternName)` - Generates a guided breath session
- `generateVisualizationData(patternName)` - Generates visualization data for animations

### Ritual Engine

#### Ritual Engine
The `RitualEngine` provides personalized ritual experiences:
- **Technology Horizon Ritual** - Explores new technologies and ideas
- **Daily Check-in Ritual** - Connects with self and sets intentions
- **Emotional Regulation Ritual** - Navigates intense emotions with presence

**Key Methods:**
- `selectRitual(context)` - Selects appropriate ritual based on context
- `generateRitualInstance(templateName, context)` - Generates a personalized ritual instance
- `executeRitualStep(ritualInstance, stepIndex, context, dependencies)` - Executes a ritual step

## API Documentation

### Mirror Component APIs

#### Emotional Analysis
- `POST /api/emotional-analysis/analyze` - Analyzes text for emotional content
- `POST /api/emotional-analysis/analyze/trends` - Analyzes emotional trends over time

#### Journal Analysis
- `POST /api/journal/analyze` - Analyzes a journal entry
- `GET /api/journal/insights/:userId` - Generates insights from journal entries
- `POST /api/journal/:id/mark-significant` - Marks a journal entry as significant

### Memory Marker System APIs

#### Memory Markers
- `POST /api/memory/enhanced/markers` - Creates a memory marker
- `GET /api/memory/enhanced/markers/:id` - Gets a marker by ID
- `GET /api/memory/enhanced/markers/user/:userId` - Gets user markers with filtering
- `PUT /api/memory/enhanced/markers/:id` - Updates a marker
- `DELETE /api/memory/enhanced/markers/:id` - Deletes a marker

#### Echoes and Storylines
- `POST /api/memory/enhanced/echoes` - Creates an Echo marker
- `POST /api/memory/enhanced/storylines` - Creates a Storyline marker

#### Memory Timeline
- `GET /api/memory/enhanced/timeline/:userId` - Generates a memory timeline

### Voice Engine APIs

#### Voice Tone
- `POST /api/voice/tone/select` - Selects appropriate tone based on context
- `POST /api/voice/response/generate` - Generates response based on type and context
- `POST /api/voice/response/sequence` - Generates a complete response sequence

#### Adaptive Communication
- `POST /api/voice/adaptive/response` - Generates adaptive response based on context
- `POST /api/voice/ritual/script` - Generates a ritual script

### Breath System APIs

#### Breath Patterns
- `POST /api/breath/pattern/select` - Selects appropriate breath pattern
- `POST /api/breath/sequence/generate` - Generates a breath sequence
- `POST /api/breath/session/guided` - Generates a guided breath session
- `POST /api/breath/session/ritual` - Generates a ritual-specific breath session
- `GET /api/breath/visualization/:patternName` - Gets visualization data for a pattern

### Ritual Engine APIs

#### Ritual Templates
- `GET /api/ritual/templates` - Gets all ritual templates
- `GET /api/ritual/templates/:name` - Gets a specific ritual template

#### Ritual Execution
- `POST /api/ritual/select` - Selects appropriate ritual based on context
- `POST /api/ritual/generate` - Generates a personalized ritual instance
- `POST /api/ritual/execute-step` - Executes a ritual step

### Integrated APIs

#### Journal Entry Processing
- `POST /api/integrate/journal-entry` - Processes a journal entry with integrated response

#### Ritual Session
- `POST /api/integrate/ritual-session` - Starts a ritual session with integrated response

#### Emotional Check-in
- `POST /api/integrate/emotional-check-in` - Processes an emotional check-in with integrated response

## User Interface

The user interface provides access to all core components:
- **Journal** - For entering journal entries and receiving AI responses
- **Memory** - For viewing memory markers with emotional context
- **Breath** - For interactive breath exercises with different patterns
- **Rituals** - For accessing guided ritual experiences

## Database Schema

### User
- `_id`: ObjectId
- `email`: String (unique)
- `preferences`: Object
- `archetype`: Object

### JournalEntry
- `_id`: ObjectId
- `userId`: ObjectId (ref: User)
- `content`: String
- `emotionalAnalysis`: Object
- `needsAnalysis`: Object
- `patterns`: Array
- `markedAsSignificant`: Boolean
- `memoryMarkerId`: ObjectId (ref: MemoryMarker)
- `createdAt`: Date

### MemoryMarker
- `_id`: ObjectId
- `userId`: ObjectId (ref: User)
- `content`: String
- `metadata`: Object
  - `emotionalContext`: Object
  - `significance`: Number
  - `tags`: Array
  - `isVault`: Boolean
  - `isPrivate`: Boolean
  - `timestamp`: Date
- `type`: String (Marker, Echo, Storyline)

## Testing

### Unit Tests
Unit tests verify the functionality of individual components:
- Mirror Component tests
- Memory Marker System tests
- Voice Engine tests
- Breath System tests
- Ritual Engine tests

### Integration Tests
Integration tests verify the functionality of integrated API endpoints:
- Journal entry processing tests
- Ritual session tests
- Emotional check-in tests

## Deployment

### Requirements
- Node.js 14+
- MongoDB 4.4+
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with required environment variables
4. Start the server: `npm start`

### Environment Variables
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development, production)

## Future Enhancements

### Planned Features
- User authentication and authorization
- Mobile application
- Voice input and output
- Integration with external services
- Advanced visualization for memory timeline
- Enhanced ritual experiences

## Conclusion
The AI Companion implementation provides a solid foundation for a relational AI experience with emotional understanding, memory creation, adaptive communication, and guided rituals. The modular architecture allows for easy extension and enhancement in the future.
