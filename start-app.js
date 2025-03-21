#!/usr/bin/env node

// This script starts the backend server with more robust error handling and logging
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create or clear the server log file
const logFilePath = path.join(logsDir, 'server.log');
fs.writeFileSync(logFilePath, '');

// Open log file for appending
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Timestamp logger function
const logWithTimestamp = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  // Log to console
  console.log(logMessage);
  
  // Log to file
  logStream.write(logMessage);
};

// Function to start the backend server
function startBackend() {
  logWithTimestamp('Starting backend server...');
  
  // Start the server
  const backend = spawn('npx', ['tsx', 'server/index.ts'], {
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true,
    env: {
      ...process.env,
      // Ensure we're in development mode for proper Vite setup
      NODE_ENV: 'development'
    }
  });
  
  // Capture and log stdout
  backend.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      logWithTimestamp(`[SERVER OUT] ${output}`);
    }
  });
  
  // Capture and log stderr
  backend.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      logWithTimestamp(`[SERVER ERR] ${output}`);
    }
  });
  
  // Handle process errors
  backend.on('error', (error) => {
    logWithTimestamp(`Backend server error: ${error.message}`);
  });
  
  // Handle process exit
  backend.on('close', (code) => {
    if (code !== 0) {
      logWithTimestamp(`Backend server exited with code ${code}`);
      
      // Restart the server if it crashes
      logWithTimestamp('Attempting to restart the server in 5 seconds...');
      setTimeout(() => {
        startBackend();
      }, 5000);
    } else {
      logWithTimestamp('Backend server shut down cleanly');
    }
  });
  
  return backend;
}

// Start the server
const backendProcess = startBackend();

// Handle graceful shutdown
process.on('SIGINT', () => {
  logWithTimestamp('Received SIGINT signal. Shutting down server...');
  backendProcess.kill();
  logStream.end();
  process.exit(0);
});

// Handle other termination signals
process.on('SIGTERM', () => {
  logWithTimestamp('Received SIGTERM signal. Shutting down server...');
  backendProcess.kill();
  logStream.end();
  process.exit(0);
});