import { body } from 'express-validator';

const days = [
  body('days').custom((value, { req }) => {
    req.body.days = !req.body.isDaily && [];

    // Check if the days are right week days.
    // Maybe I should use some common variable thing for this.

    return true;
  }),
];

export default days;
