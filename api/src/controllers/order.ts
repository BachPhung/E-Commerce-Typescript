import OrderServ from '../services/orders';
import { Request, Response, NextFunction } from 'express';
import Order from '../models/Order';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundOrders = await OrderServ.findAll();
    res.status(200).json(foundOrders);
  }
  catch (err) {
    next(err);
  }
}

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newOrderInfo = req.body;
    const orderId = req.params.id;
    const updatedOrder = await OrderServ.update(orderId, newOrderInfo);
    res.status(200).json(updatedOrder);
  }
  catch (err) {
    next(err);
  }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await OrderServ.deleteOrder(req.params.id);
    res.status(200).json("Delete order success");
  }
  catch (err) {
    next(err);
  }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundOrder = await OrderServ.findById(req.params.id);
    res.status(200).json(foundOrder)
  }
  catch (err) {
    next(err);
  }
}

export const findMonthlyOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundOrders = await OrderServ.findMonthlyOrder();
    res.status(200).json(foundOrders)
  }
  catch (err) {
    next(err)
  }
}

export const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newOrder = OrderServ.create(new Order(req.body));
    res.status(200).json(newOrder);
  }
  catch (err) {
    next(err);
  }
}