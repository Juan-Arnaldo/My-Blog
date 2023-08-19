import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js'

const app = express();
app.use(express.json());

dotenv.config();

connectDB()

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
