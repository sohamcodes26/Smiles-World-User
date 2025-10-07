const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
    faqId: mongoose.Schema.Types.ObjectId,
    question: { type: String },
    answer: { type: String }
}, { _id: false });

const ContactDetailsSchema = new mongoose.Schema({
    phoneNumber: { type: String },
    weekStart: { type: String }, 
    weekEnd: { type: String }, 
    dayStart: { type: String }, 
    dayEnd: { type: String }, 
    operatingHours: { type: String }, 
    email: { type: String }, 
    address: { type: String }, 
    users: { type: Number }, 
    communityRating: { type: String }
}, { _id: false });

const ContactSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: 'contact_page', 
        immutable: true 
    },
    contactDetails: ContactDetailsSchema,
    faqSection: {
        faqs: [FAQSchema]
    },
    // Added field for cancellation and refund policy
    cancellationAndRefundPolicy: {
        type: String
    }
}, { timestamps: true, collection: 'Pages' });

module.exports = mongoose.model('ContactContent', ContactSchema, 'Pages');