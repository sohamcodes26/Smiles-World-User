import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false // Ensures password is not sent in query responses
    },
    role: {
        type: String,
        enum: ['Admin'], // Enforcing the single role
        default: 'Admin'
    },
    // We do not store the refresh token hash, relying on the cookie for refresh authority
}, { timestamps: true });

// --- Mongoose Middleware: Hash password before saving ---
AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// --- Mongoose Methods ---

// Generate Access Token (short-lived)
AdminSchema.methods.getSignedAccessToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE // e.g., '15m'
    });
};

// Generate Refresh Token (long-lived)
AdminSchema.methods.getSignedRefreshToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE // e.g., '30d'
    });
};

// Match user entered password to hashed password in database
AdminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('Admin', AdminSchema);