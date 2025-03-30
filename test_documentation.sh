#!/bin/bash

echo "Running documentation section tests..."
echo "-------------------------------------"

# Create a test directory
mkdir -p /home/ubuntu/meai_redesign/test_results

# Test each section by checking if the corresponding markdown file exists
echo "Testing section file availability:"
echo "--------------------------------"

sections=("overview" "duality-model" "memory-system" "voice-breath" "truthfilter-joyoptimizer" "ritual-engine" "prototype-specifications" "technical-architecture" "ethical-framework" "implementation-roadmap")
files=("overview.md" "duality_model_architecture.md" "memory_system_components.md" "voice_breath_systems.md" "truthfilter_joyoptimizer.md" "ritual_engine_implementation.md" "prototype_specifications.md" "technical_architecture.md" "ethical_framework.md" "implementation_roadmap.md")

for i in "${!sections[@]}"; do
  section="${sections[$i]}"
  file="${files[$i]}"
  
  if [ -f "/home/ubuntu/meai_redesign/docs/$file" ]; then
    echo "✅ Section '$section' file exists: $file"
  else
    echo "❌ Section '$section' file missing: $file"
  fi
done

echo ""
echo "Testing file mapping in documentation.js:"
echo "---------------------------------------"
if [ -f "/home/ubuntu/meai_redesign/js/documentation.js" ]; then
  echo "✅ documentation.js exists"
  grep -q "memory-system" /home/ubuntu/meai_redesign/js/documentation.js
  if [ $? -eq 0 ]; then
    echo "✅ memory-system mapping found in documentation.js"
  else
    echo "❌ memory-system mapping missing in documentation.js"
  fi
  
  grep -q "voice-breath" /home/ubuntu/meai_redesign/js/documentation.js
  if [ $? -eq 0 ]; then
    echo "✅ voice-breath mapping found in documentation.js"
  else
    echo "❌ voice-breath mapping missing in documentation.js"
  fi
else
  echo "❌ documentation.js file missing"
fi

echo ""
echo "Testing HTML structure:"
echo "---------------------"
grep -q "data-section=\"memory-system\"" /home/ubuntu/meai_redesign/documentation.html
if [ $? -eq 0 ]; then
  echo "✅ memory-system section link exists in HTML"
else
  echo "❌ memory-system section link missing in HTML"
fi

grep -q "data-section=\"voice-breath\"" /home/ubuntu/meai_redesign/documentation.html
if [ $? -eq 0 ]; then
  echo "✅ voice-breath section link exists in HTML"
else
  echo "❌ voice-breath section link missing in HTML"
fi

grep -q "id=\"memory-system\"" /home/ubuntu/meai_redesign/documentation.html
if [ $? -eq 0 ]; then
  echo "✅ memory-system section container exists in HTML"
else
  echo "❌ memory-system section container missing in HTML"
fi

grep -q "id=\"voice-breath\"" /home/ubuntu/meai_redesign/documentation.html
if [ $? -eq 0 ]; then
  echo "✅ voice-breath section container exists in HTML"
else
  echo "❌ voice-breath section container missing in HTML"
fi

echo ""
echo "Testing double heading prevention:"
echo "-------------------------------"
grep -q "Remove the first heading if it matches the section title" /home/ubuntu/meai_redesign/documentation.html
if [ $? -eq 0 ]; then
  echo "✅ Double heading prevention code exists"
else
  echo "❌ Double heading prevention code missing"
fi

echo ""
echo "All tests completed."
echo "-------------------"
