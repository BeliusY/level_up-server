import express from 'express';
const userRouter = express.Router();

import auth from '../middleware/auth.js';

import editSchema from '../schemas/user/editSchema.js';
import registerSchema from '../schemas/user/registerSchema.js';
import checkSchemaErrors from '../middleware/checkSchemaErrors.js';

import {
  edit,
  login,
  getUser,
  register,
  deleteUser,
  changePassword,
} from '../controllers/userController.js';
import password from '../schemas/common/password.js';

userRouter
  .post('/login', login)
  .get('/get-user', auth, getUser)
  .delete('/delete', auth, deleteUser)
  .post('/edit', auth, editSchema, checkSchemaErrors, edit)
  .post('/register', registerSchema, checkSchemaErrors, register)
  .post('/change-password', auth, password, checkSchemaErrors, changePassword);

export default userRouter;
