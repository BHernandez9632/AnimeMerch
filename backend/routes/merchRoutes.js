import express from 'express';
import Merch from '../models/merchModel.js';

const merchRouter = express.Router();

merchRouter.get('/', async (req, res) => {
  const merchs = await Merch.find();
  res.send(merchs);
});

merchRouter.get('/slug/:slug', async (req, res) => {
  const merch = await Merch.findOne({ slug: req.params.slug });
  if (merch) {
    res.send(merch);
  } else {
    res.status(404).send({ message: 'Not Available' });
  }
});

merchRouter.get('/:id', async (req, res) => {
  const merch = await Merch.findById(req.params.id);
  if (merch) {
    res.send(merch);
  } else {
    res.status(404).send({ message: 'Not Available' });
  }
});

export default merchRouter;
