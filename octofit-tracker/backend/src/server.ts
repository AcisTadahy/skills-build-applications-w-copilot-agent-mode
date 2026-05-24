import mongoose from 'mongoose';
import { app } from './app.js';

const PORT = Number(process.env.PORT ?? 8000);
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017/octofit';

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URL}`);
    app.listen(PORT, () => {
      console.log(`OctoFit Tracker backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
