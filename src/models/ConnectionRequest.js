import mongoose from 'mongoose';

const connectionRequestSchema = new mongoose.Schema(
   {
      fromUserId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
      },
      toUserId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
      },
      status: {
         type: String,
         enum: {
            values: ['interested', 'notInterested', 'accepted', 'rejected'],
            message: '{VALUE} is invalid status',
         },
         required: true,
      },
   },
   { timestamps: true }
);

export const ConnectionRequest = mongoose.model(
   'ConnectionRequest',
   connectionRequestSchema
);
