const mongoose = require('mongoose');

// Sub-schemas for nested content
const MemberCardSchema = new mongoose.Schema({
    memberId: mongoose.Schema.Types.ObjectId,
    imageUrl: { type: String },
    name: { type: String },
    designation: { type: String },
    information: { type: String }
}, { _id: false });

const MetricCardSchema = new mongoose.Schema({
    metricId: mongoose.Schema.Types.ObjectId,
    value: { type: String }
}, { _id: false });

const AboutSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: 'about_page', 
        immutable: true 
    },
    storyAndMission: {
        story: { type: String },
        mission: {
            text: { type: String }
        },
        vision: {
            text: { type: String }
        },
        profilePhoto: {
            imageUrl: { type: String, default: '' }
        }
    },
    ourMembers: {
        cards: [MemberCardSchema]
    },
    journeyInNumbers: {
        cards: [MetricCardSchema]
    }
}, { timestamps: true, collection: 'Pages' });

module.exports = mongoose.model('AboutContent', AboutSchema, 'Pages');