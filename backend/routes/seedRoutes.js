import express from 'express';
import Merch from '../models/merchModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Merch.remove({});
  const createdMerchs = await Merch.insertMany(data.merchs);
  res.send({ createdMerchs });
});

export default seedRouter;
