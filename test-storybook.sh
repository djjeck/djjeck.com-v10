
#!/bin/bash

# This script runs our Storybook tests
echo "Running Storybook tests..."

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# First, run the component tests
echo "Checking component structure..."
node "$SCRIPT_DIR/test-components.js"

if [ $? -ne 0 ]; then
  echo "Component tests failed!"
  exit 1
fi

# Check if Storybook can build without errors
echo "Checking if Storybook can build..."
"$SCRIPT_DIR/build-storybook.sh"

if [ $? -ne 0 ]; then
  echo "Storybook build failed!"
  exit 1
fi

echo "All Storybook tests passed!"
exit 0
