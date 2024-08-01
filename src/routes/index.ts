import { Router } from 'express';
import AppController from '../controller/appController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: App
 *   description: Application status
 */
/**
 * @swagger
 * /status:
 *   get:
 *     summary: Get the status of the application
 *     tags: [App]
 *     responses:
 *       200:
 *         description: The application is running and the database is connected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Describes the status of the application
 *               example:
 *                 success: "true"
 *                 message: "Database is connected"
 *       500:
 *         description: There was an error connecting to the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Describes the error
 *               example:
 *                 success: "false"
 *                 message: "Database connection error"
 */

router.get('/', AppController.getStatus);

export default router;
