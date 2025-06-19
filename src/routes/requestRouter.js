import express from 'express';
import { userAuth } from '../middlewares/auth.js';
import { ConnectionRequest } from '../models/ConnectionRequest.js';
import { User } from '../models/User.js';

export const requestRouter = express.Router();

requestRouter.post(
   '/request/send/:status/:toUserId',
   userAuth,
   async (req, res) => {
      try {
         const fromUserId = req.user._id;
         const toUserId = req.params.toUserId;
         const status = req.params.status;

         const allowedStatus = ['interested', 'notInterested'];
         if (!allowedStatus.includes(status)) {
            throw new Error('Invalid status type');
         }

         if (fromUserId.toString() === toUserId.toString()) {
            throw new Error('You cannot send connection request to yourself');
         }

         const toUser = await User.findById(toUserId);
         if (!toUser) {
            throw new Error('User not found');
         }

         const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
               { fromUserId, toUserId },
               { fromUserId: toUserId, toUserId: fromUserId },
            ],
         });
         if (existingConnectionRequest) {
            throw new Error('Connection request already exist');
         }

         const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
         });

         await connectionRequest.save();

         res.json({ message: `Connection request sent successfully` });
      } catch (err) {
         res.status(404).send(`Error: ${err.message}`);
      }
   }
);
