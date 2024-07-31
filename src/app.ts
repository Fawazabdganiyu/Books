import cors from 'cors';
import express from 'express';
import indexRouter from './routes/index';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', indexRouter);

export default app;
