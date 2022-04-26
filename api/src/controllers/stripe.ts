import { Request, Response } from 'express';
import Stripe from 'stripe'
import config from '../middlewares/config'
const stripe = new Stripe(config.STRIPE_KEY!, {
  apiVersion: '2020-08-27'
});


export const stripeCharge = async (req: Request, res: Response) => {
  return stripe.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: 'eur'
  })
}