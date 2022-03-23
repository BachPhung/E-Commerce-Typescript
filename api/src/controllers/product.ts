import ProductServ from '../services/products';
import Product, { ProductDocument } from '../models/Product';
import { Request, Response, NextFunction } from 'express';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const queryNewProduct = req.query.new;
    const queryCategory = req.query.category?.toString();
    try{
        let foundProducts: Array<ProductDocument>
        if(queryNewProduct){
            foundProducts = await ProductServ.findQueryNew();
        }
        else if (queryCategory){
            foundProducts = await ProductServ.findQueryCategory(queryCategory);
        }
        else{
            foundProducts = await ProductServ.findAll();
        }
        res.status(200).json(foundProducts);
    }
    catch(err){
        next(err);
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProductInfo = req.body;
        const productId = req.params.id;
        const updatedProduct = await ProductServ.update(productId, newProductInfo);
        res.status(200).json(updatedProduct);
    }
    catch(err){
        next(err);
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await ProductServ.deleteProduct(req.params.id);
        res.status(200).json("Delete product success");
    }
    catch(err){
        next(err);
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foundProduct = await ProductServ.findById(req.params.id);
        res.status(200).json(foundProduct)
    }
    catch(err){
        next(err);
    }
}

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProduct = await ProductServ.create(new Product(req.body));
        res.status(200).json(newProduct);
    }   
    catch(err){
        next(err);
    }
}