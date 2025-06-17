import express from 'express';
import { connectDB } from './config/db.js';
import { User } from './models/user.js';
import { validateSignupData } from './utils/validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { userAuth } from './middlewares/auth.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());

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

app.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
         throw new Error('Invalid credentials!');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
         const token = jwt.sign({ _id: user._id }, 'kaboom!');

         res.cookie('token', token);

         res.send('Login Successfully');
      } else {
         throw new Error('Invalid credentails!');
      }
   } catch (err) {
      res.status(404).send(`Error: ${err.message}`);
   }
});

app.get('/profile', userAuth, async (req, res) => {
   try {
      const user = req.user;

      res.send(user);
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
