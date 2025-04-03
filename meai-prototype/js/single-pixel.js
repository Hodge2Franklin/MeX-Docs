/**
 * MeAI Prototype - Single Pixel Visualization Component
 * 
 * This script handles the behavior of the single pixel visualization,
 * which is the central element of the "Single Pixel + Haptic" interface.
 * It manages pixel animations, state changes, and haptic feedback.
 */

class SinglePixelVisualization {
    constructor() {
        this.pixel = document.getElementById('single-pixel');
        this.container = document.getElementById('single-pixel-container');
        this.state = 'idle'; // idle, listening, thinking, speaking
        this.settings = {
            color: '#3498db',
            size: 30,
            hapticEnabled: true,
            hapticIntensity: 5
        };
        
        this.initEventListeners();
        this.loadSettings();
    }
    
    /**
     * Initialize event listeners for the pixel
     */
    initEventListeners() {
        // Pixel click interaction
        this.pixel.addEventListener('click', () => {
            this.activatePixel();
        });
        
        // Listen for settings changes
        document.addEventListener('settings-updated', (e) => {
            this.updateSettings(e.detail);
        });
    }
    
    /**
     * Load settings from localStorage if available
     */
    loadSettings() {
        const savedSettings = localStorage.getItem('meai-settings');
        if (savedSettings) {
            try {
                const parsedSettings = JSON.parse(savedSettings);
                this.updateSettings(parsedSettings);
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }
    }
    
    /**
     * Update pixel settings
     * @param {Object} newSettings - New settings to apply
     */
    updateSettings(newSettings) {
        if (newSettings.pixelColor) {
            this.settings.color = newSettings.pixelColor;
            document.documentElement.style.setProperty('--pixel-color', newSettings.pixelColor);
        }
        
        if (newSettings.pixelSize) {
            this.settings.size = newSettings.pixelSize;
            document.documentElement.style.setProperty('--pixel-size', `${newSettings.pixelSize}px`);
        }
        
        if (newSettings.hapticEnabled !== undefined) {
            this.settings.hapticEnabled = newSettings.hapticEnabled;
        }
        
        if (newSettings.hapticIntensity !== undefined) {
            this.settings.hapticIntensity = newSettings.hapticIntensity;
        }
    }
    
    /**
     * Activate the pixel on interaction
     */
    activatePixel() {
        this.setState('listening');
        this.triggerHapticFeedback('short');
        
        // Notify the conversation component that the user has activated the pixel
        const event = new CustomEvent('pixel-activated');
        document.dispatchEvent(event);
    }
    
    /**
     * Set the pixel state and update visualization
     * @param {string} newState - New state (idle, listening, thinking, speaking)
     */
    setState(newState) {
        // Remove current state class
        this.pixel.classList.remove(this.state);
        
        // Set new state
        this.state = newState;
        this.pixel.classList.add(newState);
        
        // Trigger appropriate haptic feedback based on state change
        if (newState === 'listening') {
            this.triggerHapticFeedback('short');
        } else if (newState === 'thinking') {
            this.triggerHapticFeedback('medium');
        } else if (newState === 'speaking') {
            this.triggerHapticFeedback('pattern');
        }
        
        // Notify other components about state change
        const event = new CustomEvent('pixel-state-changed', {
            detail: { state: newState }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Trigger haptic feedback if enabled
     * @param {string} pattern - Feedback pattern (short, medium, long, pattern)
     */
    triggerHapticFeedback(pattern) {
        if (!this.settings.hapticEnabled) return;
        
        // Use the Web Vibration API if available
        if ('vibrate' in navigator) {
            switch (pattern) {
                case 'short':
                    navigator.vibrate(50 * this.settings.hapticIntensity / 5);
                    break;
                case 'medium':
                    navigator.vibrate(100 * this.settings.hapticIntensity / 5);
                    break;
                case 'long':
                    navigator.vibrate(200 * this.settings.hapticIntensity / 5);
                    break;
                case 'pattern':
                    // Create a pattern based on intensity
                    const duration = 30 * this.settings.hapticIntensity / 5;
                    const gap = 50 - (this.settings.hapticIntensity * 3);
                    navigator.vibrate([duration, gap, duration, gap, duration]);
                    break;
                default:
                    navigator.vibrate(50);
            }
        }
    }
    
    /**
     * Pulse the pixel to draw attention
     * @param {number} duration - Duration of the pulse animation in ms
     */
    pulse(duration = 1000) {
        const originalState = this.state;
        
        // Add pulse animation
        this.pixel.classList.add('active');
        this.triggerHapticFeedback('short');
        
        // Remove after duration
        setTimeout(() => {
            this.pixel.classList.remove('active');
        }, duration);
    }
    
    /**
     * Create a ripple effect from the pixel
     * Used for significant moments or transitions
     */
    createRipple() {
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.classList.add('pixel-ripple');
        
        // Position at the center of the pixel
        const pixelRect = this.pixel.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        
        ripple.style.left = `${pixelRect.left - containerRect.left + pixelRect.width / 2}px`;
        ripple.style.top = `${pixelRect.top - containerRect.top + pixelRect.height / 2}px`;
        
        // Add to container and trigger animation
        this.container.appendChild(ripple);
        
        // Trigger haptic feedback
        this.triggerHapticFeedback('medium');
        
        // Remove after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
}

// Initialize the single pixel visualization when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.singlePixel = new SinglePixelVisualization();
});
