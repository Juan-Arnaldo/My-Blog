import express from 'express';
import { addUser, authenticateUser, logout } from '../controllers/userController.js';

const router = express.Router();

router.post('/', addUser)

router.post('/login', authenticateUser)
      .get('/logout', logout)

export default router