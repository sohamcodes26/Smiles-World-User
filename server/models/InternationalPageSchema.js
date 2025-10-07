const mongoose = require('mongoose');

const InternationalPageSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: 'international_page', 
        immutable: true 
    },
    heroBanner: {
        imageUrl: { type: String, required: false, default: '' }
    }
}, { timestamps: true, collection: 'Pages' }); 

module.exports = mongoose.model('InternationalContent', InternationalPageSchema, 'Pages');