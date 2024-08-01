import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import Book from '../models/bookModel';
import customError from '../utils/customError';

export default class FileController {
  static async uploadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.params.id) return next(new customError(400, 'Book ID is required'));
    
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return next(new customError(404, 'Book not found'));
      }

      if (!req.file) {
        return next(new customError(400, 'Error: No file selected'));
      }
      
      if (book.bookFile) {
        // Delete the existing file
        fs.unlinkSync(book.bookFile);
      }
      book.bookFile = req.file?.path;
      await book.save();

      res.status(200).json({
        success: true,
        message: 'File uploaded successfully'
      });
    } catch (error) {
      return next(new customError(500, 'Error uploading file'));
    }
  }
}
