import express from 'express'
import { addUser, authenticateUser, updateUser, deleteUser } from '../controllers/userController.js'

const router = express.Router()

//middleware here

router.post('/addUser', addUser)
      .get('/login', authenticateUser)
      .patch('/updateUser/:id', updateUser)
      .delete('/deleteUser/:id', deleteUser);

export default router;