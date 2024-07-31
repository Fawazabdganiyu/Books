import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  const { status, message } = err;
  res.status(status).json({ success: 'false', message });
}

export default errorHandler;
