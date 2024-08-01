import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';
import checkFileType from '../utils/checkFileType';
import customError from '../utils/customError';

// Set storage engine
const storage: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    if (!fs.existsSync('uploads/')) fs.mkdirSync('uploads/')
    cb(null, 'uploads/');
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, `${file.fieldname}-${file.originalname.slice(0, -4)}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

/**
 * Middleware for handling single file uploads dynamically.
 *
 * @param {string} fieldName - The name of the form field to parse for the file upload.
 * @returns {function} The middleware function to handle file upload.
 */
const dynamicSingleUpload = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Initialize upload
    const upload = multer({
      storage,
      limits: { fileSize: 5000000 }, // 5MB
      fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        checkFileType(file, cb);
      },
    }).single('bookFile');
    
    upload(req, res, (err: any) => {
      if (err) {
        return next(new customError(500, err.message));
      }
      next();
    });
  };
}

export default dynamicSingleUpload;
