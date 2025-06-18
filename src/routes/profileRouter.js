import express from 'express';
import { userAuth } from '../middlewares/auth.js';
import {
   validateEditProfileData,
   validatePassword,
} from '../utils/validation.js';
import bcrypt from 'bcrypt';

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
      if (!validatePassword(req)) {
         throw new Error('Enter a strong password');
      }

      const passwordHash = await bcrypt.hash(req.body.password, 10);

      const loggedInUser = req.user;

      loggedInUser.password = passwordHash;

      await loggedInUser.save();

      res.json({
         message: `${loggedInUser.firstName}, your password updated successfully`,
      });
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});
