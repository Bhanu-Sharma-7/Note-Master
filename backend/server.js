import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRouter from './routers/auth.router.js';
import cookieParser from 'cookie-parser';
import noteRouter from './routers/note.router.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/auth', authRouter)
app.use('/api/auth', authRouter)
app.use('/api/notes', noteRouter)

app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});