import mongoose from 'mongoose';

const Character = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  nextLvl: {
    type: Number,
    default: 16,
  },
  exp: {
    type: Number,
    default: 0,
  },
  job: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'None',
  },
  hp: {
    type: Number,
    default: 100,
  },
  mp: {
    type: Number,
    default: 100,
  },
  stats: {
    strength: Number,
    agility: Number,
    sense: Number,
    vitality: Number,
    intelligence: Number,
  },
  passiveSkills: [
    {
      type: String, // TODO
    },
  ],
  activeSkills: [
    {
      type: String, // TODO
    },
  ],
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

export default mongoose.model('Character', Character);
