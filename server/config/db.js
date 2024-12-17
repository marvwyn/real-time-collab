import './dotenv.config.js';
import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
      const dbUri = process.env.MONGO_URI;
      
      await mongoose.connect(dbUri);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      process.exit(1);
    }
};

