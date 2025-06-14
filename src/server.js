import express from 'express';
import { adminAuth } from './middlewares/auth.js';

const app = express();
const port = 5000;

app.use('/admin', adminAuth);

app.get('/admin/addData', (req, res) => {
   res.send('Data added successfully...');
});

app.get('/admin/deleteData', (req, res) => {
   res.send('Data deleted successfully...');
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
