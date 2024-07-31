import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import Book from '../models/bookModel';
import customError from '../utils/customError';
import upload from '../middlewares/fileUpload';

export default class FileController {
  static async uploadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.params.id) return next(new customError(400, 'Book ID is required'));
    
    const book = await Book.findById(req.params.id);
    if (!book) {
      return next(new customError(404, 'Book not found'));
    }

    upload(req, res, (err: any) => {
      if (err) {
        return next(new customError(500, err.message));
      } else {
        if (req.file === undefined) {
          return next(new customError(400, 'Error: No file selected'));
        } else {
          try {
            if (book.storageUrl) {
              // Delete the existing file
              fs.unlinkSync(book.storageUrl);
            }
            book.storageUrl = req.file.path;
            book.save();
          } catch (error) {
            return next(new customError(500, 'Error uploading file'));
          }
          
          res.status(200).json({
            success: true,
            message: 'File uploaded successfully'
          });
        }
      }
    });
  }
}