/**
 * Packages Controller - Handle package-related requests
 */
const asyncHandler = require('../middleware/asyncHandler');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const packagesService = require('../services/packagesService');

/**
 * @route   GET /api/packages
 * @desc    Get all packages with optional filters
 * @access  Public
 */
const getAllPackages = asyncHandler(async (req, res) => {
  const filters = {
    tag: req.query.tag,
    is_featured: req.query.is_featured,
    is_women_only: req.query.is_women_only,
    is_group_departure: req.query.is_group_departure,
  };

  const packages = await packagesService.getAllPackages(filters);

  return successResponse(
    res,
    packages,
    `Retrieved ${packages.length} package(s) successfully`,
    200
  );
});

/**
 * @route   GET /api/packages/:id
 * @desc    Get a single package by ID
 * @access  Public
 */
const getPackageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const package = await packagesService.getPackageById(id);

  return successResponse(
    res,
    package,
    'Package retrieved successfully',
    200
  );
});

/**
 * @route   GET /api/packages/featured
 * @desc    Get featured packages
 * @access  Public
 */
const getFeaturedPackages = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 6;

  const packages = await packagesService.getFeaturedPackages(limit);

  return successResponse(
    res,
    packages,
    `Retrieved ${packages.length} featured package(s) successfully`,
    200
  );
});

/**
 * @route   GET /api/packages/women-only
 * @desc    Get women-only packages
 * @access  Public
 */
const getWomenOnlyPackages = asyncHandler(async (req, res) => {
  const tag = req.query.tag;

  const packages = await packagesService.getWomenOnlyPackages(tag);

  return successResponse(
    res,
    packages,
    `Retrieved ${packages.length} women-only package(s) successfully`,
    200
  );
});

/**
 * @route   GET /api/packages/group-departure
 * @desc    Get group departure packages
 * @access  Public
 */
const getGroupDeparturePackages = asyncHandler(async (req, res) => {
  const tag = req.query.tag;

  const packages = await packagesService.getGroupDeparturePackages(tag);

  return successResponse(
    res,
    packages,
    `Retrieved ${packages.length} group departure package(s) successfully`,
    200
  );
});


// --- NEW CONTROLLER: Get Domestic Packages ---
/**
 * @route   GET /api/packages/domestic
 * @desc    Get all domestic packages
 * @access  Public
 */
const getDomesticPackages = asyncHandler(async (req, res) => {
  const packages = await packagesService.getDomesticPackages();

  return successResponse(
    res,
    packages,
    `Retrieved ${packages.length} domestic package(s) successfully`,
    200
  );
});

// --- NEW CONTROLLER: Get International Packages ---
/**
 * @route   GET /api/packages/international
 * @desc    Get all international packages
 * @access  Public
 */
const getInternationalPackages = asyncHandler(async (req, res) => {
  const packages = await packagesService.getInternationalPackages();

  return successResponse(
    res,
    packages,
    `Retrieved ${packages.length} international package(s) successfully`,
    200
  );
});


module.exports = {
  getAllPackages,
  getPackageById,
  getFeaturedPackages,
  getWomenOnlyPackages,
  getGroupDeparturePackages,
  // --- EXPORT NEW CONTROLLERS ---
  getDomesticPackages,
  getInternationalPackages,
};