import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    retailer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Retailer',
        required: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        minlength: 3
    },
    quantity: {
        type: Number,
        required: true,
        trim: true,
        max: 1000,
        min: 0
    },
    status: {
        type: String,
        enum: ['Low Stock', 'Out of Stock', 'Moderate Stock', 'Good Stock'],
        default: 'Moderate Stock',
        trim: true
    },
    lowStockThreshold: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
        default: 20
    },
    restocks: {
        type: Number,
        default: 0,
        trim: true,
        min: 0
    },
    salesCount: {
        type: Number,
        default: 0,
        trim: true,
        min: 0
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;

