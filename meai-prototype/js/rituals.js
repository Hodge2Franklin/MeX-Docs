/**
 * MeAI Prototype - Ritual Flows Component
 * 
 * This script handles the ritual experience functionality,
 * including ritual selection, step navigation, and guided practice flows.
 */

class RitualFlows {
    constructor() {
        // DOM elements
        this.ritualsSection = document.getElementById('rituals-section');
        this.ritualCards = document.querySelectorAll('.ritual-card');
        this.ritualFlowContainer = document.getElementById('ritual-flow-container');
        this.ritualTitle = document.getElementById('ritual-title');
        this.ritualContent = document.getElementById('ritual-content');
        this.ritualProgress = document.getElementById('ritual-progress');
        this.prevButton = document.getElementById('ritual-prev');
        this.nextButton = document.getElementById('ritual-next');
        this.closeButton = document.getElementById('close-ritual');
        
        // Ritual state
        this.currentRitual = null;
        this.currentStep = 0;
        this.ritualData = this.initializeRitualData();
        
        // Initialize
        this.initEventListeners();
    }
    
    /**
     * Initialize event listeners for ritual interactions
     */
    initEventListeners() {
        // Ritual card selection
        this.ritualCards.forEach(card => {
            card.addEventListener('click', () => {
                const ritualId = card.getAttribute('data-ritual');
                this.startRitual(ritualId);
            });
        });
        
        // Navigation buttons
        this.prevButton.addEventListener('click', () => {
            this.navigateRitualStep(-1);
        });
        
        this.nextButton.addEventListener('click', () => {
            this.navigateRitualStep(1);
        });
        
        // Close button
        this.closeButton.addEventListener('click', () => {
            this.closeRitual();
        });
    }
    
    /**
     * Initialize ritual data with predefined ritual flows
     * @returns {Object} Ritual data structure
     */
    initializeRitualData() {
        return {
            'morning-reflection': {
                title: 'Morning Reflection',
                description: 'Start your day with presence and intention',
                steps: [
                    {
                        title: 'Welcome',
                        content: 'This morning reflection ritual will help you start your day with presence and intention. Find a comfortable position and take a moment to settle in. We\'ll begin with a few deep breaths to center yourself.'
                    },
                    {
                        title: 'Breath Awareness',
                        content: 'Take three deep breaths, inhaling slowly through your nose and exhaling fully through your mouth. Feel your body becoming more relaxed with each breath. Notice the sensations of breathing without trying to change anything.'
                    },
                    {
                        title: 'Body Check-In',
                        content: 'Bring your awareness to your body. Notice any areas of tension or comfort. There\'s no need to change anything—simply observe with curiosity and kindness. How does your body feel in this moment?'
                    },
                    {
                        title: 'Emotional Weather',
                        content: 'Now check in with your emotional state. What\'s the weather pattern of your emotions right now? Stormy, sunny, foggy, or something else? Just notice without judgment, acknowledging whatever is present.'
                    },
                    {
                        title: 'Setting Intention',
                        content: 'Consider what quality you\'d like to bring into your day. Perhaps it\'s patience, curiosity, courage, or compassion. Choose one quality and set an intention to embody it today.'
                    },
                    {
                        title: 'Completion',
                        content: 'Take one more deep breath, carrying your intention with you. As you move into your day, remember that you can return to this sense of presence at any time. Your morning reflection is complete.'
                    }
                ]
            },
            'gratitude-practice': {
                title: 'Gratitude Practice',
                description: 'Cultivate appreciation for life\'s gifts',
                steps: [
                    {
                        title: 'Welcome',
                        content: 'This gratitude practice will help you cultivate appreciation for the gifts in your life. Find a comfortable position where you can be alert yet relaxed. We\'ll begin with a few moments to settle in.'
                    },
                    {
                        title: 'Centering',
                        content: 'Take three deep breaths, allowing your body to relax and your mind to become more present. With each exhale, let go of any tension or preoccupations.'
                    },
                    {
                        title: 'Simple Gratitude',
                        content: 'Bring to mind something simple that you\'re grateful for today. It might be a basic comfort like clean water, a warm bed, or the taste of your morning coffee. Take a moment to really feel your appreciation for this simple gift.'
                    },
                    {
                        title: 'Relationship Gratitude',
                        content: 'Now consider a person in your life whom you appreciate. This could be someone who has supported you, taught you something valuable, or simply brings joy to your life. Feel your gratitude for their presence.'
                    },
                    {
                        title: 'Unexpected Gratitude',
                        content: 'Think of something challenging or difficult that ultimately led to growth or learning. Can you find gratitude even for the obstacles that have shaped you? This doesn\'t mean the difficulty was good, just that you can appreciate what came from it.'
                    },
                    {
                        title: 'Embodied Gratitude',
                        content: 'Notice how gratitude feels in your body. Perhaps there\'s warmth in your chest, relaxation in your shoulders, or a slight smile on your face. Let this feeling of appreciation permeate your entire being.'
                    },
                    {
                        title: 'Completion',
                        content: 'As we complete this practice, consider how you might carry this sense of gratitude with you throughout your day. Perhaps you could pause briefly at different moments to notice something you appreciate. Your gratitude practice is complete.'
                    }
                ]
            },
            'evening-release': {
                title: 'Evening Release',
                description: 'Let go of the day and prepare for rest',
                steps: [
                    {
                        title: 'Welcome',
                        content: 'This evening release ritual will help you let go of the day and prepare for restful sleep. Find a comfortable position, preferably sitting or lying down in a quiet space. We\'ll begin with a few moments to transition from the activities of your day.'
                    },
                    {
                        title: 'Breath Awareness',
                        content: 'Take three deep breaths, inhaling slowly through your nose and exhaling fully through your mouth. With each exhale, imagine releasing the energy of the day. Allow your breathing to find its natural rhythm.'
                    },
                    {
                        title: 'Day Review',
                        content: 'Gently review your day, as if watching a movie of the past 24 hours. Notice the events, interactions, and feelings without judgment or analysis. Simply observe what happened and how you experienced it.'
                    },
                    {
                        title: 'Acknowledging Challenges',
                        content: 'If there were any difficult moments or unresolved situations from your day, acknowledge them now. You might silently say, "I see you" to each challenge. Then imagine placing them in a container that you can set aside until tomorrow.'
                    },
                    {
                        title: 'Recognizing Gifts',
                        content: 'Bring to mind one or two positive moments from your day, however small they might be. Perhaps a kind interaction, a moment of beauty, or an accomplishment. Take a moment to savor these experiences.'
                    },
                    {
                        title: 'Body Relaxation',
                        content: 'Bring your awareness to your body, starting with your feet and moving upward. Notice any areas of tension and invite them to soften with each exhale. Allow your body to become increasingly heavy and relaxed.'
                    },
                    {
                        title: 'Completion',
                        content: 'As you prepare for sleep, imagine that you\'re complete with this day. There\'s nothing more to do or solve right now. Give yourself permission to rest fully, knowing that you can return to life\'s activities tomorrow with renewed energy. Your evening release is complete.'
                    }
                ]
            },
            'mindful-breathing': {
                title: 'Mindful Breathing',
                description: 'Return to your breath and center yourself',
                steps: [
                    {
                        title: 'Welcome',
                        content: 'This mindful breathing practice will help you center yourself and cultivate presence. You can do this practice anywhere, anytime you need a moment of calm. Find a comfortable position where your spine can be relatively straight.'
                    },
                    {
                        title: 'Posture Check',
                        content: 'Take a moment to check your posture. Sit with dignity, as if a string were gently pulling the crown of your head upward. Let your shoulders relax down and back. Place your hands in a comfortable position.'
                    },
                    {
                        title: 'Finding Your Breath',
                        content: 'Bring your attention to your breathing. You don\'t need to control or change your breath in any way—simply notice the natural rhythm of inhalation and exhalation. You might notice the sensation of air passing through your nostrils, the rise and fall of your chest, or the expansion and contraction of your abdomen.'
                    },
                    {
                        title: 'Counting Breaths',
                        content: 'To help focus your attention, try counting your breaths. Count "one" on the inhale, "two" on the exhale, "three" on the next inhale, and so on up to ten. Then start again at one. If you lose track, simply begin again with "one" on your next inhale.'
                    },
                    {
                        title: 'Working with Wandering',
                        content: 'You\'ll likely notice your mind wandering away from your breath. This is completely normal and part of the practice. When you notice your attention has wandered, gently acknowledge it, and then return your focus to your breathing. Each time you do this, you\'re strengthening your capacity for presence.'
                    },
                    {
                        title: 'Expanding Awareness',
                        content: 'Now, while maintaining awareness of your breath as an anchor, gently expand your attention to include your body as a whole. Notice the sensations of sitting, the points of contact with the floor or chair, and the overall feeling of being present in your body.'
                    },
                    {
                        title: 'Completion',
                        content: 'As we complete this practice, take a moment to appreciate the time you\'ve given yourself for mindful breathing. Remember that you can return to your breath as an anchor of presence at any time throughout your day. Your mindful breathing practice is complete.'
                    }
                ]
            }
        };
    }
    
    /**
     * Start a ritual flow
     * @param {string} ritualId - ID of the ritual to start
     */
    startRitual(ritualId) {
        // Get ritual data
        const ritual = this.ritualData[ritualId];
        if (!ritual) return;
        
        // Set current ritual
        this.currentRitual = ritualId;
        this.currentStep = 0;
        
        // Update UI
        this.ritualTitle.textContent = ritual.title;
        this.updateRitualContent();
        this.updateProgressIndicators();
        
        // Show ritual flow container
        this.ritualFlowContainer.classList.remove('hidden');
        
        // Update pixel state if available
        if (window.singlePixel) {
            window.singlePixel.setState('thinking');
            setTimeout(() => {
                window.singlePixel.setState('idle');
            }, 1500);
        }
        
        // Trigger haptic feedback if available
        if (window.singlePixel) {
            window.singlePixel.triggerHapticFeedback('medium');
        }
    }
    
    /**
     * Close the current ritual flow
     */
    closeRitual() {
        // Hide ritual flow container
        this.ritualFlowContainer.classList.add('hidden');
        
        // Reset current ritual
        this.currentRitual = null;
        this.currentStep = 0;
        
        // Update pixel state if available
        if (window.singlePixel) {
            window.singlePixel.pulse(500);
        }
    }
    
    /**
     * Navigate between ritual steps
     * @param {number} direction - Direction to navigate (1 for next, -1 for previous)
     */
    navigateRitualStep(direction) {
        if (!this.currentRitual) return;
        
        const ritual = this.ritualData[this.currentRitual];
        const newStep = this.currentStep + direction;
        
        // Check if step is valid
        if (newStep < 0 || newStep >= ritual.steps.length) return;
        
        // Update current step
        this.currentStep = newStep;
        
        // Update UI
        this.updateRitualContent();
        this.updateProgressIndicators();
        
        // Update button states
        this.prevButton.disabled = (this.currentStep === 0);
        this.nextButton.disabled = (this.currentStep === ritual.steps.length - 1);
        
        // Change next button text on last step
        if (this.currentStep === ritual.steps.length - 1) {
            this.nextButton.textContent = 'Complete';
        } else {
            this.nextButton.textContent = 'Next';
        }
        
        // Trigger haptic feedback if available
        if (window.singlePixel) {
            window.singlePixel.triggerHapticFeedback('short');
        }
    }
    
    /**
     * Update the ritual content based on current step
     */
    updateRitualContent() {
        if (!this.currentRitual) return;
        
        const ritual = this.ritualData[this.currentRitual];
        const step = ritual.steps[this.currentStep];
        
        // Clear previous content
        this.ritualContent.innerHTML = '';
        
        // Create step element
        const stepElement = document.createElement('div');
        stepElement.classList.add('ritual-step');
        
        // Add step title
        const titleElement = document.createElement('h3');
        titleElement.textContent = step.title;
        stepElement.appendChild(titleElement);
        
        // Add step content
        const contentElement = document.createElement('p');
        contentElement.textContent = step.content;
        stepElement.appendChild(contentElement);
        
        // Add to ritual content
        this.ritualContent.appendChild(stepElement);
    }
    
    /**
     * Update progress indicators based on current step
     */
    updateProgressIndicators() {
        if (!this.currentRitual) return;
        
        const ritual = this.ritualData[this.currentRitual];
        
        // Clear previous indicators
        this.ritualProgress.innerHTML = '';
        
        // Create progress dots
        for (let i = 0; i < ritual.steps.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('progress-dot');
            if (i === this.currentStep) {
                dot.classList.add('active');
            }
            this.ritualProgress.appendChild(dot);
        }
    }
}

// Initialize the ritual flows when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rituals = new RitualFlows();
});
