const mongoose = require('mongoose');

const SistersSayCardSchema = new mongoose.Schema({
    cardId: mongoose.Schema.Types.ObjectId,
    
    // --- THIS IS THE CRITICAL CHANGE: Using ENUM ---
    iconUrl: { 
        type: String,
        required: [true, 'Icon selection is required.'],
        enum: [ 
            "ICON_STAR", 
            "ICON_BUTTERFLY", 
            "ICON_SHIELD", 
            "ICON_GLOBE", 
            "ICON_HEART",
            "ICON_HANDS",
            "ICON_PEOPLE",
            "ICON_SAFETY",
            "ICON_FLOWER",
            "ICON_COMPASS" 
            // Add your 10 final, unique identifiers here
        ]
    }, 
    // --- END CRITICAL CHANGE ---

    description: { type: String },
    name: { type: String },
    location: { type: String }
}, { _id: false });

const WomenTravelSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: 'women_travel_page', 
        immutable: true 
    },
    heroBanner: {
        imageUrl: { type: String }
    },
    whatOurSistersSay: {
        cards: [SistersSayCardSchema]
    }
}, { timestamps: true, collection: 'Pages' });

module.exports = mongoose.model('WomenTravelContent', WomenTravelSchema, 'Pages');