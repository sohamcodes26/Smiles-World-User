/**
 * Packages Service - Business logic for package operations
 */
const Package = require('../../models/PackageSchema');

/**
 * Get all packages with optional filtering
 * @param {Object} filters - Query filters
 * @returns {Promise<Array>} - Array of packages
 */
const getAllPackages = async (filters = {}) => {
  const query = {};

  // Apply filters
  if (filters.tag) {
    query.tag = filters.tag;
  }

  if (filters.is_featured !== undefined) {
    query.is_featured = filters.is_featured === 'true' || filters.is_featured === true;
  }

  if (filters.is_women_only !== undefined) {
    query.is_women_only = filters.is_women_only === 'true' || filters.is_women_only === true;
  }

  if (filters.is_group_departure !== undefined) {
    query.is_group_departure = filters.is_group_departure === 'true' || filters.is_group_departure === true;
  }

  const packages = await Package.find(query)
    .select('-__v')
    .sort({ createdAt: -1 })
    .lean();

  return packages;
};

/**
 * Get a single package by ID
 * @param {String} packageId - Package ID
 * @returns {Promise<Object>} - Package object
 */
const getPackageById = async (packageId) => {
  const package = await Package.findById(packageId)
    .select('-__v')
    .lean();

  if (!package) {
    const error = new Error('Package not found');
    error.statusCode = 404;
    error.isOperational = true;
    throw error;
  }

  return package;
};

/**
 * Get featured packages
 * @param {Number} limit - Maximum number of packages to return
 * @returns {Promise<Array>} - Array of featured packages
 */
const getFeaturedPackages = async (limit = 6) => {
  const packages = await Package.find({ is_featured: true })
    .select('-__v')
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  return packages;
};

/**
 * Get women-only packages
 * @param {String} tag - Optional tag filter (domestic/international)
 * @returns {Promise<Array>} - Array of women-only packages
 */
const getWomenOnlyPackages = async (tag = null) => {
  const query = { is_women_only: true };
  
  if (tag) {
    query.tag = tag;
  }

  const packages = await Package.find(query)
    .select('-__v')
    .sort({ createdAt: -1 })
    .lean();

  return packages;
};

/**
 * Get group departure packages
 * @param {String} tag - Optional tag filter (domestic/international)
 * @returns {Promise<Array>} - Array of group departure packages
 */
const getGroupDeparturePackages = async (tag = null) => {
  const query = { is_group_departure: true };
  
  if (tag) {
    query.tag = tag;
  }

  const packages = await Package.find(query)
    .select('-__v')
    .sort({ createdAt: -1 })
    .lean();

  return packages;
};

module.exports = {
  getAllPackages,
  getPackageById,
  getFeaturedPackages,
  getWomenOnlyPackages,
  getGroupDeparturePackages,
};