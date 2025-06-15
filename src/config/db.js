import mongoose from 'mongoose';

export async function connectDB() {
   await mongoose.connect(
      'mongodb+srv://iamharshtambe:helloworld@eternal.fk10f.mongodb.net/social-media-db'
   );
}
