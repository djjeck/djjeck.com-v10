#!/bin/bash
# This script starts the server directly without any TypeScript checks or tests
echo "Starting server without TypeScript checks..."
NODE_ENV=development npx tsx server/index.ts