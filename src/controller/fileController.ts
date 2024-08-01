import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Book from '../models/bookModel';
import CustomError from '../utils/customError';

export default class FileController {
  static async uploadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, 'Book ID is required'));

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new CustomError(400, 'Invalid product id'));
    }
    
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return next(new CustomError(404, 'Book not found'));
      }

      if (!req.file) {
        return next(new CustomError(400, 'Error: No file selected'));
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
      return next(new CustomError(500, 'Error uploading file'));
    }
  }
}
