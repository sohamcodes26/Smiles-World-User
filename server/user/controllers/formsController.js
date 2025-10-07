/**
 * Forms Controller - Handle form submissions (messages and enquiries)
 */
const asyncHandler = require('../middleware/asyncHandler');
const { successResponse } = require('../utils/responseFormatter');
const formsService = require('../services/formsService');

/**
 * @route   POST /api/messages
 * @desc    Submit a contact form message
 * @access  Public
 */
const submitMessage = asyncHandler(async (req, res) => {
  const messageData = {
    fullName: req.body.fullName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    subject: req.body.subject,
    message: req.body.message,
  };

  const message = await formsService.createMessage(messageData);

  return successResponse(
    res,
    {
      messageId: message._id,
      submittedAt: message.createdAt,
    },
    'Your message has been submitted successfully. We will get back to you soon!',
    201
  );
});

/**
 * @route   POST /api/enquiries
 * @desc    Submit a package enquiry
 * @access  Public
 */
const submitEnquiry = asyncHandler(async (req, res) => {
  const enquiryData = {
    type: req.body.type,
    fullName: req.body.fullName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    packageId: req.body.packageId,
    numberOfTravelers: req.body.numberOfTravelers,
    subject: req.body.subject,
    message: req.body.message,
  };

  const enquiry = await formsService.createEnquiry(enquiryData);

  return successResponse(
    res,
    {
      enquiryId: enquiry._id,
      submittedAt: enquiry.createdAt,
    },
    'Your enquiry has been submitted successfully. Our team will contact you shortly!',
    201
  );
});

module.exports = {
  submitMessage,
  submitEnquiry,
};
