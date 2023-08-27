import express from 'express'
import checkAuth from '../middlewere/authMiddlewere.js';
import { addUser, authenticateUser, updateUser, deleteUser, logout } from '../controllers/userController.js'

const router = express.Router()

//middleware here

router.post('/', addUser)
      .patch('/:id', checkAuth, updateUser)
      .delete('/:id', checkAuth, deleteUser);

router.post('/login', authenticateUser)
      .get('/logout', logout)

export default router;