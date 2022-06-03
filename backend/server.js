import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/merchs', (req, res) => {
  res.send(data.merchs);
});

app.get('/api/merchs/slug/:slug', (req, res) => {
  const merch = data.merchs.find((x) => x.slug === req.params.slug);
  if (merch) {
    res.send(merch);
  } else {
    res.status(404).send({ message: 'Not Available' });
  }
});

app.get('/api/merchs/:id', (req, res) => {
  const merch = data.merchs.find((x) => x._id === req.params.id);
  if (merch) {
    res.send(merch);
  } else {
    res.status(404).send({ message: 'Not Available' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
