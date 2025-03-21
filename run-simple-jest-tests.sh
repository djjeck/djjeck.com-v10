#!/bin/bash

echo "Running simple Jest test with simplified configuration..."
NODE_ENV=test npx jest --config=jest.config.simple.js

if [ $? -eq 0 ]; then
  echo "Simple Jest test passed!"
  exit 0
else
  echo "Simple Jest test failed!"
  exit 1
fi