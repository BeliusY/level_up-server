import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  character: { type: mongoose.Schema.Types.ObjectId },
  tasks: [{ type: mongoose.Schema.Types.ObjectId }],
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  // ...
});

User.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

User.methods.checkPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

User.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });
};

export default mongoose.model('User', User);
