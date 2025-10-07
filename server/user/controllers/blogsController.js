/**
 * Blogs Controller - Handle blogs and podcasts requests
 */
const asyncHandler = require('../middleware/asyncHandler');
const { successResponse } = require('../utils/responseFormatter');
const blogsService = require('../services/blogsService');

/**
 * @route   GET /api/blogs
 * @desc    Get all blog posts
 * @access  Public
 */
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await blogsService.getAllBlogs();

  return successResponse(
    res,
    blogs,
    `Retrieved ${blogs.length} blog post(s) successfully`,
    200
  );
});

/**
 * @route   GET /api/blogs/:blogId
 * @desc    Get a single blog post by ID
 * @access  Public
 */
const getBlogById = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  const blog = await blogsService.getBlogById(blogId);

  return successResponse(
    res,
    blog,
    'Blog post retrieved successfully',
    200
  );
});

/**
 * @route   GET /api/podcasts
 * @desc    Get all podcasts
 * @access  Public
 */
const getAllPodcasts = asyncHandler(async (req, res) => {
  const podcasts = await blogsService.getAllPodcasts();

  return successResponse(
    res,
    podcasts,
    `Retrieved ${podcasts.length} podcast(s) successfully`,
    200
  );
});

/**
 * @route   GET /api/podcasts/:podcastId
 * @desc    Get a single podcast by ID
 * @access  Public
 */
const getPodcastById = asyncHandler(async (req, res) => {
  const { podcastId } = req.params;

  const podcast = await blogsService.getPodcastById(podcastId);

  return successResponse(
    res,
    podcast,
    'Podcast retrieved successfully',
    200
  );
});

module.exports = {
  getAllBlogs,
  getBlogById,
  getAllPodcasts,
  getPodcastById,
};