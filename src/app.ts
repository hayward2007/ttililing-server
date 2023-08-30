import express from 'express';
import dialogueRouter from './routes/dialogue';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/dialogue', dialogueRouter);
export default app;
