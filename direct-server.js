#!/usr/bin/env node

/**
 * Ultra-simplified server startup script
 * Skips all tests, type checking, and non-essential processes
 */

const { exec } = require('child_process');

console.log('Starting Express server directly...');

// Direct execution without any extra processes
const server = exec('NODE_ENV=development npx tsx server/index.ts', {
  env: {
    ...process.env,
    SKIP_TYPE_CHECK: 'true',
    SKIP_TESTS: 'true'
  }
});

// Pipe stdout and stderr to the console
server.stdout.pipe(process.stdout);
server.stderr.pipe(process.stderr);

server.on('error', (error) => {
  console.error('Server error:', error);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill();
  process.exit(0);
});