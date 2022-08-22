import { body } from 'express-validator';

import User from '../../models/User.js';

const usernameRules = `Username must be at least 4 characters.
  Username cannot include spaces.`;

const username = body('username')
  .trim()
  .isLength({ min: 4 })
  .withMessage(usernameRules)
  .custom(async (value, { req }) => {
    const user = await User.findOne({ username: value });

    if (user) {
      if (req.user) {
        // for edit
        if (user._id.toString() === req.user._id.toString()) return true;
        else throw new Error('Username is taken.');
      } else {
        // for registration
        throw new Error('Username is taken.');
      }
    }

    return true;
  });

export default username;
