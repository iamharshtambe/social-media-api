import mongoose from 'mongoose';

const connectionRequestSchema = new mongoose.Schema(
   {
      fromUserId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
      toUserId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
      status: {
         type: String,
         enum: {
            values: ['interested', 'not interested', 'accepted', 'rejected'],
            message: '{VALUE} is invalid status',
         },
         required: true,
      },
   },
   { timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

export const ConnectionRequest = mongoose.model(
   'ConnectionRequest',
   connectionRequestSchema
);
