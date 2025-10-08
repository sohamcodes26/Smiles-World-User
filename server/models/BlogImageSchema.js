const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: 'blog_image_updater', 
        immutable: true 
    },
    heroBanner: {
        imageUrl: { type: String, required: false, default: '' }
    }
}, { timestamps: true, collection: 'Pages' }); 

module.exports = mongoose.model('BlogImageContent', BlogSchema, 'Pages');