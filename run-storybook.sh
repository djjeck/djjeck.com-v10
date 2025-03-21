#!/bin/bash
echo "Starting Storybook in debug mode..."
# Set debug environment variables
export NODE_OPTIONS="--trace-warnings"
export DEBUG=true
export STORYBOOK_DISABLE_TELEMETRY=1
export STORYBOOK_LOGS_LEVEL=debug

# Show storybook version
echo "Storybook version:"
npx storybook --version

# Clear storybook cache
echo "Clearing Storybook cache..."
rm -rf node_modules/.cache/storybook

# Run storybook with verbose flags
npx storybook dev -p 6006 --no-open --debug-webpack