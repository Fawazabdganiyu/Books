import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
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
      const newBook = await Book.create({ title, author, publishedDate, ISBN, bookFile: fileUrl });
      res.status(201).json({ success: 'true', data: newBook.toObject() });
    } catch (error) {
      return next(new CustomError(400, 'Error creating book'));
    }
  }

  static async updateBookCoverImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new CustomError(400, 'Invalid book id'));
    }

    try {
      const book = await Book.findById(id);
      if (!book) return next(new CustomError(404, 'Book not found'));

      if (!req.file) return next(new CustomError(400, 'Cover image is missing'));

      // Access the uploaded file via req.file
      const fileUrl = `uploads/${req.file.filename}`;
      book.coverImage = fileUrl;
      await book.save();

      res.status(200).json({ success: 'true', data: book.toObject() });
    } catch (error) {
      return next(new CustomError(400, 'Error updating cover image'));
    }
  }

  static async getBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const books = await Book.find();
      if (!books) return next(new CustomError(404, 'No book collection found'));

      res.status(200).json({ success: 'true', data: books });
    } catch (error) {
      return next(new CustomError(400, 'Error fetching books'));
    }
  };

  static async getBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new CustomError(400, 'Invalid book id'));
    }

    try {
      const book = await Book.findById(id);
      if (!book) return next(new CustomError(404, 'Book not found'));

      res.status(200).json({ success: 'true', data: book });
    } catch (error) {
      return next(new CustomError(400, 'Error fetching book'));
    }
  }

  static async updateBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new CustomError(400, 'Invalid book id'));
    }

    try {
      const book = await Book.findById(id);
      if (!book) return next(new CustomError(404, 'Book not found'));

      // Ensure the published date is formatted
      if (req.body.publishedDate) req.body.publishedDate = formatDate(req.body.publishedDate);

      const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      
      res.status(200).json({ success: 'true', data: updatedBook });
    } catch (error) {
      return next(new CustomError(400, 'Error updating book'));
    }
  }

  static async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new CustomError(400, 'Invalid book id'));
    }

    try {
      const book = await Book.findById(id);
      if (!book) return next(new CustomError(404, 'Book not found'));

      // Ensure the book files are deleted from the storage
      if (book.bookFile) {
        const filePath = book.bookFile;
        fs.unlinkSync(filePath);
      }
      if (book.coverImage) {
        const filePath = book.coverImage;
        fs.unlinkSync(filePath);
      }

      await book.deleteOne();
      res.status(200).json({ success: 'true', message: 'Book deleted successfully' });
    } catch (error) {
      return next(new CustomError(400, 'Error deleting book'));
    }
  }
}

export default BookController;
