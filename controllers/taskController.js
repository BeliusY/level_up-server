import cron from 'node-cron';

import Task from '../models/Task.js';
import Character from '../models/Character.js';
import Api404Error from '../errors/Api404Error.js';

export const create = async (req, res, next) => {
  try {
    const user = req.user;
    const { title, description, difficulty, isDaily, days } = req.body;

    const task = await Task.create({
      title,
      description,
      difficulty,
      isDaily,
      days,
      userId: user._id,
    });

    user.tasks.push(task._id);
    await user.save();

    res.status(201).send({
      message: 'Successfully created a task.',
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const user = req.user;
    const tasks = await Task.find({ userId: user._id });
    let today = new Date().toLocaleString('en-us', {
      weekday: 'long',
    });
    let todaysTasks = tasks.filter(
      (t) => (t.isDaily && t.days.includes(today) && !t.completed) || !t.isDaily
    );

    res.status(200).send({
      tasks: todaysTasks,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    const { title, description, difficulty, isDaily, days } = req.body;

    if (!task) throw new Api404Error('Task not found.');

    task.days = days;
    task.title = title;
    task.isDaily = isDaily;
    task.difficulty = difficulty;
    task.description = description;

    await task.save();
    res.status(200).send({
      message: 'Successfully edited.',
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) throw new Api404Error('Task not found.');

    user.tasks = user.tasks.filter((t) => t.toString() !== id.toString());

    await user.save();
    await task.delete();
    res.status(200).send({
      message: 'Successfully deleted a task.',
    });
  } catch (error) {
    next(error);
  }
};

export const complete = async (req, res, next) => {
  try {
    const user = req.user;
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) throw new Api404Error('Task not found.');

    const character = await Character.findById(user.character);

    let message;
    let exp = 4;
    switch (task.difficulty) {
      case 'Easy':
        exp = 4;
        break;
      case 'Medium':
        exp = 6;
        break;
      case 'Hard':
        exp = 8;
        break;
      case 'Very Hard':
        exp = 10;
        break;
    }

    character.exp += exp;

    if (character.exp >= character.nextLvl) {
      character.exp = 0;
      character.level++;
      character.nextLvl = character.level * 16;
      message = 'Level UP!~~';
    } else {
      message = 'Improvement!';
    }

    if (!task.isDaily) {
      await Task.findByIdAndRemove(task._id);
    } else {
      // TODO: if it's possible make this realtime, like if I'm looking
      // at my tasks I want to see tasks becoming not completed in real time
      task.completed = true;
      cron.schedule(`0 0 0 * * ${task.days.join(',')}`, () => {
        task.completed = false;
      });
    }

    await task.save();
    await character.save();

    res.status(200).send({
      message: `${message}\n+${exp}EXP`,
      exp: character.exp,
      level: character.level,
      nextLvl: character.nextLvl,
    });
  } catch (error) {
    next(error);
  }
};
