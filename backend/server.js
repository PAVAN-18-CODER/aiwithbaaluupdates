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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

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

// Health check endpoint with detailed info
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  const status = {
    server: 'operational',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
  res.json(status);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    method: req.method,
    message: 'Please check the API documentation for available endpoints'
  });
});

// Enhanced Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Please check the provided data',
      details: errors
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      error: 'Duplicate Entry',
      message: `A record with this ${field} already exists`,
      field: field
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Authentication Error',
      message: 'Invalid or expired token'
    });
  }

  // Default error response
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: true,
    message: statusCode === 500 ? 'Internal Server Error' : message,
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   - GET /api/health - Health check`);
  console.log(`   - GET /api/status - Server status`);
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
  console.log(`\n⚙️ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📦 Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
});

module.exports = app;
