import { body } from 'express-validator';

import User from '../../models/User.js';
import Api400Error from '../../errors/Api400Error.js';

const email = body('email')
  .isEmail()
  .withMessage('Invalid email address.')
  .custom(async (value, { req }) => {
    const user = await User.findOne({ email: value });

    if (user) {
      if (req.user) {
        // for edit
        if (user._id.toString() === req.user._id.toString()) return true;
        else throw new Error('Email is already used.');
      } else {
        // for registration
        throw new Error('Email is already used.');
      }
    }

    return true;
  });

export default email;
