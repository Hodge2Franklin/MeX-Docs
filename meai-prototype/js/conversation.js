/**
 * MeAI Prototype - Conversation Interface Component
 * 
 * This script handles the conversation functionality between the user and MeAI,
 * including message display, user input processing, and AI response generation.
 */

class ConversationInterface {
    constructor() {
        // DOM elements
        this.messagesContainer = document.getElementById('conversation-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
        
        // Conversation state
        this.conversationHistory = [];
        this.isProcessing = false;
        
        // Initialize
        this.initEventListeners();
        this.loadConversationHistory();
        this.welcomeUser();
    }
    
    /**
     * Initialize event listeners for the conversation interface
     */
    initEventListeners() {
        // Send button click
        this.sendButton.addEventListener('click', () => {
            this.processUserInput();
        });
        
        // Enter key press in input field
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processUserInput();
            }
        });
        
        // Listen for pixel activation
        document.addEventListener('pixel-activated', () => {
            if (!this.isProcessing && this.userInput.value.trim() === '') {
                // If no text input, treat pixel activation as a prompt for MeAI to initiate
                this.generateAIResponse('initiate');
            }
        });
        
        // Listen for pixel state changes
        document.addEventListener('pixel-state-changed', (e) => {
            // Update UI based on pixel state if needed
        });
    }
    
    /**
     * Load conversation history from localStorage if available
     */
    loadConversationHistory() {
        const savedHistory = localStorage.getItem('meai-conversation-history');
        if (savedHistory) {
            try {
                this.conversationHistory = JSON.parse(savedHistory);
                
                // Display last 5 messages from history
                const recentMessages = this.conversationHistory.slice(-5);
                recentMessages.forEach(message => {
                    this.addMessageToUI(message.text, message.sender);
                });
            } catch (e) {
                console.error('Error loading conversation history:', e);
            }
        }
    }
    
    /**
     * Save conversation history to localStorage
     */
    saveConversationHistory() {
        // Limit history to last 50 messages to prevent localStorage overflow
        const limitedHistory = this.conversationHistory.slice(-50);
        localStorage.setItem('meai-conversation-history', JSON.stringify(limitedHistory));
    }
    
    /**
     * Display welcome message when conversation starts
     */
    welcomeUser() {
        // Only show welcome if no conversation history exists
        if (this.conversationHistory.length === 0) {
            setTimeout(() => {
                this.addAIMessage("Hello, I'm MeAI. I'm here to connect with you in a meaningful way. How are you feeling today?");
                
                // Update pixel state
                if (window.singlePixel) {
                    window.singlePixel.setState('speaking');
                    setTimeout(() => {
                        window.singlePixel.setState('idle');
                    }, 2000);
                }
            }, 1000);
        }
    }
    
    /**
     * Process user input from the text field
     */
    processUserInput() {
        const userText = this.userInput.value.trim();
        if (userText === '' || this.isProcessing) return;
        
        // Add user message to UI
        this.addUserMessage(userText);
        
        // Clear input field
        this.userInput.value = '';
        
        // Generate AI response
        this.generateAIResponse(userText);
    }
    
    /**
     * Add a user message to the conversation
     * @param {string} text - Message text
     */
    addUserMessage(text) {
        // Add to UI
        this.addMessageToUI(text, 'user');
        
        // Add to history
        this.conversationHistory.push({
            text: text,
            sender: 'user',
            timestamp: new Date().toISOString()
        });
        
        // Save updated history
        this.saveConversationHistory();
    }
    
    /**
     * Add an AI message to the conversation
     * @param {string} text - Message text
     */
    addAIMessage(text) {
        // Add to UI
        this.addMessageToUI(text, 'ai');
        
        // Add to history
        this.conversationHistory.push({
            text: text,
            sender: 'ai',
            timestamp: new Date().toISOString()
        });
        
        // Save updated history
        this.saveConversationHistory();
    }
    
    /**
     * Add a message to the UI
     * @param {string} text - Message text
     * @param {string} sender - Message sender ('user' or 'ai')
     */
    addMessageToUI(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        messageElement.textContent = text;
        
        this.messagesContainer.appendChild(messageElement);
        
        // Scroll to bottom
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    /**
     * Generate an AI response based on user input
     * @param {string} userInput - User's message or 'initiate' for AI-initiated conversation
     */
    generateAIResponse(userInput) {
        // Set processing state
        this.isProcessing = true;
        
        // Update pixel state to thinking
        if (window.singlePixel) {
            window.singlePixel.setState('thinking');
        }
        
        // Simulate AI processing time
        setTimeout(() => {
            let response;
            
            // Generate response based on user input
            if (userInput === 'initiate') {
                // AI-initiated conversation starters
                const starters = [
                    "I noticed you've been quiet. Is there something on your mind?",
                    "Would this be a good time for a brief mindfulness practice?",
                    "I'm sensing this might be a moment for reflection. How are you feeling right now?",
                    "Sometimes silence speaks volumes. What's present for you in this moment?"
                ];
                response = starters[Math.floor(Math.random() * starters.length)];
            } else {
                // Process user input and generate appropriate response
                response = this.processUserMessage(userInput);
            }
            
            // Update pixel state to speaking
            if (window.singlePixel) {
                window.singlePixel.setState('speaking');
            }
            
            // Add AI response with typing effect
            this.typeAIResponse(response);
        }, 1500);
    }
    
    /**
     * Process user message and generate appropriate response
     * @param {string} message - User's message
     * @returns {string} AI response
     */
    processUserMessage(message) {
        // Convert to lowercase for easier matching
        const lowerMessage = message.toLowerCase();
        
        // Check for ritual-related queries
        if (lowerMessage.includes('ritual') || 
            lowerMessage.includes('practice') || 
            lowerMessage.includes('meditation') ||
            lowerMessage.includes('mindful')) {
            return "Would you like to explore one of our guided rituals? They're designed to help you cultivate presence and insight. You can access them from the Rituals tab.";
        }
        
        // Check for stress or anxiety indicators
        if (lowerMessage.includes('stress') || 
            lowerMessage.includes('anxious') || 
            lowerMessage.includes('anxiety') ||
            lowerMessage.includes('worried') ||
            lowerMessage.includes('overwhelm')) {
            return "I notice you're experiencing some stress. Would you like to try a brief breathing practice to help center yourself? Sometimes just three deep breaths can create a moment of spaciousness.";
        }
        
        // Check for questions about MeAI
        if (lowerMessage.includes('who are you') || 
            lowerMessage.includes('what are you') ||
            lowerMessage.includes('about you') ||
            lowerMessage.includes('tell me about yourself')) {
            return "I'm MeAI, a relational AI companion designed to support meaningful connection rather than just utility. I'm here to help you cultivate presence, insight, and well-being through conversation and guided practices.";
        }
        
        // Check for gratitude or positive emotions
        if (lowerMessage.includes('thank') || 
            lowerMessage.includes('grateful') || 
            lowerMessage.includes('appreciate') ||
            lowerMessage.includes('happy') ||
            lowerMessage.includes('good')) {
            return "I appreciate you sharing that positive energy. Moments of gratitude and joy are worth savoring. Is there something specific that's contributing to this feeling?";
        }
        
        // Default responses for general conversation
        const generalResponses = [
            "Thank you for sharing that with me. What feels most important about this for you right now?",
            "I'm here with you in this moment. Would you like to explore this further or would you prefer some space to reflect?",
            "I appreciate you trusting me with your thoughts. How does this relate to what matters most to you?",
            "I'm curious about how this is affecting you. Would you like to tell me more about what you're experiencing?",
            "That's really interesting. I wonder how this connects to other aspects of your life?"
        ];
        
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
    
    /**
     * Display AI response with typing effect
     * @param {string} text - Response text
     */
    typeAIResponse(text) {
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'ai-message');
        this.messagesContainer.appendChild(messageElement);
        
        // Scroll to bottom
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        
        let i = 0;
        const typingSpeed = 30; // ms per character
        
        // Typing effect
        const typeNextChar = () => {
            if (i < text.length) {
                messageElement.textContent += text.charAt(i);
                i++;
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
                setTimeout(typeNextChar, typingSpeed);
            } else {
                // Typing complete
                this.isProcessing = false;
                
                // Add to conversation history
                this.conversationHistory.push({
                    text: text,
                    sender: 'ai',
                    timestamp: new Date().toISOString()
                });
                
                // Save updated history
                this.saveConversationHistory();
                
                // Reset pixel state
                if (window.singlePixel) {
                    setTimeout(() => {
                        window.singlePixel.setState('idle');
                    }, 500);
                }
            }
        };
        
        // Start typing effect
        typeNextChar();
    }
    
    /**
     * Clear the conversation history
     */
    clearConversation() {
        // Clear UI
        this.messagesContainer.innerHTML = '';
        
        // Clear history
        this.conversationHistory = [];
        localStorage.removeItem('meai-conversation-history');
        
        // Show welcome message again
        this.welcomeUser();
    }
}

// Initialize the conversation interface when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.conversation = new ConversationInterface();
});
