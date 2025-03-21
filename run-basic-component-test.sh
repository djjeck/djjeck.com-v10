#!/bin/bash

echo "Running basic component test..."

# Be specific about which test to run
TEST_FILE="client/src/__tests__/BasicComponent.test.tsx"

# Run the test with all the options we need
NODE_ENV=test NODE_OPTIONS="--experimental-vm-modules --no-warnings" npx jest "${TEST_FILE}" --no-cache --verbose

if [ $? -eq 0 ]; then
  echo "Basic component test passed!"
  exit 0
else
  echo "Basic component test failed!"
  exit 1
fi