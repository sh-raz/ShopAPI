// routes/furnitureRoutes.js
const express = require('express');
const router = express.Router();
const Furniture = require('../models/Furniture');

// Create a new furniture item
router.post('/', async (req, res) => {
  try {
    const furniture = await Furniture.create(req.body);
    res.status(201).json(furniture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all furniture items
router.get('/', async (req, res) => {
  try {
    const furniture = await Furniture.findAll();
    res.json(furniture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single furniture item by ID
router.get('/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findByPk(req.params.id);
    if (!furniture) {
      return res.status(404).json({ message: 'Furniture not found' });
    }
    res.json(furniture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a furniture item by ID
router.put('/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findByPk(req.params.id);
    if (!furniture) {
      return res.status(404).json({ message: 'Furniture not found' });
    }
    await furniture.update(req.body);
    res.json(furniture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a furniture item by ID
router.delete('/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findByPk(req.params.id);
    if (!furniture) {
      return res.status(404).json({ message: 'Furniture not found' });
    }
    await furniture.destroy();
    res.json({ message: 'Furniture deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
