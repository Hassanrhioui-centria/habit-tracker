const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    console.log('Retrieved categories:', categories);
    res.json(categories);
  } catch (err) {
    console.error('Error getting categories:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a category
router.post('/', async (req, res) => {
  try {
    console.log('Received POST request to create category');
    console.log('Request body:', req.body);

    if (!req.body || !req.body.name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const category = new Category({
      name: req.body.name,
      color: req.body.color || 'blue'
    });

    console.log('Attempting to save category:', category);
    const savedCategory = await category.save();
    console.log('Category saved successfully:', savedCategory);
    res.status(201).json(savedCategory);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(400).json({ 
      message: 'Error creating category',
      error: err.message,
      details: err.errors ? Object.values(err.errors).map(e => e.message) : []
    });
  }
});

// Update a category
router.patch('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid category ID format' });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (req.body.name) category.name = req.body.name;
    if (req.body.color) category.color = req.body.color;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ message: err.message });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid category ID format' });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Category.deleteOne({ _id: req.params.id });
    res.json({ message: 'Category deleted', id: req.params.id });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
