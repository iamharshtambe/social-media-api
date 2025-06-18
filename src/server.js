import express from 'express';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/authRouter.js';
import { profileRouter } from './routes/profileRouter.js';
import { requestRouter } from './routes/requestRouter.js';

const app = express();
const port = 5000;

app.use(express.json());

app.use(cookieParser());

app.use('/', authRouter);

app.use('/', profileRouter);

app.use('/', requestRouter);

connectDB()
   .then(() => {
      console.log('Database connected successfully');
      app.listen(port, () => {
         console.log(`Server is running on http://localhost:${port}`);
      });
   })
   .catch((err) => {
      console.error(err);
   });
