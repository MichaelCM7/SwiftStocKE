import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    retailer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Retailer',
        required: true
    },
    data:{
      type: [{
        totalQuantity: {
            type: Number,
            required: true
        },
        dateTime:{
          type: Date,
          required: true
        }
      }],
      required: true
    }
    
})

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;