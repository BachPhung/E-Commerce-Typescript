import CartServ from '../services/carts';
import { Request, Response, NextFunction } from 'express';
import Cart from '../models/Cart';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundCarts = await CartServ.findAll();
    res.status(200).json(foundCarts);
  }
  catch (err) {
    next(err);
  }
}

// Add product to cart
export const updateCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let quantity: number = 0;
    let total: number = 0;
    let products;
    const cartId = req.params.id;
    const fetchedCart = await CartServ.findById(cartId);
    if (req.body.products) {
      products = fetchedCart.products.concat(req.body.products)
      products.forEach(p => {
        if (p.quantity) {
          quantity += p.quantity;
          total += p.price * p.quantity
        }
        else {
          quantity += 1;
          total += p.price
        }
      })
    }
    const newCart = {
      products,
      quantity,
      total: Math.round(total * 100) / 100
    }
    const updatedCart = await CartServ.update(cartId, newCart);
    res.status(200).json(updatedCart);
  }
  catch (err) {
    next(err);
  }
}

//Increase quantity of product
export const increaseQuantity = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const cartId = req.params.id;
    const fetchedCart = await CartServ.findById(cartId);
    const body = req.body;
    const size = body.size;
    const color = body.color;
    const price = body.price
    const productId = body.productId
    let products = fetchedCart.products
    const updatedProductIndex = products.findIndex(p => {
      console.log(p.product.id, productId);
      return (p.product.id === productId && p.size === size && p.color === color)
    })
    console.log(updatedProductIndex);
    products[updatedProductIndex].quantity++
    const newCart = {
      products,
      quantity: fetchedCart.quantity + 1,
      total: Math.round((fetchedCart.total + price) * 100) / 100
    }
    const updatedCart = await CartServ.update(cartId, newCart);
    res.status(200).json(updatedCart);
  }
  catch (err) {
    next(err)
  }
}

// Decrease quantity of product
export const decreaseQuantity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartId = req.params.id;
    const fetchedCart = await CartServ.findById(cartId);
    const body = req.body;
    const size = body.size;
    const color = body.color;
    const price = body.price
    const productId = body.productId
    let products = fetchedCart.products
    const updatedProductIndex = products.findIndex(p => {
      console.log(p.product.id, productId);
      return (p.product.id === productId && p.size === size && p.color === color)
    })
    console.log(updatedProductIndex);
    const updatedProduct = products[updatedProductIndex]
    if (updatedProduct.quantity === 1) {
      products = products.filter(p => {
        return !(p.size === size && p.color === color && p.product.id === productId)
      })
    }
    else {
      products[updatedProductIndex].quantity--
    }
    const newCart = {
      products,
      quantity: fetchedCart.quantity - 1,
      total: Math.round((fetchedCart.total - price) * 100) / 100
    }
    const updatedCart = await CartServ.update(cartId, newCart);
    res.status(200).json(updatedCart);
  }
  catch (err) {
    next(err)
  }
}

export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await CartServ.deleteCart(req.params.id);
    res.status(200).json("Delete cart success");
  }
  catch (err) {
    next(err);
  }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundCart = await CartServ.findById(req.params.id);
    res.status(200).json(foundCart)
  }
  catch (err) {
    next(err);
  }
}

export const findByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundCart = await CartServ.findByUserId(req.params.id);
    res.status(200).json(foundCart)
  }
  catch (err) {
    next(err)
  }
}

export const addCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCart = await CartServ.create(new Cart(req.body));
    return res.status(200).json(newCart);
  }
  catch (err) {
    next(err);
  }
}

export const cleanCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedCart = await CartServ.cleanCart(req.params.id);
    return res.status(200).json(updatedCart)
  }
  catch (err) {
    next(err)
  }
}
