import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "../types";

export type initialCartStateType = {
  products : CartProduct[],
  quantity: number,
  total: number
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0
  } as initialCartStateType,
  reducers: {
    addProduct: (state, action) => {
      state.quantity += action.payload.quantity
      state.products.push(action.payload)
      state.total +=  Math.round((action.payload.price * action.payload.quantity * 100))/100
    },
    addQuantity: (state, action) => {
      let productPayload:CartProduct = action.payload
      const index = state.products.findIndex(product=> JSON.stringify(product) === JSON.stringify(productPayload));
      state.quantity += 1
      state.products[index].quantity += 1
      state.total += action.payload.price
      state.total = Math.round(state.total*100)/100
    },
    decreaseQuantity: (state, action) => {
      state.quantity += -1
      let productPayload:CartProduct = action.payload
      const index = state.products.findIndex(product=> JSON.stringify(product) === JSON.stringify(productPayload));
      state.products[index].quantity -= 1
      state.total -= action.payload.price
      state.total = Math.round(state.total*100)/100
      state.products = state.products.filter(product => product.quantity > 0)
    }
  }
})

export const { addProduct, addQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer