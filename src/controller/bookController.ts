import { Request, Response, NextFunction } from 'express';
import Book from '../models/bookModel';
import CustomError from '../utils/customError';
import formatDate from '../utils/formatDate';

class BookController {
  static async createBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, author, ISBN } = req.body;
    let publishedDate = req.body.publishedDate;

  if (!title) return next(new CustomError(400, 'Title is missing'));
  if (!author) return next(new CustomError(400, 'Author is missing'));
  if (!publishedDate) return next(new CustomError(400, 'Published date is missing'));
  if (!ISBN) return next(new CustomError(400, 'ISBN is missing'));

    // Check if the book already exists
    const book = await Book.findOne({ ISBN });
    if (book) {
      return next(new CustomError(400, 'Book already exists'));
    }

    let fileUrl;
    if (req.file) {
      // Access the uploaded file via req.file
      fileUrl = `uploads/${req.file.filename}`;
    }

    // Create a new book
    try {
      publishedDate = formatDate(publishedDate);
      const newBook = await Book.create({ title, author, publishedDate, ISBN, storageUrl: fileUrl });
      const { storageUrl, ...rest } = newBook.toObject();
      res.status(201).json({ success: 'true', data: rest });
    } catch (error) {
      return next(new CustomError(400, 'Error creating book'));
    }
  }
}

export default BookController;
