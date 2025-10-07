import axios from 'axios';

// Create an Axios instance. It can reuse the base URL configuration.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_USER || '/api',
});

/**
 * Submits the contact form message to the backend.
 * @param {Object} messageData - The data from the contact form.
 * @returns {Promise<Object>} A promise that resolves to the submission response data.
 */
export const submitMessage = async (messageData) => {
  try {
    // The endpoint is /messages based on your formsRoutes.js
    const response = await api.post('/messages', messageData);
    // The actual success message/data from the backend is in response.data
    return response.data;
  } catch (error) {
    // Log the error and re-throw it to be handled by the caller.
    console.error('Error submitting message:', error);
    throw new Error(error.response?.data?.message || 'Failed to send message');
  }
};




/**
 * Submits the custom package enquiry form data to the backend.
 * @param {Object} enquiryData - The data from the customize form.
 * @returns {Promise<Object>} A promise that resolves to the submission response data.
 */
export const submitCustomEnquiry = async (enquiryData) => {
  try {
    // The endpoint is /customize based on customizeRoutes.js
    const response = await api.post('/customize', enquiryData);
    // The actual success message/data from the backend is in response.data
    return response.data;
  } catch (error) {
    // Log the error and re-throw it to be handled by the caller.
    console.error('Error submitting custom enquiry:', error);
    throw new Error(error.response?.data?.message || 'Failed to submit enquiry');
  }
};





/**
 * Submits the package enquiry form data to the backend.
 * @param {Object} enquiryData - The data from the package inquiry modal.
 * @returns {Promise<Object>} A promise that resolves to the submission response data.
 */
export const submitPackageEnquiry = async (enquiryData) => {
  try {
    // The endpoint is /enquiries based on your formsController.js
    const response = await api.post('/enquiries', enquiryData);
    return response.data;
  } catch (error) {
    console.error('Error submitting package enquiry:', error);
    throw new Error(error.response?.data?.message || 'Failed to submit enquiry');
  }
};