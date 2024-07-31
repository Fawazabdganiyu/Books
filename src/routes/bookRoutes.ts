import { Router } from 'express';
import bookController from '../controller/bookController';

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
 *         id:
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
 *           type: string
 *           description: The ISBN of the book
 *         createdAt:
 *           type: Date
 *           description: The date the book was created
 *         updatedAt:
 *           type: Date
 *           description: The date the book was last updated
 *       example:
 *         id: 66aa2c5caa4d1d2ffb7a13a5
 *         title: 'The New Age'
 *         author: 'Fawaz Abdganiyu'
 *         publishedDate: 'Jul. 31, 2024'
 *         ISBN: '123456789'
 *         createdAt: '2021-08-01T00:00:00.000Z'
 *         updatedAt: '2021-08-01T00:00:00.000Z'  
 *
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
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
 *               $ref: '#/components/schemas/Book'
 *             example:
 *               id: 66aa2c5caa4d1d2ffb7a13a5
 *               title: 'The New Age'
 *               author: 'Fawaz Abdganiyu'
 *               publishedDate: 'Apr. 1, 2024'  # Output format
 *               createdAt: '2021-08-01T00:00:00.000Z'
 *               updatedAt: '2021-08-01T00:00:00.000Z'
 *       400:
 *         description: Bad request. The book already exists
 *       500:
 *         description: Internal server error
 */
router.post('/', bookController.createBook);

export default router;
