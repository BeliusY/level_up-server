import { body } from 'express-validator';

import Character from '../../models/Character.js';

const name = body('name')
  .isLength({ min: 4 })
  .withMessage('Name must be at least 4 characters.')
  .custom(async (value, { req }) => {
    const user = req.user;
    const character = await Character.findOne({ name: value });

    if (character) {
      if (user.character) {
        // for edit
        if (user.character.toString() === character._id.toString()) return true;
        else throw new Error('Name is already taken.');
      } else {
        // for character creation
        throw new Error('Name is already taken.');
      }
    }

    return true;
  });

export default name;
