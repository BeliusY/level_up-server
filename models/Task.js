import mongoose from 'mongoose';

const Task = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  difficulty: {
    type: String,
    required: true,
  },
  isDaily: {
    type: Boolean,
    default: false,
  },
  days: [{ type: String }],
  completed: { type: Boolean, default: false },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

export default mongoose.model('Task', Task);
