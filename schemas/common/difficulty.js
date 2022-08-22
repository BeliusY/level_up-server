import { body } from 'express-validator';

const difficultyLevels = [
  'Easy',
  'Medium',
  'Hard',
  'Very Hard'
];

const difficulty = body('difficulty').custom((value) => {
  if (!difficultyLevels.includes(value))
    throw new Error('Invalid "difficulty" value.');

  return true;
});

export default difficulty;