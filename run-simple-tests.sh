#!/bin/bash

echo "Running simple tests without component dependencies..."

# Run the test with the minimal configuration and explicit path
NODE_ENV=test NODE_OPTIONS="--experimental-vm-modules" npx jest ./simple.test.js --no-cache --testMatch="**/*.test.js"

if [ $? -eq 0 ]; then
  echo "Simple tests passed successfully!"
  exit 0
else
  echo "Simple tests failed!"
  exit 1
fi