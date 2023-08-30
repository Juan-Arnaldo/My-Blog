import express from 'express'
import {updateUser, deleteUser} from '../controllers/userController.js'

const router = express.Router()

router.patch('/:id', updateUser)
      .delete('/:id', deleteUser);

export default router;