import express from 'express';
const taskRouter = express.Router();

import checkId from '../middleware/checkId.js';

import {
  getTasks,
  create,
  edit,
  deleteTask,
  complete,
} from '../controllers/taskController.js';

import editSchema from '../schemas/task/editSchema.js';
import createSchema from '../schemas/task/createSchema.js';
import checkSchemaErrors from '../middleware/checkSchemaErrors.js';

taskRouter
  .get('/get-all', getTasks)
  .put('/complete/:id', checkId, complete)
  .delete('/delete/:id', checkId, deleteTask)
  .delete('/complete/:id', checkId, complete)
  .put('/edit/:id', checkId, editSchema, checkSchemaErrors, edit)
  .post('/create', createSchema, checkSchemaErrors, create);

export default taskRouter;
