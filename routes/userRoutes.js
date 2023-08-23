import express from 'express'
import { addUser, authenticateUser, updateUser, deleteUser, logout } from '../controllers/userController.js'

const router = express.Router()

//middleware here

router.post('/', addUser)
      .patch('/:id', updateUser)
      .delete('/:id', deleteUser);

router.post('/login', authenticateUser)
      .get('/logout', logout)

export default router;