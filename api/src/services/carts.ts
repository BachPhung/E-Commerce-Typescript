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
  const foundCart: CartDocument | null = await Cart.findById(cartId).populate("products.product", { img: 1, size: 1, color: 1 });
  if (!foundCart) {
    throw new Error(`Product ${cartId} not found`);
  }
  return foundCart;
}

const findByUserId = async (userIdCart: string): Promise<CartDocument> => {
  const foundCart: CartDocument | null = await Cart.findOne({ userId: userIdCart }).populate("products.product", { img: 1, size: 1, color: 1 });
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

export default {
  create,
  update,
  findById,
  findAll,
  deleteCart,
  findByUserId
}

