/**
 * Request validation middleware
 */
const { errorResponse } = require('../utils/responseFormatter');
const { validateEnquiryData, validateMessageData, validateCustomEnquiryData, isValidObjectId } = require('../utils/validators');

/**
 * Validate enquiry submission
 */
const validateEnquiry = (req, res, next) => {
  const { isValid, errors } = validateEnquiryData(req.body);
  
  if (!isValid) {
    return errorResponse(res, 'Validation failed', 400, errors);
  }
  
  next();
};

/**
 * Validate message submission
 */
const validateMessage = (req, res, next) => {
  const { isValid, errors } = validateMessageData(req.body);
  
  if (!isValid) {
    return errorResponse(res, 'Validation failed', 400, errors);
  }
  
  next();
};

/**
 * Validate MongoDB ObjectId parameter
 */
const validateObjectIdParam = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    
    if (!isValidObjectId(id)) {
      return errorResponse(res, `Invalid ${paramName} format`, 400);
    }
    
    next();
  };
};

/**
 * Validate custom enquiry submission
 */
const validateCustomEnquiry = (req, res, next) => {
  const { isValid, errors } = validateCustomEnquiryData(req.body);
  
  if (!isValid) {
    return errorResponse(res, 'Validation failed', 400, errors);
  }
  
  next();
};

module.exports = {
  validateEnquiry,
  validateMessage,
  validateObjectIdParam,
  validateCustomEnquiry,
};
