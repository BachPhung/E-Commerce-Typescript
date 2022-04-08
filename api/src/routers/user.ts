import express from 'express'
import verifyServ from '../controllers/verifyToken'
import { findAll, findById, updateUser, deleteUser, bannedUser } from '../controllers/user'

const router = express.Router()

router.get('/', verifyServ.verifyTokenAndAdmin ,findAll);
router.get('/:id', verifyServ.verifyTokenAndAuthorization, findById);
router.put('/:id', verifyServ.verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyServ.verifyTokenAndAuthorization, deleteUser);
router.put('/banned/:id', verifyServ.verifyTokenAndAdmin, bannedUser);

export default router

