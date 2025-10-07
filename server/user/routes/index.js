/**
 * User API Routes - Main Router
 * This file aggregates all user-facing routes
 */
const express = require('express');
const router = express.Router();

// Import route modules
const packagesRoutes = require('./packagesRoutes');
const pagesRoutes = require('./pagesRoutes');
const blogsRoutes = require('./blogsRoutes');
const podcastsRoutes = require('./podcastsRoutes');
const formsRoutes = require('./formsRoutes');
const customizeRoutes = require('./customizeRoutes');
const cancellationRoutes = require('./cancellationRoutes'); // <-- IMPORT THE NEW ROUTE

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User API is healthy',
    timestamp: new Date().toISOString(),
  });
});

// Mount route modules
router.use('/packages', packagesRoutes);
router.use('/pages', pagesRoutes);
router.use('/blogs', blogsRoutes);
router.use('/podcasts', podcastsRoutes);
router.use('/', formsRoutes); // messages and enquiries are at /api/user/messages and /api/user/enquiries
router.use('/customize', customizeRoutes);
router.use('/cancellation-policy', cancellationRoutes); // <-- USE THE NEW ROUTE

module.exports = router;