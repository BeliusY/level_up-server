import { ObjectId } from 'mongodb';
import Api400Error from '../errors/Api400Error.js';

export default function checkId(req, res, next) {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
      if (String(new ObjectId(id)) === id) {
        return next();
      }
    }

    throw new Api400Error('Invalid ID.');
  } catch (error) {
    next(error);
  }
}
