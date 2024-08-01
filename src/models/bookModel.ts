import { model, Schema } from 'mongoose';
import { IBook } from '../types/book';

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: String, required: true },
  ISBN: { type: Number, required: true },
  bookFile: { type: String },
  coverImage: { type: String }
}, {
  timestamps: true
});

export default model<IBook>('Book', bookSchema);
