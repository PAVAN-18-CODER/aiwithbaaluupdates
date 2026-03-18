const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });
    
    if (existingSubscriber && !existingSubscriber.unsubscribed) {
      return res.status(400).json({
        success: false,
        message: 'Email already subscribed'
      });
    }

    // If unsubscribed before, resubscribe
    if (existingSubscriber && existingSubscriber.unsubscribed) {
      existingSubscriber.unsubscribed = false;
      existingSubscriber.unsubscribedAt = null;
      await existingSubscriber.save();
      return res.json({
        success: true,
        message: 'Welcome back! You have been resubscribed to our newsletter'
      });
    }

    // Create new subscriber
    const subscriber = new Newsletter({ email });
    await subscriber.save();

    res.status(201).json({
      success: true,
      message: `Successfully subscribed ${email} to newsletter`,
      data: subscriber
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed to newsletter'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error subscribing to newsletter',
      error: error.message
    });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our newsletter list'
      });
    }

    subscriber.unsubscribed = true;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.json({
      success: true,
      message: 'You have been unsubscribed from our newsletter'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error unsubscribing from newsletter',
      error: error.message
    });
  }
});

// Get all active subscribers (admin only)
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ unsubscribed: false })
      .select('email subscribedAt')
      .sort({ subscribedAt: -1 });

    const total = await Newsletter.countDocuments({ unsubscribed: false });

    res.json({
      success: true,
      data: subscribers,
      total,
      count: subscribers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subscribers',
      error: error.message
    });
  }
});

module.exports = router;
