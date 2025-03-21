#!/bin/bash

echo "Running simple Jest test..."
# Run only the simple.test.ts file with --no-cache and verbose output
NODE_ENV=test npx jest client/src/__tests__/simple.test.ts --no-cache --verbose

if [ $? -eq 0 ]; then
  echo "Simple test passed!"
  exit 0
else
  echo "Simple test failed!"
  exit 1
fi