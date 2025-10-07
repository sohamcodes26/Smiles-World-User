/**
 * Forms Routes
 */
const express = require('express');
const router = express.Router();
const formsController = require('../controllers/formsController');
const { validateMessage, validateEnquiry } = require('../middleware/validationMiddleware');

// POST /api/messages - Submit a contact form message
router.post('/messages', validateMessage, formsController.submitMessage);

// POST /api/enquiries - Submit a package enquiry
router.post('/enquiries', validateEnquiry, formsController.submitEnquiry);

module.exports = router;
