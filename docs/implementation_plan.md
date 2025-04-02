# AI Companion Implementation Plan

## Overview
This document outlines the implementation plan for the AI Companion project, focusing on the specific components requested by the user. Based on the project documentation and todo.md file, we will prioritize implementing the Mirror functionality first, followed by other core components.

## Implementation Priorities

### 1. Mirror Component Implementation
The Mirror component is the inward-focused engine for deep user understanding and will be our first implementation priority.

#### 1.1 Journaling Input Processing
- Create a text input interface for user journaling
- Implement text preprocessing and normalization
- Develop session management for continuous interactions
- Build input validation and sanitization

#### 1.2 Basic Emotional Sensing
- Implement sentiment analysis using pre-trained NLP models
- Create emotion classification system (joy, sadness, fear, anger, surprise)
- Develop confidence scoring for emotional detection
- Build emotional state tracking over time

#### 1.3 Memory Marker Creation
- Design database schema for Memory Markers
- Implement marker creation functionality
- Develop metadata tagging system (emotional context, significance)
- Create basic retrieval mechanisms by category or recency

### 2. Voice Engine Prototype
After implementing the core Mirror functionality, we will develop the Voice Engine prototype.

#### 2.1 Voice Tone Implementation
- Create two distinct voice tones (Nurturing and Curious)
- Implement tone selection logic based on context
- Develop consistent language patterns for each tone
- Build tone transition mechanisms

#### 2.2 Adaptive Communication System
- Implement context-aware response generation
- Create emotional state-responsive communication
- Develop appropriate validation responses
- Build ethical boundary enforcement in communication

### 3. Breath System Implementation
The Breath System will provide UI/UX pacing mechanisms for grounding and presence.

#### 3.1 Timer-based Breath Visualization
- Create visual breath indicator with timer-based pacing
- Implement different breath patterns for various emotional states
- Develop breath markers for ritual transitions
- Build accessibility alternatives

### 4. Basic Memory System
The Memory System will store and retrieve significant moments and patterns.

#### 4.1 Memory Storage and Retrieval
- Implement basic Memory Vault functionality
- Create simple categorization and tagging system
- Develop basic pattern detection for Echoes
- Build secure access protocols

### 5. Ritual Flow Implementation
We will implement at least one complete ritual flow to demonstrate the system's capabilities.

#### 5.1 Technology Horizon Ritual
- Create complete ritual flow with entrance/grounding sequence
- Implement Bridge component integration
- Develop reflection/integration prompts
- Build memory creation opportunity
- Implement exit/transition elements

## Technical Implementation Approach

### Development Environment
- Backend: Node.js with Express
- Frontend: React for component-based UI
- Database: MongoDB for document storage
- NLP: Pre-trained sentiment analysis models

### Component Architecture
We will follow a modular architecture with clear separation of concerns:

1. **Frontend Layer**
   - User Interface Components
     - Journaling Interface
     - Breath Visualization
     - Memory Display
     - Ritual Flow Screens
   - State Management
     - User Profile
     - Current Emotional State
     - Interaction Context
     - Memory Access State

2. **Core Logic Layer**
   - Mirror Module
     - Emotional Analysis Engine
     - Pattern Recognition System
     - Reflection Generator
   - Voice Engine Module
     - Tone Selection Logic
     - Response Generation
   - Breath System Module
     - Timing Mechanisms
     - Visualization Controller

3. **Data Layer**
   - User Profile Store
   - Memory System
     - Marker Storage
     - Simple Graph Relationships
   - Content Repository
     - Voice Patterns
     - Ritual Templates

### Implementation Phases

#### Phase 1: Core Mirror Functionality
1. Set up project structure and development environment
2. Implement journaling input interface
3. Develop basic emotional sensing using NLP
4. Create simple memory marker storage and retrieval

#### Phase 2: Voice Engine & Breath System
1. Implement two voice tones (Nurturing and Curious)
2. Develop adaptive communication system
3. Create timer-based breath visualization
4. Integrate breath system with voice engine

#### Phase 3: Ritual Implementation
1. Develop Technology Horizon Ritual flow
2. Implement Bridge component integration
3. Create memory creation and retrieval within ritual
4. Build complete end-to-end ritual experience

#### Phase 4: Integration & Testing
1. Integrate all components into cohesive system
2. Implement comprehensive testing
3. Refine user experience
4. Prepare demonstration materials

## Implementation Details

### Mirror Component Implementation

#### Emotional Analysis Engine
```javascript
// Simplified architecture for Emotional Analysis Engine
class EmotionalAnalysisEngine {
  constructor() {
    this.emotions = ['joy', 'sadness', 'fear', 'anger', 'surprise'];
    this.model = this.loadModel();
  }

  loadModel() {
    // Load pre-trained sentiment analysis model
    // In production, this would use a more sophisticated model
    return {
      analyze: (text) => {
        // Simplified implementation for prototype
        return this.mockAnalysis(text);
      }
    };
  }

  mockAnalysis(text) {
    // Simple keyword-based analysis for prototype
    const emotionScores = {
      joy: 0,
      sadness: 0,
      fear: 0,
      anger: 0,
      surprise: 0
    };

    // Simple keyword matching
    if (text.match(/happy|joy|glad|delighted/i)) emotionScores.joy += 0.8;
    if (text.match(/sad|unhappy|depressed|down/i)) emotionScores.sadness += 0.8;
    if (text.match(/afraid|scared|terrified|anxious/i)) emotionScores.fear += 0.8;
    if (text.match(/angry|furious|annoyed|irritated/i)) emotionScores.anger += 0.8;
    if (text.match(/surprised|amazed|astonished|shocked/i)) emotionScores.surprise += 0.8;

    // Find dominant emotion
    let dominantEmotion = this.emotions[0];
    let highestScore = emotionScores[dominantEmotion];

    for (const emotion of this.emotions) {
      if (emotionScores[emotion] > highestScore) {
        dominantEmotion = emotion;
        highestScore = emotionScores[emotion];
      }
    }

    return {
      dominantEmotion,
      emotionScores,
      confidence: highestScore
    };
  }

  analyzeText(text) {
    return this.model.analyze(text);
  }
}
```

#### Memory Marker System
```javascript
// Simplified architecture for Memory Marker System
class MemoryMarkerSystem {
  constructor(database) {
    this.database = database;
  }

  async createMarker(content, metadata) {
    const marker = {
      id: this.generateId(),
      content,
      metadata: {
        ...metadata,
        timestamp: new Date(),
        emotionalContext: metadata.emotionalContext || {},
        significance: metadata.significance || 0.5,
        tags: metadata.tags || []
      },
      type: 'Marker'
    };

    await this.database.markers.insertOne(marker);
    return marker;
  }

  async retrieveMarkersByCategory(category) {
    return await this.database.markers.find({
      'metadata.tags': category
    }).toArray();
  }

  async retrieveRecentMarkers(limit = 10) {
    return await this.database.markers.find()
      .sort({ 'metadata.timestamp': -1 })
      .limit(limit)
      .toArray();
  }

  generateId() {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }
}
```

### Voice Engine Implementation

#### Voice Tone System
```javascript
// Simplified architecture for Voice Tone System
class VoiceToneSystem {
  constructor() {
    this.tones = {
      nurturing: {
        validationPhrases: [
          "I hear that you're feeling {emotion}.",
          "It makes sense that you would feel {emotion} in this situation.",
          "Your {emotion} is completely valid.",
          "I'm here with you as you experience this {emotion}."
        ],
        reflectionPhrases: [
          "It sounds like this experience has been {intensity} for you.",
          "I'm noticing how this connects to your need for {need}.",
          "This seems to be part of a pattern where {pattern}.",
          "I wonder how this relates to your value of {value}."
        ],
        transitionPhrases: [
          "Let's take a moment to breathe together.",
          "Would it be helpful to explore this further?",
          "I'm here to support you through this.",
          "Let's take our time with this."
        ]
      },
      curious: {
        validationPhrases: [
          "That's an interesting perspective on {emotion}.",
          "I'm curious about your experience of {emotion}.",
          "What an intriguing way to look at this situation.",
          "I wonder what possibilities this {emotion} might open up."
        ],
        reflectionPhrases: [
          "I'm wondering what you might discover if you explored this further?",
          "What patterns do you notice emerging here?",
          "How might this connect to other aspects of your experience?",
          "What possibilities do you see from this vantage point?"
        ],
        transitionPhrases: [
          "Shall we explore this from another angle?",
          "I'm curious what might emerge if we look at this differently.",
          "What would happen if we shifted perspective here?",
          "Let's see what we might discover together."
        ]
      }
    };
  }

  selectTone(context) {
    // Simple tone selection logic for prototype
    if (context.emotionalState.dominantEmotion === 'sadness' || 
        context.emotionalState.dominantEmotion === 'fear' ||
        context.emotionalState.dominantEmotion === 'anger') {
      return 'nurturing';
    } else {
      return 'curious';
    }
  }

  generateResponse(type, context, tone = null) {
    // If tone is not specified, select based on context
    tone = tone || this.selectTone(context);
    
    // Select appropriate phrase collection
    const phrases = this.tones[tone][`${type}Phrases`];
    
    // Select random phrase from collection
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    // Replace placeholders with context values
    return this.replacePlaceholders(phrase, context);
  }

  replacePlaceholders(phrase, context) {
    // Simple placeholder replacement
    let result = phrase;
    
    if (result.includes('{emotion}')) {
      result = result.replace('{emotion}', context.emotionalState.dominantEmotion);
    }
    
    if (result.includes('{intensity}')) {
      const intensity = context.emotionalState.confidence > 0.7 ? 'intense' : 'significant';
      result = result.replace('{intensity}', intensity);
    }
    
    if (result.includes('{need}')) {
      // Simplified need mapping
      const needsMap = {
        'joy': 'connection',
        'sadness': 'significance',
        'fear': 'certainty',
        'anger': 'control',
        'surprise': 'variety'
      };
      const need = needsMap[context.emotionalState.dominantEmotion] || 'growth';
      result = result.replace('{need}', need);
    }
    
    // Other placeholder replacements would go here
    
    return result;
  }
}
```

### Breath System Implementation

```javascript
// Simplified architecture for Breath System
class BreathSystem {
  constructor() {
    this.patterns = {
      calming: {
        inhale: 4,
        hold1: 2,
        exhale: 6,
        hold2: 0,
        cycles: 3
      },
      energizing: {
        inhale: 4,
        hold1: 0,
        exhale: 4,
        hold2: 0,
        cycles: 3
      },
      balancing: {
        inhale: 4,
        hold1: 4,
        exhale: 4,
        hold2: 4,
        cycles: 3
      },
      grounding: {
        inhale: 4,
        hold1: 2,
        exhale: 6,
        hold2: 2,
        cycles: 3
      }
    };
  }

  selectPattern(context) {
    // Simple pattern selection logic for prototype
    const emotion = context.emotionalState.dominantEmotion;
    
    if (emotion === 'anxiety' || emotion === 'fear' || emotion === 'anger') {
      return this.patterns.calming;
    } else if (emotion === 'sadness' || emotion === 'depression') {
      return this.patterns.energizing;
    } else if (emotion === 'joy' || emotion === 'excitement') {
      return this.patterns.grounding;
    } else {
      return this.patterns.balancing;
    }
  }

  generateBreathSequence(context, patternName = null) {
    // If pattern is not specified, select based on context
    const pattern = patternName ? 
      this.patterns[patternName] : 
      this.selectPattern(context);
    
    // Generate sequence of breath states
    const sequence = [];
    
    for (let cycle = 0; cycle < pattern.cycles; cycle++) {
      // Inhale
      for (let i = 0; i < pattern.inhale; i++) {
        sequence.push({ state: 'inhale', progress: i / pattern.inhale });
      }
      
      // Hold after inhale
      for (let i = 0; i < pattern.hold1; i++) {
        sequence.push({ state: 'hold1', progress: i / pattern.hold1 });
      }
      
      // Exhale
      for (let i = 0; i < pattern.exhale; i++) {
        sequence.push({ state: 'exhale', progress: i / pattern.exhale });
      }
      
      // Hold after exhale
      for (let i = 0; i < pattern.hold2; i++) {
        sequence.push({ state: 'hold2', progress: i / pattern.hold2 });
      }
    }
    
    return {
      sequence,
      totalSteps: sequence.length,
      secondsPerStep: 1,
      patternName: patternName || 'custom'
    };
  }
}
```

## Next Steps

1. Set up the project structure and development environment
2. Implement the core Mirror functionality
   - Journaling input processing
   - Basic emotional sensing
   - Memory Marker creation
3. Develop the Voice Engine prototype
4. Implement the Breath System
5. Create at least one complete ritual flow

This implementation plan provides a roadmap for developing the core components of the AI Companion project, starting with the Mirror functionality as requested. Each component will be implemented in a modular fashion, allowing for integration and testing as development progresses.
