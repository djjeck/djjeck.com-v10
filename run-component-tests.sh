#!/bin/bash

echo "Running component tests..."

# Specify the component test file pattern
COMPONENT_TEST_PATTERN="client/src/__tests__/components/**/*.test.tsx"

# Run component tests with increased timeout and verbose output
NODE_ENV=test NODE_OPTIONS="--experimental-vm-modules" npx jest "${COMPONENT_TEST_PATTERN}" --config=jest.config.ts --no-cache --verbose

if [ $? -eq 0 ]; then
  echo "Component tests passed!"
  exit 0
else
  echo "Component tests failed!"
  exit 1
fi