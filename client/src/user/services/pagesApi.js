import axios from 'axios';

// Create an Axios instance.
// It reads the base URL from a .env file. The variable must be named REACT_APP_API_BASE_URL.
// If the variable is not found, it defaults to '/api' for development.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_USER ,
});

/**
 * Fetches the content for the About page from the backend.
 * @returns {Promise<Object>} A promise that resolves to the about page data.
 */
export const getAboutPageContent = async () => {
  try {
    // The endpoint is /pages/about based on your backend routes.
    const response = await api.get('/pages/about');
    // Axios wraps the response data in a `data` property.
    // The actual content from your backend is in `response.data.data`.
    return response.data.data;
  } catch (error) {
    // Log the error and re-throw it to be handled by React Query.
    console.error('Error fetching About page content:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch data');
  }
};


/**
 * Fetches the content for the Contact page from the backend.
 * @returns {Promise<Object>} A promise that resolves to the contact page data.
 */
export const getContactPageContent = async () => {
  try {
    // The endpoint is /pages/contact based on your backend routes.
    const response = await api.get('/pages/contact');
    // The actual content from your backend is in response.data.data.
    return response.data.data;
  } catch (error) {
    // Log the error and re-throw it to be handled by React Query.
    console.error('Error fetching Contact page content:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch data');
  }
};



/**
 * Fetches the cancellation policy from the backend.
 * @returns {Promise<Object>} A promise that resolves to the cancellation policy data.
 */
export const getCancellationPolicy = async () => {
  try {
    // The endpoint is /cancellation-policy based on your backend routes.
    const response = await api.get('/cancellation-policy');
    // The policy content is in response.data.data.policy
    return response.data.data;
  } catch (error) {
    // Log the error and re-throw it to be handled by React Query.
    console.error('Error fetching cancellation policy:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch policy');
  }
};



/**
 * Fetches all blog posts from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of blog posts.
 */
export const getAllBlogs = async () => {
  try {
    const response = await api.get('/blogs');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch blogs');
  }
};

/**
 * Fetches a single blog post by its ID from the backend.
 * @param {string} blogId - The ID of the blog post to fetch.
 * @returns {Promise<Object>} A promise that resolves to the blog post object.
 */
export const getBlogById = async (blogId) => {
  try {
    const response = await api.get(`/blogs/${blogId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching blog post with ID ${blogId}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to fetch blog post');
  }
};

/**
 * Fetches all podcasts from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of podcasts.
 */
export const getAllPodcasts = async () => {
  try {
    // Endpoint is /podcasts based on your backend controller
    const response = await api.get('/podcasts');
    return response.data.data;
  } catch (error)
 {
    console.error('Error fetching podcasts:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch podcasts');
  }
};

/**
 * Fetches a single podcast by its ID from the backend.
 * @param {string} podcastId - The ID of the podcast to fetch.
 * @returns {Promise<Object>} A promise that resolves to the podcast object.
 */
export const getPodcastById = async (podcastId) => {
  try {
    const response = await api.get(`/podcasts/${podcastId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching podcast with ID ${podcastId}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to fetch podcast');
  }
};