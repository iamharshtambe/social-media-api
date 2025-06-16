import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: true,
         minLength: 1,
         maxLength: 20,
      },
      lastName: {
         type: String,
         required: true,
         minLength: 1,
         maxLength: 20,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
         validate(value) {
            if (!validator.isEmail(value)) {
               throw new Error('Invalid email');
            }
         },
      },
      password: {
         type: String,
         required: true,
         unique: true,
      },
      age: {
         type: Number,
         min: 18,
      },
      gender: {
         type: String,
         validate(value) {
            if (!['Male', 'Female', 'Other'].includes(value)) {
               throw new Error('Invalid Gender');
            }
         },
      },
      about: {
         type: String,
         default: 'Technology Enthusiast',
      },
      skills: {
         type: [String],
      },
   },
   { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
