import express from 'express';
import { connectDB } from './config/db.js';
import { User } from './models/user.js';
import { validateSignupData } from './utils/validation.js';
import bcrypt from 'bcrypt';

const app = express();
const port = 5000;

app.use(express.json());

// api to post user
app.post('/signup', async (req, res) => {
   try {
      // data validation
      validateSignupData(req);

      const { firstName, lastName, email, password } = req.body;

      // password encryption
      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
         firstName,
         lastName,
         email,
         password: passwordHash,
      });

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
app.patch('/user/:id', async (req, res) => {
   try {
      const allowedUpdates = ['password', 'age', 'gender', 'about', 'skills'];

      const isAllowedUpdates = Object.keys(req.body).every((k) =>
         allowedUpdates.includes(k)
      );

      if (!isAllowedUpdates) {
         throw new Error('Updates not allowed');
      }

      if (req.body.skills && req.body.skills.length > 10) {
         throw new Error('You cannot add more than 10 skills');
      }

      await User.findByIdAndUpdate(req.params?.id, req.body, {
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
