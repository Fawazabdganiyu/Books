import { Request, Response, NextFunction } from 'express';
import Book from '../models/bookModel';
import CustomError from '../utils/customError';
import formatDate from '../utils/formatDate';

class bookController {
  static async createBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, author, ISBN } = req.body;
    let publishedDate = req.body.publishedDate;

    // Check if the book already exists
    const book = await Book.findOne({ ISBN });
    if (book) {
      return next(new CustomError(400, 'Book already exists'));
    }

    // Create a new book
    try {
      publishedDate = formatDate(publishedDate);
      const newBook = await Book.create({ title, author, publishedDate, ISBN });
      res.status(201).json({ success: 'true', data: newBook.toObject() });
    } catch (error) {
      return next(new CustomError(400, 'Error creating book'));
    }
  }
}

export default bookController;
