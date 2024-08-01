import { Router } from 'express';
import BookController from '../controller/bookController';
import dynamicSingleUpload from '../middlewares/fileUpload';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - publishedDate
 *         - ISBN
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         publishedDate:
 *           type: string
 *           description: The published date of the book
 *         ISBN:
 *           type: number
 *           description: The ISBN of the book
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the book was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the book was last updated
 *       example:
 *         _id: 66aa2c5caa4d1d2ffb7a13a5
 *         title: 'The New Age'
 *         author: 'Fawaz Abdganiyu'
 *         publishedDate: 'Jul. 31, 2024'
 *         ISBN: '123456789'
 *         createdAt: "2021-08-01T00.00.00.000Z"
 *         updatedAt: "2021-08-01T00.00.00.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - publishedDate
 *               - ISBN
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book
 *                 example: The New Age
 *               author:
 *                 type: string
 *                 description: The author of the book
 *                 example: Fawaz Abdganiyu
 *               publishedDate:
 *                 type: string
 *                 description: The published date of the book
 *                 example: 2024-04-01
 *               ISBN:
 *                 type: number
 *                 description: The ISBN of the book
 *                 example: 123456789
 *               bookFile:
 *                 type: string
 *                 format: binary
 *                 description: The book to be uploaded (PDF or ePub)
 *           example:   # Example for request body
 *             title: 'The New Age'
 *             author: 'Fawaz Abdganiyu'
 *             publishedDate: '2024-04-01'  # Expected input format
 *             ISBN: '123456789'
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: '60d0fe4f5311236168a109ca'
 *                     title:
 *                       type: string
 *                       description: The title of the book
 *                       example: 'The New Age'
 *                     author:
 *                       type: string
 *                       description: The author of the book
 *                       example: 'Fawaz Abdganiyu'
 *                     publishedDate:
 *                       type: string
 *                       description: The published date of the book
 *                       example: 'Jul. 31, 2024'
 *                     ISBN:
 *                       type: number
 *                       description: The unique ISBN of the book
 *                       example: 123456789
 *                     bookFile:
 *                       type: string
 *                       description: The file URL of the book
 *                       example: 'uploads/new-book.pdf'
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date the book was created
 *                       example: '2021-08-01T00:00:00.000Z'
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date the book was last updated
 *                       example: '2021-08-01T00:00:00.000Z'
 *       400:
 *         description: Bad request. The book already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Response status
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 success: "false"
 *                 message: The book already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Response status
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 success: "false"
 *                 message: Error uploading file
 */
router.post('/', dynamicSingleUpload('bookFile'), BookController.createBook);

/**
 * @swagger
 * /books/cover-image/{id}:
 *   patch:
 *     summary: Update book cover image
 *     description: Updates the cover image of a book.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               coverImage:
 *                 type: string
 *                 format: binary
 *                 description: The cover image file to upload
 *     responses:
 *       200:
 *         description: Cover image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: '60d0fe4f5311236168a109ca'
 *                     title:
 *                       type: string
 *                       description: The title of the book
 *                       example: 'The New Age'
 *                     author:
 *                       type: string
 *                       description: The author of the book
 *                       example: 'Fawaz Abdganiyu'
 *                     publishedDate:
 *                       type: string
 *                       description: The published date of the book
 *                       example: 'Jul. 31, 2024'
 *                     ISBN:
 *                       type: number
 *                       description: The unique ISBN of the book
 *                       example: 123456789
 *                     bookFile:
 *                       type: string
 *                       description: The file URL of the book
 *                       example: 'uploads/new-book.pdf'
 *                     coverImage:
 *                       type: string
 *                       description: The cover image URL of the book
 *                       example: 'uploads/new-image.jpg'
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date the book was created
 *                       example: '2021-08-01T00:00:00.000Z'
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date the book was last updated
 *                       example: '2021-08-01T00:00:00.000Z'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Error updating cover image'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Book not found'
 */
router.patch('/cover-image/:id', dynamicSingleUpload('coverImage'), BookController.updateBookCoverImage);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get a list of all books in the collection
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *         description: Empty book collection
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: No book collection found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Error fetching books
 */
router.get('/', BookController.getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to get
 *     responses:
 *       200:
 *         description: The book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Book not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Error fetching book
 */
router.get('/:id', BookController.getBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The updated book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Invalid book id'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Book not found'
 */
router.put('/:id', BookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to delete
 *     responses:
 *       200:
 *         description: The book was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Book deleted successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Invalid book id'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Book not found'
 */
router.delete('/:id', BookController.deleteBook);

export default router;
