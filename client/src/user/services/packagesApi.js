import axios from 'axios';

// Create an Axios instance.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_USER || '/api',
});

/**
 * Fetches featured travel packages from the backend.
 * The backend endpoint for this is GET /api/packages/featured.
 * @returns {Promise<Array>} A promise that resolves to an array of featured packages.
 */
export const getFeaturedPackages = async () => {
  try {
    const response = await api.get('/packages/featured');
    // The actual package data is in response.data.data
    return response.data.data;
  } catch (error) {
    console.error('Error fetching featured packages:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch packages');
  }
};

/**
 * Fetches a single travel package by its ID from the backend.
 * The backend endpoint for this is GET /api/packages/:id.
 * @param {string} packageId - The ID of the package to fetch.
 * @returns {Promise<Object>} A promise that resolves to the package object.
 */
export const getPackageById = async (packageId) => {
  try {
    const response = await api.get(`/packages/${packageId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching package with ID ${packageId}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to fetch package');
  }
};


// --- NEW FUNCTION ADDED ---
/**
 * Fetches all domestic travel packages from the backend.
 * The backend endpoint is GET /api/packages/domestic.
 * @returns {Promise<Array>} A promise that resolves to an array of domestic packages.
 */
export const getDomesticPackages = async () => {
  try {
    const response = await api.get('/packages/domestic');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching domestic packages:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch domestic packages');
  }
};



// --- NEW FUNCTION ADDED ---
/**
 * Fetches all international travel packages from the backend.
 * The backend endpoint is GET /api/packages/international.
 * @returns {Promise<Array>} A promise that resolves to an array of international packages.
 */
export const getInternationalPackages = async () => {
  try {
    const response = await api.get('/packages/international');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching international packages:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch international packages');
  }
};



// --- NEW FUNCTION ADDED ---
/**
 * Fetches women-only travel packages from the backend.
 * The backend endpoint is GET /api/packages/women-only.
 * @param {{ tag?: string }} params - Optional parameters, e.g., { tag: 'domestic' }.
 * @returns {Promise<Array>} A promise that resolves to an array of women-only packages.
 */
export const getWomenOnlyPackages = async (params = {}) => {
  try {
    const response = await api.get('/packages/women-only', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching women-only packages:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch women-only packages');
  }
};




// --- NEW FUNCTION ADDED ---
/**
 * Fetches group departure packages from the backend.
 * The backend endpoint is GET /api/packages/group-departure.
 * @param {{ tag?: string }} params - Optional parameters, e.g., { tag: 'domestic' }.
 * @returns {Promise<Array>} A promise that resolves to an array of group departure packages.
 */
export const getGroupDeparturePackages = async (params = {}) => {
  try {
    const response = await api.get('/packages/group-departure', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching group departure packages:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch group departure packages');
  }
};