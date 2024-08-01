import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import bookController from '../../src/controller/bookController';
import Book from '../../src/models/bookModel';
import { IBook } from '../../src/types/book';
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

  describe('updateBookCoverImage', () => {
    let newBook: IBook;
    it('should update the cover image of a book', async () => {
      const { req, res, next } = mockExpressObjects();
      newBook = await Book.create({
        title: 'New Book',
        author: 'Author',
        publishedDate: '2024-07-31',
        ISBN: 123456789
      });
      req.params = { id: newBook._id.toString() as string };
      req.file = { filename: 'new-cover-image.jpg' } as Express.Multer.File;

      await bookController.updateBookCoverImage(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'true', data: expect.any(Object) });
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ coverImage: expect.any(String) })
      }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should not update the cover image if the book does not exist', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: '60d0fe4f5311236168a109cb' };

      await bookController.updateBookCoverImage(req, res, next);

      expect(next).toHaveBeenCalledWith(new CustomError(404, 'Book not found'));
    });

    it('should not update the cover image if the cover image is missing', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: newBook._id.toString() as string };

      await bookController.updateBookCoverImage(req, res, next);

      expect(next).toHaveBeenCalledWith(new CustomError(400, 'Cover image is missing'));
    });

    it('should not update the cover image if the book ID is invalid', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: 'invalid-id' };

      await bookController.updateBookCoverImage(req, res, next);

      expect(next).toHaveBeenCalledWith(new CustomError(400, 'Invalid book id'));
    });
  });

  describe('getBooks', () => {
    it('should get all books', async () => {
      const { req, res, next } = mockExpressObjects();

      await bookController.getBooks(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'true', data: expect.any(Array) });
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next with an error if no books are found', async () => {
      const { req, res, next } = mockExpressObjects();
      jest.spyOn(Book, 'find').mockResolvedValueOnce([]);

      await bookController.getBooks(req, res, next);

      expect(res.status).not.toHaveReturnedWith(200);
    });
  });

  describe('getBook', () => {
    let newBook: IBook;
    it('should get a book by ID', async () => {
      const { req, res, next } = mockExpressObjects();
      newBook = await Book.create({
        title: 'New Book',
        author: 'Author',
        publishedDate: '2024-08-01',
        ISBN: 123456789
      });
      req.params = { id: newBook._id.toString() as string };

      await bookController.getBook(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'true', data: expect.any(Object) });
      expect(next).not.toHaveBeenCalled();
    });

    it('should not get a book if the book ID is invalid', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: 'invalid-id' };

      await bookController.getBook(req, res, next);

      expect(next).toHaveBeenCalledWith(new CustomError(400, 'Invalid book id'));
    });

    it('should not get a book if the book does not exist', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: '60d0fe4f5311236168a109cb' };

      await bookController.getBook(req, res, next);

      expect(next).toHaveBeenCalledWith(new CustomError(404, 'Book not found'));
    });
  });

  describe('updateBook', () => {
    let newBook: IBook;
    it('should update a book by ID', async () => {
      const { req, res, next } = mockExpressObjects();
      newBook = await Book.create({
        title: 'New Book',
        author: 'Fawaz Abdganiyu',
        publishedDate: '2024-08-01',
        ISBN: 123456789
      });
      req.params = { id: newBook._id.toString() as string };
      req.body = { title: 'Updated Book', author: 'John Smith', publishedDate: '2024-08-01', ISBN: 123456789 };

      await bookController.updateBook(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'true', data: expect.any(Object) });
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ title: 'Updated Book', author: 'John Smith' })
      }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should not update a book if the book ID is invalid', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: 'invalid-id' };
      req.body = { title: 'Updated Book', author: 'John Smith' };

      await bookController.updateBook(req, res, next);

      expect(next).toHaveBeenCalledWith(new CustomError(400, 'Invalid book id'));
    });

    it('should not update a book if the book does not exist', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: '60d0fe4f5311236168a109cb' };

      await bookController.updateBook(req, res, next);

      expect(next).toHaveBeenCalledWith(new CustomError(404, 'Book not found'));
    });

    it('should update only a book title', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: newBook._id.toString() as string };
      req.body = { title: 'Updated Book' };

      await bookController.updateBook(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'true', data: expect.any(Object) });
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ title: 'Updated Book', author: 'John Smith' })
      }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should update only a book author', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: newBook._id.toString() as string };
      req.body = { author: 'John Smith' };

      await bookController.updateBook(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'true', data: expect.any(Object) });
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ title: 'Updated Book', author: 'John Smith' })
      }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should update only a book published date', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: newBook._id.toString() as string };
      req.body = { publishedDate: '2024-07-31' };

      await bookController.updateBook(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'true', data: expect.any(Object) });
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ publishedDate: 'Jul. 31, 2024', author: 'John Smith' })
      }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should update only a book ISBN', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: newBook._id.toString() as string };
      req.body = { ISBN: 6789 };

      await bookController.updateBook(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'true', data: expect.any(Object) });
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ ISBN: 6789, author: 'John Smith' })
      }));
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('deleteBook', () => {
    let newBook: IBook;
    it('should delete a book by ID', async () => {
      const { req, res, next } = mockExpressObjects();
      newBook = await Book.create({
        title: 'New Book',
        author: 'Fawaz Abdganiyu',
        publishedDate: '2024-08-01',
        ISBN: 1256789
      });
      req.params = { id: newBook._id.toString() as string };

      await bookController.deleteBook(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'true', message: 'Book deleted successfully' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should not delete a book if the book ID is invalid', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: 'invalid-id' };

      await bookController.deleteBook(req, res, next);

      expect(next).toHaveBeenCalledWith(new CustomError(400, 'Invalid book id'));
    });

    it('should not delete a book if the book does not exist', async () => {
      const { req, res, next } = mockExpressObjects();
      req.params = { id: '60d0fe4f5311236168a109cb' };

      await bookController.deleteBook(req, res, next);

      expect(next).toHaveBeenCalledWith(new CustomError(404, 'Book not found'));
    });

    it('should delete all book files from storage', async () => {
      const newBook1 = await Book.create({
        title: 'New Book',
        author: 'Fawaz Abdganiyu',
        publishedDate: '2024-08-01',
        ISBN: 1256789
      });
      const { req, res, next } = mockExpressObjects();
      req.params = { id: newBook1._id.toString() as string };
      req.body = { bookFile: 'new-book-file.pdf', coverImage: 'new-cover-image.jpg' };

      await bookController.deleteBook(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'true', message: 'Book deleted successfully' });
      expect(next).not.toHaveBeenCalled();
      expect(newBook1.bookFile).toBeUndefined();
      expect(newBook1.coverImage).toBeUndefined();
      expect(fs.existsSync('uploads/new-book-file.pdf')).toBe(false);
      expect(fs.existsSync('uploads/new-cover-image.jpg')).toBe(false);
    });
  });
});
  