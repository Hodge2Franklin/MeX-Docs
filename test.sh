#!/bin/bash

# Comprehensive testing script for MeAI website
echo "Starting comprehensive cross-page testing..."

# Create test results directory
mkdir -p /home/ubuntu/meai_redesign/test_results

# Function to check if file exists and has content
check_file() {
  if [ -f "$1" ]; then
    if [ -s "$1" ]; then
      echo "✅ $1 exists and has content"
      return 0
    else
      echo "❌ $1 exists but is empty"
      return 1
    fi
  else
    echo "❌ $1 does not exist"
    return 1
  fi
}

# Test 1: Check all required files exist
echo -e "\n=== Testing file structure ==="
required_files=(
  "/home/ubuntu/meai_redesign/index.html"
  "/home/ubuntu/meai_redesign/documentation.html"
  "/home/ubuntu/meai_redesign/architecture.html"
  "/home/ubuntu/meai_redesign/css/styles.css"
  "/home/ubuntu/meai_redesign/css/responsive.css"
  "/home/ubuntu/meai_redesign/css/documentation.css"
  "/home/ubuntu/meai_redesign/img/architecture_diagram.svg"
  "/home/ubuntu/meai_redesign/robots.txt"
)

file_errors=0
for file in "${required_files[@]}"; do
  if ! check_file "$file"; then
    file_errors=$((file_errors+1))
  fi
done

if [ $file_errors -eq 0 ]; then
  echo "✅ All required files exist and have content"
else
  echo "❌ $file_errors file issues found"
fi

# Test 2: Validate HTML files
echo -e "\n=== Testing HTML validity ==="
html_files=(
  "/home/ubuntu/meai_redesign/index.html"
  "/home/ubuntu/meai_redesign/documentation.html"
  "/home/ubuntu/meai_redesign/architecture.html"
)

html_errors=0
for file in "${html_files[@]}"; do
  # Basic HTML validation - check for unclosed tags
  unclosed_tags=$(grep -o "<[a-z][a-z0-9]*[^<>]*>" "$file" | grep -v "/>" | sed 's/<\([a-z][a-z0-9]*\).*/\1/' | sort)
  closed_tags=$(grep -o "</[a-z][a-z0-9]*>" "$file" | sed 's/<\/\([a-z][a-z0-9]*\)>/\1/' | sort)
  
  # Compare counts of opening and closing tags
  for tag in $(echo "$unclosed_tags" | uniq); do
    open_count=$(echo "$unclosed_tags" | grep -c "^$tag$")
    close_count=$(echo "$closed_tags" | grep -c "^$tag$")
    
    if [ "$open_count" != "$close_count" ]; then
      echo "❌ $file: Mismatched tags for <$tag>: $open_count opening, $close_count closing"
      html_errors=$((html_errors+1))
    fi
  done
  
  if ! grep -q "<!DOCTYPE html>" "$file"; then
    echo "❌ $file: Missing DOCTYPE declaration"
    html_errors=$((html_errors+1))
  fi
  
  if ! grep -q "<html" "$file"; then
    echo "❌ $file: Missing <html> tag"
    html_errors=$((html_errors+1))
  fi
  
  if ! grep -q "<head" "$file"; then
    echo "❌ $file: Missing <head> tag"
    html_errors=$((html_errors+1))
  fi
  
  if ! grep -q "<body" "$file"; then
    echo "❌ $file: Missing <body> tag"
    html_errors=$((html_errors+1))
  fi
  
  if [ $html_errors -eq 0 ]; then
    echo "✅ $file: Basic HTML validation passed"
  fi
done

# Test 3: Check CSS files for syntax errors
echo -e "\n=== Testing CSS validity ==="
css_files=(
  "/home/ubuntu/meai_redesign/css/styles.css"
  "/home/ubuntu/meai_redesign/css/responsive.css"
  "/home/ubuntu/meai_redesign/css/documentation.css"
)

css_errors=0
for file in "${css_files[@]}"; do
  # Basic CSS validation - check for unclosed braces
  open_braces=$(grep -o "{" "$file" | wc -l)
  close_braces=$(grep -o "}" "$file" | wc -l)
  
  if [ "$open_braces" != "$close_braces" ]; then
    echo "❌ $file: Mismatched braces: $open_braces opening, $close_braces closing"
    css_errors=$((css_errors+1))
  else
    echo "✅ $file: Braces match"
  fi
  
  # Check for missing semicolons
  missing_semicolons=$(grep -E "[a-zA-Z0-9%]}" "$file" | wc -l)
  if [ "$missing_semicolons" -gt 0 ]; then
    echo "⚠️ $file: Potential missing semicolons before closing braces: $missing_semicolons instances"
  else
    echo "✅ $file: No obvious missing semicolons"
  fi
done

# Test 4: Check for broken links in HTML files
echo -e "\n=== Testing for broken links ==="
link_errors=0

for file in "${html_files[@]}"; do
  # Extract all href attributes
  links=$(grep -o 'href="[^"]*"' "$file" | sed 's/href="\([^"]*\)"/\1/')
  
  for link in $links; do
    # Skip external links and anchors
    if [[ $link == http* ]] || [[ $link == "#"* ]]; then
      continue
    fi
    
    # Check if the link points to an existing file
    if [[ $link == *".html" ]] || [[ $link == *".css" ]] || [[ $link == *".js" ]]; then
      if [[ $link == /* ]]; then
        # Absolute path
        if [ ! -f "/home/ubuntu/meai_redesign$link" ]; then
          echo "❌ $file: Broken link to $link"
          link_errors=$((link_errors+1))
        fi
      else
        # Relative path
        dir=$(dirname "$file")
        if [ ! -f "$dir/$link" ]; then
          echo "❌ $file: Broken link to $link"
          link_errors=$((link_errors+1))
        fi
      fi
    fi
  done
done

if [ $link_errors -eq 0 ]; then
  echo "✅ No broken internal links found"
else
  echo "❌ $link_errors broken links found"
fi

# Test 5: Check for responsive meta tag
echo -e "\n=== Testing for responsive design meta tags ==="
responsive_errors=0

for file in "${html_files[@]}"; do
  if ! grep -q '<meta name="viewport"' "$file"; then
    echo "❌ $file: Missing viewport meta tag"
    responsive_errors=$((responsive_errors+1))
  fi
done

if [ $responsive_errors -eq 0 ]; then
  echo "✅ All HTML files have viewport meta tags"
else
  echo "❌ $responsive_errors files missing viewport meta tags"
fi

# Test 6: Check for robots meta tag
echo -e "\n=== Testing for robots meta tags ==="
robots_errors=0

for file in "${html_files[@]}"; do
  if ! grep -q '<meta name="robots"' "$file"; then
    echo "❌ $file: Missing robots meta tag"
    robots_errors=$((robots_errors+1))
  fi
done

if [ $robots_errors -eq 0 ]; then
  echo "✅ All HTML files have robots meta tags"
else
  echo "❌ $robots_errors files missing robots meta tags"
fi

# Test 7: Check for consistent navigation
echo -e "\n=== Testing for consistent navigation ==="
nav_errors=0

# Extract navigation links from each file
index_nav=$(grep -A10 '<ul class="nav-menu">' "/home/ubuntu/meai_redesign/index.html" | grep -o '<a href="[^"]*"[^>]*>[^<]*</a>' | sort)
doc_nav=$(grep -A10 '<ul class="nav-menu">' "/home/ubuntu/meai_redesign/documentation.html" | grep -o '<a href="[^"]*"[^>]*>[^<]*</a>' | sort)
arch_nav=$(grep -A10 '<ul class="nav-menu">' "/home/ubuntu/meai_redesign/architecture.html" | grep -o '<a href="[^"]*"[^>]*>[^<]*</a>' | sort)

# Compare navigation items (ignoring active class)
index_nav_clean=$(echo "$index_nav" | sed 's/ class="[^"]*"//')
doc_nav_clean=$(echo "$doc_nav" | sed 's/ class="[^"]*"//')
arch_nav_clean=$(echo "$arch_nav" | sed 's/ class="[^"]*"//')

if [ "$index_nav_clean" != "$doc_nav_clean" ]; then
  echo "❌ Navigation mismatch between index.html and documentation.html"
  nav_errors=$((nav_errors+1))
fi

if [ "$index_nav_clean" != "$arch_nav_clean" ]; then
  echo "❌ Navigation mismatch between index.html and architecture.html"
  nav_errors=$((nav_errors+1))
fi

if [ $nav_errors -eq 0 ]; then
  echo "✅ Navigation is consistent across all pages"
else
  echo "❌ $nav_errors navigation inconsistencies found"
fi

# Test 8: Check SVG diagram
echo -e "\n=== Testing SVG diagram ==="
svg_errors=0

svg_file="/home/ubuntu/meai_redesign/img/architecture_diagram.svg"
if [ -f "$svg_file" ]; then
  # Check for basic SVG elements
  if ! grep -q "<svg" "$svg_file"; then
    echo "❌ $svg_file: Missing <svg> tag"
    svg_errors=$((svg_errors+1))
  fi
  
  # Check for Mirror component
  if ! grep -q "Mirror" "$svg_file"; then
    echo "❌ $svg_file: Missing Mirror component"
    svg_errors=$((svg_errors+1))
  fi
  
  # Check for Bridge component
  if ! grep -q "Bridge" "$svg_file"; then
    echo "❌ $svg_file: Missing Bridge component"
    svg_errors=$((svg_errors+1))
  fi
  
  # Check for MCP elements
  if ! grep -q "Model" "$svg_file"; then
    echo "❌ $svg_file: Missing Model element"
    svg_errors=$((svg_errors+1))
  fi
  
  if ! grep -q "Controller" "$svg_file"; then
    echo "❌ $svg_file: Missing Controller element"
    svg_errors=$((svg_errors+1))
  fi
  
  if ! grep -q "Presenter" "$svg_file"; then
    echo "❌ $svg_file: Missing Presenter element"
    svg_errors=$((svg_errors+1))
  fi
  
  if [ $svg_errors -eq 0 ]; then
    echo "✅ SVG diagram contains all required components"
  else
    echo "❌ $svg_errors issues found in SVG diagram"
  fi
else
  echo "❌ SVG diagram file not found"
  svg_errors=$((svg_errors+1))
fi

# Test 9: Check for robots.txt
echo -e "\n=== Testing robots.txt ==="
robots_file="/home/ubuntu/meai_redesign/robots.txt"
if [ -f "$robots_file" ]; then
  if grep -q "Disallow: /" "$robots_file"; then
    echo "✅ robots.txt properly blocks search engines"
  else
    echo "❌ robots.txt does not block search engines"
  fi
else
  echo "❌ robots.txt file not found"
fi

# Test 10: Check documentation sidebar links
echo -e "\n=== Testing documentation sidebar links ==="
doc_sidebar_links=$(grep -A20 '<ul class="documentation-nav">' "/home/ubuntu/meai_redesign/documentation.html" | grep -o 'data-section="[^"]*"' | sed 's/data-section="\([^"]*\)"/\1/')

sidebar_errors=0
for section in $doc_sidebar_links; do
  if ! grep -q "id=\"$section\"" "/home/ubuntu/meai_redesign/documentation.html"; then
    echo "❌ Sidebar link to #$section has no matching section"
    sidebar_errors=$((sidebar_errors+1))
  fi
done

if [ $sidebar_errors -eq 0 ]; then
  echo "✅ All documentation sidebar links have matching sections"
else
  echo "❌ $sidebar_errors sidebar links without matching sections"
fi

# Summary
echo -e "\n=== Test Summary ==="
total_errors=$((file_errors + html_errors + css_errors + link_errors + responsive_errors + robots_errors + nav_errors + svg_errors + sidebar_errors))

if [ $total_errors -eq 0 ]; then
  echo "✅ All tests passed successfully!"
else
  echo "❌ $total_errors issues found across all tests"
fi

echo "Testing completed at $(date)"
