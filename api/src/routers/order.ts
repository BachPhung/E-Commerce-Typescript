import express from 'express'
import verifyServ from '../controllers/verifyToken'
import {findAll, updateOrder, deleteOrder, findById, addOrder, findMonthlyOrder } from '../controllers/order'

const router = express.Router()

router.post('/', verifyServ.verifyToken, addOrder);
router.get('/',verifyServ.verifyTokenAndAdmin, findAll);
router.get('/:id', verifyServ.verifyTokenAndAuthorization, findById);
router.put('/:id', verifyServ.verifyTokenAndAuthorization, updateOrder);
router.delete('/:id', verifyServ.verifyTokenAndAuthorization, deleteOrder);
router.get('/stats', verifyServ.verifyTokenAndAdmin, findMonthlyOrder);

export default router;