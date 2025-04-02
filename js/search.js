// Documentation Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('doc-search');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    
    // Store all documentation content for search
    let docContent = {};
    
    // Function to load all documentation content for search
    function loadAllDocContent() {
        // Get all section IDs from file mapping
        const sectionIds = Object.keys(fileMapping);
        
        // Load content for each section
        sectionIds.forEach(sectionId => {
            const filename = fileMapping[sectionId];
            
            fetch(`docs/${filename}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load ${filename}`);
                    }
                    return response.text();
                })
                .then(content => {
                    // Store content with section ID as key
                    docContent[sectionId] = {
                        title: getSectionTitle(sectionId),
                        content: content
                    };
                })
                .catch(error => {
                    console.error(`Error loading ${filename}:`, error);
                });
        });
    }
    
    // Get section title from DOM
    function getSectionTitle(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const heading = section.querySelector('h1');
            if (heading) {
                return heading.textContent;
            }
        }
        // Return formatted section ID if heading not found
        return sectionId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    // Function to perform search
    function performSearch(query) {
        if (!query || query.trim().length < 2) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }
        
        query = query.toLowerCase().trim();
        let results = [];
        
        // Search through all loaded content
        for (const sectionId in docContent) {
            const { title, content } = docContent[sectionId];
            
            if (content.toLowerCase().includes(query) || title.toLowerCase().includes(query)) {
                // Find context for the search term
                let snippet = '';
                const contentLower = content.toLowerCase();
                const queryIndex = contentLower.indexOf(query);
                
                if (queryIndex !== -1) {
                    // Get text around the query match
                    const start = Math.max(0, queryIndex - 50);
                    const end = Math.min(content.length, queryIndex + query.length + 50);
                    snippet = content.substring(start, end);
                    
                    // Add ellipsis if needed
                    if (start > 0) snippet = '...' + snippet;
                    if (end < content.length) snippet = snippet + '...';
                    
                    // Highlight the query term
                    const highlightedSnippet = snippet.replace(
                        new RegExp(query, 'gi'), 
                        match => `<strong>${match}</strong>`
                    );
                    
                    results.push({
                        sectionId,
                        title,
                        snippet: highlightedSnippet
                    });
                } else {
                    // If query is in title but not found in content snippet
                    snippet = content.substring(0, 100) + '...';
                    results.push({
                        sectionId,
                        title,
                        snippet
                    });
                }
            }
        }
        
        // Display results
        if (results.length > 0) {
            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" data-section="${result.sectionId}">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-snippet">${result.snippet}</div>
                </div>
            `).join('');
            
            // Add click handlers to results
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', function() {
                    const sectionId = this.getAttribute('data-section');
                    const link = document.querySelector(`.documentation-nav a[data-section="${sectionId}"]`);
                    if (link) {
                        link.click();
                        searchResults.classList.remove('active');
                        searchInput.value = '';
                    }
                });
            });
            
            searchResults.classList.add('active');
        } else {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
            searchResults.classList.add('active');
        }
    }
    
    // Search input event listeners
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });
    
    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length >= 2) {
            searchResults.classList.add('active');
        }
    });
    
    // Search button click
    searchButton.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && 
            !searchButton.contains(event.target) && 
            !searchResults.contains(event.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // Load all content when page loads
    loadAllDocContent();
});
