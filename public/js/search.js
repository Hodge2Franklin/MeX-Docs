// Search functionality for the MeX AI Companion documentation website

// Initialize search index
let searchIndex = null;
let documentStore = {};

// Function to initialize the search system
async function initSearch() {
  try {
    // If we already have a search index, don't reinitialize
    if (searchIndex) return;
    
    // Create a new search index
    const SearchIndex = require('search-index');
    searchIndex = await SearchIndex();
    
    // Fetch document data
    const response = await fetch('/api/search-data');
    const documents = await response.json();
    
    // Store documents for retrieval
    documents.forEach(doc => {
      documentStore[doc.id] = doc;
    });
    
    // Add documents to search index
    await searchIndex.PUT(documents);
    
    console.log('Search index initialized with', documents.length, 'documents');
  } catch (error) {
    console.error('Error initializing search:', error);
  }
}

// Function to perform search
async function performSearch(query) {
  if (!searchIndex) {
    await initSearch();
  }
  
  try {
    // Perform the search
    const results = await searchIndex.SEARCH({
      AND: query.split(' ').filter(term => term.length > 0)
    });
    
    // Format results
    return results.map(result => {
      const doc = documentStore[result.id];
      return {
        id: doc.id,
        title: doc.title,
        path: doc.path,
        section: doc.section,
        preview: doc.preview,
        score: result.score
      };
    });
  } catch (error) {
    console.error('Error performing search:', error);
    return [];
  }
}

// Function to handle search form submission
function handleSearchSubmit(event) {
  event.preventDefault();
  
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value.trim();
  
  if (query.length < 2) {
    showSearchResults([]);
    return;
  }
  
  // Show loading indicator
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>';
  
  // Perform search
  performSearch(query).then(results => {
    showSearchResults(results);
  });
}

// Function to display search results
function showSearchResults(results) {
  const resultsContainer = document.getElementById('search-results');
  
  if (results.length === 0) {
    resultsContainer.innerHTML = '<div class="alert alert-info">No results found. Try different keywords.</div>';
    return;
  }
  
  // Group results by section
  const groupedResults = {};
  results.forEach(result => {
    if (!groupedResults[result.section]) {
      groupedResults[result.section] = [];
    }
    groupedResults[result.section].push(result);
  });
  
  // Build results HTML
  let html = '';
  
  Object.keys(groupedResults).forEach(section => {
    html += `<h3>${section}</h3><ul class="search-results-list">`;
    
    groupedResults[section].forEach(result => {
      html += `
        <li class="search-result-item">
          <a href="${result.path}" class="search-result-link">
            <h4>${result.title}</h4>
            <p class="search-result-preview">${result.preview}</p>
          </a>
        </li>
      `;
    });
    
    html += '</ul>';
  });
  
  resultsContainer.innerHTML = html;
}

// Initialize search when the page loads
document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearchSubmit);
  }
  
  // Initialize search index in the background
  initSearch();
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initSearch,
    performSearch,
    handleSearchSubmit,
    showSearchResults
  };
}
