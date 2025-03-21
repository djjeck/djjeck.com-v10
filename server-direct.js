// This is a simplified server implementation for development
const express = require('express');
const http = require('http');

// Create Express app
const app = express();
app.use(express.json());

// Setup basic routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create the server
const server = http.createServer(app);

// Start the server
const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Development server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});