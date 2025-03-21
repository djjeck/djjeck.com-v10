#!/bin/bash
# This script bypasses TypeScript checks and test runs
echo "Starting server without checks..."
NODE_ENV=development npx tsx server/index.ts