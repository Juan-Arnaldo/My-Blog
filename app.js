import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js'

import userRouter from './routes/userRoutes.js'


const app = express();
app.use(express.json());
app.disable('x-powered-by');

dotenv.config();

connectDB()

//Routes
app.use('/api/user', userRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
