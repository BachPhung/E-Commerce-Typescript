import express from 'express'
import verifyServ from '../controllers/verifyToken'
import {findAll, updateCart, deleteCart, findById, addCart, findByUserId, cleanCart, decreaseQuantity, increaseQuantity } from '../controllers/cart'

const router = express.Router()

router.get('/',verifyServ.verifyTokenAndAdmin, findAll);
router.get('/:id', verifyServ.verifyTokenAndAuthorization, findById);
router.get('/find/:id', verifyServ.verifyTokenAndAuthorization, findByUserId);
router.post('/', verifyServ.verifyToken, addCart);
router.put('/:id', verifyServ.verifyTokenAndAuthorization, updateCart);
router.delete('/:id', verifyServ.verifyTokenAndAuthorization, deleteCart);
router.put('/clean/:id', verifyServ.verifyTokenAndAuthorization, cleanCart);
router.put('/decrease/:id', verifyServ.verifyTokenAndAuthorization, decreaseQuantity);
router.put('/increase/:id', verifyServ.verifyTokenAndAuthorization, increaseQuantity);
export default router;