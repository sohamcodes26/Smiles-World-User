const mongoose = require('mongoose');

// Define the schema for a single day of the itinerary
const ItineraryDaySchema = new mongoose.Schema({
    dayTitle: { 
        type: String, 
        required: [true, 'Day title (e.g., Day 1: Arrival) is required'],
        trim: true
    },
    description: { 
        type: String, 
        required: [true, 'Day description is required'], 
        trim: true,
        maxlength: [5000, 'Description cannot exceed 5000 characters']
    }
}, { _id: false }); 

const PackageSchema = new mongoose.Schema({
    // --- CORE PACKAGE IDENTIFIERS ---
    name: { 
        type: String, 
        required: [true, 'Package name is required'], 
        trim: true,
        maxlength: [250, 'Name cannot exceed 250 characters']
    },
    shortDescription: { // The introductory paragraph (e.g., 'Luxury Meets Culture...')
        type: String, 
        required: [true, 'Short description is required'], 
        trim: true,
        maxlength: [1000, 'Short description cannot exceed 1000 characters']
    },
    cardImage: { // URL from Cloudinary
        type: String,
        required: [true, 'Card image URL is required']
    },

    // --- PRICING & DURATION ---
    duration: { 
        type: String, // Stored as a string (e.g., "06N/07D")
        required: [true, 'Duration is required']
    },
    startingFromPrice: { 
        type: String, // Stored as a string (e.g., "Rs.71000/-pp+ Airfare")
        required: [true, 'Starting price is required']
    },
    
    // --- CATEGORIZATION & TAGGING ---
    tag: { // Domestic/International
        type: String, 
        enum: ['domestic', 'international'],
        required: [true, 'Tag (domestic/international) is required']
    },
    is_featured: { type: Boolean, default: false },
    is_women_only: { type: Boolean, default: false },
    is_group_departure: { type: Boolean, default: false },

    // --- ITINERARY DETAILS (Generalized for Flexibility) ---
    placesCovered: { // Text summary of places and nights
        type: String,
        trim: true
    },
    bestTime: { // Peak and Mid-season details
        peakSeason: { type: String, trim: true },
        midSeason: { type: String, trim: true },
        notes: { type: String, trim: true } // For seasonal notes/discounts
    },
    highlights: [{ // Array of highlight sections, each with title and bullets
        title: {type: String, trim: true, required: true},
        bullets: {type: [String], required: true}
    }],
    itinerary: { // The day-by-day plan
        type: [ItineraryDaySchema], 
        required: [true, 'Day-wise itinerary is required'] 
    }
}, { timestamps: true });

PackageSchema.index({ is_featured: 1, is_women_only: 1, tag: 1 });

module.exports = mongoose.model('Package', PackageSchema);