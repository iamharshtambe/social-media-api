import express from 'express';
import { validateSignupData } from '../utils/validation.js';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export const authRouter = express.Router();

authRouter.post('/auth/signup', async (req, res) => {
   try {
      validateSignupData(req);

      const { firstName, lastName, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
         throw new Error('User with this email already exists');
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
         firstName,
         lastName,
         email,
         password: passwordHash,
      });

      await user.save();

      res.send('User added successfully');
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});

authRouter.post('/auth/login', async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
         throw new Error('Invalid credentials!');
      }

      const isPasswordValid = await user.validatePassword(password);

      if (isPasswordValid) {
         const token = await user.getJWT();

         res.cookie('token', token, {
            expires: new Date(Date.now() + 24 * 3600000),
         });

         res.send('Login Successfully');
      } else {
         throw new Error('Invalid credentails!');
      }
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});

authRouter.post('/auth/logout', (req, res) => {
   res.cookie('token', null, {
      expires: new Date(Date.now()),
   });

   res.send('Logout Successfully');
});
