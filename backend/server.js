const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5500',
    'file://',
    'https://PAVAN-18-CODER.github.io',
    /render\.com$/,
    /netlify\.app$/,
    /onrender\.com$/
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-news-db';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 3000,
  socketTimeoutMS: 3000,
  connectTimeoutMS: 3000
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch(err => {
  console.error('❌ MongoDB connection error: Using mock data as fallback');
  // Continue anyway for development
});

// Import Routes
const newsRoutes = require('./routes/news');
const toolsRoutes = require('./routes/tools');
const newsletterRoutes = require('./routes/newsletter');
const contactRoutes = require('./routes/contact');

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   - GET /api/news - Get all news`);
  console.log(`   - GET /api/news/:id - Get specific news`);
  console.log(`   - POST /api/news - Create news`);
  console.log(`   - GET /api/tools - Get all tools`);
  console.log(`   - GET /api/tools/:id - Get specific tool`);
  console.log(`   - POST /api/newsletter/subscribe - Subscribe to newsletter`);
  console.log(`   - POST /api/newsletter/unsubscribe - Unsubscribe from newsletter`);
  console.log(`   - GET /api/newsletter/subscribers - Get active subscribers`);
  console.log(`   - POST /api/contact/submit - Submit contact form`);
  console.log(`   - GET /api/contact/messages - Get contact messages`);
  console.log(`   - PATCH /api/contact/messages/:id - Update message status`);
  console.log(`   - GET /api/health - Health check`);
});

module.exports = app;
