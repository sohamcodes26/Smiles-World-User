/**
 * Cancellation Policy Controller - Handles fetching the cancellation policy
 */
const asyncHandler = require('../middleware/asyncHandler');
const { successResponse } = require('../utils/responseFormatter');
const pagesService = require('../services/pagesService');

/**
 * @route   GET /api/cancellation-policy
 * @desc    Get the cancellation and refund policy
 * @access  Public
 */
const getCancellationPolicy = asyncHandler(async (req, res) => {
  const policy = await pagesService.getCancellationPolicy();

  return successResponse(
    res,
    { policy: policy }, // Send the policy text in a JSON object
    'Cancellation policy retrieved successfully',
    200
  );
});

module.exports = {
  getCancellationPolicy,
};