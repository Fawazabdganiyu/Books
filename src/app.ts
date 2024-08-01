import cors from 'cors';
import express from 'express';
import errorHandler from './middlewares/errorHandler';
import bookRouter from './routes/bookRoutes';
import fileRouter from './routes/fileRoutes';
import indexRouter from './routes/index';
import setupSwagger from './config/swagger';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/status', indexRouter);
app.use('/api/books', bookRouter);
app.use('/api/books', fileRouter);

app.use(errorHandler);

setupSwagger(app);

export default app;
