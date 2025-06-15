import express from 'express';
import { connectDB } from './config/db.js';
import { User } from './models/user.js';

const app = express();
const port = 5000;

app.use(express.json());

app.post('/signup', async (req, res) => {
   const user = new User(req.body);

   try {
      await user.save();
      res.send('User added successfully');
   } catch (err) {
      res.status(400).send('Error:' + err.message);
   }
});

app.get('/user', async (req, res) => {
   try {
      const users = await User.find({ email: req.body.email });

      if (users.length === 0) {
         res.status(404).send('User not found');
      } else {
         res.send(users);
      }
   } catch (err) {
      res.send('Error:', err);
   }
});

app.get('/feed', async (req, res) => {
   try {
      const users = await User.find({});
      res.send(users);
   } catch (error) {
      res.send('Error:', error);
   }
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
