/**
 * Pages Controller - Handle page content requests
 */
const asyncHandler = require('../middleware/asyncHandler');
const { successResponse } = require('../utils/responseFormatter');
const pagesService = require('../services/pagesService');

/**
 * @route   GET /api/pages/home
 * @desc    Get home page content
 * @access  Public
 */
const getHomePageContent = asyncHandler(async (req, res) => {
  const content = await pagesService.getHomePageContent();

  return successResponse(
    res,
    content,
    'Home page content retrieved successfully',
    200
  );
});

/**
 * @route   GET /api/pages/about
 * @desc    Get about page content
 * @access  Public
 */
const getAboutPageContent = asyncHandler(async (req, res) => {
  const content = await pagesService.getAboutPageContent();

  return successResponse(
    res,
    content,
    'About page content retrieved successfully',
    200
  );
});

/**
 * @route   GET /api/pages/women-travel
 * @desc    Get women travel page content
 * @access  Public
 */
const getWomenTravelPageContent = asyncHandler(async (req, res) => {
  const content = await pagesService.getWomenTravelPageContent();

  return successResponse(
    res,
    content,
    'Women travel page content retrieved successfully',
    200
  );
});

/**
 * @route   GET /api/pages/group-departures
 * @desc    Get group departures page content
 * @access  Public
 */
const getGroupDeparturesPageContent = asyncHandler(async (req, res) => {
  const content = await pagesService.getGroupDeparturesPageContent();

  return successResponse(
    res,
    content,
    'Group departures page content retrieved successfully',
    200
  );
});

/**
 * @route   GET /api/pages/contact
 * @desc    Get contact page content
 * @access  Public
 */
const getContactPageContent = asyncHandler(async (req, res) => {
  const content = await pagesService.getContactPageContent();

  return successResponse(
    res,
    content,
    'Contact page content retrieved successfully',
    200
  );
});

/**
 * @route   GET /api/pages/domestic
 * @desc    Get domestic page content
 * @access  Public
 */
const getDomesticPageContent = asyncHandler(async (req, res) => {
  const content = await pagesService.getDomesticPageContent();

  return successResponse(
    res,
    content,
    'Domestic page content retrieved successfully',
    200
  );
});

/**
 * @route   GET /api/pages/international
 * @desc    Get international page content
 * @access  Public
 */
const getInternationalPageContent = asyncHandler(async (req, res) => {
  const content = await pagesService.getInternationalPageContent();

  return successResponse(
    res,
    content,
    'International page content retrieved successfully',
    200
  );
});


// --- ADDED: New controller for blog page banner content ---
/**
 * @route   GET /api/pages/blog
 * @desc    Get blog page content
 * @access  Public
 */
const getBlogPageContent = asyncHandler(async (req, res) => {
  const content = await pagesService.getBlogPageContent();

  return successResponse(
    res,
    content,
    'Blog page content retrieved successfully',
    200
  );
});

module.exports = {
  getHomePageContent,
  getAboutPageContent,
  getWomenTravelPageContent,
  getGroupDeparturesPageContent,
  getContactPageContent,
  getDomesticPageContent,
  getInternationalPageContent,
  getBlogPageContent,
};