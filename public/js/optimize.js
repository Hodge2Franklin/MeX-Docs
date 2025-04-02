// Performance optimization for the MeX AI Companion documentation website

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
  // Find all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  // Create an intersection observer
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // If the image is in the viewport
      if (entry.isIntersecting) {
        const img = entry.target;
        // Replace the src with the data-src
        img.src = img.getAttribute('data-src');
        // Remove the data-src attribute
        img.removeAttribute('data-src');
        // Stop observing this image
        observer.unobserve(img);
      }
    });
  });
  
  // Observe each image
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
});

// Deferred loading of non-critical JavaScript
function loadDeferredScripts() {
  const deferredScripts = document.querySelectorAll('script[data-defer]');
  
  deferredScripts.forEach(script => {
    const newScript = document.createElement('script');
    
    // Copy all attributes
    Array.from(script.attributes).forEach(attr => {
      if (attr.name !== 'data-defer') {
        newScript.setAttribute(attr.name, attr.value);
      }
    });
    
    // Copy inline script content if any
    if (script.innerHTML) {
      newScript.innerHTML = script.innerHTML;
    }
    
    // Replace the old script with the new one
    script.parentNode.replaceChild(newScript, script);
  });
}

// Load deferred scripts after page load
window.addEventListener('load', loadDeferredScripts);

// Debounce function for search input
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Apply debounce to search input
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    const originalHandler = searchInput.oninput;
    searchInput.oninput = debounce(function(e) {
      if (originalHandler) {
        originalHandler.call(this, e);
      }
    }, 300);
  }
});

// Cache frequently accessed DOM elements
const DOMCache = {
  elements: {},
  get: function(selector) {
    if (!this.elements[selector]) {
      this.elements[selector] = document.querySelector(selector);
    }
    return this.elements[selector];
  },
  getAll: function(selector) {
    if (!this.elements[selector]) {
      this.elements[selector] = document.querySelectorAll(selector);
    }
    return this.elements[selector];
  },
  clear: function() {
    this.elements = {};
  }
};

// Optimize D3.js visualizations
function optimizeD3Visualizations() {
  // Reduce the number of elements in visualizations when on mobile
  if (window.innerWidth < 768) {
    // Find all D3 visualization containers
    const visualizations = document.querySelectorAll('.d3-visualization');
    
    visualizations.forEach(viz => {
      // Add a class to indicate mobile optimization
      viz.classList.add('mobile-optimized');
      
      // If the visualization has a simplify method, call it
      if (viz.simplify && typeof viz.simplify === 'function') {
        viz.simplify();
      }
    });
  }
}

// Call optimization function on resize
window.addEventListener('resize', debounce(optimizeD3Visualizations, 250));

// Initialize optimizations when the page loads
document.addEventListener('DOMContentLoaded', function() {
  optimizeD3Visualizations();
});

// Preload critical pages
function preloadCriticalPages() {
  // Only preload if the browser is idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Get all navigation links
      const navLinks = document.querySelectorAll('nav a');
      
      // Find the most important pages (first few in navigation)
      const criticalLinks = Array.from(navLinks).slice(0, 3);
      
      // Preload each critical page
      criticalLinks.forEach(link => {
        const url = link.getAttribute('href');
        
        // Create a prefetch link
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = url;
        
        // Add to head
        document.head.appendChild(prefetch);
      });
    });
  }
}

// Call preload function after page load
window.addEventListener('load', preloadCriticalPages);

// Optimize CSS delivery
function optimizeCSSDelivery() {
  // Get all stylesheets
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  
  // For each stylesheet
  stylesheets.forEach(sheet => {
    // If it's not critical (marked with data-critical="false")
    if (sheet.getAttribute('data-critical') === 'false') {
      // Change to preload
      sheet.setAttribute('rel', 'preload');
      sheet.setAttribute('as', 'style');
      sheet.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
    }
  });
}

// Call CSS optimization immediately
document.addEventListener('DOMContentLoaded', optimizeCSSDelivery);

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    DOMCache,
    optimizeD3Visualizations,
    preloadCriticalPages,
    optimizeCSSDelivery
  };
}
