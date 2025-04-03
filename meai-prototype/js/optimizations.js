/**
 * MeAI Prototype - Performance Optimizations
 * 
 * This script contains performance optimizations for the MeAI prototype.
 * It implements techniques to improve responsiveness and reduce resource usage.
 */

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function to limit the number of times a function can be called
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Optimize scroll events
    const scrollHandler = throttle(() => {
        // Handle scroll events (if needed)
    }, 100);
    window.addEventListener('scroll', scrollHandler);
    
    // Optimize resize events
    const resizeHandler = debounce(() => {
        // Update memory visualization if it exists
        if (window.memory) {
            window.memory.renderMemoryVisualization();
        }
    }, 250);
    window.addEventListener('resize', resizeHandler);
    
    // Optimize input events
    const userInput = document.getElementById('user-input');
    if (userInput) {
        const inputHandler = debounce(() => {
            // Handle input events (if needed)
        }, 300);
        userInput.addEventListener('input', inputHandler);
    }
    
    // Optimize pixel interactions
    const singlePixel = document.getElementById('single-pixel');
    if (singlePixel) {
        const pixelInteractionHandler = throttle((e) => {
            // Original event handler code
            if (window.singlePixel) {
                window.singlePixel.activatePixel();
            }
        }, 500);
        singlePixel.addEventListener('click', pixelInteractionHandler);
    }
});

// Optimize image loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
        img.onload = () => {
            img.removeAttribute('data-src');
        };
    });
}

// Optimize memory usage
function optimizeMemoryUsage() {
    // Limit conversation history size
    if (window.conversation && window.conversation.conversationHistory) {
        const maxHistorySize = 50;
        if (window.conversation.conversationHistory.length > maxHistorySize) {
            window.conversation.conversationHistory = window.conversation.conversationHistory.slice(-maxHistorySize);
        }
    }
    
    // Limit memory nodes
    if (window.memory && window.memory.memoryNodes) {
        const maxNodesSize = 100;
        if (window.memory.memoryNodes.length > maxNodesSize) {
            window.memory.memoryNodes = window.memory.memoryNodes.slice(-maxNodesSize);
            window.memory.renderMemoryVisualization();
        }
    }
}

// Call optimization functions periodically
setInterval(optimizeMemoryUsage, 60000); // Every minute

// Add passive event listeners where appropriate
document.addEventListener('DOMContentLoaded', () => {
    // Use passive event listeners for touch events
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
    document.addEventListener('touchend', () => {}, { passive: true });
});

// Optimize animations
function optimizeAnimations() {
    // Use requestAnimationFrame for animations
    function animatePixel() {
        // Animation code here
        requestAnimationFrame(animatePixel);
    }
    
    // Start animation loop if needed
    // requestAnimationFrame(animatePixel);
}

// Optimize CSS rendering
document.addEventListener('DOMContentLoaded', () => {
    // Add will-change property to elements that will animate
    const animatedElements = document.querySelectorAll('.single-pixel, .ritual-card');
    animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
    });
    
    // Remove will-change after animations complete
    setTimeout(() => {
        animatedElements.forEach(el => {
            el.style.willChange = 'auto';
        });
    }, 5000);
});

// Console optimization message
console.log('Performance optimizations applied to MeAI prototype');
