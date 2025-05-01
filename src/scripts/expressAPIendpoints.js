// File: src/scripts/expressAPIendpoints.js for src/scripts/botpressRoutes.js
const express = require('express');
const router = express.Router();
const botpressService = require('../services/botpressService');

// Initialize connection when server starts
botpressService.initialize().catch(err => {
  console.error('Failed to initialize Botpress:', err);
});


router.post('/events', async (req, res) => {
  try {
    const result = await botpressService.createEvent(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/events', async (req, res) => {
  try {
    const result = await botpressService.listEvents(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/events/:id', async (req, res) => {
  try {
    const result = await botpressService.getEvent(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;