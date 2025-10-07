import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_USER || '/api',
});

/**
 * Fetches the content for the home page from the backend.
 * The backend endpoint is GET /api/pages/home.
 * @returns {Promise<Object>} A promise that resolves to the home page content object.
 */
export const getHomePageContent = async () => {
  try {
    const response = await api.get('/pages/home');
    // The actual content is in response.data.data
    return response.data.data;
  } catch (error) {
    console.error('Error fetching home page content:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch home page content');
  }
};