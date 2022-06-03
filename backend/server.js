import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/merchs', (req, res) => {
  res.send(data.merchs);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
