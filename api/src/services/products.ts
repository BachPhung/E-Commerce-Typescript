import Product, {ProductDocument} from '../models/Product'

const create = async (product: ProductDocument): Promise<ProductDocument> =>{
    return product.save();
}

const findById = async (productId: string): Promise<ProductDocument> =>{
    const foundProduct = await Product.findById(productId);
    if(!foundProduct){
        throw new Error(`Product ${productId} not found`);
    }
    return foundProduct;
}

const findByCredential = async (obj: Object): Promise<ProductDocument> => {
    const foundProduct = await Product.findOne({...obj})
    if(!foundProduct){
        throw new Error(`Product not found`);
    }
    return foundProduct;
}

const findAll = async (): Promise<ProductDocument[]> =>{
    return Product.find()
}

const findQueryNew = async (): Promise<ProductDocument[]> => {
    return Product.find().sort({createdAt: -1}).limit(20)
}

const findQueryCategory = async (qCategory:string): Promise<ProductDocument[]> => {
    return Product.find({
        categories: {
            $in: [qCategory]
        }
    })
}

const update = async(productId:string, updatedProduct: Partial<ProductDocument>): Promise<ProductDocument | null> =>{
    const foundProduct = await Product.findByIdAndUpdate(productId, updatedProduct, {new: true});
    if(!foundProduct) {
        throw new Error(`Product ${productId} not found`);
    }
    return foundProduct
}

const deleteProduct = async (productId: string): Promise<ProductDocument | null> =>{
    const foundProduct = await Product.findByIdAndDelete(productId)
    if(!foundProduct){
        throw new Error(`product ${productId} not found`);
    }
    return foundProduct
}



export default {
    create,
    findById,
    findAll,
    update,
    deleteProduct,
    findByCredential,
    findQueryNew,
    findQueryCategory
}