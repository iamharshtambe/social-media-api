import express from 'express';
import { userAuth } from '../middlewares/auth.js';
import { ConnectionRequest } from '../models/ConnectionRequest.js';

export const userRouter = express.Router();

userRouter.get('/user/request/received', userAuth, async (req, res) => {
   try {
      const loggedInUser = req.user;

      const connectionRequest = await ConnectionRequest.find({
         toUserId: loggedInUser._id,
         status: 'interested',
      }).populate('fromUserId', ['firstName', 'lastName']);

      res.json({
         message: 'Requests fetched successfully',
         data: connectionRequest,
      });
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});

userRouter.get('/user/request/connections', userAuth, async (req, res) => {
   try {
      const loggedInUser = req.user;

      const connectionRequest = await ConnectionRequest.find({
         $or: [
            { toUserId: loggedInUser._id, status: 'accepted' },
            { fromUserId: loggedInUser._id, status: 'accepted' },
         ],
      })
         .populate('fromUserId', ['firstName', 'lastName'])
         .populate('toUserId', ['firstName', 'lastName']);

      const data = connectionRequest.map((row) => {
         if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
            return row.toUserId;
         }
         return row.fromUserId;
      });

      res.json({
         message: 'You have following connections:',
         data,
      });
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});

userRouter.get('/user/request/feed', userAuth, (req, res) => {});
