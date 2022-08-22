import { body } from 'express-validator';

const strongPasswordRules = `Password must be at least 8 characters.
  Must include at least one uppercase and one lowercase letters.
  Must include at least one number.
  Must include at least one special character.`;

const password = body('password')
  .isStrongPassword()
  .withMessage(strongPasswordRules);

export default password;
