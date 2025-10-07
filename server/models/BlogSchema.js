const mongoose = require('mongoose');

const BlogItemSchema = new mongoose.Schema({
    blogId: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    shortDescription: { type: String },
    tag: { type: String },
    author: { type: String },
    readMin: { type: Number },
    publishDate: { type: Date },
    content: { type: String },
    thumbnailUrl: { type: String }
}, { _id: false });

const PodcastItemSchema = new mongoose.Schema({
    podcastId: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    description: { type: String },
    filePath: { type: String }, // Stores video URL from Cloudinary
    publishDate: { type: Date },
    thumbnailUrl: { type: String }
}, { _id: false });

const BlogPageSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: 'blogs_page', 
        immutable: true 
    },
    blogs: [BlogItemSchema],
    podcasts: [PodcastItemSchema]
}, { timestamps: true, collection: 'Pages' });

module.exports = mongoose.model('BlogPageContent', BlogPageSchema, 'Pages');