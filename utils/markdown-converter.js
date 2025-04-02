const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Configure marked options
marked.setOptions({
  highlight: function(code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
  headerIds: true,
  gfm: true
});

// Function to convert markdown file to HTML
function convertMarkdownToHtml(markdownPath) {
  try {
    const markdownContent = fs.readFileSync(markdownPath, 'utf8');
    const htmlContent = marked.parse(markdownContent);
    return htmlContent;
  } catch (error) {
    console.error(`Error converting markdown file ${markdownPath}:`, error);
    return `<div class="alert alert-danger">Error loading content: ${error.message}</div>`;
  }
}

// Function to get all markdown files from a directory
function getMarkdownFiles(directory) {
  try {
    const files = fs.readdirSync(directory);
    return files.filter(file => file.endsWith('.md'));
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
}

// Function to extract metadata from markdown content
function extractMetadata(markdownContent) {
  const metadata = {};
  
  // Extract title from first heading
  const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    metadata.title = titleMatch[1];
  }
  
  // Extract description from first paragraph after title
  const descriptionMatch = markdownContent.match(/^#\s+.+\n\n(.+)$/m);
  if (descriptionMatch) {
    metadata.description = descriptionMatch[1];
  }
  
  return metadata;
}

// Function to create table of contents from markdown content
function createTableOfContents(htmlContent) {
  const headings = [];
  const regex = /<h([2-3])\s+id="([^"]+)">(.+?)<\/h\1>/g;
  let match;
  
  while ((match = regex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3];
    
    headings.push({
      level,
      id,
      text
    });
  }
  
  if (headings.length === 0) {
    return '';
  }
  
  let toc = '<div class="toc-container"><h4>Table of Contents</h4><ul class="toc">';
  
  headings.forEach(heading => {
    const indentClass = heading.level === 3 ? 'toc-indent' : '';
    toc += `<li class="${indentClass}"><a href="#${heading.id}">${heading.text}</a></li>`;
  });
  
  toc += '</ul></div>';
  
  return toc;
}

module.exports = {
  convertMarkdownToHtml,
  getMarkdownFiles,
  extractMetadata,
  createTableOfContents
};
