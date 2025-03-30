// Documentation content loader for MeAI website
document.addEventListener('DOMContentLoaded', function() {
    // Map of documentation section IDs to their corresponding file paths
    const docContentMap = {
        'overview': '/docs/overview.md',
        'duality-model': '/docs/duality_model_architecture.md',
        'memory-system': '/docs/memory_system_components.md',
        'voice-breath': '/docs/voice_breath_systems.md',
        'truthfilter': '/docs/truthfilter_joyoptimizer.md',
        'ritual-engine': '/docs/ritual_engine_implementation.md',
        'prototype': '/docs/prototype_specifications.md',
        'technical': '/docs/technical_architecture.md',
        'ethical': '/docs/ethical_framework.md',
        'roadmap': '/docs/implementation_roadmap.md'
    };

    // Function to load documentation content
    function loadDocContent(sectionId, placeholder) {
        const filePath = docContentMap[sectionId];
        if (!filePath) {
            placeholder.innerHTML = '<p>Content not found for this section.</p>';
            return;
        }

        // Show loading state
        placeholder.innerHTML = '<p>Loading content...</p>';

        // Fetch the markdown file
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdown => {
                // Convert markdown to HTML (in a real implementation, you'd use a proper markdown parser)
                // For now, we'll just display the raw content with some basic formatting
                const formattedContent = formatMarkdown(markdown);
                placeholder.innerHTML = formattedContent;
                
                // Apply syntax highlighting or other post-processing
                applyCodeHighlighting();
            })
            .catch(error => {
                console.error('Error loading documentation:', error);
                placeholder.innerHTML = '<p>Error loading content. Please try again later.</p>';
            });
    }

    // Very basic markdown formatting (in a real implementation, use a proper markdown library)
    function formatMarkdown(markdown) {
        // This is a simplified version - in production, use a proper markdown parser
        let html = markdown;
        
        // Format headings
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        
        // Format paragraphs
        html = html.replace(/^(?!<h[1-6]>)(.*$)/gm, function(match) {
            if (match.trim() === '') return '';
            return '<p>' + match + '</p>';
        });
        
        // Format lists
        html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');
        
        // Format code blocks
        html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
        
        // Format inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Format bold text
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // Format italic text
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        
        return html;
    }

    // Apply syntax highlighting to code blocks
    function applyCodeHighlighting() {
        // In a real implementation, you might use a library like Prism.js or highlight.js
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            block.classList.add('highlighted-code');
        });
    }

    // Load initial content
    const initialSection = document.querySelector('.doc-section.active');
    if (initialSection) {
        const contentPlaceholder = initialSection.querySelector('.content-placeholder');
        if (contentPlaceholder) {
            loadDocContent(initialSection.id, contentPlaceholder);
        }
    }

    // Set up click handlers for sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const docSections = document.querySelectorAll('.doc-section');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            sidebarLinks.forEach(l => l.classList.remove('active'));
            docSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section and make it active
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Load content
                const contentPlaceholder = targetSection.querySelector('.content-placeholder');
                if (contentPlaceholder) {
                    loadDocContent(targetId, contentPlaceholder);
                }
            }
        });
    });
});
