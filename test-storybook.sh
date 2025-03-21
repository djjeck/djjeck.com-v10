#!/bin/bash

# This script runs our Storybook tests
echo "Running Storybook tests..."

# First, run the component tests
echo "Checking component structure..."
node test-components.js

if [ $? -ne 0 ]; then
  echo "Component tests failed!"
  exit 1
fi

# Check if Storybook can build without errors
echo "Checking if Storybook can build..."
./build-storybook.sh

if [ $? -ne 0 ]; then
  echo "Storybook build failed!"
  exit 1
fi

echo "All Storybook tests passed!"
exit 0