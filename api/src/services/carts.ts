import Cart, { CartDocument } from '../models/Cart'

// CREATE
const create = async (cart: CartDocument): Promise<CartDocument> => {
  return cart.save();
}

// CHANGE

const update = async (cartId: string, updatedCart: Partial<CartDocument>): Promise<CartDocument | null> => {
  const foundCart: CartDocument | null = await Cart.findByIdAndUpdate(cartId, updatedCart, { new: true });
  if (!foundCart) {
    throw new Error(`Product ${cartId} not found`);
  }
  return foundCart
}

const findById = async (cartId: string): Promise<CartDocument> => {
  const foundCart: CartDocument | null = await Cart.findById(cartId).populate("products.product");
  if (!foundCart) {
    throw new Error(`Product ${cartId} not found`);
  }
  return foundCart;
}

const findByUserId = async (userIdCart: string): Promise<CartDocument> => {
  const foundCart: CartDocument | null = await Cart.findOne({ userId: userIdCart }).populate("products.product");
  if (!foundCart) {
    throw new Error(`Product ${userIdCart} not found`);
  }
  return foundCart;
}

const deleteCart = async (cartId: string): Promise<CartDocument | null> => {
  const foundCart: CartDocument | null = await Cart.findByIdAndDelete(cartId)
  if (!foundCart) {
    throw new Error(`product ${cartId} not found`);
  }
  return foundCart;
}

const findAll = async (): Promise<CartDocument[]> => {
  return Cart.find()
}

const cleanCart = async (cartId: string): Promise<CartDocument | null> =>{
  const foundCart: CartDocument | null = await Cart.findByIdAndUpdate(cartId,{quantity:0,total:0,products:[]},{ new: true })
  if(!foundCart){
    throw new Error(`product ${cartId} not found`);
  }
  return foundCart;
}

export default {
  create,
  update,
  findById,
  findAll,
  deleteCart,
  findByUserId,
  cleanCart
}

