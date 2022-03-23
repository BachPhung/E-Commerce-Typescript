import express from 'express';
import {stripeCharge} from '../controllers/stripe';

const router = express.Router();

router.post('/payment', stripeCharge);

export default router;