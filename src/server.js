import express from 'express';
import { connectDB } from './config/db.js';
import { User } from './models/user.js';

const app = express();
const port = 5000;

app.use(express.json());

// api to post user
app.post('/signup', async (req, res) => {
   const user = new User(req.body);

   try {
      await user.save();
      res.send('User added successfully');
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});

// api to get user by email
app.get('/user', async (req, res) => {
   try {
      const users = await User.find({ email: req.body.email });

      if (users.length === 0) {
         res.status(404).send('User not found');
      } else {
         res.send(users);
      }
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});

// api to get feed
app.get('/feed', async (req, res) => {
   try {
      const users = await User.find({});
      res.send(users);
   } catch (error) {
      res.status(404).send(`Error: ${err.message}`);
   }
});

// api tp delete user by id
app.delete('/user', async (req, res) => {
   try {
      await User.findByIdAndDelete(req.body.id);
      res.send('User deleted successfully');
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});

// api to update user data
app.patch('/user', async (req, res) => {
   try {
      const allowedUpdates = ['password', 'age', 'gender', 'about', 'skills'];

      const isAllowedUpdates = Object.keys(req.body).every((k) =>
         allowedUpdates.includes(k)
      );

      if (!isAllowedUpdates) {
         throw new Error('Updates not allowed');
      }

      await User.findByIdAndUpdate(req.body.id, req.body, {
         runValidators: true,
      });
      res.send('User updated successfully');
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
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
