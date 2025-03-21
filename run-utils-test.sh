#!/bin/bash

echo "Running utils test (non-DOM/React)..."

# Run the utility test file that doesn't require DOM
NODE_ENV=test NODE_OPTIONS="--experimental-vm-modules --no-warnings" npx jest client/src/__tests__/utils.test.ts --verbose

if [ $? -eq 0 ]; then
  echo "✅ Utils tests passed successfully!"
  exit 0
else
  echo "❌ Utils tests failed!"
  exit 1
fi