/**
 * Customize Routes - Custom Package Enquiry
 */
const express = require('express');
const router = express.Router();
const customizeController = require('../controllers/customizeController');
const { validateCustomEnquiry } = require('../middleware/validationMiddleware');

// POST /api/customize - Submit a custom package enquiry
router.post('/', validateCustomEnquiry, customizeController.submitCustomEnquiry);

// GET /api/customize/:id - Get a specific custom enquiry by ID
router.get('/:id', customizeController.getCustomEnquiry);

module.exports = router;
