import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
   try {
      await mongoose.connect(process.env.MONGODB_URI);
   } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
   }
}
