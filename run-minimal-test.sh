#!/bin/bash

echo "Running minimal component test..."

# Run the test with the minimal configuration
NODE_ENV=test npx jest MinimalTest.js --config=minimal-jest.config.js --no-cache

if [ $? -eq 0 ]; then
  echo "Minimal component test passed!"
  exit 0
else
  echo "Minimal component test failed!"
  exit 1
fi