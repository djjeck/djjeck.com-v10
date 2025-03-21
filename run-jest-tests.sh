#!/bin/bash

echo "Running Jest tests..."
# Run with --no-cache to avoid cache issues and set a timeout
timeout 30s npx jest --no-cache

if [ $? -eq 0 ]; then
  echo "All tests passed!"
  exit 0
elif [ $? -eq 124 ]; then
  echo "Tests timed out! This may be a configuration issue."
  exit 1
else
  echo "Tests failed!"
  exit 1
fi