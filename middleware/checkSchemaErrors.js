import { validationResult } from 'express-validator';

import Api400Error from '../errors/Api400Error.js';

export default function checkSchemaErrors(req, res, next) {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors = errors.errors && errors.errors.map((err) => err.msg);
    return next(new Api400Error(errors.join('\n')));
  }

  next();
}
