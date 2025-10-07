/**
 * Forms Service - Business logic for message and enquiry submissions
 */
const Message = require('../../models/MessageSchema');
const Enquiry = require('../../models/EnquirySchema');

/**
 * Create a new message from contact form
 * @param {Object} messageData - Message data
 * @returns {Promise<Object>} - Created message object
 */
const createMessage = async (messageData) => {
  const message = new Message({
    fullName: messageData.fullName,
    emailAddress: messageData.emailAddress,
    phoneNumber: messageData.phoneNumber,
    subject: messageData.subject,
    message: messageData.message,
    status: 'New',
  });

  await message.save();

  return message;
};

/**
 * Create a new enquiry
 * @param {Object} enquiryData - Enquiry data
 * @returns {Promise<Object>} - Created enquiry object
 */
// In formsService.js
const createEnquiry = async (enquiryData) => {
  const enquiry = new Enquiry({
    type: enquiryData.type,
    fullName: enquiryData.fullName,
    emailAddress: enquiryData.emailAddress,
    phoneNumber: enquiryData.phoneNumber,
    packageId: enquiryData.packageId || null,
    numberOfTravelers: enquiryData.numberOfTravelers || null,
    specialRequests: enquiryData.message || '', // <-- MAP message to specialRequests
    status: 'New Lead',
    // Remove subject and message as they are not in the EnquirySchema
  });

  await enquiry.save();

  return enquiry;
};

module.exports = {
  createMessage,
  createEnquiry,
};
