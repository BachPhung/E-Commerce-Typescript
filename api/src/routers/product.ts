import express from 'express'
import verifyServ from '../controllers/verifyToken'
import {findAll, updateProduct, deleteProduct, findById, addProduct } from '../controllers/product'

const router = express.Router()

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', verifyServ.verifyTokenAndAdmin, addProduct);
router.put('/:id', verifyServ.verifyTokenAndAdmin, updateProduct);
router.delete('/:id', verifyServ.verifyTokenAndAdmin, deleteProduct);

export default router;