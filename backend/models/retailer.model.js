import mongoose from "mongoose";

const retailerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        minlength: 8,
        trim: true,
        maxlength: 255,
        // match: [/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'], Fix Later if possible
        required: true
    }
}, {timestamps: true});

const Retailer = mongoose.model('Retailer', retailerSchema)

export default Retailer;