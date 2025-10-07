const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const EnquirySchema = new mongoose.Schema(
    {
        // Contact Information
        fullName: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        emailAddress: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            match: [
                /^[\d\s\-\+\(\)]+$/,
                'Please provide a valid phone number',
            ],
        },

        // Custom Package Fields (from DB_Structure and Customize Page)
        type: { // Source of the enquiry (e.g., 'Custom Package', 'Women Travel Form')
            type: String, 
            required: true, 
            trim: true 
        },
        packageId: { 
            type: ObjectId, 
            ref: 'Package', 
            required: false 
        }, 
        numberOfTravelers: { 
            type: Number 
        },
        // We will include the fields seen on the form (Destination, Dates, Budget, etc.)
        preferredDestination: { type: String },
        preferredStartDate: { type: Date },
        preferredEndDate: { type: Date },
        budgetRange: { type: String },
        travelStyle: { type: String },
        accommodationPreference: { type: String },
        interests: { type: String },
        specialRequests: { type: String },

        // Workflow Management
        submittedAt: { 
            type: Date, 
            default: Date.now 
        },
        status: { // Status required by Admin Panel (Sales-focused)
            type: String, 
            enum: ['New Lead', 'Contacted', 'Quote Sent', 'Booked', 'Lost/Archived'], 
            default: 'New Lead' 
        },
        internalNotes: { // Required by Admin Panel for sales staff
            type: String, 
            default: "" 
        } 
    },
    {
        timestamps: true,
    }
);

EnquirySchema.index({ status: 1, submittedAt: -1 });

module.exports = mongoose.model('Enquiry', EnquirySchema);