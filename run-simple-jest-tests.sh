#!/bin/bash

echo "Running Jest tests with simplified configuration..."

# Specific test file path
TEST_FILE="client/src/__tests__/button.test.tsx"

# Run with experimental flags and increased memory
NODE_ENV=test NODE_OPTIONS="--experimental-vm-modules --no-warnings --max-old-space-size=4096" npx jest $TEST_FILE --config=jest.config.simple.js --verbose

if [ $? -eq 0 ]; then
  echo "✅ Tests passed successfully!"
  exit 0
else
  echo "❌ Tests failed!"
  exit 1
fi