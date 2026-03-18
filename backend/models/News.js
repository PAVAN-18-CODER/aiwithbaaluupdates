const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  emoji: {
    type: String,
    required: true,
    default: '📰'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  fullContent: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['LLM', 'Research', 'Vision', 'Optimization', 'Ethics', 'Tools', 'Other'],
    default: 'Other'
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    default: 'AI with Baalu'
  },
  imageUrl: {
    type: String,
    default: null
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt before saving
newsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('News', newsSchema);
