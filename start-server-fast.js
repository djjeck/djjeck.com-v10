#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('Starting server directly with tsx...');

// Direct execution without checks or tests
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'development'
  }
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill();
  process.exit(0);
});