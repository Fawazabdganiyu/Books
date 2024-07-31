import dotenv from 'dotenv';
import e from 'express';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/books_collection',
};
