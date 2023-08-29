import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

import connectDB from './config/db.js'

import userRouter from './routes/userRoutes.js'
import reviewRouter from './routes/reviewRouter.js'

const app = express();
app.use(express.json());
app.use(helmet());

dotenv.config();

connectDB()

//Routes
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
