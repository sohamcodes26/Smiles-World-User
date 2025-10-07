/**
 * Customize Controller - Handle custom package enquiry submissions
 */
const asyncHandler = require('../middleware/asyncHandler');
const { successResponse } = require('../utils/responseFormatter');
const CustomEnquiry = require('../../models/customEnquiry.model');

/**
 * @route   POST /api/customize
 * @desc    Submit a custom package enquiry
 * @access  Public
 */
const submitCustomEnquiry = asyncHandler(async (req, res) => {
  const {
    fullName,
    emailAddress,
    phoneNumber,
    residence,
    destination,
    preferredDates,
    duration,
    travelers,
    stayPreferences,
    travelStyle,
    mealPreferences,
    budgetPerPerson,
    specialRequests
  } = req.body;

  // Create custom enquiry
  const customEnquiry = await CustomEnquiry.create({
    fullName,
    emailAddress,
    phoneNumber,
    residence,
    destination,
    preferredDates,
    duration,
    travelers: {
      adults: travelers.adults,
      children: travelers.children || ""
    },
    stayPreferences: {
      hotelCategory: stayPreferences.hotelCategory,
      roomType: stayPreferences.roomType,
      otherRoomType: stayPreferences.otherRoomType || ""
    },
    travelStyle: travelStyle || [],
    mealPreferences: {
      board: mealPreferences.board,
      diet: mealPreferences.diet || []
    },
    budgetPerPerson,
    specialRequests: specialRequests || ""
  });

  return successResponse(
    res,
    {
      enquiryId: customEnquiry._id,
      submittedAt: customEnquiry.createdAt,
      status: customEnquiry.status
    },
    'Your custom package enquiry has been submitted successfully. Our team will contact you soon!',
    201
  );
});

/**
 * @route   GET /api/customize/:id
 * @desc    Get a specific custom enquiry by ID (for admin use)
 * @access  Public (could be restricted to admin)
 */
const getCustomEnquiry = asyncHandler(async (req, res) => {
  const customEnquiry = await CustomEnquiry.findById(req.params.id);

  if (!customEnquiry) {
    return res.status(404).json({
      success: false,
      message: 'Custom enquiry not found'
    });
  }

  return successResponse(
    res,
    { enquiry: customEnquiry },
    'Custom enquiry retrieved successfully',
    200
  );
});

module.exports = {
  submitCustomEnquiry,
  getCustomEnquiry
};
