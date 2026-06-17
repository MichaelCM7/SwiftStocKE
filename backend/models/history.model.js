import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  retailer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Retailer',
    required: true,
    index: true
  },
  itemName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    trim: true
  },
  change:{
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxlength: 150
  },
  dateTime:{
    type: String,
    required: true,
    trim: true,
    maxLength: 19,
    minLength: 19
  }
}, {timestamps:true});

const History = mongoose.model('History', historySchema);

export default History;
