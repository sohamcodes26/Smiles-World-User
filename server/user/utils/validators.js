/**
 * Validation helper functions
 */

/**
 * Validate email format
 * @param {String} email - Email to validate
 * @returns {Boolean} - True if valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * @param {String} phone - Phone number to validate
 * @returns {Boolean} - True if valid
 */
const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone);
};

/**
 * Validate MongoDB ObjectId
 * @param {String} id - ID to validate
 * @returns {Boolean} - True if valid
 */
const isValidObjectId = (id) => {
  return /^[a-f\d]{24}$/i.test(id);
};

/**
 * Sanitize input string
 * @param {String} str - String to sanitize
 * @returns {String} - Sanitized string
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Validate enquiry data
 * @param {Object} data - Enquiry data to validate
 * @returns {Object} - { isValid: Boolean, errors: Array }
 */
const validateEnquiryData = (data) => {
  const errors = [];

  if (!data.fullName || data.fullName.trim().length === 0) {
    errors.push('Full name is required');
  }

  if (!data.emailAddress || !isValidEmail(data.emailAddress)) {
    errors.push('Valid email address is required');
  }

  if (!data.phoneNumber || !isValidPhone(data.phoneNumber)) {
    errors.push('Valid phone number is required');
  }

  if (!data.type || data.type.trim().length === 0) {
    errors.push('Enquiry type is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate message data
 * @param {Object} data - Message data to validate
 * @returns {Object} - { isValid: Boolean, errors: Array }
 */
const validateMessageData = (data) => {
  const errors = [];

  if (!data.fullName || data.fullName.trim().length === 0) {
    errors.push('Full name is required');
  }

  if (!data.emailAddress || !isValidEmail(data.emailAddress)) {
    errors.push('Valid email address is required');
  }

  if (!data.phoneNumber || !isValidPhone(data.phoneNumber)) {
    errors.push('Valid phone number is required');
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.push('Subject is required');
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate custom enquiry data
 * @param {Object} data - Custom enquiry data to validate
 * @returns {Object} - { isValid: Boolean, errors: Array }
 */
const validateCustomEnquiryData = (data) => {
  const errors = [];

  // Personal details
  if (!data.fullName || data.fullName.trim().length === 0) {
    errors.push('Full name is required');
  }

  if (!data.emailAddress || !isValidEmail(data.emailAddress)) {
    errors.push('Valid email address is required');
  }

  if (!data.phoneNumber || !isValidPhone(data.phoneNumber)) {
    errors.push('Valid phone number is required');
  }

  // Travel information
  if (!data.destination || data.destination.trim().length === 0) {
    errors.push('Destination is required');
  }

  if (!data.travelers || !data.travelers.adults || data.travelers.adults < 1) {
    errors.push('At least one adult traveler is required');
  }

  // Stay preferences
  if (!data.stayPreferences) {
    errors.push('Stay preferences are required');
  } else {
    if (!data.stayPreferences.hotelCategory) {
      errors.push('Hotel category is required');
    } else {
      const validCategories = ['3 Star', '4 Star', '5 Star', 'Luxury / Boutique'];
      if (!validCategories.includes(data.stayPreferences.hotelCategory)) {
        errors.push('Invalid hotel category');
      }
    }

    if (!data.stayPreferences.roomType) {
      errors.push('Room type is required');
    } else {
      const validRoomTypes = ['Single', 'Double', 'Family Suite', 'Other'];
      if (!validRoomTypes.includes(data.stayPreferences.roomType)) {
        errors.push('Invalid room type');
      }
    }
  }

  // Meal preferences
  if (!data.mealPreferences) {
    errors.push('Meal preferences are required');
  } else {
    if (!data.mealPreferences.board) {
      errors.push('Meal board preference is required');
    } else {
      const validBoards = ['Breakfast Only', 'Half Board (Breakfast + Dinner)', 'Full Board (All Meals)'];
      if (!validBoards.includes(data.mealPreferences.board)) {
        errors.push('Invalid meal board preference');
      }
    }

    if (data.mealPreferences.diet && Array.isArray(data.mealPreferences.diet)) {
      const validDiets = ['Vegetarian', 'Jain Food', 'Non-Vegetarian'];
      const invalidDiets = data.mealPreferences.diet.filter(diet => !validDiets.includes(diet));
      if (invalidDiets.length > 0) {
        errors.push('Invalid dietary preference(s)');
      }
    }
  }

  // Budget
  if (!data.budgetPerPerson) {
    errors.push('Budget per person is required');
  } else {
    const validBudgets = [
      'Economy (₹30,000 – ₹50,000)',
      'Premium (₹50,000 – ₹80,000)',
      'Luxury (₹80,000 – ₹1.5 Lakh)',
      'Ultra Luxury (₹1.5 Lakh & above)'
    ];
    if (!validBudgets.includes(data.budgetPerPerson)) {
      errors.push('Invalid budget range');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidObjectId,
  sanitizeString,
  validateEnquiryData,
  validateMessageData,
  validateCustomEnquiryData,
};
