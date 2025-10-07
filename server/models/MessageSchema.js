const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        fullName: { // Using 'fullName' as per your DB_Structure document
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        emailAddress: { // Using 'emailAddress' as per your DB_Structure document
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        phoneNumber: { // Using 'phoneNumber' as per your DB_Structure document
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            match: [
                /^[\d\s\-\+\(\)]+$/,
                'Please provide a valid phone number',
            ],
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            trim: true,
            maxlength: [200, 'Subject cannot exceed 200 characters'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            maxlength: [2000, 'Message cannot exceed 2000 characters'],
        },
        // Using sales-focused status as required by Admin Panel
        status: { 
            type: String,
            enum: ['New', 'In Progress', 'Resolved', 'Archived'],
            default: 'New',
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster admin queries
MessageSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Message', MessageSchema);