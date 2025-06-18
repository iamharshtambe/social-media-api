import express from 'express';
import { userAuth } from '../middlewares/auth.js';

export const requestRouter = express.Router();

requestRouter.post('/sendConnectionRequest', userAuth, async (req, res) => {
   try {
      res.send(`${req.user.firstName} sent a connection request`);
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});
