import { body } from 'express-validator';

const title = body('title')
  .isLength({ min: 1 })
  .withMessage('Title must be at least 1 character.');

export default title;
