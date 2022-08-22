import express from 'express';
const characterRouter = express.Router();

import editSchema from '../schemas/character/editSchema.js';
import createSchema from '../schemas/character/createSchema.js';

import checkSchemaErrors from '../middleware/checkSchemaErrors.js';

import {
  edit,
  create,
  getInfo,
  deleteCharacter,
} from '../controllers/characterController.js';

characterRouter
  .get('/get-info', getInfo)
  .delete('/delete', deleteCharacter)
  .post('/edit', editSchema, checkSchemaErrors, edit)
  .post('/create', createSchema, checkSchemaErrors, create);

export default characterRouter;
