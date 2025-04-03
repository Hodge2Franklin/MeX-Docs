/**
 * MeAI Prototype - Main Application Script
 * 
 * This script integrates all components of the MeAI prototype into a cohesive experience,
 * handling navigation, section switching, and overall application flow.
 */

class MeAIApplication {
    constructor() {
        // DOM elements
        this.navButtons = document.querySelectorAll('.nav-button');
        this.sections = document.querySelectorAll('.section');
        this.mainInterface = document.getElementById('main-interface');
        
        // Application state
        this.currentSection = 'main-interface';
        this.isInitialized = false;
        
        // Initialize
        this.initEventListeners();
        this.initializeComponents();
    }
    
    /**
     * Initialize event listeners for navigation and section switching
     */
    initEventListeners() {
        // Navigation buttons
        this.navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const sectionId = button.getAttribute('data-section');
                this.switchSection(sectionId);
            });
        });
        
        // Handle URL hash for direct navigation
        window.addEventListener('hashchange', () => {
            this.handleUrlHash();
        });
        
        // Listen for component events
        document.addEventListener('ritual-selected', (e) => {
            if (e.detail && e.detail.ritualId) {
                this.handleRitualSelection(e.detail.ritualId);
            }
        });
    }
    
    /**
     * Initialize all application components
     */
    initializeComponents() {
        // Components are initialized via their own DOMContentLoaded listeners
        // This method is for any additional initialization needed
        
        // Handle URL hash on initial load
        this.handleUrlHash();
        
        // Mark as initialized
        this.isInitialized = true;
        
        // Trigger application ready event
        const event = new CustomEvent('meai-application-ready');
        document.dispatchEvent(event);
    }
    
    /**
     * Handle URL hash for direct navigation
     */
    handleUrlHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            // Check if hash corresponds to a valid section
            const validSections = ['main-interface', 'rituals-section', 'memory-section', 'settings-section'];
            if (validSections.includes(hash)) {
                this.switchSection(hash);
            }
        }
    }
    
    /**
     * Switch between application sections
     * @param {string} sectionId - ID of the section to switch to
     */
    switchSection(sectionId) {
        // Update current section
        this.currentSection = sectionId;
        
        // Update URL hash
        window.location.hash = sectionId;
        
        // Update active nav button
        this.navButtons.forEach(button => {
            const buttonSectionId = button.getAttribute('data-section');
            if (buttonSectionId === sectionId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // Show selected section, hide others
        if (sectionId === 'main-interface') {
            this.mainInterface.classList.remove('hidden');
            this.sections.forEach(section => {
                section.classList.add('hidden');
            });
        } else {
            this.mainInterface.classList.add('hidden');
            this.sections.forEach(section => {
                if (section.id === sectionId) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        }
        
        // Trigger section change event
        const event = new CustomEvent('section-changed', {
            detail: { section: sectionId }
        });
        document.dispatchEvent(event);
        
        // Update pixel state if available
        if (window.singlePixel) {
            window.singlePixel.pulse(500);
        }
    }
    
    /**
     * Handle ritual selection
     * @param {string} ritualId - ID of the selected ritual
     */
    handleRitualSelection(ritualId) {
        // This would be called when a ritual is selected from the conversation
        // Switch to rituals section
        this.switchSection('rituals-section');
        
        // Start the ritual if rituals component is available
        if (window.rituals) {
            setTimeout(() => {
                window.rituals.startRitual(ritualId);
            }, 500);
        }
    }
    
    /**
     * Handle memory creation
     * @param {string} type - Memory type
     * @param {string} content - Memory content
     */
    createMemory(type, content) {
        // Create a new memory if memory component is available
        if (window.memory) {
            window.memory.addMemoryNode(type, content, new Date());
        }
    }
}

// Initialize the MeAI application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.meaiApp = new MeAIApplication();
    
    // Create a todo.md file to track implementation progress
    console.log('MeAI Prototype Application Initialized');
});
