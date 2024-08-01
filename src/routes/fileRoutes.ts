import { Router } from 'express';
import dynamicSingleUpload from '../middlewares/fileUpload';
import FileController from '../controller/fileController';

const router = Router();

/**
 * @swagger
 * /books/upload/{id}:
 *   put:
 *     summary: Upload a book file
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *           format: string
 *         example: 66aab783e5de826398cd4ae2
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bookFile:
 *                 type: file
 *                 description: The file to upload (PDF or ePub)
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                 message:
 *                   type: string
 *                   description: File upload success message
 *               example:
 *                 success: "true"
 *                 message: File uploaded successfully
 *       400:
 *         description: Bad request, file not uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request status
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 success: "false"
 *                 message: Error No file selected
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
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 success: "false"
 *                 message: Book not found
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
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 success: "false"
 *                 message: Error uploading file
 */
router.put('/upload/:id', dynamicSingleUpload('bookFile'), FileController.uploadFile);

export default router;
