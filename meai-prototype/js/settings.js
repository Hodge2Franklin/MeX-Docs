/**
 * MeAI Prototype - Settings Component
 * 
 * This script handles the settings functionality for personalizing the MeAI experience,
 * including pixel appearance, voice tone, and haptic feedback settings.
 */

class SettingsManager {
    constructor() {
        // DOM elements
        this.settingsSection = document.getElementById('settings-section');
        this.pixelColorInput = document.getElementById('pixel-color');
        this.pixelSizeInput = document.getElementById('pixel-size');
        this.voiceToneSelect = document.getElementById('voice-tone');
        this.hapticIntensityInput = document.getElementById('haptic-intensity');
        this.hapticEnabledInput = document.getElementById('haptic-enabled');
        
        // Settings state
        this.settings = {
            pixelColor: '#3498db',
            pixelSize: 30,
            voiceTone: 'balanced',
            hapticIntensity: 5,
            hapticEnabled: true
        };
        
        // Initialize
        this.loadSettings();
        this.initEventListeners();
    }
    
    /**
     * Initialize event listeners for settings controls
     */
    initEventListeners() {
        // Pixel color change
        this.pixelColorInput.addEventListener('change', () => {
            this.updateSetting('pixelColor', this.pixelColorInput.value);
        });
        
        // Pixel size change
        this.pixelSizeInput.addEventListener('input', () => {
            this.updateSetting('pixelSize', parseInt(this.pixelSizeInput.value));
        });
        
        // Voice tone change
        this.voiceToneSelect.addEventListener('change', () => {
            this.updateSetting('voiceTone', this.voiceToneSelect.value);
        });
        
        // Haptic intensity change
        this.hapticIntensityInput.addEventListener('input', () => {
            this.updateSetting('hapticIntensity', parseInt(this.hapticIntensityInput.value));
        });
        
        // Haptic enabled change
        this.hapticEnabledInput.addEventListener('change', () => {
            this.updateSetting('hapticEnabled', this.hapticEnabledInput.checked);
        });
    }
    
    /**
     * Load settings from localStorage if available
     */
    loadSettings() {
        const savedSettings = localStorage.getItem('meai-settings');
        if (savedSettings) {
            try {
                this.settings = JSON.parse(savedSettings);
                this.updateUIFromSettings();
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        } else {
            // Apply default settings
            this.saveSettings();
        }
        
        // Apply settings to the UI
        this.applySettings();
    }
    
    /**
     * Update UI controls from settings object
     */
    updateUIFromSettings() {
        this.pixelColorInput.value = this.settings.pixelColor;
        this.pixelSizeInput.value = this.settings.pixelSize;
        this.voiceToneSelect.value = this.settings.voiceTone;
        this.hapticIntensityInput.value = this.settings.hapticIntensity;
        this.hapticEnabledInput.checked = this.settings.hapticEnabled;
    }
    
    /**
     * Save settings to localStorage
     */
    saveSettings() {
        localStorage.setItem('meai-settings', JSON.stringify(this.settings));
    }
    
    /**
     * Update a setting value
     * @param {string} key - Setting key
     * @param {any} value - Setting value
     */
    updateSetting(key, value) {
        this.settings[key] = value;
        this.saveSettings();
        this.applySettings();
        
        // Notify other components about settings change
        const event = new CustomEvent('settings-updated', {
            detail: this.settings
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Apply settings to the UI
     */
    applySettings() {
        // Apply pixel color
        document.documentElement.style.setProperty('--pixel-color', this.settings.pixelColor);
        
        // Apply pixel size
        document.documentElement.style.setProperty('--pixel-size', `${this.settings.pixelSize}px`);
        
        // Apply voice tone (will be used by conversation component)
        // This would affect the language and tone used in AI responses
        
        // Haptic settings are used directly by the single pixel component
    }
    
    /**
     * Reset settings to defaults
     */
    resetSettings() {
        this.settings = {
            pixelColor: '#3498db',
            pixelSize: 30,
            voiceTone: 'balanced',
            hapticIntensity: 5,
            hapticEnabled: true
        };
        
        this.updateUIFromSettings();
        this.saveSettings();
        this.applySettings();
        
        // Notify other components
        const event = new CustomEvent('settings-updated', {
            detail: this.settings
        });
        document.dispatchEvent(event);
    }
}

// Initialize the settings manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.settings = new SettingsManager();
});
