import express from 'express';
import { userAuth } from '../middlewares/auth.js';
import { validateEditProfileData } from '../utils/validation.js';

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
      if (!validateEditProfileData) {
         throw new Error('Invalid edit request');
      }

      const loggedInUser = req.user;

      Object.keys(req.body).forEach(
         (key) => (loggedInUser[key] = req.body[key])
      );

      await loggedInUser.save();

      res.json({
         message: `${loggedInUser.firstName} your profile updated successfully`,
      });
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});
