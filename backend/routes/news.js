const express = require('express');
const router = express.Router();
const News = require('../models/News');
const { mockNews } = require('../mockData');

// Get all news with filters
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit = 100, skip = 0 } = req.query;
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await News.countDocuments(query);
    
    res.json({
      success: true,
      data: news,
      total,
      count: news.length,
      source: 'mongodb'
    });
  } catch (error) {
    // Fallback to mock data when MongoDB is not available
    console.warn('MongoDB unavailable, using mock data');
    let news = mockNews;
    
    const { category, featured, limit = 100, skip = 0 } = req.query;
    
    if (category && category !== 'All') {
      news = news.filter(item => item.category === category);
    }
    
    if (featured === 'true') {
      news = news.filter(item => item.featured === true);
    }
    
    const total = news.length;
    news = news.slice(parseInt(skip), parseInt(skip) + parseInt(limit));
    
    res.json({
      success: true,
      data: news,
      total,
      count: news.length,
      source: 'mock'
    });
  }
});

// Get news by category
router.get('/category/:category', async (req, res) => {
  try {
    const news = await News.find({ category: req.params.category })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news by category',
      error: error.message
    });
  }
});

// Get specific news by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }
    
    // Increment view count
    news.views += 1;
    await news.save();
    
    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news',
      error: error.message
    });
  }
});

// Create new news
router.post('/', async (req, res) => {
  try {
    const { emoji, title, excerpt, fullContent, category, author } = req.body;
    
    if (!title || !excerpt || !fullContent) {
      return res.status(400).json({
        success: false,
        message: 'Title, excerpt, and fullContent are required'
      });
    }
    
    const news = new News({
      emoji: emoji || '📰',
      title,
      excerpt,
      fullContent,
      category: category || 'Other',
      author: author || 'AI with Baalu'
    });
    
    await news.save();
    
    res.status(201).json({
      success: true,
      message: 'News created successfully',
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating news',
      error: error.message
    });
  }
});

// Update news
router.put('/:id', async (req, res) => {
  try {
    const { emoji, title, excerpt, fullContent, category, featured } = req.body;
    
    const news = await News.findByIdAndUpdate(
      req.params.id,
      {
        ...(emoji && { emoji }),
        ...(title && { title }),
        ...(excerpt && { excerpt }),
        ...(fullContent && { fullContent }),
        ...(category && { category }),
        ...(typeof featured !== 'undefined' && { featured })
      },
      { new: true, runValidators: true }
    );
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }
    
    res.json({
      success: true,
      message: 'News updated successfully',
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating news',
      error: error.message
    });
  }
});

// Delete news
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }
    
    res.json({
      success: true,
      message: 'News deleted successfully',
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting news',
      error: error.message
    });
  }
});

// Get all unique categories
router.get('/categories/list/all', async (req, res) => {
  try {
    const categories = await News.distinct('category');
    
    res.json({
      success: true,
      data: ['All', ...categories]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

module.exports = router;
