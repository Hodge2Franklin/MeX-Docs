// Interactive components for the MeX AI Companion documentation website

// Initialize all interactive components
function initInteractiveComponents() {
  initCodeHighlighting();
  initCollapsibleSections();
  initTooltips();
  initPopups();
  initTabPanels();
  initZoomableImages();
  initScrollSpy();
}

// Initialize syntax highlighting for code blocks
function initCodeHighlighting() {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
}

// Initialize collapsible sections
function initCollapsibleSections() {
  document.querySelectorAll('.collapsible-header').forEach(header => {
    header.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

// Initialize tooltips
function initTooltips() {
  $('[data-toggle="tooltip"]').tooltip();
}

// Initialize popup information boxes
function initPopups() {
  document.querySelectorAll('.info-popup-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const popupId = this.getAttribute('data-popup-id');
      const popup = document.getElementById(popupId);
      
      if (popup) {
        popup.classList.toggle('show');
        
        // Close when clicking outside
        document.addEventListener('click', function closePopup(e) {
          if (!popup.contains(e.target) && !trigger.contains(e.target)) {
            popup.classList.remove('show');
            document.removeEventListener('click', closePopup);
          }
        });
      }
    });
  });
}

// Initialize tab panels
function initTabPanels() {
  document.querySelectorAll('.tab-panel').forEach(panel => {
    const tabs = panel.querySelectorAll('.tab');
    const tabContents = panel.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to current tab and corresponding content
        this.classList.add('active');
        const contentId = this.getAttribute('data-tab');
        const content = panel.querySelector(`.tab-content[data-tab="${contentId}"]`);
        if (content) {
          content.classList.add('active');
        }
      });
    });
    
    // Activate first tab by default
    if (tabs.length > 0) {
      tabs[0].click();
    }
  });
}

// Initialize zoomable images
function initZoomableImages() {
  document.querySelectorAll('.zoomable-image').forEach(img => {
    img.addEventListener('click', function() {
      const modal = document.createElement('div');
      modal.className = 'image-zoom-modal';
      
      const modalImg = document.createElement('img');
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      
      const closeBtn = document.createElement('span');
      closeBtn.className = 'image-zoom-close';
      closeBtn.innerHTML = '&times;';
      
      modal.appendChild(modalImg);
      modal.appendChild(closeBtn);
      document.body.appendChild(modal);
      
      // Show modal with animation
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
      
      // Close modal when clicking close button or outside the image
      modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === closeBtn) {
          modal.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(modal);
          }, 300);
        }
      });
    });
  });
}

// Initialize scrollspy for navigation highlighting
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
  initInteractiveComponents();
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initInteractiveComponents,
    initCodeHighlighting,
    initCollapsibleSections,
    initTooltips,
    initPopups,
    initTabPanels,
    initZoomableImages,
    initScrollSpy
  };
}
