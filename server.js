import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import {
  logError,
  returnError,
  isOperationalError,
} from './errors/errorHandler.js';
import router from './routes/index.js';
import databaseConnection from './config/databaseConnection.js';

dotenv.config({ path: './config/.env' });

const app = express();
const port = process.env.PORT || 5000;

databaseConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use(logError);
app.use(returnError);

process.on('unhandledRejection', (error) => {
  throw error;
});

process.on('uncaughtException', (error) => {
  logError(error);
  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

app.listen(port, () => console.log(`Running on port ${port}.`));
