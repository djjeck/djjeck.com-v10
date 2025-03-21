// Direct server starter script
// This bypasses TypeScript compilation and starts the server directly
import { spawn } from 'child_process';

console.log('Starting server directly with tsx...');

// Start the server using tsx (executes TypeScript directly)
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.kill('SIGTERM');
  process.exit(0);
});