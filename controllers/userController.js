import User from '../models/User.js';

import Api404Error from '../errors/Api404Error.js';
import Api403Error from '../errors/Api403Error.js';

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    await User.create({
      username,
      email,
      password,
    });
    res.status(201).send({
      message: 'Successfully created an account.',
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).send({ ...user._doc, password: null });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) throw new Api404Error('User with that username was not found.');

    const passwordsMatch = await user.checkPassword(password);
    if (!passwordsMatch) throw new Api403Error('Wrong password.');

    res.status(200).send({
      token: user.getToken(),
      user: { ...user._doc, password: null },
      message: 'Successfully logged in.',
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const user = req.user;
    const { username, email } = req.body;

    user.username = username;
    user.email = email;

    await user.save();
    res.status(200).send({
      message: 'Successfully edited your account.',
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { prevPassword, password } = req.body;

    const passwordsMatch = await user.checkPassword(prevPassword);
    if (!passwordsMatch) throw new Api403Error('Wrong password.');

    user.password = password;
    await user.save();
    res.status(200).send({
      message: 'Successfully changed password.',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { password } = req.body;

    const passwordsMatch = await user.checkPassword(password);
    if (!passwordsMatch) throw new Api403Error('Wrong password.');

    await User.findByIdAndDelete(user._id);
    res.status(200);
  } catch (error) {
    next(error);
  }
};
