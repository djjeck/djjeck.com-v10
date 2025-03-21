// This is a direct JS file to run the server without TypeScript checks
// Import modules
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { storage } = require('./server/storage');

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/posts', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    const posts = await storage.getAllPosts(limit, offset);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/posts/featured', async (req, res) => {
  try {
    const featuredPost = await storage.getFeaturedPost();
    if (!featuredPost) {
      return res.status(404).json({ error: 'No featured post found' });
    }
    res.json(featuredPost);
  } catch (error) {
    console.error('Error fetching featured post:', error);
    res.status(500).json({ error: 'Failed to fetch featured post' });
  }
});

app.get('/api/posts/:slug', async (req, res) => {
  try {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await storage.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/categories/:slug/posts', async (req, res) => {
  try {
    const posts = await storage.getPostsByCategory(req.params.slug);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching category posts:', error);
    res.status(500).json({ error: 'Failed to fetch category posts' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));

// For all other routes, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});