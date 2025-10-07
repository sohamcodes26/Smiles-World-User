/**
 * Cancellation Policy Routes
 */
const express = require('express');
const router = express.Router();
const cancellationController = require('../controllers/cancellationController');

// GET /api/user/cancellation-policy - Get the cancellation policy
router.get('/', cancellationController.getCancellationPolicy);

module.exports = router;