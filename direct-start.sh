#!/bin/bash
# This script directly starts the server bypassing TypeScript checks
# It uses tsx which handles TypeScript files directly

echo "Starting server with tsx directly..."
NODE_ENV=development npx tsx server/index.ts