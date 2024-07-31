import { Request, Response, NextFunction } from 'express';
import bookController from '../../src/controller/bookController';
import { dbConnect, dbDisconnect } from '../testDatabase';
import CustomError from '../../src/utils/customError';

// Helper to create mock Express objects
const mockExpressObjects = () => {
  const req = {} as Request;
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response & { mock: jest.Mock };
  const next = jest.fn() as unknown as NextFunction;
  return { req, res, next };
}

describe('bookController', () => {
  beforeAll(async () => dbConnect());
  afterAll(async () => dbDisconnect());
  describe('createBook', () => {
    it('should create a new book if it does not already exist', async () => {
      const { req, res, next } = mockExpressObjects();
      req.body = { title: 'New Book', author: 'Author', publishedDate: '2024-07-31' , ISBN: 123456789 };
  
      await bookController.createBook(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: 'true', data: expect.any(Object) });
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ publishedDate: 'Jul. 31, 2024' })
      }));
      expect(next).not.toHaveBeenCalled();
    });
  
    it('should not create a book and call next with an error if the book already exists', async () => {
      const { req, res, next } = mockExpressObjects();
      req.body = { title: 'Existing Book', author: 'Author', publishedDate: '2024-07-31', ISBN: 123456789 };
  
      await bookController.createBook(req, res, next);

      expect(next).toHaveBeenCalledWith(new CustomError(400, 'Book already exists'));
    });

    it('should not create a book if publishDate field is missing', async () => {
      const { req, res, next } = mockExpressObjects();
      req.body = { title: 'New Book', author: 'Author', ISBN: 20240731 };
  
      await bookController.createBook(req, res, next);
  
      expect(next).toHaveBeenCalledWith(new CustomError(400, 'Published date is missing'));
    });

    it('should not create a book if author field is missing', async () => {
      const { req, res, next } = mockExpressObjects();
      req.body = { title: 'New Book', ISBN: 12, publishedDate: '2024-07-31' };
  
      await bookController.createBook(req, res, next);
  
      expect(next).toHaveBeenCalledWith(new CustomError(400, 'Author is missing'));
    });

    it('should not create a book if ISBN field is missing', async () => {
      const { req, res, next } = mockExpressObjects();
      req.body = { title: 'New Book', author: 'Author', publishedDate: '2024-07-31' };
  
      await bookController.createBook(req, res, next);
  
      expect(next).toHaveBeenCalledWith(new CustomError(400, 'ISBN is missing'));
    });

    it('should not create a book if title field is missing', async () => {
      const { req, res, next } = mockExpressObjects();
      req.body = { ISBN: 123, author: 'Author', publishedDate: '2024-07-31' };
  
      await bookController.createBook(req, res, next);
  
      expect(next).toHaveBeenCalledWith(new CustomError(400, 'Title is missing'));
    });
  });
});
  