import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export async function userAuth(req, res, next) {
   try {
      const { token } = req.cookies;

      if (!token) {
         throw new Error('Invalid token');
      }

      const { _id } = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(_id);

      if (!user) {
         throw new Error('User not found');
      }

      req.user = user;
      next();
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
}
