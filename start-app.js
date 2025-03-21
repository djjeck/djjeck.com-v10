#!/usr/bin/env node

// This script starts both the backend and frontend
const { spawn } = require('child_process');
const path = require('path');

// Function to start the backend server
function startBackend() {
  console.log('Starting backend server...');
  const backend = spawn('npx', ['tsx', 'server/index.ts'], {
    stdio: 'inherit',
    shell: true
  });

  backend.on('error', (error) => {
    console.error('Backend server error:', error);
  });

  backend.on('close', (code) => {
    if (code !== 0) {
      console.log(`Backend server exited with code ${code}`);
    }
  });

  return backend;
}

// Function to start the frontend dev server
function startFrontend() {
  console.log('Starting frontend development server...');
  const frontend = spawn('npx', ['vite', 'client', '--port', '3000'], {
    stdio: 'inherit',
    shell: true
  });

  frontend.on('error', (error) => {
    console.error('Frontend server error:', error);
  });

  frontend.on('close', (code) => {
    if (code !== 0) {
      console.log(`Frontend server exited with code ${code}`);
    }
  });

  return frontend;
}

// Start both servers
const backendProcess = startBackend();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  backendProcess.kill();
  process.exit(0);
});