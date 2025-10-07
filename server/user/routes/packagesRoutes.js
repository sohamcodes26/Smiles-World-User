/**
 * Packages Routes
 */
const express = require('express');
const router = express.Router();
const packagesController = require('../controllers/packagesController');
const { validateObjectIdParam } = require('../middleware/validationMiddleware');

// GET /api/packages - Get all packages with optional filters
router.get('/', packagesController.getAllPackages);

// GET /api/packages/featured - Get featured packages
router.get('/featured', packagesController.getFeaturedPackages);

// GET /api/packages/women-only - Get women-only packages
router.get('/women-only', packagesController.getWomenOnlyPackages);

// GET /api/packages/group-departure - Get group departure packages
router.get('/group-departure', packagesController.getGroupDeparturePackages);

// GET /api/packages/domestic - Get domestic packages
router.get('/domestic', packagesController.getDomesticPackages);

// GET /api/packages/international - Get international packages
router.get('/international', packagesController.getInternationalPackages);

// GET /api/packages/:id - Get a single package by ID
router.get('/:id', validateObjectIdParam('id'), packagesController.getPackageById);

module.exports = router;