import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "../components/ProductList/ProductList";
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: <CartProduct[]>[],
    quantity: 0,
    total: 0
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += action.payload.quantity
      state.products.push(action.payload)
      state.total +=  Math.round((action.payload.price * action.payload.quantity * 100))/100
    },
    addQuantity: (state, action) => {
      state.quantity += 1
      let productPayload:CartProduct = action.payload
      const index = state.products.findIndex(product=> JSON.stringify(product) === JSON.stringify(productPayload));
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