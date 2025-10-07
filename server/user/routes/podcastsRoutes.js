/**
 * Podcasts Routes
 */
const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const { validateObjectIdParam } = require('../middleware/validationMiddleware');

// GET /api/podcasts - Get all podcasts
router.get('/', blogsController.getAllPodcasts);

// GET /api/podcasts/:podcastId - Get a single podcast by ID
router.get('/:podcastId', validateObjectIdParam('podcastId'), blogsController.getPodcastById);

module.exports = router;