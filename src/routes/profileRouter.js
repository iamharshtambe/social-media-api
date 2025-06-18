import express from 'express';
import { userAuth } from '../middlewares/auth.js';
import { validateEditProfileData } from '../utils/validation.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

export const profileRouter = express.Router();

profileRouter.get('/profile/view', userAuth, async (req, res) => {
   try {
      const user = req.user;

      res.send(user);
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
   try {
      if (!validateEditProfileData(req)) {
         throw new Error('Invalid edit request');
      }

      const loggedInUser = req.user;

      Object.keys(req.body).forEach(
         (key) => (loggedInUser[key] = req.body[key])
      );

      await loggedInUser.save();

      res.json({
         message: `${loggedInUser.firstName}, your profile updated successfully`,
      });
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});

profileRouter.patch('/profile/edit/password', userAuth, async (req, res) => {
   try {
      const { currentPassword, password } = req.body;

      const loggedInUser = req.user;

      const isMatch = await bcrypt.compare(
         currentPassword,
         loggedInUser.password
      );

      if (!isMatch) {
         throw new Error('Current password is incorrect');
      }

      if (!validator.isStrongPassword(password)) {
         throw new Error('Enter a strong password');
      }

      const passwordHash = await bcrypt.hash(password, 10);

      loggedInUser.password = passwordHash;

      await loggedInUser.save();

      res.json({
         message: `${loggedInUser.firstName}, your password updated successfully`,
      });
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});
