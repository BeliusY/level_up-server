import Character from '../models/Character.js';

import Api409Error from '../errors/Api409Error.js';
import Api404Error from '../errors/Api404Error.js';

export const create = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.character) throw new Api409Error('You already have a character.');

    const { name, job } = req.body;
    const character = await Character.create({ name, job });

    user.character = character._id;
    await user.save();

    res.status(201).send({
      message: 'Successfully created a character.',
      character,
    });
  } catch (error) {
    next(error);
  }
};

export const getInfo = async (req, res, next) => {
  try {
    const user = req.user;
    const character = await Character.findById(user.character);

    res.status(200).send(character);
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const user = req.user;
    const { name } = req.body;

    if (!user.character) throw new Api404Error('Character not found.');

    const character = await Character.findById(user.character);

    character.name = name;
    await character.save();

    res.status(200).send({
      message: 'Successfully edited.',
      character,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCharacter = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user.character) throw new Api404Error('Character not found.');

    await Character.findByIdAndRemove(user.character);
    user.character = null;
    await user.save();

    res.status(200).send({
      message: 'Successfully deleted.',
    });
  } catch (error) {
    next(error);
  }
};
