/**
 * Pages Routes
 */
const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

// GET /api/pages/home - Get home page content
router.get('/home', pagesController.getHomePageContent);

// GET /api/pages/about - Get about page content
router.get('/about', pagesController.getAboutPageContent);

// GET /api/pages/women-travel - Get women travel page content
router.get('/women-travel', pagesController.getWomenTravelPageContent);

// GET /api/pages/group-departures - Get group departures page content
router.get('/group-departures', pagesController.getGroupDeparturesPageContent);

// GET /api/pages/contact - Get contact page content
router.get('/contact', pagesController.getContactPageContent);

// GET /api/pages/domestic - Get domestic page content
router.get('/domestic', pagesController.getDomesticPageContent);

// GET /api/pages/international - Get international page content
router.get('/international', pagesController.getInternationalPageContent);

// --- ADDED: New route for blog page banner content ---
// GET /api/pages/blog - Get blog page content
router.get('/blog', pagesController.getBlogPageContent);

module.exports = router;