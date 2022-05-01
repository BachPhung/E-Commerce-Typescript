import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "../types";

export type initialCartStateType = {
  products: CartProduct[],
  quantity: number,
  total: number,
  userId: string | null
}
const login = Object.keys(JSON.parse(localStorage.getItem("user") || "{}")).length != 0 ? true : false;
const cart = login
  ? JSON.parse(localStorage.getItem("user") || '{}')?.currentUser?.cart
  : JSON.parse(localStorage.getItem('cart') || '{}') as initialCartStateType

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: cart.products || [],
    quantity: cart.quantity || 0,
    total: cart.total || 0,
    userId: null
  } as initialCartStateType,
  reducers: {
    addProduct: (state, action) => {
      state.quantity += action.payload.quantity
      state.products.push(action.payload)
      state.total += action.payload.price * action.payload.quantity
      state.total = Math.round(state.total * 100) / 100
      !login && localStorage.setItem('cart', JSON.stringify(state));
    },
    addQuantity: (state, action) => {
      let productPayload: CartProduct = action.payload
      const index = state.products.findIndex(product => {
        return product.product === productPayload.product
          && product.color === productPayload.color
          && product.size === productPayload.size
      });
      state.quantity += 1
      state.products[index].quantity += 1
      state.total += action.payload.price
      state.total = Math.round(state.total * 100) / 100
      !login && localStorage.setItem('cart', JSON.stringify(state))
    },
    decreaseQuantity: (state, action) => {
      state.quantity += -1
      let productPayload: CartProduct = action.payload
      const index = state.products.findIndex(product => {
        return product.product === productPayload.product
          && product.color === productPayload.color
          && product.size === productPayload.size
      });
      state.products[index].quantity -= 1
      state.total -= action.payload.price
      state.total = Math.round(state.total * 100) / 100
      state.products = state.products.filter(product => product.quantity > 0)
      !login && localStorage.setItem('cart', JSON.stringify(state))
    },
    setCart: (state, action) => {
      state.products = action.payload.products || []
      state.quantity = action.payload.quantity || 0
      state.total = action.payload.total || 0
      state.userId = action.payload.userId || null
    }
  }
})

export const { addProduct, addQuantity, decreaseQuantity, setCart } = cartSlice.actions
export default cartSlice.reducer