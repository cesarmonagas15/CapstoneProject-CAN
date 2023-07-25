const express = require('express');
const router = express.Router();
const Favorite = require("../models/favorite");

// Add a new favorite recipe
router.post('/', async (req, res, next) => {
  try {
    const { userId, recipeId } = req.body;
    const favorite = await Favorite.add(userId, recipeId);
    res.json(favorite);
  } catch (e) {
    next(e);
  }
});

// Get all favorite recipes for a user
router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.fetchAll(userId);
    res.json(favorites);
  } catch (e) {
    next(e);
  }
});

// Delete a favorite recipe
router.delete('/:userId/:recipeId', async (req, res, next) => {
  try {
    const { userId, recipeId } = req.params;
    const deleted = await Favorite.remove(userId, recipeId);
    res.json(deleted);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
