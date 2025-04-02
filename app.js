const express = require('express');
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'MeX AI Companion Documentation',
    activeSection: 'home'
  });
});

// Architecture routes
app.get('/architecture/:page', (req, res) => {
  const page = req.params.page;
  const validPages = ['overview', 'duality-model', 'supporting-systems', 'data-architecture'];
  
  if (!validPages.includes(page)) {
    return res.status(404).render('error', { 
      title: 'Page Not Found',
      message: 'The requested page does not exist.'
    });
  }
  
  // Convert kebab-case to title case for display
  const pageTitle = page.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  res.render(`architecture/${page}`, { 
    title: `${pageTitle} - MeX AI Companion Architecture`,
    activeSection: 'architecture',
    activePage: page
  });
});

// User Interaction routes
app.get('/user-interaction/:page', (req, res) => {
  const page = req.params.page;
  const validPages = ['overview', 'interfaces', 'haptic-feedback', 'voice-communication', 'user-flows'];
  
  if (!validPages.includes(page)) {
    return res.status(404).render('error', { 
      title: 'Page Not Found',
      message: 'The requested page does not exist.'
    });
  }
  
  // Convert kebab-case to title case for display
  const pageTitle = page.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  res.render(`user-interaction/${page}`, { 
    title: `${pageTitle} - MeX AI Companion User Interaction`,
    activeSection: 'user-interaction',
    activePage: page
  });
});

// Ethics routes
app.get('/ethics/:page', (req, res) => {
  const page = req.params.page;
  const validPages = ['overview', 'principles', 'implementation', 'guardrails'];
  
  if (!validPages.includes(page)) {
    return res.status(404).render('error', { 
      title: 'Page Not Found',
      message: 'The requested page does not exist.'
    });
  }
  
  // Convert kebab-case to title case for display
  const pageTitle = page.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  res.render(`ethics/${page}`, { 
    title: `${pageTitle} - MeX AI Companion Ethics`,
    activeSection: 'ethics',
    activePage: page
  });
});

// Analysis routes
app.get('/analysis/:page', (req, res) => {
  const page = req.params.page;
  const validPages = ['comprehensive', 'improvements', 'validation'];
  
  if (!validPages.includes(page)) {
    return res.status(404).render('error', { 
      title: 'Page Not Found',
      message: 'The requested page does not exist.'
    });
  }
  
  // Convert kebab-case to title case for display
  const pageTitle = page.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  res.render(`analysis/${page}`, { 
    title: `${pageTitle} - MeX AI Companion Analysis`,
    activeSection: 'analysis',
    activePage: page
  });
});

// Visualizations route
app.get('/visualizations', (req, res) => {
  res.render('visualizations', { 
    title: 'Visualizations - MeX AI Companion',
    activeSection: 'visualizations'
  });
});

// Search route
app.get('/search', (req, res) => {
  const query = req.query.q || '';
  
  // This is a placeholder for actual search functionality
  // We'll implement the real search in a later step
  res.render('search', { 
    title: 'Search Results - MeX AI Companion',
    activeSection: 'search',
    query: query,
    results: []
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { 
    title: 'Page Not Found',
    message: 'The requested page does not exist.'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`MeX AI Companion documentation website running on http://localhost:${port}`);
});

module.exports = app;
