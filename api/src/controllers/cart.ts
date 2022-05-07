import CartServ from '../services/carts';
import { Request, Response, NextFunction } from 'express';
import Cart, { CartDocument } from '../models/Cart';
import { ProductOrderDocument } from '../models/Order';

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
    let products: ProductOrderDocument[] = [];
    const cartId = req.params.id;
    const fetchedCart: CartDocument = await CartServ.findById(cartId);
    products = fetchedCart.products
    quantity = fetchedCart.quantity
    total = fetchedCart.total
    if (req.body.products) {
      const checkExistedProductIndex = fetchedCart.products.findIndex(p => {
        return p.product._id == req.body.products[0].product
          && p.color == req.body.products[0].color
          && p.size == req.body.products[0].size
      })
      if (checkExistedProductIndex !== -1) {
        products[checkExistedProductIndex].quantity += req.body.products[0].quantity || 1
      }
      else {
        products = products.concat(req.body.products)
      }
      total += req.body.products[0].price * req.body.products[0].quantity
      quantity += req.body.products[0].quantity
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
export const increaseQuantity = async (req: Request, res: Response, next: NextFunction) => {
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
