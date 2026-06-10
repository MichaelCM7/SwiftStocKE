import mongoose from 'mongoose';
import { MONGO_URI } from '../config/env.js';

if (!MONGO_URI) {
  console.error(`MongoDB URI is not defined. Value: ${MONGO_URI}`);
  process.exit(1);
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log('Successfully connected to MongoDB.');
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1); // Stop the application if connection fails
  }
};

export default connectDB;