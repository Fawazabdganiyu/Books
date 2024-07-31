import cors from 'cors';
import express from 'express';
import errorHandler from './middlewares/errorHandler';
import bookRouter from './routes/bookRoutes';
import indexRouter from './routes/index';
import setupSwagger from './config/swagger';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
app.use('/books', bookRouter);

app.use(errorHandler);

setupSwagger(app);

export default app;
