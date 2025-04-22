const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Habit = require('../models/habit');

// Get all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    console.log('Retrieved habits:', habits);
    res.json(habits);
  } catch (err) {
    console.error('Error getting habits:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get a single habit
router.get('/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id).populate('category');
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a habit
router.post('/', async (req, res) => {
  try {
    console.log('Received POST request to create habit');
    console.log('Request body:', req.body);

    if (!req.body || !req.body.title) {
      console.error('Missing required fields');
      return res.status(400).json({ message: 'Title is required' });
    }

    // If category is provided, validate it's a valid ObjectId
    let categoryId = null;
    if (req.body.category) {
      if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
        return res.status(400).json({ message: 'Invalid category ID format' });
      }
      categoryId = new mongoose.Types.ObjectId(req.body.category);
    }

    const habit = new Habit({
      title: req.body.title,
      description: req.body.description || '',
      category: categoryId
    });

    console.log('Attempting to save habit:', habit);
    const savedHabit = await habit.save();
    console.log('Habit saved successfully:', savedHabit);
    
    // Populate the category information before sending response
    const populatedHabit = await savedHabit.populate('category');
    res.status(201).json(populatedHabit);
  } catch (err) {
    console.error('Error creating habit:', err);
    res.status(400).json({ 
      message: 'Error creating habit',
      error: err.message,
      details: err.errors ? Object.values(err.errors).map(e => e.message) : []
    });
  }
});

// Update a habit
router.patch('/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (req.body.title) habit.title = req.body.title;
    if (req.body.description !== undefined) habit.description = req.body.description;
    if (req.body.category !== undefined) {
      habit.category = req.body.category ? new mongoose.Types.ObjectId(req.body.category) : null;
    }
    if (req.body.completed !== undefined) {
      habit.completed = req.body.completed;
      if (req.body.completed) {
        habit.streak += 1;
        habit.completionHistory.push({ date: new Date(), completed: true });
      } else {
        habit.streak = 0;
      }
    }

    const updatedHabit = await habit.save();
    const populatedHabit = await updatedHabit.populate('category');
    res.json(populatedHabit);
  } catch (err) {
    console.error('Error updating habit:', err);
    res.status(500).json({ message: err.message });
  }
});

// Delete a habit
router.delete('/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    await Habit.deleteOne({ _id: req.params.id });
    res.json({ message: 'Habit deleted', id: req.params.id });
  } catch (err) {
    console.error('Error deleting habit:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
