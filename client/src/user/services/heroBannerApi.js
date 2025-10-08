import axios from 'axios';

// This Axios instance is configured to make requests to your backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_USER || '/api',
});

/**
 * A generic function to fetch the content for a specific page.
 * It calls endpoints like /api/pages/home, /api/pages/blog, etc.
 * @param {string} pageName - The name of the page to fetch (e.g., 'home', 'domestic', 'blog').
 * @returns {Promise<Object>} A promise that resolves to the page's content object.
 */
export const getPageContent = async (pageName) => {
  try {
    const response = await api.get(`/pages/${pageName}`);
    // We return the 'data' object which contains the heroBanner and other content
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching content for page "${pageName}":`, error);
    throw new Error(error.response?.data?.message || `Failed to fetch ${pageName} page content`);
  }
};
