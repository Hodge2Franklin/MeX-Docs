# Technical Implementation Guide

This document provides detailed technical information about the implementation of the Single Pixel + Haptic Mobile Web Prototype.

## Project Structure

```
single-pixel-prototype/
├── src/
│   ├── js/
│   │   ├── index.js                 # Main application entry point
│   │   └── modules/
│   │       ├── FeatureDetector.js   # Device capability detection
│   │       ├── StateManager.js      # Application state management
│   │       ├── PixelRenderer.js     # Visual rendering of the pixel
│   │       ├── HapticFeedback.js    # Haptic pattern implementation
│   │       ├── SensorManager.js     # Device sensor integration
│   │       ├── TouchInterface.js    # Touch event handling
│   │       ├── AudioSystem.js       # Audio feedback implementation
│   │       ├── InteractionManager.js # Coordination between modules
│   │       ├── MessageDisplay.js    # Text message display
│   │       └── AdminPanel.js        # Testing and debugging panel
│   ├── css/
│   │   └── main.css                 # Main stylesheet
│   ├── audio/                       # Audio assets (empty in prototype)
│   ├── assets/                      # Other assets (empty in prototype)
│   └── index.html                   # Main HTML file
├── dist/                            # Production build output
├── docs/                            # Documentation
└── package.json                     # Project configuration
```

## Core Technologies

The prototype is built using the following technologies:

- **HTML5**: For the basic structure
- **CSS3**: For styling and animations
- **JavaScript (ES6+)**: For application logic
- **Canvas API**: For pixel rendering
- **Web Vibration API**: For haptic feedback
- **DeviceMotion API**: For motion detection
- **DeviceOrientation API**: For orientation detection
- **Touch Events API**: For touch interaction
- **Web Audio API**: For audio generation and control

## Module Details

### FeatureDetector

The `FeatureDetector` module is responsible for:

- Detecting device capabilities (vibration, motion, orientation, etc.)
- Requesting necessary permissions
- Providing feature information to other modules

Key methods:
- `detectFeatures()`: Checks which features are supported
- `requestPermissions()`: Requests permissions for sensors that require them

### StateManager

The `StateManager` module implements a centralized state management system:

- Maintains the application state
- Provides event-based communication between modules
- Handles state updates and notifications

Key methods:
- `getState()`: Returns the current state
- `setState(path, value)`: Updates a specific state property
- `on(event, callback)`: Subscribes to state changes
- `emit(event, data)`: Emits events to subscribers

### PixelRenderer

The `PixelRenderer` module handles the visual aspects:

- Creates and manages the canvas element
- Renders the pixel with appropriate size, color, and opacity
- Implements breathing animations and transitions
- Draws background elements and particles

Key methods:
- `render()`: Renders the current frame
- `startBreathing(rate, depth)`: Starts the breathing animation
- `fadeIn(duration)`: Gradually increases opacity
- `fadeOut(duration)`: Gradually decreases opacity
- `transitionColor(targetColor, duration)`: Smoothly changes color
- `pulseSize(targetSize, duration)`: Temporarily changes size

### HapticFeedback

The `HapticFeedback` module implements the haptic patterns:

- Defines patterns for different interaction states
- Controls the device vibration motor
- Adjusts intensity based on context

Key methods:
- `playPattern(patternName)`: Plays a predefined pattern
- `playCustomPattern(pattern)`: Plays a custom pattern
- `stopPattern()`: Stops the current pattern
- `setIntensity(factor)`: Adjusts the intensity of haptic feedback

### SensorManager

The `SensorManager` module integrates device sensors:

- Handles device motion and orientation events
- Detects holding patterns and presence
- Monitors battery status for optimization

Key methods:
- `detectHolding()`: Determines if the device is being held
- `updateHoldingPattern()`: Analyzes motion to detect holding patterns
- `getMotionMagnitude()`: Calculates the current motion intensity

### TouchInterface

The `TouchInterface` module handles touch interactions:

- Tracks touch events (start, move, end)
- Recognizes gestures (tap, double tap, long press, swipe, circle)
- Provides touch information to other modules

Key methods:
- `recognizeGesture()`: Analyzes touch history to identify gestures
- `finalizeGesture(touchDuration)`: Completes gesture recognition when touch ends
- `detectCircleGesture()`: Specialized detection for circular gestures

### AudioSystem

The `AudioSystem` module manages audio feedback:

- Creates procedural sounds for different interaction states
- Controls volume levels for different sound categories
- Provides ambient soundscapes

Key methods:
- `playSound(soundName)`: Plays a specific sound effect
- `playAmbient(ambientName)`: Starts an ambient soundscape
- `stopAmbient()`: Stops the current ambient sound
- `setMasterVolume(volume)`: Controls overall volume

### InteractionManager

The `InteractionManager` module coordinates the overall experience:

- Manages the conversation flow between stages
- Coordinates responses between modules
- Handles presence detection and transitions

Key methods:
- `handleVisibilityChange(isVisible)`: Responds to app visibility changes
- `handlePresenceChange({ newValue })`: Responds to presence detection
- `transitionToGreeting()`: Moves to greeting stage
- `transitionToListening()`: Moves to listening stage
- `transitionToInsight()`: Moves to insight stage
- `transitionToKairosMoment()`: Moves to Kairos moment stage

### MessageDisplay

The `MessageDisplay` module handles text messages:

- Creates and manages the message container
- Shows and hides messages with animations
- Responds to state changes

Key methods:
- `showMessage(text, duration)`: Displays a message for a specific duration
- `handleMessageChange({ newValue })`: Updates message text
- `handleVisibilityChange({ newValue })`: Shows or hides the message

### AdminPanel

The `AdminPanel` module provides testing capabilities:

- Creates a hidden panel accessible via a special gesture
- Provides controls for all aspects of the prototype
- Displays real-time sensor and touch data

Key methods:
- `toggle()`: Shows or hides the admin panel
- `updateSensorData()`: Updates the sensor data display
- `updateTouchData()`: Updates the touch data display

## Key Implementation Concepts

### Presence Detection

Presence is detected through a combination of:

```javascript
// In SensorManager.js
detectHolding() {
  // Calculate motion magnitude over recent samples
  let totalMagnitude = 0;
  
  for (let i = 1; i < this.motionBuffer.length; i++) {
    const prev = this.motionBuffer[i - 1].acceleration;
    const curr = this.motionBuffer[i].acceleration;
    
    // Calculate change in acceleration
    const deltaX = curr.x - prev.x;
    const deltaY = curr.y - prev.y;
    const deltaZ = curr.z - prev.z;
    
    // Magnitude of change
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
    totalMagnitude += magnitude;
  }
  
  // Average magnitude
  const avgMagnitude = totalMagnitude / (this.motionBuffer.length - 1);
  
  // Determine if device is being held
  const wasHeld = this.isHeld;
  this.isHeld = avgMagnitude < this.motionThreshold;
  
  // Update state if changed
  if (wasHeld !== this.isHeld) {
    this.stateManager.setState('device.isHeld', this.isHeld);
  }
}
```

### Breathing Animation

The breathing effect is implemented through:

```javascript
// In PixelRenderer.js
update() {
  // Update breathing phase
  if (this.isBreathing) {
    const state = this.stateManager.getState();
    const deltaTime = state.system.deltaTime / 1000; // Convert to seconds
    
    this.breathingPhase += deltaTime * this.breathingRate;
    if (this.breathingPhase > 1) {
      this.breathingPhase -= 1;
    }
    
    // Calculate breathing effect (sine wave)
    const breathingFactor = Math.sin(this.breathingPhase * Math.PI * 2) * this.breathingDepth + 1;
    this.stateManager.setState('pixel.size', breathingFactor);
  }
}
```

### Haptic Pattern Implementation

Haptic patterns are implemented using the Web Vibration API:

```javascript
// In HapticFeedback.js
playPattern(patternName) {
  if (!this.isVibrationSupported) {
    console.warn(`Cannot play pattern "${patternName}": Vibration not supported`);
    return false;
  }
  
  const pattern = this.patterns[patternName];
  if (!pattern) {
    console.error(`Unknown haptic pattern: ${patternName}`);
    return false;
  }
  
  // Clear any existing pattern
  this.stopPattern();
  
  // Apply intensity factor to durations (except pauses)
  const adjustedPattern = [];
  for (let i = 0; i < pattern.length; i++) {
    if (i % 2 === 0) {
      // Vibration duration - apply intensity factor
      adjustedPattern.push(Math.round(pattern[i] * this.intensityFactor));
    } else {
      // Pause duration - keep as is
      adjustedPattern.push(pattern[i]);
    }
  }
  
  // Play the pattern
  navigator.vibrate(adjustedPattern);
}
```

### Gesture Recognition

Touch gestures are recognized through pattern analysis:

```javascript
// In TouchInterface.js
finalizeGesture(touchDuration) {
  // Get distance from start to end
  if (!this.touchStartPosition || this.touchHistory.length === 0) {
    return;
  }
  
  const lastPosition = this.touchHistory[this.touchHistory.length - 1];
  const dx = lastPosition.x - this.touchStartPosition.x;
  const dy = lastPosition.y - this.touchStartPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Detect tap
  if (touchDuration < this.TAP_MAX_DURATION && distance < this.TAP_MAX_DISTANCE) {
    const now = performance.now();
    
    // Check for double tap
    if (now - this.lastTapTime < this.DOUBLE_TAP_MAX_INTERVAL && this.lastTapPosition) {
      // Calculate distance between taps
      const tapDx = lastPosition.x - this.lastTapPosition.x;
      const tapDy = lastPosition.y - this.lastTapPosition.y;
      const tapDistance = Math.sqrt(tapDx * tapDx + tapDy * tapDy);
      
      if (tapDistance < this.TAP_MAX_DISTANCE * 2) {
        this.currentGesture = this.patterns.DOUBLE_TAP;
        this.gestureConfidence = 1.0;
        this.lastTapTime = 0; // Reset to prevent triple tap detection
      }
    }
  }
}
```

### Procedural Audio Generation

Audio is generated procedurally using the Web Audio API:

```javascript
// In AudioSystem.js
createEffectSounds() {
  // Greeting sound
  this.sounds.set('greeting', {
    create: () => {
      const oscillator = this.audioContext.createOscillator();
      oscillator.type = 'sine';
      
      const gain = this.audioContext.createGain();
      gain.gain.value = 0;
      
      oscillator.connect(gain);
      gain.connect(this.effectsGain);
      
      // Create greeting melody
      const now = this.audioContext.currentTime;
      oscillator.frequency.setValueAtTime(440, now);
      oscillator.frequency.linearRampToValueAtTime(660, now + 0.2);
      oscillator.frequency.linearRampToValueAtTime(550, now + 0.4);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.3);
      gain.gain.linearRampToValueAtTime(0, now + 0.5);
      
      return { oscillator, gain, duration: 0.5 };
    }
  });
}
```

## Browser Compatibility

The prototype has been designed to work on modern mobile browsers with the following considerations:

- **iOS Safari**: Requires user interaction before enabling vibration and audio
- **Android Chrome**: Full support for all features
- **Other Browsers**: Graceful degradation for unsupported features

## Performance Considerations

To ensure smooth performance on mobile devices:

1. **Efficient Rendering**: The pixel rendering uses minimal canvas operations
2. **Event Throttling**: Sensor events are buffered and processed efficiently
3. **Battery Awareness**: Features are adjusted based on battery level
4. **Memory Management**: Resources are properly initialized and cleaned up

## Building and Deployment

The prototype can be built for production using:

```bash
npm run build
```

This creates optimized files in the `dist/` directory that can be deployed to any static web hosting service.

## Security Considerations

The prototype has been designed with security in mind:

1. **Permissions**: Explicitly requests permissions for sensors
2. **No External Dependencies**: Minimizes security risks
3. **Content Security Policy**: Compatible with strict CSP settings
4. **No Data Collection**: Does not collect or transmit user data

## Extending the Prototype

The modular architecture makes it easy to extend the prototype:

1. **Adding New Haptic Patterns**: Define new patterns in `HapticFeedback.js`
2. **Creating New Visual Effects**: Extend the rendering in `PixelRenderer.js`
3. **Adding New Interaction Modes**: Implement new stages in `InteractionManager.js`
4. **Integrating New Sensors**: Add support in `SensorManager.js`
