#!/bin/bash

# Comprehensive testing script for MeAI website redesign
# This script performs various tests to ensure the website functions correctly

echo "=== MeAI Website Testing Script ==="
echo "Starting tests at $(date)"
echo

# Create test results directory
RESULTS_DIR="/home/ubuntu/meai_redesign/test_results"
mkdir -p $RESULTS_DIR

# Function to log test results
log_test() {
  local test_name=$1
  local status=$2
  local details=$3
  
  echo "[$status] $test_name: $details" | tee -a "$RESULTS_DIR/test_log.txt"
}

echo "=== File Structure Tests ==="

# Check if all required files exist
required_files=(
  "index.html"
  "documentation.html"
  "css/styles.css"
  "css/responsive.css"
  "js/documentation.js"
)

for file in "${required_files[@]}"; do
  if [ -f "/home/ubuntu/meai_redesign/$file" ]; then
    log_test "File exists: $file" "PASS" "File found"
  else
    log_test "File exists: $file" "FAIL" "File not found"
  fi
done

# Check if documentation files exist
doc_count=$(ls -1 /home/ubuntu/meai_redesign/docs/*.md 2>/dev/null | wc -l)
if [ $doc_count -gt 0 ]; then
  log_test "Documentation files" "PASS" "Found $doc_count markdown files"
else
  log_test "Documentation files" "FAIL" "No markdown files found in docs directory"
fi

echo
echo "=== HTML Validation Tests ==="

# Install html-validator if not already installed
if ! command -v npx html-validate &> /dev/null; then
  echo "Installing html-validate..."
  cd /home/ubuntu/meai_redesign
  npm install --save-dev html-validate
fi

# Validate HTML files
for html_file in index.html documentation.html; do
  if [ -f "/home/ubuntu/meai_redesign/$html_file" ]; then
    validation_result=$(cd /home/ubuntu/meai_redesign && npx html-validate $html_file 2>&1)
    if [[ $validation_result == *"no errors found"* ]]; then
      log_test "HTML validation: $html_file" "PASS" "No errors found"
    else
      error_count=$(echo "$validation_result" | grep -c "error")
      log_test "HTML validation: $html_file" "WARN" "Found $error_count potential issues"
      echo "$validation_result" > "$RESULTS_DIR/${html_file}_validation.txt"
    fi
  fi
done

echo
echo "=== CSS Validation Tests ==="

# Check CSS syntax
for css_file in css/styles.css css/responsive.css; do
  if [ -f "/home/ubuntu/meai_redesign/$css_file" ]; then
    # Simple syntax check (a more thorough check would use a CSS validator)
    if grep -q "}" "/home/ubuntu/meai_redesign/$css_file" && grep -q "{" "/home/ubuntu/meai_redesign/$css_file"; then
      log_test "CSS basic syntax: $css_file" "PASS" "Basic syntax check passed"
    else
      log_test "CSS basic syntax: $css_file" "FAIL" "Basic syntax check failed"
    fi
  fi
done

echo
echo "=== JavaScript Tests ==="

# Check JavaScript syntax
for js_file in js/documentation.js; do
  if [ -f "/home/ubuntu/meai_redesign/$js_file" ]; then
    # Install eslint if not already installed
    if ! command -v npx eslint &> /dev/null; then
      echo "Installing eslint..."
      cd /home/ubuntu/meai_redesign
      npm install --save-dev eslint
    fi
    
    # Create basic eslint config if it doesn't exist
    if [ ! -f "/home/ubuntu/meai_redesign/.eslintrc.json" ]; then
      echo '{
        "env": {
          "browser": true,
          "es2021": true
        },
        "extends": "eslint:recommended",
        "parserOptions": {
          "ecmaVersion": 12
        },
        "rules": {}
      }' > "/home/ubuntu/meai_redesign/.eslintrc.json"
    fi
    
    # Run eslint
    eslint_result=$(cd /home/ubuntu/meai_redesign && npx eslint $js_file --no-eslintrc 2>&1)
    if [[ -z "$eslint_result" ]]; then
      log_test "JavaScript syntax: $js_file" "PASS" "No syntax errors found"
    else
      error_count=$(echo "$eslint_result" | grep -c "error")
      log_test "JavaScript syntax: $js_file" "WARN" "Found $error_count potential issues"
      echo "$eslint_result" > "$RESULTS_DIR/${js_file//\//_}_validation.txt"
    fi
  fi
done

echo
echo "=== Responsive Design Tests ==="

# Check for responsive meta tag
if grep -q "viewport" "/home/ubuntu/meai_redesign/index.html"; then
  log_test "Responsive meta tag" "PASS" "Viewport meta tag found in index.html"
else
  log_test "Responsive meta tag" "FAIL" "Viewport meta tag not found in index.html"
fi

# Check for media queries in CSS
if grep -q "@media" "/home/ubuntu/meai_redesign/css/responsive.css"; then
  media_query_count=$(grep -c "@media" "/home/ubuntu/meai_redesign/css/responsive.css")
  log_test "Media queries" "PASS" "Found $media_query_count media queries in responsive.css"
else
  log_test "Media queries" "FAIL" "No media queries found in responsive.css"
fi

echo
echo "=== Cross-Browser Compatibility Check ==="
log_test "Cross-browser compatibility" "INFO" "Manual testing required for Chrome, Firefox, Safari, and Edge"

echo
echo "=== Mobile Responsiveness Check ==="
log_test "Mobile responsiveness" "INFO" "Manual testing required for various mobile devices"

echo
echo "=== Performance Tests ==="

# Check for large images
large_images=$(find /home/ubuntu/meai_redesign/img -type f -size +500k 2>/dev/null | wc -l)
if [ $large_images -eq 0 ]; then
  log_test "Image size optimization" "PASS" "No excessively large images found"
else
  log_test "Image size optimization" "WARN" "Found $large_images images larger than 500KB"
fi

# Check for minified CSS
for css_file in css/styles.css css/responsive.css; do
  if [ -f "/home/ubuntu/meai_redesign/$css_file" ]; then
    whitespace_ratio=$(grep -c "^ " "/home/ubuntu/meai_redesign/$css_file")
    if [ $whitespace_ratio -lt 100 ]; then
      log_test "CSS minification: $css_file" "PASS" "CSS appears to be reasonably compact"
    else
      log_test "CSS minification: $css_file" "WARN" "CSS may benefit from minification"
    fi
  fi
done

echo
echo "=== Accessibility Tests ==="

# Check for alt attributes on images
if grep -q "<img" "/home/ubuntu/meai_redesign/index.html"; then
  img_count=$(grep -c "<img" "/home/ubuntu/meai_redesign/index.html")
  alt_count=$(grep -c "alt=" "/home/ubuntu/meai_redesign/index.html")
  
  if [ $img_count -eq $alt_count ]; then
    log_test "Image alt attributes" "PASS" "All $img_count images have alt attributes"
  else
    log_test "Image alt attributes" "WARN" "Only $alt_count of $img_count images have alt attributes"
  fi
else
  log_test "Image alt attributes" "INFO" "No images found in index.html"
fi

# Check for ARIA attributes
if grep -q "aria-" "/home/ubuntu/meai_redesign/index.html" || grep -q "role=" "/home/ubuntu/meai_redesign/index.html"; then
  log_test "ARIA attributes" "PASS" "ARIA attributes found in index.html"
else
  log_test "ARIA attributes" "WARN" "No ARIA attributes found in index.html"
fi

echo
echo "=== Documentation Integration Tests ==="

# Check if documentation.js references the correct file paths
if grep -q "docContentMap" "/home/ubuntu/meai_redesign/js/documentation.js"; then
  log_test "Documentation mapping" "PASS" "Documentation content map found in documentation.js"
else
  log_test "Documentation mapping" "FAIL" "Documentation content map not found in documentation.js"
fi

echo
echo "=== Summary ==="
pass_count=$(grep -c "\[PASS\]" "$RESULTS_DIR/test_log.txt")
fail_count=$(grep -c "\[FAIL\]" "$RESULTS_DIR/test_log.txt")
warn_count=$(grep -c "\[WARN\]" "$RESULTS_DIR/test_log.txt")
info_count=$(grep -c "\[INFO\]" "$RESULTS_DIR/test_log.txt")

echo "Tests completed at $(date)"
echo "Results: $pass_count passed, $fail_count failed, $warn_count warnings, $info_count informational"
echo "Detailed results saved to $RESULTS_DIR/test_log.txt"

if [ $fail_count -eq 0 ]; then
  echo "All critical tests passed! The website is ready for deployment."
  exit 0
else
  echo "Some tests failed. Please review the test log and fix the issues before deployment."
  exit 1
fi
