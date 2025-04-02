// File mapping for documentation sections
const fileMapping = {
    'overview': 'overview.md',
    'duality-model': 'duality_model_architecture.md',
    'memory-system': 'memory_system_components.md',
    'voice-breath': 'voice_breath_systems.md',
    'truthfilter-joyoptimizer': 'truthfilter_joyoptimizer.md',
    'ritual-engine': 'ritual_engine_implementation.md',
    'prototype-specifications': 'prototype_specifications.md',
    'technical-architecture': 'technical_architecture.md',
    'ethical-framework': 'ethical_framework.md',
    'implementation-roadmap': 'implementation_roadmap.md',
    // Additional documentation files
    'user-guide': 'USER_GUIDE.md',
    'project-overview': 'project_overview.md',
    'project-blueprint': 'project_blueprint.md',
    'technical-implementation': 'technical_implementation.md',
    'technical-architecture-analysis': 'technical_architecture_analysis.md',
    'ethical-framework-analysis': 'ethical_framework_analysis.md',
    'ethical-framework-evaluation': 'ethical_framework_evaluation.md',
    'implementation-plan': 'implementation_plan.md',
    'implementation-roadmap-analysis': 'implementation_roadmap_analysis.md',
    'key-components': 'key_components_and_concepts.md',
    'relational-ai': 'relational_ai_concepts.md',
    'haptic-patterns': 'haptic_patterns.md',
    'user-interaction': 'user_interaction_features.md',
    'validation-report': 'validation_report.md',
    'use-case-overwhelm': 'uc_001_overwhelm.md',
    'improvement-plan': 'improvement_plan.md',
    'refinement-plan': 'refinement_plan.md',
    'final-report': 'final_report.md',
    'project-status': 'project_status_report.md',
    'advanced-enhancement': 'advanced_enhancement_analysis.md',
    'documentation-guide': 'documentation_guide.md',
    'documentation-index': 'documentation_index.md'
};

// Function to load documentation content
async function loadDocumentationContent(section) {
    try {
        const fileName = fileMapping[section];
        if (!fileName) {
            console.error(`No file mapping found for section: ${section}`);
            return `<p class="error-message">Documentation content not found for this section.</p>`;
        }

        const response = await fetch(`docs/${fileName}`);
        if (!response.ok) {
            console.error(`Failed to load documentation file: ${fileName}`);
            return `<p class="error-message">Failed to load documentation content. Please try again later.</p>`;
        }

        const markdown = await response.text();
        return marked.parse(markdown);
    } catch (error) {
        console.error('Error loading documentation content:', error);
        return `<p class="error-message">An error occurred while loading documentation content.</p>`;
    }
}

// Function to initialize documentation
async function initDocumentation() {
    // Load marked.js library for Markdown parsing
    if (typeof marked === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        document.head.appendChild(script);
        
        // Wait for the script to load
        await new Promise(resolve => {
            script.onload = resolve;
        });
    }

    // Set up navigation
    const navLinks = document.querySelectorAll('.documentation-nav a');
    const docSections = document.querySelectorAll('.doc-section');
    
    // Load initial content for the active section
    const activeSection = document.querySelector('.doc-section.active');
    if (activeSection) {
        const sectionId = activeSection.id;
        const contentPlaceholder = activeSection.querySelector('.content-placeholder');
        if (contentPlaceholder) {
            contentPlaceholder.innerHTML = '<div class="loading-spinner"></div>';
            const content = await loadDocumentationContent(sectionId);
            contentPlaceholder.innerHTML = content;
        }
    }
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Get section ID
            const sectionId = this.getAttribute('data-section');
            
            // Update active section
            docSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                    
                    // Load content if not already loaded
                    const contentPlaceholder = section.querySelector('.content-placeholder');
                    if (contentPlaceholder && contentPlaceholder.innerHTML === '') {
                        contentPlaceholder.innerHTML = '<div class="loading-spinner"></div>';
                        loadDocumentationContent(sectionId).then(content => {
                            contentPlaceholder.innerHTML = content;
                        });
                    }
                }
            });
            
            // Update URL hash
            window.location.hash = sectionId;
        });
    });
    
    // Handle direct navigation via URL hash
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        const targetLink = document.querySelector(`.documentation-nav a[data-section="${sectionId}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
    
    // Set up search functionality
    const searchInput = document.getElementById('doc-search');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchButton && searchResults) {
        const performSearch = async () => {
            const query = searchInput.value.trim().toLowerCase();
            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }
            
            searchResults.innerHTML = '<div class="loading-spinner"></div>';
            searchResults.style.display = 'block';
            
            try {
                // Search through all documentation files
                const results = [];
                const searchPromises = Object.entries(fileMapping).map(async ([sectionId, fileName]) => {
                    try {
                        const response = await fetch(`docs/${fileName}`);
                        if (response.ok) {
                            const content = await response.text();
                            if (content.toLowerCase().includes(query)) {
                                // Find the section title
                                const sectionElement = document.getElementById(sectionId);
                                const sectionTitle = sectionElement ? sectionElement.querySelector('h1').textContent : sectionId;
                                
                                results.push({
                                    sectionId,
                                    title: sectionTitle,
                                    // Extract a snippet of text around the match
                                    snippet: extractSnippet(content, query)
                                });
                            }
                        }
                    } catch (error) {
                        console.error(`Error searching in ${fileName}:`, error);
                    }
                });
                
                await Promise.all(searchPromises);
                
                // Display search results
                if (results.length > 0) {
                    searchResults.innerHTML = results.map(result => `
                        <div class="search-result">
                            <a href="#${result.sectionId}" data-section="${result.sectionId}">${result.title}</a>
                            <p>${result.snippet}</p>
                        </div>
                    `).join('');
                    
                    // Add click handlers to search results
                    document.querySelectorAll('.search-result a').forEach(link => {
                        link.addEventListener('click', function(e) {
                            e.preventDefault();
                            const sectionId = this.getAttribute('data-section');
                            const targetLink = document.querySelector(`.documentation-nav a[data-section="${sectionId}"]`);
                            if (targetLink) {
                                targetLink.click();
                                searchResults.innerHTML = '';
                                searchResults.style.display = 'none';
                            }
                        });
                    });
                } else {
                    searchResults.innerHTML = '<p>No results found.</p>';
                }
            } catch (error) {
                console.error('Error performing search:', error);
                searchResults.innerHTML = '<p>An error occurred while searching.</p>';
            }
        };
        
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', e => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Helper function to extract a snippet of text around a search match
function extractSnippet(content, query) {
    const lowerContent = content.toLowerCase();
    const index = lowerContent.indexOf(query);
    if (index === -1) return '';
    
    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + query.length + 50);
    let snippet = content.substring(start, end);
    
    // Add ellipsis if needed
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';
    
    // Highlight the query
    const highlightedSnippet = snippet.replace(
        new RegExp(query, 'gi'),
        match => `<strong>${match}</strong>`
    );
    
    return highlightedSnippet;
}

// Initialize documentation when the DOM is loaded
document.addEventListener('DOMContentLoaded', initDocumentation);
