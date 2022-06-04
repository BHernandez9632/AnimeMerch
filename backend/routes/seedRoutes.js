import express from 'express';
import Merch from '../models/merchModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Merch.remove({});
  const createdMerchs = await Merch.insertMany(data.merchs);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdMerchs, createdUsers });
});

export default seedRouter;
