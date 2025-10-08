import mongoose from 'mongoose';

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

export default mongoose.model('BlogImageContent', BlogSchema, 'Pages');