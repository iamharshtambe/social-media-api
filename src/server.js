import express from 'express';
import { connectDB } from './config/db.js';

const app = express();
const port = 5000;

connectDB()
   .then(() => {
      console.log('Database connected successfully');
      app.listen(port, () => {
         console.log(`Server is running on http://localhost:${port}`);
      });
   })
   .catch((err) => {
      console.error('Database connection failed');
   });
