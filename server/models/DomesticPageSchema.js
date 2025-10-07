const mongoose = require('mongoose');

const DomesticPageSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: 'domestic_page', 
        immutable: true 
    },
    heroBanner: {
        imageUrl: { type: String, required: false, default: '' }
    }
}, { timestamps: true, collection: 'Pages' }); 

module.exports = mongoose.model('DomesticContent', DomesticPageSchema, 'Pages');