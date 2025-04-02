// Cross-referencing functionality for the MeX AI Companion documentation website

// Initialize cross-referencing
function initCrossReferences() {
  createInlineReferences();
  createRelatedContentSections();
  setupContextualTooltips();
  highlightConnectedConcepts();
}

// Create inline references with tooltips
function createInlineReferences() {
  // Find all cross-reference links
  document.querySelectorAll('a.xref').forEach(link => {
    const targetId = link.getAttribute('data-target');
    const targetSection = link.getAttribute('data-section');
    const tooltipContent = link.getAttribute('data-tooltip');
    
    // Add tooltip functionality
    if (tooltipContent) {
      link.setAttribute('data-toggle', 'tooltip');
      link.setAttribute('data-placement', 'top');
      link.setAttribute('title', tooltipContent);
    }
    
    // Add click handler for smooth scrolling if on same page
    if (targetId && !targetSection) {
      link.addEventListener('click', function(e) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
          
          // Highlight the target element briefly
          targetElement.classList.add('highlight-target');
          setTimeout(() => {
            targetElement.classList.remove('highlight-target');
          }, 2000);
        }
      });
    }
  });
  
  // Initialize Bootstrap tooltips
  $('[data-toggle="tooltip"]').tooltip();
}

// Create related content sections at the bottom of each main section
function createRelatedContentSections() {
  document.querySelectorAll('.related-content').forEach(container => {
    const sectionId = container.getAttribute('data-section');
    const relatedItems = JSON.parse(container.getAttribute('data-related') || '[]');
    
    if (relatedItems.length === 0) return;
    
    let html = '<div class="related-content-container mt-4 mb-4">';
    html += '<h4>Related Content</h4>';
    html += '<ul class="related-content-list">';
    
    relatedItems.forEach(item => {
      html += `<li>
        <a href="${item.url}" class="related-content-link">
          <span class="related-content-title">${item.title}</span>
          <span class="related-content-section">${item.section}</span>
        </a>
      </li>`;
    });
    
    html += '</ul></div>';
    
    container.innerHTML = html;
  });
}

// Set up contextual tooltips for technical terms and concepts
function setupContextualTooltips() {
  document.querySelectorAll('.concept').forEach(concept => {
    const term = concept.textContent;
    const definition = concept.getAttribute('data-definition');
    
    if (definition) {
      concept.classList.add('concept-term');
      concept.setAttribute('data-toggle', 'tooltip');
      concept.setAttribute('data-placement', 'top');
      concept.setAttribute('title', definition);
    }
  });
  
  // Initialize Bootstrap tooltips
  $('[data-toggle="tooltip"]').tooltip();
}

// Highlight connected concepts when hovering over related terms
function highlightConnectedConcepts() {
  document.querySelectorAll('[data-concept-group]').forEach(element => {
    const conceptGroup = element.getAttribute('data-concept-group');
    
    element.addEventListener('mouseenter', () => {
      document.querySelectorAll(`[data-concept-group="${conceptGroup}"]`).forEach(related => {
        related.classList.add('concept-highlight');
      });
    });
    
    element.addEventListener('mouseleave', () => {
      document.querySelectorAll(`[data-concept-group="${conceptGroup}"]`).forEach(related => {
        related.classList.remove('concept-highlight');
      });
    });
  });
}

// Add breadcrumb navigation
function createBreadcrumbs() {
  const breadcrumbContainer = document.getElementById('breadcrumbs');
  if (!breadcrumbContainer) return;
  
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/').filter(part => part.length > 0);
  
  let html = '<nav aria-label="breadcrumb"><ol class="breadcrumb">';
  html += '<li class="breadcrumb-item"><a href="/">Home</a></li>';
  
  let currentPath = '';
  pathParts.forEach((part, index) => {
    currentPath += '/' + part;
    
    // Format the part for display (convert kebab-case to Title Case)
    const displayPart = part.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    if (index === pathParts.length - 1) {
      // Last item (current page)
      html += `<li class="breadcrumb-item active" aria-current="page">${displayPart}</li>`;
    } else {
      html += `<li class="breadcrumb-item"><a href="${currentPath}">${displayPart}</a></li>`;
    }
  });
  
  html += '</ol></nav>';
  
  breadcrumbContainer.innerHTML = html;
}

// Create a "See Also" section based on tags
function createSeeAlsoSection() {
  const seeAlsoContainer = document.getElementById('see-also');
  if (!seeAlsoContainer) return;
  
  const pageTags = seeAlsoContainer.getAttribute('data-tags').split(',').map(tag => tag.trim());
  if (pageTags.length === 0) return;
  
  // This would typically fetch from an API or pre-generated JSON
  // For demonstration, we'll use a hardcoded mapping
  const taggedPages = {
    'duality-model': [
      { title: 'Mirror Component', url: '/architecture/mirror-component', section: 'Architecture' },
      { title: 'Bridge Component', url: '/architecture/bridge-component', section: 'Architecture' },
      { title: 'Synthesis Layer', url: '/architecture/synthesis-layer', section: 'Architecture' }
    ],
    'ethics': [
      { title: 'Ethical Principles', url: '/ethics/principles', section: 'Ethics' },
      { title: 'Privacy Architecture', url: '/ethics/implementation', section: 'Ethics' },
      { title: 'Ethical Guardrails', url: '/ethics/guardrails', section: 'Ethics' }
    ],
    'user-interaction': [
      { title: 'Journal Interface', url: '/user-interaction/interfaces', section: 'User Interaction' },
      { title: 'Haptic Feedback', url: '/user-interaction/haptic-feedback', section: 'User Interaction' },
      { title: 'Voice Communication', url: '/user-interaction/voice-communication', section: 'User Interaction' }
    ],
    'rituals': [
      { title: 'Ritual Engine', url: '/architecture/supporting-systems', section: 'Architecture' },
      { title: 'Daily Rituals', url: '/user-interaction/user-flows', section: 'User Interaction' }
    ],
    'memory': [
      { title: 'Memory System', url: '/architecture/supporting-systems', section: 'Architecture' },
      { title: 'Memory Interface', url: '/user-interaction/interfaces', section: 'User Interaction' }
    ]
  };
  
  // Find related pages based on tags
  const relatedPages = [];
  pageTags.forEach(tag => {
    if (taggedPages[tag]) {
      taggedPages[tag].forEach(page => {
        // Avoid duplicates
        if (!relatedPages.some(p => p.url === page.url)) {
          relatedPages.push(page);
        }
      });
    }
  });
  
  if (relatedPages.length === 0) return;
  
  let html = '<div class="see-also-container mt-4 mb-4">';
  html += '<h4>See Also</h4>';
  html += '<ul class="see-also-list">';
  
  relatedPages.forEach(page => {
    html += `<li>
      <a href="${page.url}" class="see-also-link">
        <span class="see-also-title">${page.title}</span>
        <span class="see-also-section">${page.section}</span>
      </a>
    </li>`;
  });
  
  html += '</ul></div>';
  
  seeAlsoContainer.innerHTML = html;
}

// Initialize all cross-referencing features when the page loads
document.addEventListener('DOMContentLoaded', function() {
  initCrossReferences();
  createBreadcrumbs();
  createSeeAlsoSection();
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initCrossReferences,
    createInlineReferences,
    createRelatedContentSections,
    setupContextualTooltips,
    highlightConnectedConcepts,
    createBreadcrumbs,
    createSeeAlsoSection
  };
}
