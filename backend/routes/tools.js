const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');
const { mockTools } = require('../mockData');

// Get all tools
router.get('/', async (req, res) => {
  try {
    const { featured, limit = 100, skip = 0 } = req.query;
    let query = {};
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    const tools = await Tool.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await Tool.countDocuments(query);
    
    res.json({
      success: true,
      data: tools,
      total,
      count: tools.length,
      source: 'mongodb'
    });
  } catch (error) {
    // Fallback to mock data when MongoDB is not available
    console.warn('MongoDB unavailable, using mock data');
    let tools = mockTools;
    
    const { featured, limit = 100, skip = 0 } = req.query;
    
    if (featured === 'true') {
      tools = tools.filter(item => item.featured === true);
    }
    
    const total = tools.length;
    tools = tools.slice(parseInt(skip), parseInt(skip) + parseInt(limit));
    
    res.json({
      success: true,
      data: tools,
      total,
      count: tools.length,
      source: 'mock'
    });
  }
});

// Get tool by ID
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Tool not found'
      });
    }
    
    res.json({
      success: true,
      data: tool
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tool',
      error: error.message
    });
  }
});

// Create new tool
router.post('/', async (req, res) => {
  try {
    const { icon, name, description, link, category, rating } = req.body;
    
    if (!icon || !name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Icon, name, and description are required'
      });
    }
    
    const tool = new Tool({
      icon,
      name,
      description,
      link: link || null,
      category: category || 'AI Tools',
      rating: rating || 0
    });
    
    await tool.save();
    
    res.status(201).json({
      success: true,
      message: 'Tool created successfully',
      data: tool
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating tool',
      error: error.message
    });
  }
});

// Update tool
router.put('/:id', async (req, res) => {
  try {
    const { icon, name, description, link, featured, rating } = req.body;
    
    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      {
        ...(icon && { icon }),
        ...(name && { name }),
        ...(description && { description }),
        ...(link && { link }),
        ...(typeof featured !== 'undefined' && { featured }),
        ...(rating && { rating })
      },
      { new: true, runValidators: true }
    );
    
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Tool not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Tool updated successfully',
      data: tool
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating tool',
      error: error.message
    });
  }
});

// Delete tool
router.delete('/:id', async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);
    
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Tool not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Tool deleted successfully',
      data: tool
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting tool',
      error: error.message
    });
  }
});

module.exports = router;
