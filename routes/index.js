import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';

import taskRouter from './taskRouter.js';
import userRouter from './userRouter.js';
import characterRouter from './characterRouter.js';

router.get('/', (req, res) => {
  res.status(404).send('Not found.');
});
router.use('/user', userRouter);
router.use('/task', auth, taskRouter);
router.use('/character', auth, characterRouter);

export default router;
