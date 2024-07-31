import { Router } from 'express';
import AppController from '../controller/appController';

const router = Router();

router.get('/', AppController.getStatus);

export default router;
