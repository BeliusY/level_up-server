import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import Api401Error from '../errors/Api401Error.js';
import Api404Error from '../errors/Api404Error.js';

export default async function auth(req, res, next) {
  try {
    const token =
      req.headers.authorization &&
      req.headers.authorization.split('Bearer ')[1];

    if (!token) throw new Api401Error('Unauthorized.');

    let { id } = jwt.decode(token);
    let user = await User.findById(id);

    if (!user) throw new Api404Error('User not found.');

    req.user = user;
    next();
  } catch (error) {
    next(new Api401Error('Invalid token.'));
  }
}
