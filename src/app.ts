import express from 'express';
import gptRouter from './routes/gpt';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/gpt', gptRouter);


export default app;
