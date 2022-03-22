import Cart, {CartDocument} from '../models/Cart'

// CREATE
const create = async (cart: CartDocument): Promise<CartDocument> =>{
    return cart.save();
}

// CHANGE

const update = async(cartId:string, updatedCart: Partial<CartDocument>): Promise<CartDocument | null> =>{
    const foundCart = await Cart.findByIdAndUpdate(cartId, updatedCart, {new: true});
    if(!foundCart) {
        throw new Error(`Product ${cartId} not found`);
    }
    return foundCart
}

const findById = async (cartId: string): Promise<CartDocument> =>{
    const foundCart = await Cart.findById(cartId);
    if(!foundCart){
        throw new Error(`Product ${cartId} not found`);
    }
    return foundCart;
}

const deleteCart = async (cartId: string): Promise<CartDocument | null> =>{
    const foundCart = await Cart.findByIdAndDelete(cartId)
    if(!foundCart){
        throw new Error(`product ${cartId} not found`);
    }
    return foundCart;
}

const findAll = async (): Promise<CartDocument[]> => {
    return Cart.find()
}

export default {
    create,
    update,
    findById,
    findAll,
    deleteCart
}

