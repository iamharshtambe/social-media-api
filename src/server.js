import express from 'express';

const app = express();
const port = 5000;

app.get('/request', (req, res) => {
   res.send('This is GET request!');
});

app.post('/request', (req, res) => {
   res.send('This is POST request!');
});

app.use('/test', (req, res) => {
   res.send('Hello, World!');
});

app.listen(port, () => {
   console.log(`Server is running on port:${port}`);
});
