const mongoose = require('mongoose');

const GroupDepartureSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: 'group_departures_page', 
        immutable: true 
    },
    heroBanner: {
        imageUrl: { type: String }
    }
}, { timestamps: true, collection: 'Pages' });

module.exports = mongoose.model('GroupDepartureContent', GroupDepartureSchema, 'Pages');