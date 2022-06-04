import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import merchRouter from './routes/merchRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use('/api/seed', seedRouter);
app.use('/api/merchs', merchRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
