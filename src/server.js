import express from 'express';
import { connectDB } from './config/db.js';
import { User } from './models/user.js';

const app = express();
const port = 5000;

app.post('/signup', async (req, res) => {
   const user = new User({
      firstName: 'Harsh',
      lastName: 'Tambe',
      email: 'harshtambe19@gmaul.com',
      password: '241331',
      age: 21,
      gender: 'Male',
   });

   await user.save();

   res.send('User added successfully');
});

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
