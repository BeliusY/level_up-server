import { body } from 'express-validator';

import name from '../common/name.js';
import { jobs } from '../../utils/jobs.js';

const createSchema = [
  name,
  body('job').custom((value) => {
    if (!jobs.includes(value)) {
      throw new Error('Invalid job.');
    }

    return true;
  }),
];

export default createSchema;
