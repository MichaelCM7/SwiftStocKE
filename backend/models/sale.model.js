import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    retailer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Retailer',
        required: true,
        index: true
    },
    saleName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    dateTime: {
        type: String,
        required: true,
        trim: true,
        maxLength: 17,
        minLength: 17
    },
    items: {
        type: Array({
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
                index: true
            },
            itemName: {
                type: String,
                required: true,
                trim: true,
                minLength: 3,
                maxLength: 50
            },
            quantity: {
                type: Number,
                required: true,
                trim: true,
                max: 1000,
                min: 1
            }
        }),
        required: true
    }
}, { timestamps: true })

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;