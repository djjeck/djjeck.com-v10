#!/bin/bash

# Add necessary Node options for ES modules support
export NODE_OPTIONS="--experimental-vm-modules"

echo "===== Running Component Tests ====="

# Run the tests with a more structured output
npx jest --config=jest.config.mjs test/Button.test.tsx test/BlogPostCard.test.tsx test/SimplifiedNewsletter.test.tsx --verbose

# Store the Jest exit code
jest_exit_code=$?

echo "===== Test Summary ====="
if [ $jest_exit_code -eq 0 ]; then
  echo "✅ All tests passed successfully!"
else
  echo "❌ Some tests failed. Check the output above for details."
fi

# Exit with the Jest exit code
exit $jest_exit_code