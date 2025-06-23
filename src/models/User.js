import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: true,
         minLength: 1,
         maxLength: 20,
         index: true,
      },
      lastName: {
         type: String,
         required: true,
         minLength: 1,
         maxLength: 20,
         index: true,
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

userSchema.methods.getJWT = async function () {
   const user = this;

   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '5d',
   });

   return token;
};

userSchema.methods.validatePassword = async function (passwordByUser) {
   const user = this;

   const isPasswordValid = await bcrypt.compare(passwordByUser, user.password);

   return isPasswordValid;
};

export const User = mongoose.model('User', userSchema);
