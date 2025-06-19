import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export async function userAuth(req, res, next) {
   try {
      const { token } = req.cookies;

      if (!token) {
         throw new Error('Invalid token');
      }

      const { _id } = jwt.verify(token, 'kaboom!');

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
