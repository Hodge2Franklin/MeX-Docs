# Haptic Feedback Patterns Documentation

This document details the haptic feedback patterns implemented in the Single Pixel + Haptic Mobile Web Prototype. These patterns are designed to create a subtle, meaningful language of touch that communicates different states and moments in the interaction flow.

## Pattern Design Philosophy

The haptic patterns in this prototype are designed based on several key principles:

1. **Subtlety**: Patterns are designed to be felt but not intrusive, operating at the threshold of perception
2. **Meaningfulness**: Each pattern has a distinct emotional and communicative quality
3. **Rhythm**: Patterns use rhythm to create a sense of presence and connection
4. **Variability**: Patterns can be modified in intensity and duration based on context
5. **Coherence**: Patterns work together as a unified language of touch

## Core Haptic Patterns

### 1. Greeting Pattern
- **Description**: Three gentle pulses of increasing duration
- **Sequence**: 50ms, 70ms pause, 80ms, 70ms pause, 120ms
- **Purpose**: Communicates acknowledgment and welcome
- **Emotional Quality**: Warm, inviting, gentle
- **Usage Context**: Beginning of interaction, returning after absence

### 2. Listening Pattern
- **Description**: Extremely subtle, barely perceptible pulse repeated at long intervals
- **Sequence**: 20ms, 2500ms pause (repeating)
- **Purpose**: Communicates attentive presence without interruption
- **Emotional Quality**: Patient, attentive, calm
- **Usage Context**: During user reflection or when waiting for input

### 3. Understanding Pattern
- **Description**: Wave sequence that rises and falls like breathing
- **Sequence**: 40ms, 30ms pause, 60ms, 30ms pause, 80ms, 30ms pause, 60ms, 30ms pause, 40ms
- **Purpose**: Communicates comprehension and processing
- **Emotional Quality**: Thoughtful, responsive, engaged
- **Usage Context**: After receiving input, during processing

### 4. Insight Pattern
- **Description**: Two quick pulses followed by one longer pulse
- **Sequence**: 40ms, 50ms pause, 40ms, 50ms pause, 150ms
- **Purpose**: Communicates a moment of realization or important information
- **Emotional Quality**: Illuminating, clarifying, significant
- **Usage Context**: When sharing an insight or important realization

### 5. Curiosity Pattern
- **Description**: Series of short, gentle inquiring pulses with varying gaps
- **Sequence**: 30ms, 40ms pause, 30ms, 60ms pause, 30ms, 80ms pause, 30ms
- **Purpose**: Communicates interest and invitation to explore
- **Emotional Quality**: Playful, inquisitive, open
- **Usage Context**: When prompting for more information or exploration

### 6. Affirmation Pattern
- **Description**: Steady, grounding pulse with satisfying decay
- **Sequence**: 100ms, 50ms pause, 80ms, 50ms pause, 60ms, 50ms pause, 40ms
- **Purpose**: Communicates validation and support
- **Emotional Quality**: Supportive, confirming, grounding
- **Usage Context**: When affirming user input or providing support

### 7. Transition Pattern
- **Description**: Gradually increasing then decreasing intensity
- **Sequence**: 20ms, 20ms pause, 40ms, 20ms pause, 60ms, 20ms pause, 80ms, 20ms pause, 100ms, 20ms pause, 80ms, 20ms pause, 60ms, 20ms pause, 40ms, 20ms pause, 20ms
- **Purpose**: Communicates movement between states or topics
- **Emotional Quality**: Flowing, transformative, connective
- **Usage Context**: When shifting between different interaction modes

### 8. Farewell Pattern
- **Description**: Three gentle pulses of decreasing length and intensity
- **Sequence**: 80ms, 100ms pause, 60ms, 100ms pause, 40ms
- **Purpose**: Communicates conclusion and anticipation of return
- **Emotional Quality**: Gentle closure, hopeful, non-final
- **Usage Context**: End of interaction session

## Implementation Details

The haptic patterns are implemented using the Web Vibration API, which allows for precise control of the device's vibration motor. The implementation includes:

1. **Intensity Adjustment**: Patterns can be scaled in intensity based on user preference and context
2. **Fallback Mechanisms**: Visual and audio alternatives for devices without vibration support
3. **Pattern Composition**: Ability to combine patterns for more complex expressions
4. **Contextual Adaptation**: Patterns adapt based on interaction history and device position

## Technical Implementation

The haptic feedback system is implemented in the `HapticFeedback.js` module, which provides methods for:

- Playing predefined patterns
- Creating custom patterns
- Adjusting intensity
- Stopping patterns
- Checking if patterns are currently playing

The implementation uses the browser's `navigator.vibrate()` API with precise timing to create the subtle variations in the haptic patterns.

## Usage in Interaction Flow

Haptic patterns are integrated throughout the interaction flow:

1. **Initial Connection**: Greeting pattern signals the beginning of interaction
2. **Presence Recognition**: Listening pattern maintains connection during quiet moments
3. **Response Processing**: Understanding pattern acknowledges input
4. **Significant Moments**: Insight pattern marks important realizations
5. **Exploration**: Curiosity pattern invites deeper engagement
6. **Support**: Affirmation pattern provides validation
7. **Flow Changes**: Transition pattern signals shifts in conversation
8. **Conclusion**: Farewell pattern provides gentle closure

## Testing and Calibration

Haptic patterns should be tested and calibrated on different devices, as vibration motors vary significantly in their characteristics. The admin panel provides controls for testing and adjusting the intensity of haptic feedback.
