import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routers/user.route.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/user', authRouter);


export default app;