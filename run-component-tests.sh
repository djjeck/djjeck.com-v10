#!/bin/bash

# Add necessary Node options for ES modules support
export NODE_OPTIONS="--experimental-vm-modules"

# Define colors for better output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}===============================================${NC}"
echo -e "${BLUE}=====     React Blog Component Tests     =====${NC}"
echo -e "${BLUE}===============================================${NC}"

# Function to run a specific test file with nice formatting
run_test() {
  local test_file=$1
  local test_name=$2
  
  echo -e "\n${YELLOW}Running Test: ${test_name}${NC}"
  echo -e "${YELLOW}------------------------------${NC}"
  
  npx jest --config=jest.config.mjs $test_file --verbose
  
  local result=$?
  if [ $result -eq 0 ]; then
    echo -e "${GREEN}✓ ${test_name} tests passed${NC}"
  else
    echo -e "${RED}✗ ${test_name} tests failed${NC}"
    return 1
  fi
  
  return 0
}

# Track overall success
overall_success=0

# Run each test suite individually
run_test "client/src/components/ui/button.test.tsx" "Button Component"
test1_result=$?

run_test "client/src/components/BlogPostCard.test.tsx" "BlogPostCard Component"
test2_result=$?

run_test "client/src/components/Newsletter.test.tsx" "Newsletter Component"
test3_result=$?

# Calculate overall result
overall_result=$(( $test1_result + $test2_result + $test3_result ))

echo -e "\n${BLUE}===============================================${NC}"
echo -e "${YELLOW}=====            Test Summary            =====${NC}"
echo -e "${BLUE}===============================================${NC}"

if [ $overall_result -eq 0 ]; then
  echo -e "${GREEN}✅ All component tests passed successfully!${NC}"
else
  echo -e "${RED}❌ Some tests failed. Check the output above for details.${NC}"
fi

# List test results
echo -e "\n${YELLOW}Individual Test Results:${NC}"
if [ $test1_result -eq 0 ]; then
  echo -e "${GREEN}✓ Button Component${NC}"
else
  echo -e "${RED}✗ Button Component${NC}"
fi

if [ $test2_result -eq 0 ]; then
  echo -e "${GREEN}✓ BlogPostCard Component${NC}"
else
  echo -e "${RED}✗ BlogPostCard Component${NC}"
fi

if [ $test3_result -eq 0 ]; then
  echo -e "${GREEN}✓ Newsletter Component${NC}"
else
  echo -e "${RED}✗ Newsletter Component${NC}"
fi

# Exit with appropriate code
exit $overall_result