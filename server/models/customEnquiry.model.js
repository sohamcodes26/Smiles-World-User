const mongoose = require('mongoose');

// Sub-schemas for structure and validation
const StayPreferencesSchema = new mongoose.Schema({
    hotelCategory: { type: String, enum: ['3 Star', '4 Star', '5 Star', 'Luxury / Boutique'], required: [true, 'Hotel Category is required'] },
    roomType: { type: String, enum: ['Single', 'Double', 'Family Suite', 'Other'], required: [true, 'Room Type is required'] },
    otherRoomType: { type: String, trim: true },
}, { _id: false });

const MealPreferencesSchema = new mongoose.Schema({
    board: { type: String, enum: ['Breakfast Only', 'Half Board (Breakfast + Dinner)', 'Full Board (All Meals)'], required: [true, 'Meal Board is required'] },
    diet: { type: [String], enum: ['Vegetarian', 'Jain Food', 'Non-Vegetarian'] },
}, { _id: false });

// Main Custom Enquiry Schema (Public Submission)
const CustomEnquirySchema = new mongoose.Schema(
    {
        // --- 1. Workflow & Origin ---
        type: { type: String, default: 'Custom Package Lead' },
        status: { type: String, enum: ['New Lead', 'Contacted', 'Quote Sent', 'Booked', 'Lost/Archived'], default: 'New Lead' },
        internalNotes: { type: String, default: "" }, // For admin use
        
        // --- 2. Personal Details ---
        fullName: { type: String, required: [true, 'Full Name is required'], trim: true, maxlength: 100 },
        emailAddress: { 
            type: String, 
            required: [true, 'Email is required'], 
            trim: true, 
            lowercase: true, 
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'] 
        },
        phoneNumber: { type: String, required: [true, 'Contact Number is required'], trim: true },
        residence: { type: String, trim: true },

        // --- 3. Travel Information ---
        destination: { type: String, required: [true, 'Destination is required'], trim: true },
        preferredDates: { type: String, trim: true },
        duration: { type: String, trim: true },
        travelers: {
            adults: { type: Number, required: true, min: 1 },
            children: { type: String, default: "" }, // Captures 'Children (with age)' string
        },

        // --- 4. Preferences & Budget ---
        stayPreferences: { type: StayPreferencesSchema, required: true },
        travelStyle: { type: [String] }, // Array for multiple selection
        mealPreferences: { type: MealPreferencesSchema, required: true },
        budgetPerPerson: { 
            type: String, 
            enum: ['Economy (₹30,000 – ₹50,000)', 'Premium (₹50,000 – ₹80,000)', 'Luxury (₹80,000 – ₹1.5 Lakh)', 'Ultra Luxury (₹1.5 Lakh & above)'], 
            required: [true, 'Budget preference is required'] 
        },
        
        // --- 5. Special Notes ---
        specialRequests: { type: String, trim: true, maxlength: 2000 },
    },
    {
        timestamps: true,
    }
);

CustomEnquirySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('CustomEnquiry', CustomEnquirySchema);
