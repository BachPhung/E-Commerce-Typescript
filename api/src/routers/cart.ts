import express from 'express'
import verifyServ from '../controllers/verifyToken'
import {findAll, updateCart, deleteCart, findById, addCart, findByUserId } from '../controllers/cart'

const router = express.Router()

router.get('/',verifyServ.verifyTokenAndAdmin, findAll);
router.get('/:id', verifyServ.verifyTokenAndAuthorization, findById);
router.get('/find/:id', verifyServ.verifyTokenAndAuthorization, findByUserId);
router.post('/', verifyServ.verifyToken, addCart);
router.put('/:id', verifyServ.verifyTokenAndAuthorization, updateCart);
router.delete('/:id', verifyServ.verifyTokenAndAuthorization, deleteCart);

export default router;