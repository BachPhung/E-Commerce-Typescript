import CartServ from '../services/carts';
import { Request, Response, NextFunction } from 'express';
import Cart from '../models/Cart';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try{
       const foundCarts = await CartServ.findAll();
        res.status(200).json(foundCarts);
    }
    catch(err){
        next(err);
    }
}

export const updateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCartInfo = req.body;
        const cartId = req.params.id;
        const updatedCart = await CartServ.update(cartId, newCartInfo);
        res.status(200).json(updatedCart);
    }
    catch(err){
        next(err);
    }
}

export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await CartServ.deleteCart(req.params.id);
        res.status(200).json("Delete cart success");
    }
    catch(err){
        next(err);
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foundCart = await CartServ.findById(req.params.id);
        res.status(200).json(foundCart)
    }
    catch(err){
        next(err);
    }
}

export const addCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCart = CartServ.create(new Cart(req.body));
        res.status(200).json(newCart);
    }   
    catch(err){
        next(err);
    }
}