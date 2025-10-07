/**
 * Blogs Routes
 */
const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const { validateObjectIdParam } = require('../middleware/validationMiddleware');

// GET /api/blogs - Get all blog posts
router.get('/', blogsController.getAllBlogs);

// GET /api/blogs/:blogId - Get a single blog post by ID
router.get('/:blogId', validateObjectIdParam('blogId'), blogsController.getBlogById);

module.exports = router;