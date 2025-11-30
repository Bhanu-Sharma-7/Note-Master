import express, { json } from 'express';
import dotenv from 'dotenv';
import connectDB  from './config/db.js';
import userRoutes from './routers/user.route.js';


const app = express();
const PORT = process.env.PORT || 8080;


app.use(express,json())
dotenv.config();

app.use('/api', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    connectDB()
})