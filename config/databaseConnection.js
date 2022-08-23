import mongoose from 'mongoose';

export default function databaseConnection() {
  try {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RPG_LIFE');
  } catch (error) {
    console.log('errorishe', error)
  }
}
